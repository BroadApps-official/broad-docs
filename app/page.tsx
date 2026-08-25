import Link from "next/link";
import { docs } from "@/lib/docs";
import { SiteFooter, SiteHeader } from "./site-shell";

const modules = [
  {
    name: "BroadCore",
    code: "CORE",
    tone: "core",
    summary: "Bootstrap, cache, logging, retry и системные boundaries.",
    repository: "broad-core-ios",
    href: "/docs/broad-core",
  },
  {
    name: "BroadMonetization",
    code: "MONEY",
    tone: "money",
    summary: "Adapty, StoreKit, entitlement, RU Billing и analytics без UI-привязки.",
    repository: "broad-monetization-ios",
    href: "/docs/broad-monetization",
  },
  {
    name: "BroadUIFlows",
    code: "FLOWS",
    tone: "flows",
    summary: "Готовые SwiftUI-flow: onboarding, AppFlow, paywall и payment sheets.",
    repository: "broad-ui-flows-ios",
    href: "/docs/broad-ui-flows",
  },
  {
    name: "BroadExtensions",
    code: "EXT",
    tone: "extensions",
    summary: "Независимые utility-расширения без остальной платформы.",
    repository: "broad-extensions-ios",
    href: "/docs/broad-extensions",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Public iOS platform</div>
            <h1>Собирайте платформу<br /><em>по модулям.</em></h1>
            <p className="hero-lede">
              Host app подключает ровно те Swift Package products, которые ему
              нужны. Без обязательного umbrella, с отдельными границами для
              review, release и проверки совместимости.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/docs/getting-started">Начать подключение <span>↗</span></Link>
              <Link className="secondary-action" href="/docs/module-selection">Выбрать модуль</Link>
              <Link className="secondary-action" href="/docs/legacy-app-migration">Мигрировать старое app</Link>
            </div>
          </div>

          <div className="hero-system" aria-label="Схема подключения модулей">
            <div className="system-label">MODULE GRAPH <span>iOS 17+</span></div>
            <div className="graph-row">
              <div className="graph-node node-ext"><b>EXT</b><small>standalone</small></div>
              <div className="graph-line dashed" />
              <div className="graph-host" aria-hidden="true"><span /><b>HOST APP</b><small>selects products</small></div>
            </div>
            <div className="graph-stack">
              <div className="graph-node node-flow"><b>UI FLOWS</b><small>SwiftUI</small></div>
              <div className="graph-arrow">↓</div>
              <div className="graph-node node-money"><b>MONETIZATION</b><small>Adapty · StoreKit</small></div>
              <div className="graph-arrow">↓</div>
              <div className="graph-node node-core"><b>CORE</b><small>foundation</small></div>
            </div>
            <div className="graph-note"><span className="pulse" /> known-good versions живут в integration catalog</div>
          </div>
        </section>

        <section className="module-section section-wrap" id="modules">
          <div className="section-heading">
            <div><span className="section-index">01</span><h2>Четыре module product</h2></div>
            <p>Каждый repository можно открыть и выпустить отдельно; зависимости между слоями остаются явными.</p>
          </div>
          <div className="module-grid">
            {modules.map((module, index) => (
              <Link className={`module-card ${module.tone}`} href={module.href} key={module.name}>
                <div className="module-card-top"><span className="module-code">{module.code}</span><span className="module-number">0{index + 1}</span></div>
                <h3>{module.name}</h3>
                <p>{module.summary}</p>
                <div className="module-repo"><span className="repo-dot" />{module.repository}<b>↗</b></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="decision-section section-wrap">
          <div className="section-heading">
            <div><span className="section-index">02</span><h2>Подключайте только нужное</h2></div>
            <p>Выбор идёт от product-задачи, а не от требования тянуть всю платформу.</p>
          </div>
          <div className="decision-grid">
            <div className="decision-question"><span>IF</span><h3>Что нужно<br />вашему app?</h3><Link href="/docs/module-selection">Полная матрица →</Link></div>
            <div className="decision-options">
              <div><b>Общие utility</b><span>→</span><strong>Extensions</strong></div>
              <div><b>Bootstrap, cache, logs</b><span>→</span><strong>Core</strong></div>
              <div><b>Свой UI для оплаты</b><span>→</span><strong>Monetization</strong></div>
              <div><b>Готовые app flow</b><span>→</span><strong>UIFlows</strong></div>
            </div>
          </div>
        </section>

        <section className="ownership-section section-wrap">
          <div className="section-heading">
            <div><span className="section-index">03</span><h2>У каждой части один владелец</h2></div>
            <p>Repository separation работает только тогда, когда понятно, где менять код, где доказывать совместимость и где хранить решения приложения.</p>
          </div>
          <div className="ownership-board">
            <div className="ownership-path" aria-label="Путь изменения от модуля до приложения">
              <article className="ownership-card owner-module"><span>01 · MODULE REPO</span><b>Код и SemVer tag</b><p>Public API, implementation, README, DocC и module gate.</p><small>review boundary</small></article>
              <div className="ownership-arrow" aria-hidden="true">→</div>
              <article className="ownership-card owner-integration"><span>02 · INTEGRATION</span><b>Exact known-good set</b><p>Host example, resolved pins и полный cross-module gate.</p><small>compatibility evidence</small></article>
              <div className="ownership-arrow" aria-hidden="true">→</div>
              <article className="ownership-card owner-docs"><span>03 · DOCS</span><b>Общее объяснение</b><p>Выбор модуля, migration, compatibility и поиск по guides.</p><small>discovery layer</small></article>
              <div className="ownership-arrow" aria-hidden="true">→</div>
              <article className="ownership-card owner-host"><span>04 · HOST APP</span><b>Product decisions</b><p>Keys, URLs, placements, backend adapters, strings и assets.</p><small>app ownership</small></article>
            </div>
            <div className="ownership-note">
              <div><span className="status-dot green" /><b>Что действительно независимо</b><p>Repository, changelog и SemVer release одного модуля.</p></div>
              <div><span className="status-dot amber" /><b>Что всё равно связано</b><p>Breaking contract требует повторных gates и может потребовать releases consumers.</p></div>
            </div>
          </div>
        </section>

        <section className="migration-home section-wrap">
          <div className="section-heading">
            <div><span className="section-index">04</span><h2>Старое app мигрирует с rollback</h2></div>
            <p>Не создаём второй target и не переписываем всё сразу: один owner, один slice, одна точка review.</p>
          </div>
          <div className="migration-home-grid">
            <div className="migration-home-flow" aria-label="Четыре шага миграции">
              <div><span>01</span><b>Baseline</b><small>сборка + inventory</small></div>
              <i>→</i>
              <div><span>02</span><b>Boundary</b><small>atomic package switch</small></div>
              <i>→</i>
              <div><span>03</span><b>Slice</b><small>один рабочий flow</small></div>
              <i>→</i>
              <div><span>04</span><b>Cleanup</b><small>usages + review</small></div>
            </div>
            <div className="migration-home-routes">
              <Link href="/docs/legacy-app-migration#выберите-подход"><span>MANUAL</span><b>Мигрировать вручную</b><small>Для разработчика, который сам ведёт package graph и проверяет flows.</small><i>↗</i></Link>
              <Link href="/docs/legacy-app-migration#что-делает-ии"><span>AI ROUTE</span><b>Передать Codex / Claude</b><small>Audit, plan и один stage за раз с обязательной остановкой на review.</small><i>↗</i></Link>
            </div>
          </div>
        </section>

        <section className="knowledge-section section-wrap">
          <div className="knowledge-copy">
            <span className="section-index">05</span>
            <h2>Документация,<br />которую можно <em>найти.</em></h2>
            <p>Сайт ищет по cross-module guides из public docs repository. README и DocC конкретного tag остаются рядом с кодом и открываются через ссылки на owner module.</p>
            <div className="hero-actions">
              <Link className="primary-action" href="/search">Искать по guides <span>⌕</span></Link>
              <Link className="secondary-action" href="/docs/documentation">README или сайт?</Link>
            </div>
          </div>
          <div className="knowledge-panel">
            <div className="fake-search"><span>⌕</span><b>special offer</b><kbd>⌘ K</kbd></div>
            <div className="search-result active"><span>FLOW</span><div><b>Special Offer</b><small>authorization · placement · provider payload</small></div><i>↗</i></div>
            <div className="search-result"><span>ADR</span><div><b>Module repositories</b><small>ownership · SemVer · compatibility</small></div><i>↗</i></div>
            <div className="search-result"><span>GUIDE</span><div><b>Getting Started</b><small>SwiftPM · host app · product selection</small></div><i>↗</i></div>
            <div className="search-meta"><span>{docs.length} pages indexed</span><span>public · editable by PR</span></div>
          </div>
        </section>

        <section className="release-strip">
          <div className="section-wrap release-inner">
            <div><span className="live-dot" /><small>CURRENT CATALOG</small><b>Platform set 1.0.0</b></div>
            <div><small>PLATFORM</small><b>iOS 17+</b></div>
            <div><small>LANGUAGE</small><b>Swift 5 mode</b></div>
            <div><small>POLICY</small><b>No test targets</b></div>
            <Link href="/docs/compatibility">Compatibility ↗</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
