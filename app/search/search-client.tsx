"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchDoc = { slug: string; title: string; description: string; group: string; body: string };

export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru-RU");
    if (!normalized) return docs;
    const terms = normalized.split(/\s+/).filter(Boolean);
    return docs.map((doc) => {
      const title = doc.title.toLocaleLowerCase("ru-RU");
      const haystack = `${doc.title} ${doc.description} ${doc.body}`.toLocaleLowerCase("ru-RU");
      const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 4 : 0) + (haystack.includes(term) ? 1 : 0), 0);
      return { doc, score };
    }).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ doc }) => doc);
  }, [docs, query]);

  return (
    <>
      <label className="search-form">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Например: special offer, entitlement, SemVer…" aria-label="Поиск по документации" />
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
