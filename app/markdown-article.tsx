/* eslint-disable @next/next/no-img-element -- Markdown media includes GIF/SVG/PNG with runtime paths and no compile-time dimensions. */
import type { ReactNode } from "react";
import { slugifyHeading } from "@/lib/docs";

function normalizeDocumentHref(href: string) {
  const localDocument = href.match(/^\.\/([a-z0-9-]+)\.md(#[^)]+)?$/i);
  if (localDocument) return `/docs/${localDocument[1]}${localDocument[2] ?? ""}`;
  return href;
}

function normalizeMediaSource(src: string) {
  if (src.startsWith("../public/")) return src.slice("../public".length);
  return src;
}

function inline(text: string): ReactNode[] {
  const expression = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
  return text.split(expression).filter(Boolean).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = normalizeDocumentHref(link[2]);
      const external = href.startsWith("http");
      return <a href={href} key={index} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{link[1]}</a>;
    }
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

type Block = {
  type: "heading" | "paragraph" | "quote" | "code" | "ul" | "ol" | "table" | "image";
  level?: number;
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  alt?: string;
  src?: string;
  language?: string;
};

function tableCells(line: string): string[] | null {
  const value = line.trim();
  if (!value.startsWith("|") || !value.endsWith("|")) return null;
  return value.slice(1, -1).split("|").map((cell) => cell.trim());
}

function parse(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r/g, "").split("\n");
  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let code: string[] | null = null;
  let codeLanguage = "";

  const flushParagraph = () => { if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") }); paragraph = []; };
  const flushList = () => { if (list) blocks.push(list); list = null; };

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (line.startsWith("```")) {
      flushParagraph(); flushList();
      if (code) {
        blocks.push({ type: "code", text: code.join("\n"), language: codeLanguage });
        code = null;
        codeLanguage = "";
      } else {
        code = [];
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }
    if (code) { code.push(line); continue; }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph(); flushList();
      blocks.push({ type: "image", alt: image[1], src: image[2] });
      continue;
    }
    const tableHeader = tableCells(line);
    const tableSeparator = tableCells(lines[lineIndex + 1] ?? "");
    if (tableHeader && tableSeparator && tableHeader.length === tableSeparator.length && tableSeparator.every((cell) => /^:?-{3,}:?$/.test(cell))) {
      flushParagraph(); flushList();
      const rows: string[][] = [];
      lineIndex += 2;
      while (lineIndex < lines.length) {
        const cells = tableCells(lines[lineIndex]);
        if (!cells) { lineIndex -= 1; break; }
        rows.push(cells);
        lineIndex += 1;
      }
      blocks.push({ type: "table", headers: tableHeader, rows });
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) { flushParagraph(); flushList(); blocks.push({ type: "heading", level: heading[1].length, text: heading[2] }); continue; }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) { flushParagraph(); if (!list || list.type !== "ul") { flushList(); list = { type: "ul", items: [] }; } list.items.push(unordered[1]); continue; }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) { flushParagraph(); if (!list || list.type !== "ol") { flushList(); list = { type: "ol", items: [] }; } list.items.push(ordered[1]); continue; }
    if (list && /^\s{2,}\S/.test(line)) {
      const lastItem = list.items.length - 1;
      list.items[lastItem] = `${list.items[lastItem]} ${line.trim()}`;
      continue;
    }
    if (line.startsWith("> ")) {
      flushParagraph(); flushList();
      const quoteLines = [line.slice(2)];
      while ((lines[lineIndex + 1] ?? "").startsWith("> ")) {
        lineIndex += 1;
        quoteLines.push(lines[lineIndex].slice(2));
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    paragraph.push(line.trim());
  }
  flushParagraph(); flushList();
  if (code) blocks.push({ type: "code", text: code.join("\n"), language: codeLanguage });
  return blocks;
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = parse(markdown);
  return <>{blocks.map((block, index) => {
    if (block.type === "heading") {
      const id = slugifyHeading(block.text ?? "");
      if (block.level === 1) return <h1 id={id} key={index}>{inline(block.text ?? "")}</h1>;
      if (block.level === 2) return <h2 id={id} key={index}><a className="heading-anchor" href={`#${id}`}><span>{inline(block.text ?? "")}</span><span aria-hidden="true">#</span></a></h2>;
      return <h3 id={id} key={index}><a className="heading-anchor" href={`#${id}`}><span>{inline(block.text ?? "")}</span><span aria-hidden="true">#</span></a></h3>;
    }
    if (block.type === "paragraph") {
      const previous = blocks[index - 1];
      const afterHeading = previous?.type === "heading" && (previous.level === 2 || previous.level === 3);
      return <p className={afterHeading ? "docs-section-lead" : undefined} key={index}>{inline(block.text ?? "")}</p>;
    }
    if (block.type === "quote") return <blockquote key={index}><p>{inline(block.text ?? "")}</p></blockquote>;
    if (block.type === "code") return (
      <div className="docs-code-block" key={index}>
        <div className="docs-code-label"><span>{block.language || "ТЕКСТ"}</span><span>ПРИМЕР — СНАЧАЛА ПРОЧИТАЙТЕ ПОЯСНЕНИЕ</span></div>
        <pre><code>{block.text}</code></pre>
      </div>
    );
    if (block.type === "image") {
      const src = normalizeMediaSource(block.src ?? "");
      const reference = src.includes("/References/") || src.includes("/Screenshots/") || src.includes("/Usedesk/");
      return (
        <figure className={`docs-media${reference ? " docs-media-reference" : ""}`} key={index}>
          <div className="docs-media-frame"><img alt={block.alt ?? ""} loading="lazy" src={src} /></div>
          {block.alt ? <figcaption><span>REFERENCE</span>{block.alt}</figcaption> : null}
        </figure>
      );
    }
    if (block.type === "table") return (
      <div className="docs-table-wrap" key={index}>
        <table>
          <thead><tr>{block.headers?.map((cell, cellIndex) => <th key={cellIndex}>{inline(cell)}</th>)}</tr></thead>
          <tbody>{block.rows?.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    const List = block.type === "ol" ? "ol" : "ul";
    return <List key={index}>{block.items?.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</List>;
  })}</>;
}
