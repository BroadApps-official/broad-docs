"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
};

const openStorageKey = "broad-docs-sidebar-open";
const scrollStorageKey = "broad-docs-sidebar-scroll";

function currentHash() {
  if (typeof window === "undefined") return "";
  try {
    return decodeURIComponent(window.location.hash.replace(/^#/, ""));
  } catch {
    return window.location.hash.replace(/^#/, "");
  }
}

function storedOpenSlugs(currentSlug: string) {
  if (typeof window === "undefined") return new Set([currentSlug]);
  try {
    const stored = JSON.parse(window.localStorage.getItem(openStorageKey) ?? "[]");
    const slugs = Array.isArray(stored) ? stored.filter((value): value is string => typeof value === "string") : [];
    return new Set([...slugs, currentSlug]);
  } catch {
    return new Set([currentSlug]);
  }
}

export function DocsSidebar({ currentSlug, groups }: { currentSlug: string; groups: SidebarGroup[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => new Set([currentSlug]));
  const [activeHash, setActiveHash] = useState("");

  const rememberScroll = useCallback(() => {
    if (!listRef.current) return;
    window.sessionStorage.setItem(scrollStorageKey, String(listRef.current.scrollTop));
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpenSlugs(storedOpenSlugs(currentSlug));
      setActiveHash(currentHash());

      window.requestAnimationFrame(() => {
        const savedScroll = Number(window.sessionStorage.getItem(scrollStorageKey) ?? "0");
        if (listRef.current && Number.isFinite(savedScroll)) listRef.current.scrollTop = savedScroll;
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
  }, [currentSlug, rememberScroll]);

  function toggleEntry(slug: string) {
    setOpenSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      window.localStorage.setItem(openStorageKey, JSON.stringify(Array.from(next)));
      return next;
    });
  }

  return (
    <nav className="docs-sidebar" aria-label="Разделы документации">
      <div className="docs-sidebar-summary"><span>КАТАЛОГ</span><b>{groups.reduce((count, group) => count + group.entries.length, 0)} статей</b></div>
      <div className="docs-sidebar-list" onScroll={rememberScroll} ref={listRef}>
        {groups.map((group) => (
          <div key={group.label}>
            <span>{group.label.toUpperCase()}</span>
            {group.entries.map((entry) => {
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
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
