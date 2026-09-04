"use client";

import { useEffect, useState } from "react";

export function DocReadingTools() {
  const [progress, setProgress] = useState(0);

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
  }, []);

  return (
    <div className="docs-reading-progress" role="progressbar" aria-label="Прогресс чтения статьи" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}
