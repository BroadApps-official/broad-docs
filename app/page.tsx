import { Link } from "./plain-link";
import { docs } from "@/lib/docs";
import { ArchitectureMap } from "./architecture-map";
import { HomeSectionMap } from "./home-section-map";
import { SearchClient } from "./search/search-client";
import { SiteFooter, SiteHeader } from "./site-shell";

const modules = [
  {
    name: "BroadCore",
    code: "CORE",
    tone: "core",
    summary: "Последовательность запуска, кеш, безопасные логи и повтор запросов.",
    repository: "broad-core-ios",
    href: "/docs/broad-core",
  },
  {
    name: "BroadMonetization",
    code: "MONEY",
    tone: "money",
    summary: "Загрузка вариантов покупки, оплата, восстановление и подтверждение Premium без готового экрана.",
    repository: "broad-monetization-ios",
    href: "/docs/broad-monetization",
  },
  {
    name: "BroadUIFlows",
    code: "FLOWS",
    tone: "flows",
    summary: "Готовые первые экраны, подписка, выбор оплаты и переходы.",
    repository: "broad-ui-flows-ios",
    href: "/docs/broad-ui-flows",
  },
  {
    name: "BroadExtensions",
    code: "EXT",
    tone: "extensions",
    summary: "Независимые Swift-утилиты для цвета, клавиатуры и навигации.",
    repository: "broad-extensions-ios",
    href: "/docs/broad-extensions",
  },
];

const repositoryGroups = [
  {
    label: "ПОДКЛЮЧАЮТСЯ В XCODE",
    title: "Код общих возможностей",
    description: "Четыре Swift Package. Каждый владеет своим кодом, API и версиями.",
    tone: "packages",
    repositories: [
      {
        name: "broad-core-ios",
        product: "BroadCore",
        summary: "Запуск, кеш, состояния, retry, timeout и безопасные логи.",
        href: "https://github.com/BroadApps-official/broad-core-ios",
      },
      {
        name: "broad-monetization-ios",
        product: "BroadMonetization",
        summary: "Продукты, purchase, restore и подтверждение Premium; внешний вид экрана не задаёт.",
        href: "https://github.com/BroadApps-official/broad-monetization-ios",
      },
      {
        name: "broad-ui-flows-ios",
        product: "BroadUIFlows",
        summary: "Готовые SwiftUI-экраны: onboarding, paywall, loader, Special Offer и переходы.",
        href: "https://github.com/BroadApps-official/broad-ui-flows-ios",
      },
      {
        name: "broad-extensions-ios",
        product: "BroadExtensions",
        summary: "Независимые Swift-утилиты: HEX-цвета, шрифты, клавиатура и swipe-back.",
        href: "https://github.com/BroadApps-official/broad-extensions-ios",
      },
    ],
  },
  {
    label: "НЕ ПОДКЛЮЧАЮТСЯ В APP TARGET",
    title: "Проверка и документация",
    description: "Эти репозитории нужны команде, но не становятся зависимостью приложения.",
    tone: "tooling",
    repositories: [
      {
        name: "broad-platform-integration",
        product: "локальная папка: BroadAppsIOSPlatform",
        summary: "Фиксирует точные совместимые версии, собирает общий example и запускает cross-module checks.",
        href: "https://github.com/BroadApps-official/broad-platform-integration",
      },
      {
        name: "broad-docs",
        product: "сайт, который вы сейчас читаете",
        summary: "Общая архитектура, подключение, миграция, поиск и ссылки на точный API каждого модуля.",
        href: "https://github.com/BroadApps-official/broad-docs",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="home-main">
        <HomeSectionMap />
        <section className="home-quick-routes home-platform-intro section-wrap" aria-labelledby="platform-intro-title">
          <div className="home-quick-routes-head">
            <div>
              <span>ПЛАТФОРМА ЗА 30 СЕКУНД</span>
              <h2 id="platform-intro-title">Готовая основа<br />для iOS-приложений<br /><em>компании.</em></h2>
              <p>BroadApps iOS — четыре открытые библиотеки с готовым общим кодом, который не нужно заново писать в каждом приложении.</p>
            </div>
            <Link href="/docs/getting-started"><i className="status-dot green" />Я здесь впервые <b>→</b></Link>
          </div>
          <div className="home-quick-routes-grid">
            <Link className="intro-module-core" href="/docs/broad-core">
              <span>CORE</span>
              <div><b>Запуск и основа</b><small>порядок старта · кеш · логи · повтор запросов</small></div>
              <i>→</i>
            </Link>
            <Link className="intro-module-money" href="/docs/broad-monetization">
              <span>PAY</span>
              <div><b>Оплата и подписка</b><small>Adapty · продукты · покупка · восстановление</small></div>
              <i>→</i>
            </Link>
            <Link className="intro-module-flows" href="/docs/broad-ui-flows">
              <span>UI</span>
              <div><b>Готовые экраны</b><small>первые страницы · подписка · переходы</small></div>
              <i>→</i>
            </Link>
            <Link className="intro-module-extensions" href="/docs/broad-extensions">
              <span>EXT</span>
              <div><b>Swift-утилиты</b><small>цвета · клавиатура · навигация</small></div>
              <i>→</i>
            </Link>
          </div>
          <div className="home-platform-reason">
            <b>Почему четыре библиотеки?</b>
            <p>Чтобы приложение брало только нужные возможности. Иногда достаточно одной библиотеки, иногда нужны несколько; общие зависимости Xcode загрузит автоматически.</p>
            <Link href="/docs/module-selection">Показать, что выбрать →</Link>
          </div>
        </section>
        <section className="hero section-wrap" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Следующий шаг · выберите сценарий</div>
            <h1>Выберите функции —<br />подключите нужные<br /><em>библиотеки.</em></h1>
            <p className="hero-lede">
              Сверьте справа все задачи приложения. Для одной возможности может
              хватить одной библиотеки; для нескольких добавьте соответствующие
              products. Общие зависимости Xcode загрузит сам, а ключи, placements,
              тексты и изображения останутся в вашем приложении.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/docs/getting-started">Пошаговое подключение <span>↗</span></Link>
              <Link className="secondary-action" href="/docs/module-selection">Сравнить библиотеки</Link>
              <Link className="secondary-action" href="/docs/legacy-app-migration">Перенести старое приложение</Link>
            </div>
            <Link className="hero-access" href="/docs/public-package-access"><span className="status-dot green" /><b>ПУБЛИЧНЫЙ HTTPS</b> Без аккаунта GitHub, пароля, токена и API key <i>↗</i></Link>
          </div>

          <div className="hero-system module-selector" aria-label="Как выбрать нужные библиотеки BroadApps">
            <div className="system-label"><span>КАКУЮ БИБЛИОТЕКУ ДОБАВИТЬ</span><em>iOS 17+</em></div>
            <div className="selector-question">
              <span>1</span>
              <div><b>Какие возможности нужны приложению?</b><small>Выберите одну или несколько строк. Справа указан product для каждой возможности.</small></div>
            </div>
            <div className="selector-routes">
              <Link className="selector-route selector-flows" href="/docs/broad-ui-flows">
                <span className="selector-route-number">01</span>
                <div className="selector-route-copy"><b>Готовые экраны и переходы</b><small>первые страницы · подписка · переходы</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadUIFlows</strong><small>Monetization, Core и Adapty придут автоматически</small></div>
              </Link>
              <Link className="selector-route selector-money" href="/docs/broad-monetization">
                <span className="selector-route-number">02</span>
                <div className="selector-route-copy"><b>Оплата со своим экраном</b><small>покупка · Premium · восстановление</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadMonetization</strong><small>Core и Adapty придут автоматически</small></div>
              </Link>
              <Link className="selector-route selector-core" href="/docs/broad-core">
                <span className="selector-route-number">03</span>
                <div className="selector-route-copy"><b>Запуск и ошибки</b><small>порядок старта · кеш · логи · повтор</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadCore</strong><small>без Monetization и готовых экранов</small></div>
              </Link>
              <Link className="selector-route selector-extensions" href="/docs/broad-extensions">
                <span className="selector-route-number">04</span>
                <div className="selector-route-copy"><b>Только Swift-утилиты</b><small>цвета · клавиатура · навигация</small></div>
                <div className="selector-result"><span>ПОДКЛЮЧИТЬ</span><strong>BroadExtensions</strong><small>самостоятельная библиотека без остальных частей платформы</small></div>
              </Link>
            </div>
            <div className="selector-note"><span className="pulse" /><b>Эти версии уже собирались вместе.</b><Link href="/docs/compatibility">Посмотреть точные номера →</Link></div>
          </div>
        </section>

        <section className="architecture-section section-wrap" id="architecture">
          <div className="section-heading">
            <div><span className="section-index">01</span><h2>Что добавить в приложение</h2></div>
            <p>BroadApps iOS — четыре Swift-библиотеки с готовым общим кодом. Отметьте все задачи: схема покажет нужные products, автоматические зависимости и то, что настраивает само приложение.</p>
          </div>
          <ArchitectureMap showLink />
          <div className="benefit-grid" aria-label="Что это даёт разработчику на практике">
            <article><span>01</span><b>Один выбор в Xcode</b><p>Вы добавляете product верхнего уровня. Его обязательные зависимости Xcode скачивает сам.</p></article>
            <article><span>02</span><b>Только нужный код</b><p>Например, BroadExtensions не приводит в приложение Adapty, оплату или готовый paywall.</p></article>
            <article><span>03</span><b>Настройки остаются у app</b><p>Ключи, placements, тексты, изображения и правила показа не зашиваются в общую библиотеку.</p></article>
            <article><span>04</span><b>Версии уже проверены</b><p>Каталог совместимости хранит точный набор версий, который команда уже собирала вместе.</p></article>
            <article><span>05</span><b>Понятно, где искать ответ</b><p>Сайт объясняет сценарий, а README и DocC конкретной библиотеки описывают её точный API.</p></article>
            <article><span>06</span><b>Понятно, где исправлять</b><p>Общий баг исправляется в библиотеке; уникальный экран, текст или правило — в самом приложении.</p></article>
          </div>
        </section>

        <section className="knowledge-section knowledge-search-section section-wrap" id="documentation">
          <div className="knowledge-search-head">
            <span className="section-index">02</span>
            <div>
              <small>ПОИСК РАБОТАЕТ ПРЯМО НА ГЛАВНОЙ</small>
              <h2>Что вы хотите сделать?</h2>
              <p>Опишите задачу обычными словами — например, «нужен готовый paywall» или «переношу старый BroadCore». Результаты появятся сразу; название библиотеки знать не нужно.</p>
            </div>
            <div className="knowledge-search-help"><b>Что будет в результате?</b><span>Зачем нужна страница</span><span>Что сделать по шагам</span><span>Где сверить исходник в GitHub</span></div>
          </div>
          <SearchClient docs={docs.map(({ slug, title, description, group, body }) => ({ slug, title, description, group, body }))} variant="home" />
        </section>

        <section className="module-section section-wrap" id="modules">
          <div className="section-heading">
            <div><span className="section-index">03</span><h2>Четыре части платформы</h2></div>
            <p>У каждой своя задача, отдельный проект GitHub и версия. Вы подключаете только то, что использует приложение.</p>
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

        <section className="repository-section section-wrap" id="repositories">
          <div className="section-heading">
            <div><span className="section-index">04</span><h2>Карта Git-репозиториев</h2></div>
            <p>В рабочей папке семь Git-папок: шесть актуальных публичных репозиториев и один архив старой платформы.</p>
          </div>
          <div className="repository-map">
            <div className="repository-map-grid">
              {repositoryGroups.map((group) => (
                <section className={`repository-lane ${group.tone}`} aria-label={group.title} key={group.title}>
                  <div className="repository-lane-head"><span>{group.label}</span><h3>{group.title}</h3><p>{group.description}</p></div>
                  <div className="repository-cards">
                    {group.repositories.map((repository) => (
                      <a className="repository-card" href={repository.href} target="_blank" rel="noreferrer" key={repository.name}>
                        <div><span className="repository-icon" aria-hidden="true" /><code>{repository.name}</code><i aria-hidden="true">↗</i></div>
                        <b>{repository.product}</b>
                        <p>{repository.summary}</p>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="repository-legacy">
              <div><span>АРХИВ · НЕ ДЛЯ НОВЫХ ПРОЕКТОВ</span><code>BroadCore</code><small>локальная папка и старый BroadApps-official/BroadCore</small></div>
              <p>Исторический монолит: оставлен для анализа и миграции. Новое приложение берёт код из четырёх <code>broad-*-ios</code>, а не отсюда.</p>
              <Link href="/docs/legacy-broadcore">Куда переехал старый BroadCore →</Link>
            </div>
            <div className="repository-rule"><b>Короткое правило</b><span>Код функции меняем в её <code>broad-*-ios</code> модуле; совместимость — в integration; общее объяснение — в <code>broad-docs</code>; уникальные тексты, дизайн и бизнес-правила — в репозитории самого приложения.</span><Link href="/docs/architecture#как-понять-какой-репозиторий-менять">Подробная схема →</Link></div>
          </div>
        </section>

        <section className="decision-section section-wrap" id="selection">
          <div className="section-heading">
            <div><span className="section-index">05</span><h2>Как выбрать библиотеку</h2></div>
            <p>Начните с задачи приложения. Подключать сразу всю платформу не требуется.</p>
          </div>
          <div className="decision-grid">
            <div className="decision-question"><span>ЕСЛИ</span><h3>Что нужно<br />приложению?</h3><Link href="/docs/module-selection">Полная таблица →</Link></div>
            <div className="decision-options">
              <div><b>Общие Swift-утилиты</b><span>→</span><strong>Extensions</strong></div>
              <div><b>Запуск, кеш и логи</b><span>→</span><strong>Core</strong></div>
              <div><b>Свой UI для оплаты</b><span>→</span><strong>Monetization</strong></div>
              <div><b>Готовые экраны и переходы</b><span>→</span><strong>UIFlows</strong></div>
            </div>
          </div>
        </section>

        <section className="migration-home section-wrap" id="migration">
          <div className="section-heading">
            <div><span className="section-index">06</span><h2>Как перейти со старого BroadCore</h2></div>
            <p>Приложение, экраны и бизнес-логику не переписываем. Убираем старое подключение BroadCore и добавляем только нужные новые библиотеки.</p>
          </div>
          <div className="migration-home-summary" aria-label="Что меняется при переходе со старой платформы">
            <div><span>МЕНЯЕМ</span><b>Подключение общего кода</b><small>старый BroadCore → нужные новые библиотеки</small></div>
            <div><span>НЕ ТРОГАЕМ</span><b>Само приложение</b><small>экраны, данные и бизнес-логика остаются на месте</small></div>
          </div>
          <div className="migration-home-grid">
            <div className="migration-home-flow" aria-label="Четыре шага миграции">
              <div><span>01</span><b>Проверить приложение</b><small>собрать и запустить его до изменений</small></div>
              <i>→</i>
              <div><span>02</span><b>Подключить новые библиотеки</b><small>убрать старый BroadCore и добавить нужные библиотеки</small></div>
              <i>→</i>
              <div><span>03</span><b>Проверить одну функцию</b><small>например запуск, оплату или первые экраны</small></div>
              <i>→</i>
              <div><span>04</span><b>Удалить остатки старого кода</b><small>только когда приложение снова работает</small></div>
            </div>
            <div className="migration-home-routes">
              <Link href="/docs/legacy-app-migration#порядок-переключения"><span>ЕСЛИ РАЗРАБАТЫВАЕТЕ САМИ</span><b>Пошаговая инструкция для ручной работы</b><small>Что проверить, что заменить и когда безопасно удалить старый код.</small><i>↗</i></Link>
              <Link href="/docs/legacy-app-migration#работа-с-codex-или-claude"><span>ЕСЛИ РАЗРАБАТЫВАЕТЕ С АГЕНТОМ</span><b>Задача для Claude или Codex</b><small>Агент изучит приложение, покажет план и остановится перед изменениями, чтобы вы подтвердили следующий шаг.</small><i>↗</i></Link>
            </div>
          </div>
        </section>

        <section className="release-strip" id="compatibility">
          <div className="section-wrap release-inner">
            <div><span className="live-dot" /><small>ТЕКУЩИЙ КАТАЛОГ</small><b>Набор 1.0.0</b></div>
            <div><small>ПЛАТФОРМА</small><b>iOS 17+</b></div>
            <div><small>ЯЗЫК</small><b>Swift 5</b></div>
            <div><small>ПРОВЕРКА</small><b>Без XCTest</b></div>
            <Link href="/docs/compatibility">Совместимые версии ↗</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
