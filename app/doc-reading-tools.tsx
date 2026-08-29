"use client";

import { useEffect, useState } from "react";

type Heading = { label: string; id: string };

export function DocReadingTools({ headings, sourcePath, sourceHref }: {
  headings: Heading[];
  sourcePath: string;
  sourceHref: string;
}) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const article = document.querySelector<HTMLElement>(".docs-article-card");

    const updateReadingState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (article) {
          const articleTop = article.getBoundingClientRect().top + window.scrollY;
          const readableHeight = Math.max(article.offsetHeight - window.innerHeight * 0.55, 1);
          const readDistance = window.scrollY + window.innerHeight * 0.2 - articleTop;
          setProgress(Math.round(Math.min(100, Math.max(0, readDistance / readableHeight * 100))));
        }

        let current = headings[0]?.id ?? "";
        for (const heading of headings) {
          const element = document.getElementById(heading.id);
          if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.28) current = heading.id;
        }
        setActiveId(current);
      });
    };

    const revealTargets = document.querySelectorAll<HTMLElement>(
      ".doc-visual, .doc-orientation, .docs-article-content > h2, .docs-table-wrap, .docs-media, .docs-code-block, .docs-article blockquote"
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | undefined;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    } else {
      revealTargets.forEach((element) => element.classList.add("docs-reveal"));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
      revealTargets.forEach((element) => observer?.observe(element));
    }

    updateReadingState();
    window.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("resize", updateReadingState);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", updateReadingState);
      window.removeEventListener("resize", updateReadingState);
    };
  }, [headings]);

  return (
    <>
      <div className="docs-reading-progress" role="progressbar" aria-label="Прогресс чтения статьи" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <aside className="docs-toc">
        <div className="docs-toc-card">
          <div className="docs-toc-head"><b>НА ЭТОЙ СТРАНИЦЕ</b><span>{progress}%</span></div>
          <nav aria-label="Оглавление статьи">
            {headings.map((heading, index) => (
              <a
                className={activeId === heading.id ? "active" : undefined}
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "location" : undefined}
                onClick={() => setActiveId(heading.id)}
                key={heading.id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{heading.label}
              </a>
            ))}
          </nav>
          <div className="docs-toc-source"><span>Источник</span><a href={sourceHref} target="_blank" rel="noreferrer">{sourcePath} ↗</a></div>
        </div>
      </aside>
    </>
  );
}
