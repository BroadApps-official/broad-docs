"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "@/app/plain-link";
import { SearchIcon } from "@/app/search-icon";

type SearchDoc = { slug: string; title: string; description: string; group: string; body: string };

const quickQueries = [
  "Подключить оплату",
  "Выбрать модуль",
  "Перенести старое приложение",
  "Проверить совместимые версии",
  "Исправить ошибку сборки",
];

const startSlugs = ["getting-started", "module-selection", "broad-monetization", "legacy-app-migration"];

const intentRules: Array<{ pattern: RegExp; slugs: string[]; weight: number }> = [
  { pattern: /(оплат|подпис|покуп|paywall|пейвол|adapty|адапти|storekit|restore|восстанов)/, slugs: ["broad-monetization", "adapty-setup", "paywall-ui", "special-offer", "token-paywall", "ru-billing"], weight: 230 },
  { pattern: /(перен|миграц|стар(ое|ого|ый)|legacy|broadcore)/, slugs: ["legacy-app-migration", "legacy-broadcore", "migration"], weight: 230 },
  { pattern: /(совмест|верс|тег|semver|каталог)/, slugs: ["compatibility", "release-process"], weight: 230 },
  { pattern: /(ошиб|сборк|не собира|runtime|пад|сеть|network|cache|retry|bootstrap)/, slugs: ["runtime-reliability", "getting-started", "compatibility", "broad-core"], weight: 230 },
  { pattern: /(выб(рать|ор)|какой модул|что подключ|подключить|swift package|package|spm|xcode)/, slugs: ["module-selection", "getting-started", "public-package-access"], weight: 90 },
  { pattern: /(готов(ый|ые) экран|onboarding|онборд|ui flow)/, slugs: ["broad-ui-flows", "onboarding-att", "paywall-ui"], weight: 210 },
  { pattern: /(special offer|спец|скидк|таймер)/, slugs: ["special-offer", "adapty-setup"], weight: 240 },
  { pattern: /(чат|поддержк|usedesk)/, slugs: ["usedesk"], weight: 230 },
];

const resultReasons: Record<string, string> = {
  "getting-started": "Пошаговое первое подключение библиотеки к приложению.",
  "module-selection": "Поможет выбрать один модуль под вашу задачу.",
  "broad-monetization": "Главная точка входа для оплаты, подписки и восстановления покупки.",
  "adapty-setup": "Показывает настройку ключа, placement и продуктов Adapty.",
  "legacy-app-migration": "Безопасный порядок переноса существующего приложения.",
  "legacy-broadcore": "Объясняет, куда переехал старый BroadCore.",
  compatibility: "Содержит готовый набор совместимых версий модулей.",
  "release-process": "Объясняет SemVer и выпуск связанных изменений.",
  "runtime-reliability": "Сценарии диагностики запуска, кеша и сетевых сбоев.",
  "broad-core": "Основа запуска, кеширования, логирования и повторов.",
};

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ё/g, "е")
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/g, " ")
    .trim();
}

export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q") ?? "";
    const frame = window.requestAnimationFrame(() => setQuery(initialQuery));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateQuery(value: string) {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    inputRef.current?.focus();
  }

  const results = useMemo(() => {
    const phrase = normalize(query);
    if (!phrase) return startSlugs.map((slug) => docs.find((doc) => doc.slug === slug)).filter((doc): doc is SearchDoc => Boolean(doc));
    const terms = phrase.split(/\s+/).filter(Boolean);
    return docs
      .map((doc) => {
        const title = normalize(doc.title);
        const description = normalize(doc.description);
        const haystack = normalize(`${doc.slug} ${doc.group} ${doc.title} ${doc.description} ${doc.body}`);
        const matchedTerms = terms.filter((term) => haystack.includes(term));
        const intentScore = intentRules.reduce((score, rule) => {
          if (!rule.pattern.test(phrase)) return score;
          const position = rule.slugs.indexOf(doc.slug);
          return position === -1 ? score : score + rule.weight - position * 12;
        }, 0);
        if (!matchedTerms.length && !intentScore) return null;
        const score =
          intentScore +
          (title === phrase ? 100 : 0) +
          (title.includes(phrase) ? 40 : 0) +
          (description.includes(phrase) ? 20 : 0) +
          matchedTerms.length * 3 +
          terms.reduce((sum, term) => sum + (title.includes(term) ? 10 : 0) + (description.includes(term) ? 5 : 0), 0);
        return { doc, score };
      })
      .filter((entry): entry is { doc: SearchDoc; score: number } => entry !== null)
      .sort((left, right) => right.score - left.score || left.doc.title.localeCompare(right.doc.title, "ru"))
      .map(({ doc }) => doc)
      .slice(0, 8);
  }, [docs, query]);

  return (
    <>
      <form className="search-form" onSubmit={submitSearch}>
        <SearchIcon />
        <input id="docs-search-input" ref={inputRef} value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Например: подключить оплату" aria-label="Что вы хотите сделать с приложением?" autoComplete="off" />
        {query ? <button className="search-reset" type="button" onClick={() => { updateQuery(""); inputRef.current?.focus(); }}>Очистить</button> : null}
        <button className="search-submit" type="submit">Найти</button>
      </form>
      <div className="search-suggestions" aria-label="Готовые примеры поиска">
        <span>Популярные задачи:</span>
        {quickQueries.map((item) => <button className={normalize(item) === normalize(query) ? "active" : ""} type="button" onClick={() => updateQuery(item)} key={item}>{item}</button>)}
      </div>
      <div className="search-results-heading">
        <div><b>{query ? `Подходящие инструкции: ${results.length}` : "С чего начать"}</b><span>{query ? "Сначала показаны самые полезные страницы для этой задачи." : "Выберите готовый маршрут или сформулируйте свою задачу выше."}</span></div>
      </div>
      {results.length ? (
        <div className="search-results-list">
          {results.map((doc) => (
            <Link className="search-result-card" href={`/docs/${doc.slug}`} key={doc.slug}>
              <div>
                <span className="section-index">{doc.group.toUpperCase()}</span>
                <h2>{doc.title}</h2>
                <p>{resultReasons[doc.slug] ?? doc.description}</p>
                <small>{doc.description}</small>
              </div>
              <span className="search-card-action">Открыть инструкцию →</span>
            </Link>
          ))}
        </div>
      ) : <div className="empty-search"><b>Такой инструкции пока не нашли</b><span>Сократите запрос до задачи: «оплата», «миграция», «версии» или «ошибка сборки».</span><button type="button" onClick={() => updateQuery("")}>Показать основные маршруты</button></div>}
    </>
  );
}
