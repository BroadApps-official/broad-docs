import { HeaderSearchLink } from "./header-search-link";
import { Link } from "./plain-link";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-glyph">
        <span className="brand-tile brand-tile-top-left" />
        <span className="brand-tile brand-tile-top-right" />
        <span className="brand-tile brand-tile-bottom-left" />
        <span className="brand-tile brand-tile-bottom-right" />
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner section-wrap">
        <Link className="brand" href="/"><BrandMark /><span>BroadApps <em>iOS</em></span></Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <Link href="/#architecture">Как устроено</Link>
          <Link href="/docs">Документация</Link>
          <Link href="/#modules">Части платформы</Link>
          <Link href="/docs/compatibility">Совместимость</Link>
        </nav>
        <div className="header-tools">
          <HeaderSearchLink />
          <a className="github-link" href="https://github.com/BroadApps-official" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner section-wrap">
        <div>
          <Link className="brand" href="/"><BrandMark /><span>BroadApps <em>iOS</em></span></Link>
          <p className="footer-copy">Общий код для iOS-приложений компании. Библиотеки, инструкции, проверки и версии открыты для просмотра и правок.</p>
        </div>
        <nav className="footer-links" aria-label="Навигация в подвале">
          <Link href="/docs">Все документы</Link><Link href="/docs/getting-started">Первое подключение</Link>
          <Link href="/docs/module-selection">Выбор библиотеки</Link><Link href="/docs/public-package-access">Подключение без пароля</Link>
          <Link href="/docs/legacy-app-migration">Миграция приложения</Link><Link href="/docs/architecture">Архитектура</Link>
          <Link href="/docs/special-offer">Спешл оффер (Adapty)</Link><Link href="/docs/compatibility">Совместимость</Link>
        </nav>
        <div className="footer-meta">ПУБЛИЧНО / РЕДАКТИРУЕМО<br />iOS 17+ · Swift 5</div>
      </div>
    </footer>
  );
}
