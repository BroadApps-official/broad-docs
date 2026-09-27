"use client";

import { useState } from "react";

const site = "https://broadapps-ios-docs.nkhsnv.chatgpt.site";

const variants = [
  {
    id: "figma",
    label: "Новое по Figma",
    prompt: `Сделай iPhone-приложение <номер и название> на BroadApps iOS Platform.
Инструкция для агента: ${site}/llms.txt
Kaiten: <ссылка на карточку>
Дизайн: <ссылка на Figma> — открой в моём браузере, MCP не нужен.
Backend: <ссылка на документацию>
Сначала предложи поставить правила и скиллы BroadApps, затем начни с проверки источников и остановись с отчётом.`,
  },
  {
    id: "no-code",
    label: "Новое no-code",
    prompt: `Сделай iPhone-приложение <номер и название> на BroadApps iOS Platform.
Инструкция для агента: ${site}/llms.txt
Kaiten: <ссылка на карточку> (метка no-code).
Дизайн: соберём макет вместе в Claude Design или Pencil.
Backend: <ссылка на документацию>
Сначала предложи поставить правила и скиллы BroadApps, затем начни с проверки источников и остановись с отчётом.`,
  },
  {
    id: "existing",
    label: "Уже написанное",
    prompt: `Проверь приложение в этой папке по BroadApps iOS Platform.
Инструкция для агента: ${site}/llms.txt
Сначала предложи поставить правила и скиллы BroadApps, затем найди, что уже на платформе, где старая логика и что исправить. Код пока не меняй — остановись с отчётом.`,
  },
];

export function HomeAgentStart() {
  const [selected, setSelected] = useState(variants[0].id);
  const [copied, setCopied] = useState(false);
  const variant = variants.find((item) => item.id === selected) ?? variants[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(variant.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="home-agent" aria-labelledby="home-agent-title">
      <div className="home-agent-intro">
        <span className="home-start-label">ПРОЩЕ ВСЕГО — ЧЕРЕЗ АГЕНТА</span>
        <h2 id="home-agent-title">Не хочется разбираться? Отправьте агенту одну фразу</h2>
        <p>
          Claude или Codex сам прочитает платформу, поставит правила и скиллы компании
          (после вашего «да»), пройдёт этапы и будет останавливаться для проверки.
          Замените то, что в угловых скобках.
        </p>
      </div>
      <div className="home-agent-card">
        <div className="home-agent-tabs" role="tablist" aria-label="Вариант фразы">
          {variants.map((item) => (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={item.id === selected}
              className={item.id === selected ? "active" : undefined}
              onClick={() => {
                setSelected(item.id);
                setCopied(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className={copied ? "home-agent-copy copied" : "home-agent-copy"} onClick={copy} aria-live="polite">
            {copied ? "Скопировано ✓" : "Копировать"}
          </button>
        </div>
        <pre className="home-agent-prompt"><code>{variant.prompt}</code></pre>
      </div>
    </section>
  );
}
