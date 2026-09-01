import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocVisual } from "@/app/doc-visual";
import { DocOrientation } from "@/app/doc-orientation";
import { DocReadingTools } from "@/app/doc-reading-tools";
import { MarkdownArticle } from "@/app/markdown-article";
import { Link } from "@/app/plain-link";
import { SiteFooter, SiteHeader } from "@/app/site-shell";
import { docGroups, docs, getDoc, slugifyHeading } from "@/lib/docs";

const githubRepository = "https://github.com/BroadApps-official/broad-docs";

export function generateStaticParams() { return docs.map((doc) => ({ slug: doc.slug })); }

function documentHeadings(markdown: string) {
  return markdown.split("\n").flatMap((line) => {
    const match = line.match(/^##\s+(.+)$/);
    return match ? [{ label: match[1], id: slugifyHeading(match[1]) }] : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const sourcePath = `content/${doc.slug}.md`;
  const sourceHref = `${githubRepository}/blob/main/${sourcePath}`;
  const historyHref = `${githubRepository}/commits/main/${sourcePath}`;
  const rawHref = `https://raw.githubusercontent.com/BroadApps-official/broad-docs/main/${sourcePath}`;
  const editHref = `${githubRepository}/edit/main/${sourcePath}`;
  const currentIndex = docs.findIndex((entry) => entry.slug === doc.slug);
  const previousDoc = currentIndex > 0 ? docs[currentIndex - 1] : undefined;
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : undefined;
  const headings = documentHeadings(doc.body);
  const readingMinutes = Math.max(2, Math.ceil(doc.body.split(/\s+/).filter(Boolean).length / 180));

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="docs-main">
        <section className="docs-hero">
          <div className="docs-hero-inner section-wrap">
            <div className="docs-hero-copy">
              <nav className="docs-breadcrumbs" aria-label="Путь к документу">
                <Link href="/">Главная</Link><span aria-hidden="true">/</span><Link href="/docs">Документация</Link><span aria-hidden="true">/</span><b>{doc.group}</b>
              </nav>
              <span className="docs-group-badge"><i aria-hidden="true" />{doc.group.toUpperCase()}</span>
              <h1>{doc.title}</h1>
              <p>{doc.description}</p>
              <div className="docs-hero-meta"><span>{headings.length} разделов</span><span>≈ {readingMinutes} мин чтения</span><span>обновляется вместе с GitHub</span></div>
              <div className="docs-hero-actions">
                <a className="docs-primary-action" href={sourceHref} target="_blank" rel="noreferrer">Открыть Markdown на GitHub <span>↗</span></a>
                <a href={historyHref} target="_blank" rel="noreferrer">История изменений</a>
              </div>
            </div>
            <aside className="docs-source-summary" aria-label="Источник документа">
              <span>ИСХОДНИК СТАТЬИ</span>
              <a href={sourceHref} target="_blank" rel="noreferrer"><code>{sourcePath}</code><b>GitHub ↗</b></a>
              <p>Нужен только для сверки, если сайт и файл разошлись.</p>
            </aside>
          </div>
        </section>
        <div className="docs-layout section-wrap">
          <nav className="docs-sidebar" aria-label="Разделы документации">
            <div className="docs-sidebar-summary"><span>КАТАЛОГ</span><b>{docs.length} статей</b></div>
            <div className="docs-sidebar-list">
              {docGroups.map((group) => (
                <div key={group}>
                  <span>{group.toUpperCase()}</span>
                  {docs.filter((entry) => entry.group === group).map((entry) => {
                    const entryHeadings = documentHeadings(entry.body);
                    const isCurrent = entry.slug === doc.slug;

                    if (!entryHeadings.length) {
                      return <Link className={isCurrent ? "active" : ""} href={`/docs/${entry.slug}`} key={entry.slug}>{entry.title}</Link>;
                    }

                    return (
                      <details className={`docs-sidebar-disclosure${isCurrent ? " current" : ""}`} key={entry.slug} open={isCurrent}>
                        <summary>
                          <Link className={isCurrent ? "active" : ""} href={`/docs/${entry.slug}`}>{entry.title}</Link>
                          <i className="docs-sidebar-chevron" aria-hidden="true" />
                        </summary>
                        <div className="docs-sidebar-subsections">
                          {entryHeadings.map((heading, headingIndex) => (
                            <a href={`/docs/${entry.slug}#${heading.id}`} key={heading.id}>
                              <span>{String(headingIndex + 1).padStart(2, "0")}</span>
                              <b>{heading.label}</b>
                            </a>
                          ))}
                        </div>
                      </details>
                    );
                  })}
                </div>
              ))}
            </div>
          </nav>
          <article className="docs-article">
            <div className="docs-article-card">
              <div className="docs-source-note">
                <i aria-hidden="true" />
                <span>Сверено с <a href={sourceHref} target="_blank" rel="noreferrer">Markdown в GitHub</a> при публикации</span>
              </div>
              <DocVisual slug={doc.slug} />
              <DocOrientation doc={doc} />
              <div className="docs-article-content"><MarkdownArticle markdown={doc.body} /></div>
              <section className="docs-source-card" aria-labelledby="source-card-title">
                <div>
                  <span>ПЕРВОИСТОЧНИК</span>
                  <h2 id="source-card-title">Проверить статью в GitHub</h2>
                  <p>Если сайт и файл разошлись, сравните Markdown и историю изменений.</p>
                  <code>{sourcePath}</code>
                </div>
                <div className="docs-source-links">
                  <a href={sourceHref} target="_blank" rel="noreferrer"><span>Исходник</span><b>GitHub ↗</b></a>
                  <a href={historyHref} target="_blank" rel="noreferrer"><span>Изменения</span><b>History ↗</b></a>
                  <a href={rawHref} target="_blank" rel="noreferrer"><span>Чистый текст</span><b>Raw ↗</b></a>
                  <a href={editHref} target="_blank" rel="noreferrer"><span>Предложить правку</span><b>Edit ↗</b></a>
                </div>
              </section>
              <nav className="docs-pagination" aria-label="Соседние документы">
                {previousDoc ? <Link className="previous" href={`/docs/${previousDoc.slug}`}><span>← ПРЕДЫДУЩАЯ</span><b>{previousDoc.title}</b></Link> : <span />}
                {nextDoc ? <Link className="next" href={`/docs/${nextDoc.slug}`}><span>СЛЕДУЮЩАЯ →</span><b>{nextDoc.title}</b></Link> : <span />}
              </nav>
            </div>
          </article>
          <DocReadingTools headings={headings} sourcePath={sourcePath} sourceHref={sourceHref} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
