import type { Metadata } from "next";
import { Link } from "@/app/plain-link";
import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { docs } from "@/lib/docs";
import { githubDocuments } from "@/lib/github-docs.generated";
import { DocsIndexClient } from "./docs-index-client";

export const metadata: Metadata = {
  title: "Документация",
  description: "Все публичные документы BroadApps iOS с поиском по сайту, GitHub README и алфавитным указателем.",
};

export default function DocsIndexPage() {
  const index = docs.map(({ slug, title, description, group, body }) => ({
    slug,
    title,
    description,
    group,
    body,
  }));

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="docs-index-page">
        <section className="docs-index-hero">
          <div className="section-wrap">
            <span className="section-index">DOCS / {docs.length}</span>
            <h1>Документация</h1>
            <p>
              Ищите по страницам сайта, README и Markdown-файлам всех публичных репозиториев
              или откройте документы по разделу и букве. Все три способа работают независимо.
            </p>
            <Link className="legacy-repo-notice" href="/docs/legacy-broadcore">
              <span>СТАРЫЙ РЕПОЗИТОРИЙ</span>
              <b>Открыли BroadApps-official/BroadCore?</b>
              <small>Покажем актуальный Core и безопасный маршрут миграции →</small>
            </Link>
          </div>
        </section>
        <DocsIndexClient docs={index} githubDocs={githubDocuments} />
      </main>
      <SiteFooter />
    </div>
  );
}
