"use client";

import { useMemo, useState } from "react";
import { Link } from "@/app/plain-link";

type DocsIndexEntry = {
  slug: string;
  title: string;
  description: string;
  group: string;
  body: string;
};

const collator = new Intl.Collator("ru", { sensitivity: "base", numeric: true });

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ё/g, "е")
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/g, " ")
    .trim();
}

function firstLetter(title: string) {
  return title.trim().match(/[A-Za-zА-Яа-яЁё]/)?.[0].toLocaleUpperCase("ru-RU") ?? "#";
}

function searchDocs(docs: DocsIndexEntry[], query: string) {
  const phrase = normalize(query);
  if (!phrase) return [];
  const terms = phrase.split(/\s+/).filter(Boolean);

  return docs
    .map((doc) => {
      const title = normalize(doc.title);
      const description = normalize(doc.description);
      const searchable = normalize(`${doc.slug} ${doc.group} ${doc.title} ${doc.description} ${doc.body}`);
      if (!terms.every((term) => searchable.includes(term))) return null;

      const score =
        (title === phrase ? 100 : 0) +
        (title.includes(phrase) ? 40 : 0) +
        (description.includes(phrase) ? 20 : 0) +
        terms.reduce((sum, term) => sum + (title.includes(term) ? 8 : 0) + (description.includes(term) ? 4 : 0), 0);
      return { doc, score };
    })
    .filter((entry): entry is { doc: DocsIndexEntry; score: number } => entry !== null)
    .sort((left, right) => right.score - left.score || collator.compare(left.doc.title, right.doc.title))
    .map(({ doc }) => doc);
}

function DocCards({ docs }: { docs: DocsIndexEntry[] }) {
  return (
    <div className="docs-index-list">
      {docs.map((doc) => (
        <Link className="docs-index-card" href={`/docs/${doc.slug}`} key={doc.slug}>
          <span className="docs-index-letter" aria-hidden="true">{firstLetter(doc.title)}</span>
          <div>
            <span className="section-index">{doc.group.toUpperCase()}</span>
            <h2>{doc.title}</h2>
            <p>{doc.description}</p>
          </div>
          <span className="docs-index-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}

export function DocsIndexClient({ docs }: { docs: DocsIndexEntry[] }) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("Все");
  const sortedDocs = useMemo(() => [...docs].sort((left, right) => collator.compare(left.title, right.title)), [docs]);
  const letters = useMemo(() => Array.from(new Set(sortedDocs.map((doc) => firstLetter(doc.title)))), [sortedDocs]);
  const searchResults = useMemo(() => searchDocs(docs, query), [docs, query]);
  const alphabetResults = useMemo(
    () => letter === "Все" ? sortedDocs : sortedDocs.filter((doc) => firstLetter(doc.title) === letter),
    [letter, sortedDocs],
  );

  return (
    <div className="docs-index-content section-wrap">
      <section className="docs-search-block" aria-labelledby="text-search-title">
        <div className="docs-index-heading">
          <div><span>01</span><h2 id="text-search-title">Поиск по тексту</h2></div>
          <p>Ищет по названию, описанию и всему тексту Markdown-страниц.</p>
        </div>
        <div className="docs-search-box">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например: onboarding, entitlement, миграция…"
            aria-label="Поиск по тексту документации"
          />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск">Сбросить</button> : null}
        </div>
        {query.trim() ? (
          <div className="docs-search-output" aria-live="polite">
            <div className="search-count">{searchResults.length} {searchResults.length === 1 ? "результат" : "результатов"}</div>
            {searchResults.length ? <DocCards docs={searchResults} /> : <div className="empty-search">Ничего не нашли. Попробуйте меньше слов или название модуля.</div>}
          </div>
        ) : <p className="docs-search-hint">Начните печатать — результаты появятся сразу.</p>}
      </section>

      <section className="alphabet-block" aria-labelledby="alphabet-title">
        <div className="docs-index-heading">
          <div><span>02</span><h2 id="alphabet-title">Алфавитный указатель</h2></div>
          <p>Отдельный поиск по первой букве названия — без текстового запроса.</p>
        </div>
        <div className="alphabet-controls" role="group" aria-label="Фильтр по первой букве">
          {["Все", ...letters].map((item) => (
            <button
              className={letter === item ? "active" : ""}
              type="button"
              aria-pressed={letter === item}
              onClick={() => setLetter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="alphabet-summary" aria-live="polite">
          <b>{letter === "Все" ? "Все документы" : `Буква ${letter}`}</b>
          <span>{alphabetResults.length} из {docs.length}</span>
        </div>
        <DocCards docs={alphabetResults} />
      </section>
    </div>
  );
}
