"use client";

import { useEffect, useState } from "react";
import { Link } from "./plain-link";

const sections = [
  { id: "top", number: "00", label: "Начало" },
  { id: "architecture", number: "01", label: "Как всё связано" },
  { id: "documentation", number: "02", label: "Где искать ответ" },
  { id: "modules", number: "03", label: "Модули" },
  { id: "selection", number: "04", label: "Как выбрать" },
  { id: "migration", number: "05", label: "Миграция" },
  { id: "compatibility", number: "06", label: "Текущие версии" },
] as const;

export function HomeSectionMap() {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("top");

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

  return (
    <aside className="home-section-map" aria-label="Карта разделов главной страницы">
      <div className="home-map-heading">
        <span>КАРТА САЙТА</span>
        <b>Главная</b>
      </div>
      <nav aria-label="Разделы главной страницы">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <Link
              className={isActive ? "active" : undefined}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              key={section.id}
            >
              <span>{section.number}</span>
              <b>{section.label}</b>
            </Link>
          );
        })}
      </nav>
      <Link className="home-map-docs-link" href="/docs">
        <span>23 статьи</span>
        <b>Все документы →</b>
      </Link>
    </aside>
  );
}
