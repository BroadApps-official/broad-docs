"use client";

import { useMemo, useRef, useState } from "react";
import { Link } from "@/app/plain-link";
import { SearchIcon } from "@/app/search-icon";
import type { GitHubDocument } from "@/lib/github-docs.generated";

type DocsIndexEntry = {
  slug: string;
  title: string;
  description: string;
  purpose: string;
  when: string;
  outcome: string;
  group: string;
  body: string;
};

const useCases = [
  { code: "СТАРТ", title: "Подключить платформу впервые", detail: "Выбрать одну библиотеку, добавить её в Xcode и проверить сборку.", slug: "getting-started" },
  { code: "НОВОЕ APP", title: "Создать новое приложение", detail: "Пройти путь от требований и плана до одного рабочего сценария.", slug: "app-creation" },
  { code: "ВЫБОР", title: "Понять, какую библиотеку добавить", detail: "Сопоставить функцию приложения с одним точным продуктом Swift Package.", slug: "module-selection" },
  { code: "ДОСТУП", title: "Xcode просит пароль GitHub", detail: "Заменить неверный адрес и скачать публичную библиотеку без токена.", slug: "public-package-access" },
  { code: "ПЕРЕЕЗД", title: "Перейти со старого BroadCore", detail: "Менять подключение небольшими шагами, не переписывая приложение.", slug: "legacy-app-migration" },
  { code: "UI", title: "Добавить готовые экраны", detail: "Подключить onboarding, paywall и переходы через BroadUIFlows.", slug: "broad-ui-flows" },
  { code: "ADAPTY", title: "Настроить ключ и placement", detail: "Передать два значения и сохранить все продукты из ответа Adapty.", slug: "adapty-setup" },
  { code: "PAYWALL", title: "Сделать экран подписки", detail: "Показать 0, 1 или много продуктов, загрузку, ошибку и restore.", slug: "paywall-ui" },
  { code: "OFFER", title: "Показать второе предложение", detail: "Открыть Special Offer после закрытия первого paywall без покупки.", slug: "special-offer" },
  { code: "TOKENS", title: "Продавать пакеты токенов", detail: "Показать все пакеты и обновить баланс после ответа сервера.", slug: "token-paywall" },
  { code: "RU PAY", title: "Подключить оплату картой и СБП", detail: "Проверить условия показа и подтверждать Premium через сервер.", slug: "ru-billing" },
  { code: "ONBOARDING", title: "Настроить первые экраны и ATT", detail: "Задать любое число страниц и вовремя показать запрос Apple.", slug: "onboarding-att" },
  { code: "ОШИБКИ", title: "Разобраться с загрузкой и повторами", detail: "Обработать медленную сеть, offline, timeout и двойное нажатие.", slug: "runtime-reliability" },
  { code: "SUPPORT", title: "Добавить чат Usedesk", detail: "Получить токен, открыть чат по нажатию и учесть смену аккаунта.", slug: "usedesk" },
  { code: "ВЕРСИИ", title: "Выбрать совместимые версии", detail: "Взять точный набор тегов, который уже проверялся вместе.", slug: "compatibility" },
  { code: "RELEASE", title: "Выпустить новую версию", detail: "Проверить модуль, поставить тег и обновить общий каталог.", slug: "release-process" },
] as const;

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

const siteKeywordGroups = [
  ["подключить", "подключение", "добавить", "добавление", "установить", "настроить", "настройка"],
  ["оплата", "оплату", "оплаты", "покупка", "покупку", "purchase", "paywall", "подписка", "premium"],
  ["перенести", "перенос", "переход", "миграция", "migration", "legacy", "переезд"],
  ["ошибка", "ошибку", "ошибки", "error", "retry", "timeout", "offline", "повтор"],
  ["токен", "токены", "токенов", "token", "tokens", "balance", "consumable"],
  ["экран", "экраны", "экранов", "ui", "swiftui", "flow", "flows"],
  ["версия", "версии", "версий", "version", "semver", "tag", "совместимость"],
  ["пароль", "password", "доступ", "access", "авторизация", "github"],
].map((group) => group.map(normalize));

function siteTermVariants(term: string) {
  return siteKeywordGroups.find((group) => group.includes(term)) ?? [term];
}

function siteIntentBoost(slug: string, phrase: string) {
  const intents = [
    { fragments: ["оплат", "покуп", "paywall", "premium", "подпис"], slugs: ["broad-monetization", "paywall-ui", "adapty-setup", "special-offer", "ru-billing"] },
    { fragments: ["перен", "мигра", "legacy", "broadcore"], slugs: ["legacy-app-migration", "legacy-broadcore", "migration"] },
    { fragments: ["ошиб", "retry", "timeout", "offline", "запуск"], slugs: ["runtime-reliability", "broad-core", "getting-started"] },
    { fragments: ["токен", "token", "balance"], slugs: ["token-paywall", "broad-monetization", "adapty-setup"] },
    { fragments: ["экран", "ui", "swiftui"], slugs: ["broad-ui-flows", "paywall-ui", "onboarding-att"] },
    { fragments: ["верси", "semver", "tag", "совмест"], slugs: ["compatibility", "release-process", "migration"] },
    { fragments: ["парол", "доступ", "github"], slugs: ["public-package-access", "getting-started", "documentation"] },
  ];

  let boost = 0;
  for (const intent of intents) {
    if (!intent.fragments.some((fragment) => phrase.includes(fragment))) continue;
    const index = intent.slugs.indexOf(slug);
    if (index >= 0) boost = Math.max(boost, 90 - index * 12);
  }
  return boost;
}

function searchDocs(docs: DocsIndexEntry[], query: string) {
  const phrase = normalize(query);
  if (!phrase) return [];
  const terms = phrase.split(/\s+/).filter(Boolean);

  return docs
    .map((doc) => {
      const title = normalize(doc.title);
      const description = normalize(`${doc.description} ${doc.purpose} ${doc.when} ${doc.outcome}`);
      const searchable = normalize(`${doc.slug} ${doc.group} ${doc.title} ${doc.description} ${doc.purpose} ${doc.when} ${doc.outcome} ${doc.body}`);
      if (!terms.every((term) => siteTermVariants(term).some((variant) => searchable.includes(variant)))) return null;

      const score =
        siteIntentBoost(doc.slug, phrase) +
        (title === phrase ? 100 : 0) +
        (title.includes(phrase) ? 40 : 0) +
        (description.includes(phrase) ? 20 : 0) +
        terms.reduce((sum, term) => {
          const variants = siteTermVariants(term);
          return sum +
            (variants.some((variant) => title.includes(variant)) ? 14 : 0) +
            (variants.some((variant) => description.includes(variant)) ? 8 : 0);
        }, 0);
      return { doc, score };
    })
    .filter((entry): entry is { doc: DocsIndexEntry; score: number } => entry !== null)
    .sort((left, right) => right.score - left.score || collator.compare(left.doc.title, right.doc.title))
    .map(({ doc }) => doc);
}

function countLabel(count: number, one: string, few: string, many: string) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} ${many}`;
  if (last === 1) return `${count} ${one}`;
  if (last >= 2 && last <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
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
            <small><b>Результат:</b> {doc.outcome}</small>
          </div>
          <span className="docs-index-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}

export function DocsIndexClient({ docs, githubDocs }: { docs: DocsIndexEntry[]; githubDocs: GitHubDocument[] }) {
  const [searchMode, setSearchMode] = useState<"site" | "github">("site");
  const [query, setQuery] = useState("");
  const [githubQuery, setGithubQuery] = useState("");
  const [githubRepository, setGithubRepository] = useState("Все");
  const githubInputRef = useRef<HTMLInputElement>(null);
  const documentGroups = useMemo(() => Array.from(new Set(docs.map((doc) => doc.group))), [docs]);
  const groupedDocs = useMemo(
    () => documentGroups.map((group) => ({ group, docs: docs.filter((doc) => doc.group === group) })),
    [docs, documentGroups],
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
  return (
    <div className="docs-index-content section-wrap">
      <section className="docs-workbench" aria-labelledby="docs-workbench-title">
        <div className="docs-workbench-head">
          <div>
            <span className="section-index">ДОКУМЕНТАЦИЯ BROADAPPS IOS</span>
            <h1 id="docs-workbench-title">Что вы хотите сделать?</h1>
            <p>Выберите готовый сценарий или напишите задачу своими словами. Для точного API и внутреннего термина переключитесь на поиск по GitHub.</p>
          </div>
          <Link className="legacy-repo-notice" href="/docs/legacy-broadcore">
            <span>LEGACY</span>
            <b>Попали в старый BroadCore?</b>
            <small>Покажем, куда переехал код →</small>
          </Link>
        </div>

        <div className="docs-search-modes" role="tablist" aria-label="Где искать">
          <button className={searchMode === "site" ? "active" : ""} type="button" role="tab" aria-selected={searchMode === "site"} onClick={() => setSearchMode("site")}>
            <span>ПО ЗАДАЧЕ</span><b>Инструкции сайта</b><small>{countLabel(docs.length, "статья", "статьи", "статей")}</small>
          </button>
          <button className={searchMode === "github" ? "active" : ""} type="button" role="tab" aria-selected={searchMode === "github"} onClick={() => setSearchMode("github")}>
            <span>ПО ТОЧНОМУ ТЕРМИНУ</span><b>GitHub, README и API</b><small>{countLabel(githubDocs.length, "файл", "файла", "файлов")}</small>
          </button>
        </div>

        {searchMode === "site" ? (
          <div className="docs-search-panel" role="tabpanel">
            <div className="docs-search-box docs-primary-search">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Например: подключить оплату, перенести BroadCore, исправить ошибку…"
                aria-label="Поиск по инструкциям сайта"
              />
              {query ? <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск">Сбросить</button> : null}
            </div>
            {query.trim() ? (
              <div className="docs-search-output" aria-live="polite">
                <div className="search-count">{countLabel(searchResults.length, "результат", "результата", "результатов")}</div>
                {searchResults.length ? <DocCards docs={searchResults} /> : <div className="empty-search">Ничего не нашли. Напишите действие проще: «оплата», «перенос» или «ошибка запуска».</div>}
              </div>
            ) : (
              <div className="docs-use-cases">
                <div className="docs-use-cases-head"><b>Частые задачи</b><span>{useCases.length} готовых маршрутов</span></div>
                <div className="docs-use-case-grid">
                  {useCases.map((useCase) => (
                    <Link href={`/docs/${useCase.slug}`} key={useCase.slug}>
                      <span>{useCase.code}</span>
                      <div><b>{useCase.title}</b><small>{useCase.detail}</small></div>
                      <i aria-hidden="true">→</i>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="docs-search-panel github-search-panel" role="tabpanel">
            <div className="docs-search-box docs-primary-search">
              <SearchIcon />
              <input
                ref={githubInputRef}
                value={githubQuery}
                onChange={(event) => setGithubQuery(event.target.value)}
                placeholder="Например: ru_pay, PaywallViewModel, ATT, Keychain, SemVer…"
                aria-label="Поиск по README и GitHub-документам"
              />
              {githubQuery ? <button type="button" onClick={() => { setGithubQuery(""); githubInputRef.current?.focus(); }} aria-label="Очистить поиск по GitHub">Сбросить</button> : null}
            </div>
            <div className="github-index-stats" aria-label="Объём поискового индекса">
              <span><b>{githubRepositories.length}</b> репозиториев</span>
              <span><b>{githubDocs.length}</b> документов</span>
              <span><b>README + DOCS</b> публичный снимок</span>
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
                <button className={githubRepository === repository ? "active" : ""} type="button" aria-pressed={githubRepository === repository} onClick={() => setGithubRepository(repository)} key={repository}>{label}</button>
              ))}
            </div>
            <div className="github-results-summary" aria-live="polite">
              <b>{githubQuery.trim() ? countLabel(githubResults.length, "результат", "результата", "результатов") : "Главные README"}</b>
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
            ) : <div className="empty-search">Ничего не нашли. Попробуйте одно точное слово или выберите другой репозиторий.</div>}
          </div>
        )}
      </section>

      <section className="docs-directory-block" aria-labelledby="directory-title">
        <div className="docs-index-heading">
          <div><span>02</span><h2 id="directory-title">Все инструкции по разделам</h2></div>
          <p>{countLabel(docs.length, "статья", "статьи", "статей")} остаются перед глазами: название объясняет задачу, подпись — что находится внутри.</p>
        </div>
        <div className="docs-directory-columns">
          {groupedDocs.map(({ group, docs: groupDocs }) => (
            <section className="docs-directory-group" aria-labelledby={`directory-${group}`} key={group}>
              <div className="docs-directory-group-head"><h3 id={`directory-${group}`}>{group}</h3><span>{groupDocs.length}</span></div>
              <nav aria-label={`Раздел ${group}`}>
                {groupDocs.map((doc) => (
                  <Link href={`/docs/${doc.slug}`} key={doc.slug}>
                    <span>{doc.title}</span><small>{doc.description}</small><b aria-hidden="true">→</b>
                  </Link>
                ))}
              </nav>
            </section>
          ))}
        </div>
      </section>

    </div>
  );
}
