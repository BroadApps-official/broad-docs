import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { docs } from "@/lib/docs";
import { githubDocuments } from "@/lib/github-docs.generated";
import { DocsIndexClient } from "./docs-index-client";

export const metadata: Metadata = {
  title: "Документация",
  description: "Найдите инструкцию по задаче или точный термин во всех публичных README и документах BroadApps iOS.",
};

export default function DocsIndexPage() {
  const index = docs.map(({ slug, title, description, purpose, when, outcome, group, body }) => ({
    slug,
    title,
    description,
    purpose,
    when,
    outcome,
    group,
    body,
  }));

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="docs-index-page">
        <DocsIndexClient docs={index} githubDocs={githubDocuments} />
      </main>
      <SiteFooter />
    </div>
  );
}
