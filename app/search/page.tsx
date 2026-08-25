import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { Link } from "@/app/plain-link";
import { docs } from "@/lib/docs";
import { SearchClient } from "./search-client";

export const metadata = {
  title: "Поиск",
  description: "Поиск по заголовкам и содержимом публичной документации BroadApps iOS.",
};

export default function SearchPage() {
  const index = docs.map(({ slug, title, description, group, body }) => ({ slug, title, description, group, body }));
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="search-page section-wrap">
        <span className="section-index">SEARCH</span>
        <h1>Поиск по всей базе</h1>
        <p>Ищет по заголовкам, ключевым словам и тексту публичных Markdown-документов.</p>
        <SearchClient docs={index} />
        <div className="alphabet-search-link">
          <span>АБВ</span>
          <div><b>Хотите искать по букве?</b><p>Откройте отдельный алфавитный указатель всех документов.</p></div>
          <Link href="/docs#alphabet-title">Открыть ↗</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
