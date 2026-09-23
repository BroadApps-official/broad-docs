"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SidebarHeading = {
  id: string;
  label: string;
};

type SidebarEntry = {
  headings: SidebarHeading[];
  slug: string;
  title: string;
};

type SidebarGroup = {
  entries: SidebarEntry[];
  label: string;
  subgroups: { entries: SidebarEntry[]; label: string }[];
};

const openStorageKey = "broad-docs-sidebar-open";
const openSubgroupsStorageKey = "broad-docs-sidebar-subgroups-v2";
const scrollStorageKey = "broad-docs-sidebar-scroll";

function currentHash() {
  if (typeof window === "undefined") return "";
  try {
    return decodeURIComponent(window.location.hash.replace(/^#/, ""));
  } catch {
    return window.location.hash.replace(/^#/, "");
  }
}

function storedOpenSlugs(currentSlug: string, openCurrent: boolean) {
  if (typeof window === "undefined") return new Set(openCurrent ? [currentSlug] : []);
  try {
    const stored = JSON.parse(window.localStorage.getItem(openStorageKey) ?? "[]");
    const slugs = Array.isArray(stored) ? stored.filter((value): value is string => typeof value === "string") : [];
    return new Set(openCurrent ? [...slugs, currentSlug] : slugs);
  } catch {
    return new Set(openCurrent ? [currentSlug] : []);
  }
}

function revealSidebarLink(list: HTMLDivElement, link: HTMLAnchorElement, behavior: ScrollBehavior) {
  const listRect = list.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const safeTop = listRect.top + 24;
  const safeBottom = listRect.bottom - 24;
  if (linkRect.top >= safeTop && linkRect.bottom <= safeBottom) return;

  const delta = linkRect.top < safeTop ? linkRect.top - safeTop : linkRect.bottom - safeBottom;
  list.scrollTo({ top: list.scrollTop + delta, behavior });
}

export function DocsSidebar({ currentSlug, groups }: { currentSlug: string; groups: SidebarGroup[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const isSubgroupPage = groups.some((group) => group.subgroups.some((subgroup) => subgroup.entries.some((entry) => entry.slug === currentSlug)));
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => new Set(isSubgroupPage ? [] : [currentSlug]));
  const [openSubgroups, setOpenSubgroups] = useState<Set<string>>(() => new Set(groups.flatMap((group) => group.subgroups.map((subgroup) => `${group.label}/${subgroup.label}`))));
  const [activeHash, setActiveHash] = useState("");
  const currentHeadings = useMemo(
    () => groups.flatMap((group) => [...group.entries, ...group.subgroups.flatMap((subgroup) => subgroup.entries)]).find((entry) => entry.slug === currentSlug)?.headings ?? [],
    [currentSlug, groups],
  );

  const rememberScroll = useCallback(() => {
    if (!listRef.current) return;
    window.sessionStorage.setItem(scrollStorageKey, String(listRef.current.scrollTop));
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpenSlugs(storedOpenSlugs(currentSlug, !isSubgroupPage || Boolean(currentHash())));
      try {
        const stored = JSON.parse(window.localStorage.getItem(openSubgroupsStorageKey) ?? "null");
        const allKeys = groups.flatMap((group) => group.subgroups.map((subgroup) => `${group.label}/${subgroup.label}`));
        const currentKey = groups.flatMap((group) => group.subgroups.filter((subgroup) => subgroup.entries.some((entry) => entry.slug === currentSlug)).map((subgroup) => `${group.label}/${subgroup.label}`))[0];
        const keys = Array.isArray(stored) ? stored.filter((value): value is string => typeof value === "string" && allKeys.includes(value)) : allKeys;
        setOpenSubgroups(new Set(currentKey ? [...keys, currentKey] : keys));
      } catch {
        setOpenSubgroups(new Set(groups.flatMap((group) => group.subgroups.map((subgroup) => `${group.label}/${subgroup.label}`))));
      }
      setActiveHash(currentHash());

      window.requestAnimationFrame(() => {
        const savedScroll = Number(window.sessionStorage.getItem(scrollStorageKey) ?? "0");
        const list = listRef.current;
        if (!list) return;
        if (Number.isFinite(savedScroll)) list.scrollTop = savedScroll;

        window.requestAnimationFrame(() => {
          const currentPage = list.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
          const groupLabel = currentPage?.closest(".docs-sidebar-group")?.querySelector<HTMLElement>(".docs-sidebar-group-label");
          if (currentPage?.closest(".docs-sidebar-subgroup") && groupLabel) {
            list.scrollTop += groupLabel.getBoundingClientRect().top - list.getBoundingClientRect().top - 8;
          } else if (currentPage) {
            revealSidebarLink(list, currentPage, "auto");
          }
        });
      });
    });

    const syncHash = () => setActiveHash(currentHash());
    const saveBeforeLeave = () => rememberScroll();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("pagehide", saveBeforeLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("pagehide", saveBeforeLeave);
    };
  }, [currentSlug, groups, isSubgroupPage, rememberScroll]);

  useEffect(() => {
    let frame = 0;

    const syncActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        let current = currentHeadings[0]?.id ?? "";
        for (const heading of currentHeadings) {
          const element = document.getElementById(heading.id);
          if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.28) current = heading.id;
        }
        setActiveHash((previous) => previous === current ? previous : current);
      });
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, [currentHeadings]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeHash) return;
    const activeLink = Array.from(list.querySelectorAll<HTMLAnchorElement>(".docs-sidebar-subsections a"))
      .find((link) => link.getAttribute("href") === `#${activeHash}`);
    if (!activeLink) return;

    revealSidebarLink(list, activeLink, "smooth");
  }, [activeHash]);

  function toggleEntry(slug: string) {
    setOpenSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      window.localStorage.setItem(openStorageKey, JSON.stringify(Array.from(next)));
      return next;
    });
  }

  function toggleSubgroup(key: string) {
    setOpenSubgroups((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      window.localStorage.setItem(openSubgroupsStorageKey, JSON.stringify(Array.from(next)));
      return next;
    });
  }

  function renderEntry(entry: SidebarEntry) {
    const isCurrent = entry.slug === currentSlug;
    const isOpen = openSlugs.has(entry.slug);
    const panelId = `sidebar-sections-${entry.slug}`;

    if (!entry.headings.length) {
      return <a aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "active" : ""} href={`/docs/${entry.slug}`} key={entry.slug} onClick={rememberScroll}>{entry.title}</a>;
    }

    return (
      <div className={`docs-sidebar-disclosure${isCurrent ? " current" : ""}${isOpen ? " is-open" : ""}`} key={entry.slug}>
        <div className="docs-sidebar-row">
          <a aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "active" : ""} href={`/docs/${entry.slug}`} onClick={rememberScroll}>{entry.title}</a>
          <button
            aria-controls={panelId}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Скрыть" : "Показать"} разделы статьи «${entry.title}»`}
            className="docs-sidebar-toggle"
            onClick={() => toggleEntry(entry.slug)}
            type="button"
          >
            <i className="docs-sidebar-chevron" aria-hidden="true" />
          </button>
        </div>
        {isOpen ? (
          <div className="docs-sidebar-subsections" id={panelId}>
            {entry.headings.map((heading, headingIndex) => {
              const isActive = isCurrent && activeHash === heading.id;
              const href = isCurrent ? `#${heading.id}` : `/docs/${entry.slug}#${heading.id}`;
              return (
                <a aria-current={isActive ? "location" : undefined} className={isActive ? "active" : ""} href={href} key={heading.id} onClick={() => {
                  rememberScroll();
                  if (isCurrent) setActiveHash(heading.id);
                }}>
                  <span>{String(headingIndex + 1).padStart(2, "0")}</span>
                  <b>{heading.label}</b>
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <nav className="docs-sidebar" aria-label="Разделы документации">
      <div className="docs-sidebar-summary"><span>КАТАЛОГ</span><b>{groups.reduce((count, group) => count + group.entries.length + group.subgroups.reduce((sum, subgroup) => sum + subgroup.entries.length, 0), 0)} статей</b></div>
      <div className="docs-sidebar-list" onScroll={rememberScroll} ref={listRef}>
        {groups.map((group) => (
          <div className="docs-sidebar-group" key={group.label}>
            <span className="docs-sidebar-group-label">{group.label.toUpperCase()}</span>
            {group.entries.map(renderEntry)}
            {group.subgroups.map((subgroup) => {
              const key = `${group.label}/${subgroup.label}`;
              const isOpen = openSubgroups.has(key);
              const panelId = `sidebar-subgroup-${group.label}-${subgroup.label}`;
              const firstSlug = subgroup.entries[0]?.slug;
              return (
                <div className={`docs-sidebar-subgroup${subgroup.entries.some((entry) => entry.slug === currentSlug) ? " current" : ""}`} key={key}>
                  <div className="docs-sidebar-row docs-sidebar-subgroup-head">
                    <a href={firstSlug ? `/docs/${firstSlug}` : "/docs"} onClick={rememberScroll}>{subgroup.label}</a>
                    <button aria-controls={panelId} aria-expanded={isOpen} aria-label={`${isOpen ? "Скрыть" : "Показать"} статьи раздела «${subgroup.label}»`} className="docs-sidebar-toggle" onClick={() => toggleSubgroup(key)} type="button"><i className="docs-sidebar-chevron" aria-hidden="true" /></button>
                  </div>
                  {isOpen ? <div className="docs-sidebar-subgroup-entries" id={panelId}>{subgroup.entries.map(renderEntry)}</div> : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
