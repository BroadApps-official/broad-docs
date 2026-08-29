import { Link } from "./plain-link";
import { docs } from "@/lib/docs";
import { ArchitectureMap } from "./architecture-map";
import { HomeSectionMap } from "./home-section-map";
import { SearchIcon } from "./search-icon";
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
        <section className="home-quick-routes home-platform-intro section-wrap" aria-labelledby="platform-intro-title">
          <div className="home-quick-routes-head">
            <div>
              <span>ПЛАТФОРМА ЗА 30 СЕКУНД</span>
              <h2 id="platform-intro-title">Готовые части для iOS-приложений компании</h2>
              <p>BroadApps iOS — четыре публичных Swift Package-модуля с общим кодом, который не нужно заново писать в каждом приложении.</p>
            </div>
            <Link href="/docs/getting-started"><i className="status-dot green" />Я здесь впервые <b>→</b></Link>
          </div>
          <div className="home-quick-routes-grid">
            <Link className="intro-module-core" href="/docs/broad-core">
              <span>CORE</span>
              <div><b>Запуск и основа</b><small>bootstrap · cache · logs · retry</small></div>
              <i>→</i>
            </Link>
            <Link className="intro-module-money" href="/docs/broad-monetization">
              <span>PAY</span>
              <div><b>Оплата и подписка</b><small>Adapty · StoreKit · purchase · restore</small></div>
              <i>→</i>
            </Link>
            <Link className="intro-module-flows" href="/docs/broad-ui-flows">
              <span>UI</span>
              <div><b>Готовые экраны</b><small>onboarding · paywall · app routing</small></div>
              <i>→</i>
            </Link>
            <Link className="intro-module-extensions" href="/docs/broad-extensions">
              <span>EXT</span>
              <div><b>Swift-утилиты</b><small>colors · keyboard · navigation</small></div>
              <i>→</i>
            </Link>
          </div>
          <div className="home-platform-reason">
            <b>Зачем по модулям?</b>
            <p>Чтобы приложение брало только нужное. Вы добавляете один product — обязательные зависимости приходят автоматически, а лишние SDK и экраны не попадают в app.</p>
            <Link href="/docs/module-selection">Показать, что выбрать →</Link>
          </div>
        </section>
        <section className="hero section-wrap" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span /> BroadApps iOS простыми словами</div>
            <h1>Готовая основа<br />для iOS-приложений<br /><em>компании.</em></h1>
            <p className="hero-lede">
              Не один огромный SDK, а четыре независимых Swift Package-модуля.
              Выберите нужную функцию — запуск, оплату, готовые экраны или
              утилиты — и подключите один product в Xcode. Его обязательные
              зависимости придут автоматически.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/docs/getting-started">Подключить впервые <span>↗</span></Link>
              <Link className="secondary-action" href="/docs/module-selection">Выбрать модуль</Link>
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
            <h2>Опишите задачу —<br /><em>найдите инструкцию.</em></h2>
            <p>Название модуля знать не нужно. Напишите обычными словами, что хотите сделать с приложением, и поиск покажет подходящие страницы.</p>
            <div className="knowledge-points">
              <div><span>1</span><p><b>Сформулируйте задачу</b><small>например: «подключить оплату» или «перенести старое приложение»</small></p></div>
              <div><span>2</span><p><b>Откройте готовый маршрут</b><small>в результате будет понятно, зачем нужна страница и что делать дальше</small></p></div>
              <div><span>3</span><p><b>Сверьтесь с исходником</b><small>на каждой странице остаётся ссылка на Markdown в GitHub</small></p></div>
            </div>
            <div className="hero-actions">
              <Link className="primary-action" href="/search">Найти инструкцию <SearchIcon /></Link>
              <Link className="secondary-action" href="/docs">Все документы</Link>
            </div>
          </div>
          <div className="knowledge-panel">
            <div className="knowledge-panel-head"><span>ПОИСК ПО ЗАДАЧЕ</span><b>Что хотите сделать?</b></div>
            <Link className="search-result knowledge-task active" href="/search?q=подключить%20оплату"><span>ОПЛАТА</span><div><b>Подключить оплату и подписку</b><small>Adapty, продукты, покупка и восстановление</small></div><i>→</i></Link>
            <Link className="search-result knowledge-task" href="/search?q=перенести%20старое%20приложение"><span>ПЕРЕНОС</span><div><b>Перенести старое приложение</b><small>граница перехода, порядок действий и проверка</small></div><i>→</i></Link>
            <Link className="search-result knowledge-task" href="/search?q=проверить%20совместимые%20версии"><span>ВЕРСИИ</span><div><b>Проверить совместимые версии</b><small>готовый набор тегов, которые работают вместе</small></div><i>→</i></Link>
            <Link className="search-result knowledge-task" href="/search?q=исправить%20ошибку%20сборки"><span>СБОРКА</span><div><b>Разобраться с ошибкой сборки</b><small>подключение package, runtime и диагностика</small></div><i>→</i></Link>
            <div className="search-meta"><span>{docs.length} инструкций</span><span>названия модулей знать не нужно</span></div>
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
            <div><span className="section-index">05</span><h2>Как перейти со старого BroadCore</h2></div>
            <p>Приложение, экраны и бизнес-логику не переписываем. Убираем старое подключение BroadCore и добавляем только нужные новые модули.</p>
          </div>
          <div className="migration-home-summary" aria-label="Что меняется при переходе со старой платформы">
            <div><span>МЕНЯЕМ</span><b>Подключение общего кода</b><small>старый BroadCore → нужные новые модули</small></div>
            <div><span>НЕ ТРОГАЕМ</span><b>Само приложение</b><small>экраны, данные и бизнес-логика остаются на месте</small></div>
          </div>
          <div className="migration-home-grid">
            <div className="migration-home-flow" aria-label="Четыре шага миграции">
              <div><span>01</span><b>Проверить приложение</b><small>собрать и запустить его до изменений</small></div>
              <i>→</i>
              <div><span>02</span><b>Подключить новые модули</b><small>убрать старый BroadCore и добавить нужные модули</small></div>
              <i>→</i>
              <div><span>03</span><b>Проверить одну функцию</b><small>например запуск, оплату или первые экраны</small></div>
              <i>→</i>
              <div><span>04</span><b>Удалить остатки старого кода</b><small>только когда приложение снова работает</small></div>
            </div>
            <div className="migration-home-routes">
              <Link href="/docs/legacy-app-migration#выберите-подход"><span>САМОСТОЯТЕЛЬНО</span><b>Инструкция для разработчика</b><small>Что проверить, что заменить и когда можно удалить старый код.</small><i>↗</i></Link>
              <Link href="/docs/legacy-app-migration#что-делает-ии"><span>С ПОМОЩЬЮ ИИ</span><b>Задача для Codex / Claude</b><small>Агент сначала изучит app, составит план и остановится перед изменениями.</small><i>↗</i></Link>
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
