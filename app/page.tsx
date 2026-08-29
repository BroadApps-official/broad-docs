import { Link } from "./plain-link";
import { docs } from "@/lib/docs";
import { ArchitectureMap } from "./architecture-map";
import { HomeSectionMap } from "./home-section-map";
import { SearchIcon } from "./search-icon";
import { ShortcutKey } from "./shortcut-key";
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
      <main className="home-main">
        <HomeSectionMap />
        <section className="hero section-wrap" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Public iOS platform</div>
            <h1>Собирайте платформу<br /><em>по модулям.</em></h1>
            <p className="hero-lede">
              Приложение подключает только нужные Swift Package products.
              Код каждого модуля можно смотреть и выпускать отдельно, а точный
              набор совместимых версий уже проверен в integration repository.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/docs/getting-started">Начать подключение <span>↗</span></Link>
              <Link className="secondary-action" href="#architecture">Понять схему</Link>
              <Link className="secondary-action" href="/docs/legacy-app-migration">Мигрировать старое app</Link>
            </div>
            <Link className="hero-access" href="/docs/public-package-access"><span className="status-dot green" /><b>PUBLIC HTTPS</b> Без GitHub account, password, token и API key <i>↗</i></Link>
          </div>

          <div className="hero-system module-selector" aria-label="Как выбрать модуль BroadApps">
            <div className="system-label"><span>КАКОЙ МОДУЛЬ ПОДКЛЮЧАТЬ</span><em>iOS 17+</em></div>
            <div className="selector-question">
              <span>1</span>
              <div><b>Что нужно вашему приложению?</b><small>Выберите строку — справа написано, какой один модуль добавить в Xcode.</small></div>
            </div>
            <div className="selector-routes">
              <Link className="selector-route selector-flows" href="/docs/broad-ui-flows">
                <span className="selector-route-number">01</span>
                <div className="selector-route-copy"><b>Готовые экраны и flow</b><small>onboarding · paywall · app routing</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadUIFlows</strong><small>Monetization, Core и Adapty придут автоматически</small></div>
              </Link>
              <Link className="selector-route selector-money" href="/docs/broad-monetization">
                <span className="selector-route-number">02</span>
                <div className="selector-route-copy"><b>Оплата со своим UI</b><small>purchase · entitlement · restore</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadMonetization</strong><small>Core и Adapty придут автоматически</small></div>
              </Link>
              <Link className="selector-route selector-core" href="/docs/broad-core">
                <span className="selector-route-number">03</span>
                <div className="selector-route-copy"><b>Запуск и инфраструктура</b><small>bootstrap · cache · logs · retry</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadCore</strong><small>без Monetization и готовых экранов</small></div>
              </Link>
              <Link className="selector-route selector-extensions" href="/docs/broad-extensions">
                <span className="selector-route-number">04</span>
                <div className="selector-route-copy"><b>Только Swift-утилиты</b><small>colors · keyboard · navigation</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadExtensions</strong><small>самостоятельный модуль без SDK-зависимостей</small></div>
              </Link>
            </div>
            <div className="selector-note"><span className="pulse" /><b>Версии уже проверены вместе.</b><Link href="/docs/compatibility">Открыть каталог совместимости →</Link></div>
          </div>
        </section>

        <section className="architecture-section section-wrap" id="architecture">
          <div className="section-heading">
            <div><span className="section-index">01</span><h2>Как всё связано</h2></div>
            <p>Одна схема показывает, что попадает в приложение, что приходит как зависимость и что остаётся только инструментом команды.</p>
          </div>
          <ArchitectureMap showLink />
          <div className="benefit-grid" aria-label="Преимущества модульной архитектуры">
            <article><span>01</span><b>Меньше лишнего</b><p>App не получает UI и SDK, которые ему не нужны.</p></article>
            <article><span>02</span><b>Review проще</b><p>Изменение одного модуля видно в небольшом отдельном repository.</p></article>
            <article><span>03</span><b>Release точнее</b><p>Совместимое исправление можно выпустить из repository-владельца, затем повторить зависимые проверки.</p></article>
            <article><span>04</span><b>Версии не угадывают</b><p>Integration хранит точные tags, которые уже собирались и проверялись вместе.</p></article>
            <article><span>05</span><b>Ответы находятся</b><p>Сайт ищет общие инструкции, а README и DocC остаются рядом с кодом модуля.</p></article>
            <article><span>06</span><b>Старое app не переписывают</b><p>Миграция идёт по одной границе и одному рабочему сценарию за раз.</p></article>
          </div>
        </section>

        <section className="knowledge-section section-wrap" id="documentation">
          <div className="knowledge-copy">
            <span className="section-index">02</span>
            <h2>Где искать<br /><em>нужный ответ.</em></h2>
            <p>Начните с сайта, если вопрос касается нескольких модулей, установки, совместимости или миграции. Для API одного модуля переходите в его README или DocC.</p>
            <div className="knowledge-points">
              <div><span>1</span><p><b>Сайт</b><small>как части работают вместе и какой модуль выбрать</small></p></div>
              <div><span>2</span><p><b>README / DocC</b><small>как использовать API конкретной версии модуля</small></p></div>
              <div><span>3</span><p><b>Edit this page</b><small>любую общую инструкцию можно исправить публичным pull request</small></p></div>
            </div>
            <div className="hero-actions">
              <Link className="primary-action" href="/search">Открыть поиск <SearchIcon /></Link>
              <Link className="secondary-action" href="/docs/documentation">Что читать и где?</Link>
            </div>
          </div>
          <div className="knowledge-panel">
            <div className="fake-search"><SearchIcon /><b>special offer</b><ShortcutKey /></div>
            <div className="search-result active"><span>FLOW</span><div><b>Special Offer</b><small>placement · все продукты · таймер 24 часа</small></div><i>↗</i></div>
            <div className="search-result"><span>ADR</span><div><b>Module repositories</b><small>ownership · SemVer · compatibility</small></div><i>↗</i></div>
            <div className="search-result"><span>GUIDE</span><div><b>Getting Started</b><small>SwiftPM · host app · product selection</small></div><i>↗</i></div>
            <div className="search-meta"><span>{docs.length} страниц в поиске</span><span>публично · правится через PR</span></div>
          </div>
        </section>

        <section className="module-section section-wrap" id="modules">
          <div className="section-heading">
            <div><span className="section-index">03</span><h2>Четыре модуля</h2></div>
            <p>У каждого своя задача, repository и версия. Вы подключаете только то, что использует приложение.</p>
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

        <section className="decision-section section-wrap" id="selection">
          <div className="section-heading">
            <div><span className="section-index">04</span><h2>Как выбрать модуль</h2></div>
            <p>Начните с задачи приложения. Подключать всю платформу или специальный umbrella package не требуется.</p>
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

        <section className="migration-home section-wrap" id="migration">
          <div className="section-heading">
            <div><span className="section-index">05</span><h2>Как перейти со старой платформы</h2></div>
            <p>Не создаём второе app и не переписываем всё сразу: меняем одну границу, проверяем один рабочий сценарий и сохраняем путь назад.</p>
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

        <section className="release-strip" id="compatibility">
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
