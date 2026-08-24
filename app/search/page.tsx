import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { docs } from "@/lib/docs";
import { SearchClient } from "./search-client";

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
      </main>
      <SiteFooter />
    </div>
  );
}
