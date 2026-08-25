"use client";

import { useMemo, useRef, useState } from "react";
import { Link } from "@/app/plain-link";

type SearchDoc = { slug: string; title: string; description: string; group: string; body: string };

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
  const results = useMemo(() => {
    const phrase = normalize(query);
    if (!phrase) return docs;
    const terms = phrase.split(/\s+/).filter(Boolean);
    return docs
      .map((doc) => {
        const title = normalize(doc.title);
        const description = normalize(doc.description);
        const haystack = normalize(`${doc.slug} ${doc.group} ${doc.title} ${doc.description} ${doc.body}`);
        if (!terms.every((term) => haystack.includes(term))) return null;
        const score =
          (title === phrase ? 100 : 0) +
          (title.includes(phrase) ? 40 : 0) +
          (description.includes(phrase) ? 20 : 0) +
          terms.reduce((sum, term) => sum + (title.includes(term) ? 8 : 0) + (description.includes(term) ? 4 : 0), 0);
        return { doc, score };
      })
      .filter((entry): entry is { doc: SearchDoc; score: number } => entry !== null)
      .sort((left, right) => right.score - left.score || left.doc.title.localeCompare(right.doc.title, "ru"))
      .map(({ doc }) => doc);
  }, [docs, query]);

  return (
    <>
      <label className="search-form">
        <span aria-hidden="true">⌕</span>
        <input id="docs-search-input" ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Например: special offer, entitlement, SemVer…" aria-label="Поиск по документации" />
        {query ? <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }}>Сбросить</button> : null}
      </label>
      <div className="search-count">{results.length} {results.length === 1 ? "результат" : "результатов"}</div>
      {results.length ? (
        <div className="search-results-list">
          {results.map((doc) => (
            <Link className="search-result-card" href={`/docs/${doc.slug}`} key={doc.slug}>
              <div><span className="section-index">{doc.group.toUpperCase()}</span><h2>{doc.title}</h2><p>{doc.description}</p></div><span>↗</span>
            </Link>
          ))}
        </div>
      ) : <div className="empty-search">Ничего не нашли. Попробуйте название модуля, flow или API-термин.</div>}
    </>
  );
}
