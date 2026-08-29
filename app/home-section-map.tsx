"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "./plain-link";

const sections = [
  { id: "top", number: "00", label: "Начало", detail: "Что это за платформа" },
  { id: "architecture", number: "01", label: "Как всё связано", detail: "Модули и зависимости" },
  { id: "documentation", number: "02", label: "Где искать ответ", detail: "Сайт, README и DocC" },
  { id: "modules", number: "03", label: "Четыре модуля", detail: "Задача каждой библиотеки" },
  { id: "selection", number: "04", label: "Как выбрать", detail: "Один модуль для приложения" },
  { id: "migration", number: "05", label: "Миграция", detail: "Переход со старого кода" },
  { id: "compatibility", number: "06", label: "Текущие версии", detail: "Проверенный набор tags" },
] as const;

export function HomeSectionMap() {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("top");
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.28;
        let nextSection: (typeof sections)[number]["id"] = "top";

        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element && element.offsetTop <= marker) nextSection = section.id;
        }

        setActiveSection(nextSection);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: (typeof sections)[number]["id"]) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    event.preventDefault();
    setActiveSection(sectionId);
    window.history.pushState(null, "", `#${sectionId}`);

    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  return (
    <aside className="home-section-map" aria-label="Карта разделов главной страницы">
      <div className="home-map-heading">
        <span>КАРТА ГЛАВНОЙ</span>
        <b>{String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</b>
      </div>
      <div className="home-map-progress" aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} /></div>
      <nav aria-label="Разделы главной страницы">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <Link
              className={isActive ? "active" : undefined}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => navigateToSection(event, section.id)}
              key={section.id}
            >
              <span className="home-map-node">{section.number}</span>
              <span className="home-map-copy"><b>{section.label}</b><small>{section.detail}</small></span>
              <i aria-hidden="true">→</i>
            </Link>
          );
        })}
      </nav>
      <Link className="home-map-docs-link" href="/docs">
        <span>НУЖНА СТАТЬЯ?</span>
        <b>Все 24 документа →</b>
      </Link>
    </aside>
  );
}
