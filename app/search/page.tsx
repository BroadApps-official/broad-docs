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
        <span className="section-index">ПОИСК ПО ЗАДАЧЕ</span>
        <h1>Что вы хотите сделать?</h1>
        <p>Пишите обычными словами. Название библиотеки, метода или точный технический термин знать не нужно.</p>
        <SearchClient docs={index} />
        <div className="alphabet-search-link">
          <span>АБВ</span>
          <div><b>Хотите просто посмотреть все страницы?</b><p>Откройте полный список по темам или алфавиту.</p></div>
          <Link href="/docs#alphabet-title">Все документы →</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
