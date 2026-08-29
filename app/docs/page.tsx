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
          <div className="section-wrap docs-index-hero-grid">
            <div>
              <span className="section-index">ВСЕ ДОКУМЕНТЫ / {docs.length}</span>
              <h1>Документация</h1>
              <p>Сразу выберите нужную статью или найдите ответ по словам.</p>
            </div>
            <Link className="legacy-repo-notice" href="/docs/legacy-broadcore">
              <span>LEGACY</span>
              <b>Попали в старый BroadCore?</b>
              <small>Открыть актуальный маршрут →</small>
            </Link>
          </div>
        </section>
        <DocsIndexClient docs={index} githubDocs={githubDocuments} />
      </main>
      <SiteFooter />
    </div>
  );
}
