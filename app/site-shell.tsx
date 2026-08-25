import Link from "next/link";
import { HeaderSearchLink } from "./header-search-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner section-wrap">
        <Link className="brand" href="/"><span className="brand-mark">B◇</span><span>BroadApps <em>iOS</em></span></Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <Link href="/#architecture">Как устроено</Link>
          <Link href="/docs">Документация</Link>
          <Link href="/#modules">Модули</Link>
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
          <Link className="brand" href="/"><span className="brand-mark">B◇</span><span>BroadApps <em>iOS</em></span></Link>
          <p className="footer-copy">Публичная модульная iOS-платформа. Код, docs, reviews и releases открыты для редактирования.</p>
        </div>
        <nav className="footer-links" aria-label="Навигация в подвале">
          <Link href="/docs">Все документы</Link><Link href="/docs/getting-started">Getting Started</Link>
          <Link href="/docs/module-selection">Выбор модуля</Link><Link href="/docs/public-package-access">Public package access</Link>
          <Link href="/docs/legacy-app-migration">Миграция app</Link><Link href="/docs/architecture">Архитектура</Link>
          <Link href="/docs/special-offer">Special Offer</Link><Link href="/docs/compatibility">Совместимость</Link>
        </nav>
        <div className="footer-meta">PUBLIC / EDITABLE<br />iOS 17+ · Swift 5 mode</div>
      </div>
    </footer>
  );
}
