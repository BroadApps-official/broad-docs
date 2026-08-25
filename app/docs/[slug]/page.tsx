import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocVisual } from "@/app/doc-visual";
import { MarkdownArticle } from "@/app/markdown-article";
import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { docGroups, docs, getDoc, slugifyHeading } from "@/lib/docs";

export function generateStaticParams() { return docs.map((doc) => ({ slug: doc.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const headings = doc.body.split("\n").flatMap((line) => {
    const match = line.match(/^##\s+(.+)$/);
    return match ? [{ label: match[1], id: slugifyHeading(match[1]) }] : [];
  });

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="docs-main">
        <section className="docs-hero">
          <div className="section-wrap">
            <span className="section-index">{doc.group.toUpperCase()}</span>
            <h1>{doc.title}</h1>
            <p>{doc.description}</p>
          </div>
        </section>
        <div className="docs-layout section-wrap">
          <nav className="docs-sidebar" aria-label="Разделы документации">
            {docGroups.map((group) => (
              <div key={group}>
                <span>{group.toUpperCase()}</span>
                {docs.filter((entry) => entry.group === group).map((entry) => (
                  <Link className={entry.slug === doc.slug ? "active" : ""} href={`/docs/${entry.slug}`} key={entry.slug}>{entry.title}</Link>
                ))}
              </div>
            ))}
          </nav>
          <article className="docs-article">
            <DocVisual slug={doc.slug} />
            <MarkdownArticle markdown={doc.body} />
            <div className="docs-edit">
              <span>Нашли неточность?</span>
              <a href={`https://github.com/BroadApps-official/broad-docs/edit/main/content/${doc.slug}.md`} target="_blank" rel="noreferrer">Edit this page ↗</a>
            </div>
          </article>
          <aside className="docs-toc">
            <b>НА ЭТОЙ СТРАНИЦЕ</b>
            {headings.map((heading) => <a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>)}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
