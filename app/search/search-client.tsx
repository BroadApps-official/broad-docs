"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "@/app/plain-link";
import { SearchIcon } from "@/app/search-icon";

type SearchDoc = { slug: string; title: string; description: string; group: string; body: string };

const quickQueries = [
  "Подключаю платформу впервые",
  "Нужен готовый paywall",
  "Оплата со своим экраном",
  "Переношу старый BroadCore",
  "Какие версии ставить",
  "Ошибка сборки",
];

const startSlugs = ["getting-started", "module-selection", "broad-monetization", "legacy-app-migration"];

const intentRules: Array<{ pattern: RegExp; slugs: string[]; weight: number }> = [
  { pattern: /(готов.*(paywall|пейвол))/, slugs: ["paywall-ui", "broad-ui-flows", "adapty-setup"], weight: 290 },
  { pattern: /(готов.*экран|onboarding|онборд|ui flow)/, slugs: ["broad-ui-flows", "onboarding-att", "paywall-ui"], weight: 280 },
  { pattern: /(впервые|перв(ое|ый).*подключ|начать|старт.*платформ)/, slugs: ["getting-started", "module-selection", "public-package-access"], weight: 270 },
  { pattern: /(оплат|подпис|покуп|paywall|пейвол|adapty|адапти|storekit|restore|восстанов)/, slugs: ["broad-monetization", "adapty-setup", "paywall-ui", "special-offer", "token-paywall", "ru-billing"], weight: 230 },
  { pattern: /(перен|миграц|стар(ое|ого|ый)|legacy|broadcore)/, slugs: ["legacy-app-migration", "legacy-broadcore", "migration"], weight: 230 },
  { pattern: /(совмест|верс|тег|semver|каталог)/, slugs: ["compatibility", "release-process"], weight: 230 },
  { pattern: /(ошиб|сборк|не собира|runtime|пад|сеть|network|cache|retry|bootstrap)/, slugs: ["runtime-reliability", "getting-started", "compatibility", "broad-core"], weight: 230 },
  { pattern: /(выб(рать|ор)|какой модул|что подключ|подключ|swift package|package|spm|xcode)/, slugs: ["module-selection", "getting-started", "public-package-access"], weight: 90 },
  { pattern: /(готов(ый|ые) экран|onboarding|онборд|ui flow)/, slugs: ["broad-ui-flows", "onboarding-att", "paywall-ui"], weight: 210 },
  { pattern: /(special offer|спец|скидк|таймер)/, slugs: ["special-offer", "adapty-setup"], weight: 240 },
  { pattern: /(чат|поддержк|usedesk)/, slugs: ["usedesk"], weight: 230 },
];

const resultReasons: Record<string, string> = {
  "getting-started": "Пошаговое первое подключение библиотеки к приложению.",
  "module-selection": "Поможет выбрать одну библиотеку под вашу задачу.",
  "broad-monetization": "Главная точка входа для оплаты, подписки и восстановления покупки.",
  "adapty-setup": "Показывает, куда передать ключ и имя нужного экрана Adapty.",
  "legacy-app-migration": "Безопасный порядок переноса существующего приложения.",
  "legacy-broadcore": "Объясняет, куда переехал старый BroadCore.",
  compatibility: "Содержит готовый набор совместимых версий библиотек.",
  "release-process": "Объясняет SemVer и выпуск связанных изменений.",
  "runtime-reliability": "Сценарии диагностики запуска, кеша и сетевых сбоев.",
  "broad-core": "Основа запуска, кеширования, логирования и повторов.",
  "broad-ui-flows": "Готовые onboarding, paywall, состояния загрузки и переход в основное приложение.",
  "paywall-ui": "Показывает готовые состояния paywall для любого количества продуктов.",
  "public-package-access": "Объясняет, как подключить public package без GitHub-пароля и токена.",
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

export function SearchClient({ docs, variant = "full" }: { docs: SearchDoc[]; variant?: "full" | "home" }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (variant === "home") return;
    const initialQuery = new URLSearchParams(window.location.search).get("q") ?? "";
    const frame = window.requestAnimationFrame(() => setQuery(initialQuery));
    return () => window.cancelAnimationFrame(frame);
  }, [variant]);

  function updateQuery(value: string) {
    setQuery(value);
    if (variant === "home") return;
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (variant === "home" && query.trim()) {
      window.location.assign(`/search?q=${encodeURIComponent(query.trim())}`);
      return;
    }
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
      .slice(0, variant === "home" ? 4 : 8);
  }, [docs, query, variant]);

  const fullSearchHref = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";

  return (
    <>
      <form className={`search-form ${variant === "home" ? "home-search-form" : ""}`} onSubmit={submitSearch}>
        <SearchIcon />
        <input id={variant === "home" ? "home-docs-search-input" : "docs-search-input"} ref={inputRef} value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Например: нужен готовый paywall" aria-label="Что вы хотите сделать с приложением?" autoComplete="off" />
        {query ? <button className="search-reset" type="button" onClick={() => { updateQuery(""); inputRef.current?.focus(); }}>Очистить</button> : null}
        <button className="search-submit" type="submit">{variant === "home" ? "Все результаты" : "Найти"}</button>
      </form>
      {variant === "home" ? <p className="home-search-live-note"><span className="status-dot green" />Начните печатать — подходящие инструкции появятся сразу ниже.</p> : null}
      <div className={`search-suggestions ${variant === "home" ? "home-search-suggestions" : ""}`} aria-label="Готовые примеры поиска">
        <span>Можно нажать готовый запрос:</span>
        {quickQueries.map((item) => <button className={normalize(item) === normalize(query) ? "active" : ""} type="button" onClick={() => updateQuery(item)} key={item}>{item}</button>)}
      </div>
      <div className={`search-results-heading ${variant === "home" ? "home-search-results-heading" : ""}`}>
        <div><b>{query ? `Подходящие инструкции: ${results.length}` : "С чего начать"}</b><span>{query ? "Сначала показаны самые полезные страницы для этой задачи." : "Выберите готовый маршрут или сформулируйте свою задачу выше."}</span></div>
      </div>
      {variant === "home" && results.length ? (
        <>
          <div className="home-search-results" aria-live="polite">
            {results.map((doc) => (
              <Link className="home-search-result" href={`/docs/${doc.slug}`} key={doc.slug}>
                <span>{doc.group.toUpperCase()}</span>
                <b>{doc.title}</b>
                <p>{resultReasons[doc.slug] ?? doc.description}</p>
                <i>Открыть пошаговую инструкцию →</i>
              </Link>
            ))}
          </div>
          <div className="home-search-footer"><span>Показаны первые {results.length} результата</span><Link href={fullSearchHref}>Открыть полный поиск →</Link></div>
        </>
      ) : results.length ? (
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
      ) : <div className={`empty-search ${variant === "home" ? "home-empty-search" : ""}`}><b>Такой инструкции пока не нашли</b><span>Сократите запрос до задачи: «оплата», «миграция», «версии» или «ошибка сборки».</span><button type="button" onClick={() => updateQuery("")}>Показать основные маршруты</button></div>}
    </>
  );
}
