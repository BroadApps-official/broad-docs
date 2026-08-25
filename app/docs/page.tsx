import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { docs } from "@/lib/docs";
import { DocsIndexClient } from "./docs-index-client";

export const metadata: Metadata = {
  title: "Документация",
  description: "Все публичные документы BroadApps iOS с поиском по тексту и алфавитным указателем.",
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
              Найдите инструкцию по смыслу или откройте все страницы на нужную букву.
              Оба способа работают независимо.
            </p>
          </div>
        </section>
        <DocsIndexClient docs={index} />
      </main>
      <SiteFooter />
    </div>
  );
}
