import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-shell";

export default function NotFound() {
  return <div className="site-shell"><SiteHeader /><main className="search-page section-wrap"><span className="section-index">404</span><h1>Страница не найдена</h1><p>Откройте карту документации или найдите нужный термин.</p><div className="hero-actions"><Link className="primary-action" href="/docs">Все документы</Link><Link className="secondary-action" href="/search">Открыть поиск</Link></div></main><SiteFooter /></div>;
}
