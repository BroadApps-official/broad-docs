"use client";

import { useMemo, useRef, useState } from "react";
import { Link } from "@/app/plain-link";
import { SearchIcon } from "@/app/search-icon";
import type { GitHubDocument } from "@/lib/github-docs.generated";

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
    .replace(/[^a-zа-я0-9_]+/g, " ")
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

const githubKeywordGroups = [
  ["paywall", "пейвол", "оплата", "платеж", "payment", "purchase", "billing", "storekit"],
  ["подписка", "subscription", "entitlement", "premium"],
  ["миграция", "migration", "legacy", "переезд"],
  ["авторизация", "authorization", "authentication", "auth", "login"],
  ["кеш", "cache", "cached", "ttl"],
  ["ru_pay", "rupay", "yookassa", "юкасса"],
  ["keychain", "credential", "credentials", "password", "пароль"],
  ["релиз", "release", "semver", "version", "tag"],
  ["онбординг", "onboarding", "att", "tracking"],
  ["ошибка", "error", "retry", "timeout", "offline", "pending"],
  ["агент", "agent", "codex", "claude", "preflight", "prompt", "checkpoint"],
  ["план", "plan", "integration", "appintegrationplan", "skeleton", "slice"],
  ["adapty", "placement", "placements", "remote", "config", "remote config"],
  ["special", "offer", "special offer", "downsell"],
  ["токен", "токены", "token", "tokens", "consumable", "balance", "fulfillment"],
  ["restore", "recovery", "reinstall", "восстановление", "переустановка"],
  ["usedesk", "support", "чат", "chat"],
].map((group) => group.map(normalize));

const githubQuickKeywords = [
  "Codex",
  "Integration Plan",
  "ATT",
  "onboarding",
  "paywall",
  "Adapty",
  "Special Offer",
  "ru_pay",
  "tokens",
  "purchase",
  "restore",
  "pending",
  "entitlement",
  "Usedesk",
  "Keychain",
  "migration",
  "Remote Config",
  "SemVer",
];

function termVariants(term: string) {
  return githubKeywordGroups.find((group) => group.includes(term)) ?? [term];
}

function searchGitHubDocuments(docs: GitHubDocument[], query: string, repository: string) {
  const filtered = repository === "Все" ? docs : docs.filter((doc) => doc.repository === repository);
  const phrase = normalize(query);
  if (!phrase) return filtered.filter((doc) => doc.path === "README.md");

  const terms = phrase.split(/\s+/).filter(Boolean);
  return filtered
    .map((doc) => {
      const title = normalize(doc.title);
      const path = normalize(doc.path);
      const repositoryName = normalize(`${doc.repository} ${doc.repositoryLabel}`);
      const description = normalize(doc.description);
      const searchable = normalize(`${doc.repository} ${doc.repositoryLabel} ${doc.path} ${doc.kind} ${doc.title} ${doc.description} ${doc.body}`);
      if (!terms.every((term) => termVariants(term).some((variant) => searchable.includes(variant)))) return null;

      const score =
        (title === phrase ? 140 : 0) +
        (title.includes(phrase) ? 55 : 0) +
        (path.includes(phrase) ? 34 : 0) +
        (repositoryName.includes(phrase) ? 28 : 0) +
        (description.includes(phrase) ? 18 : 0) +
        (doc.kind === "README" ? 6 : 0) +
        terms.reduce((sum, term) => {
          const variants = termVariants(term);
          return sum +
            (variants.some((variant) => title.includes(variant)) ? 12 : 0) +
            (variants.some((variant) => path.includes(variant)) ? 8 : 0) +
            (variants.some((variant) => description.includes(variant)) ? 5 : 0);
        }, 0);
      return { doc, score };
    })
    .filter((entry): entry is { doc: GitHubDocument; score: number } => entry !== null)
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

export function DocsIndexClient({ docs, githubDocs }: { docs: DocsIndexEntry[]; githubDocs: GitHubDocument[] }) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("Все");
  const [alphabetGroup, setAlphabetGroup] = useState("Все");
  const [githubQuery, setGithubQuery] = useState("");
  const [githubRepository, setGithubRepository] = useState("Все");
  const githubInputRef = useRef<HTMLInputElement>(null);
  const sortedDocs = useMemo(() => [...docs].sort((left, right) => collator.compare(left.title, right.title)), [docs]);
  const documentGroups = useMemo(() => Array.from(new Set(docs.map((doc) => doc.group))), [docs]);
  const groupCounts = useMemo(
    () => new Map(documentGroups.map((group) => [group, docs.filter((doc) => doc.group === group).length])),
    [docs, documentGroups],
  );
  const alphabetGroupDocs = useMemo(
    () => alphabetGroup === "Все" ? sortedDocs : sortedDocs.filter((doc) => doc.group === alphabetGroup),
    [alphabetGroup, sortedDocs],
  );
  const letterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    alphabetGroupDocs.forEach((doc) => {
      const initial = firstLetter(doc.title);
      counts.set(initial, (counts.get(initial) ?? 0) + 1);
    });
    return counts;
  }, [alphabetGroupDocs]);
  const letters = useMemo(
    () => Array.from(letterCounts.keys()).sort((left, right) => collator.compare(left, right)),
    [letterCounts],
  );
  const searchResults = useMemo(() => searchDocs(docs, query), [docs, query]);
  const githubRepositories = useMemo(() => {
    const byRepository = new Map(githubDocs.map((doc) => [doc.repository, doc.repositoryLabel]));
    return Array.from(byRepository, ([repository, label]) => ({ repository, label }));
  }, [githubDocs]);
  const githubResults = useMemo(
    () => searchGitHubDocuments(githubDocs, githubQuery, githubRepository),
    [githubDocs, githubQuery, githubRepository],
  );
  const alphabetResults = useMemo(
    () => letter === "Все" ? alphabetGroupDocs : alphabetGroupDocs.filter((doc) => firstLetter(doc.title) === letter),
    [alphabetGroupDocs, letter],
  );
  const alphabetSections = useMemo(
    () => letters
      .map((initial) => ({ initial, docs: alphabetResults.filter((doc) => firstLetter(doc.title) === initial) }))
      .filter((section) => section.docs.length > 0),
    [alphabetResults, letters],
  );

  return (
    <div className="docs-index-content section-wrap">
      <section className="docs-search-block" aria-labelledby="text-search-title">
        <div className="docs-index-heading">
          <div><span>01</span><h2 id="text-search-title">Поиск по тексту</h2></div>
          <p>Ищет по названию, описанию и всему тексту Markdown-страниц.</p>
        </div>
        <div className="docs-search-box">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например: первые экраны, Premium, миграция…"
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

      <section className="github-search-block" aria-labelledby="github-search-title">
        <div className="docs-index-heading">
          <div><span>02</span><h2 id="github-search-title">Поиск по GitHub</h2></div>
          <p>Ищет по README, инструкциям, истории изменений и каталогам совместимости всех публичных репозиториев платформы.</p>
        </div>
        <div className="github-index-stats" aria-label="Объём поискового индекса">
          <span><b>{githubRepositories.length}</b> репозиториев</span>
          <span><b>{githubDocs.length}</b> документов</span>
          <span><b>README + DOCS</b> публичный снимок</span>
        </div>
        <div className="docs-search-box github-search-box">
          <SearchIcon />
          <input
            ref={githubInputRef}
            value={githubQuery}
            onChange={(event) => setGithubQuery(event.target.value)}
            placeholder="Например: ru_pay, ATT, Premium, Keychain, migration…"
            aria-label="Поиск по README и GitHub-документам"
          />
          {githubQuery ? <button type="button" onClick={() => { setGithubQuery(""); githubInputRef.current?.focus(); }} aria-label="Очистить поиск по GitHub">Сбросить</button> : null}
        </div>
        <div className="github-keywords" role="group" aria-label="Популярные ключевые слова">
          <span>Быстрый поиск:</span>
          {githubQuickKeywords.map((keyword) => (
            <button type="button" onClick={() => { setGithubQuery(keyword); githubInputRef.current?.focus(); }} key={keyword}>{keyword}</button>
          ))}
        </div>
        <div className="github-repository-filters" role="group" aria-label="Фильтр по репозиторию">
          <button className={githubRepository === "Все" ? "active" : ""} type="button" aria-pressed={githubRepository === "Все"} onClick={() => setGithubRepository("Все")}>Все репозитории</button>
          {githubRepositories.map(({ repository, label }) => (
            <button
              className={githubRepository === repository ? "active" : ""}
              type="button"
              aria-pressed={githubRepository === repository}
              onClick={() => setGithubRepository(repository)}
              key={repository}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="github-results-summary" aria-live="polite">
          <b>{githubQuery.trim() ? `${githubResults.length} ${githubResults.length === 1 ? "результат" : "результатов"}` : "Главные README"}</b>
          <span>{githubRepository === "Все" ? "Все репозитории" : githubRepositories.find((item) => item.repository === githubRepository)?.label}</span>
        </div>
        {githubResults.length ? (
          <div className="github-results-grid">
            {githubResults.map((doc) => (
              <a className="github-result-card" href={doc.href} target="_blank" rel="noreferrer" key={doc.id}>
                <div className="github-result-meta"><span>{doc.repositoryLabel}</span><b>{doc.kind}</b></div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <div className="github-result-path"><code>{doc.path}</code><span>GitHub ↗</span></div>
              </a>
            ))}
          </div>
        ) : <div className="empty-search">Ничего не нашли. Попробуйте одно слово или выберите другой репозиторий.</div>}
      </section>

      <section className="alphabet-block" aria-labelledby="alphabet-title">
        <div className="docs-index-heading">
          <div><span>03</span><h2 id="alphabet-title">Алфавитный указатель</h2></div>
          <p>Самостоятельный справочник: сначала ограничьте область разделом, затем выберите первую букву. Текстовый запрос не нужен.</p>
        </div>
        <div className="alphabet-filter-label"><span>01</span><b>Выберите раздел</b></div>
        <div className="alphabet-section-filters" role="group" aria-label="Фильтр алфавитного указателя по разделу">
          <button
            className={alphabetGroup === "Все" ? "active" : ""}
            type="button"
            aria-pressed={alphabetGroup === "Все"}
            onClick={() => { setAlphabetGroup("Все"); setLetter("Все"); }}
          >
            <span>Все разделы</span><b>{docs.length}</b>
          </button>
          {documentGroups.map((group) => (
            <button
              className={alphabetGroup === group ? "active" : ""}
              type="button"
              aria-pressed={alphabetGroup === group}
              onClick={() => { setAlphabetGroup(group); setLetter("Все"); }}
              key={group}
            >
              <span>{group}</span><b>{groupCounts.get(group)}</b>
            </button>
          ))}
        </div>
        <div className="alphabet-filter-label"><span>02</span><b>Выберите букву</b></div>
        <div className="alphabet-controls" role="group" aria-label="Фильтр по первой букве">
          {["Все", ...letters].map((item) => (
            <button
              className={letter === item ? "active" : ""}
              type="button"
              aria-pressed={letter === item}
              onClick={() => setLetter(item)}
              key={item}
            >
              <span>{item}</span><b>{item === "Все" ? alphabetGroupDocs.length : letterCounts.get(item)}</b>
            </button>
          ))}
        </div>
        <div className="alphabet-summary" aria-live="polite">
          <b>{alphabetGroup === "Все" ? "Все разделы" : alphabetGroup} · {letter === "Все" ? "все буквы" : `буква ${letter}`}</b>
          <span>{alphabetResults.length} из {docs.length}</span>
        </div>
        {alphabetSections.length ? (
          <div className="alphabet-letter-groups">
            {alphabetSections.map((section) => (
              <section className="alphabet-letter-group" aria-labelledby={`alphabet-letter-${section.initial}`} key={section.initial}>
                <div className="alphabet-letter-heading">
                  <span aria-hidden="true">{section.initial}</span>
                  <div><h3 id={`alphabet-letter-${section.initial}`}>Буква {section.initial}</h3><p>{section.docs.length} {section.docs.length === 1 ? "документ" : "документов"}</p></div>
                </div>
                <DocCards docs={section.docs} />
              </section>
            ))}
          </div>
        ) : <div className="empty-search">В выбранном разделе нет документов на эту букву.</div>}
      </section>
    </div>
  );
}
