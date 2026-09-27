"use client";

import { useState, type ReactNode } from "react";

export function HomeMapPanel({ count, children }: { count: number; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`home-section-map${isOpen ? " is-open" : ""}`} aria-label="Каталог документации">
      <div className="home-map-heading">
        <span>КАТАЛОГ</span>
        <b>{count} статей</b>
        <button
          className="home-map-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="home-map-content"
          aria-label={`${isOpen ? "Скрыть" : "Открыть"} каталог документации`}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "Скрыть" : "Открыть"}<i aria-hidden="true" />
        </button>
      </div>
      <div className="home-map-content" id="home-map-content">{children}</div>
    </aside>
  );
}
