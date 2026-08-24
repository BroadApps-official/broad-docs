import type { ReactNode } from "react";
import { slugifyHeading } from "@/lib/docs";

function inline(text: string): ReactNode[] {
  const expression = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
  return text.split(expression).filter(Boolean).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a href={link[2]} key={index} target={link[2].startsWith("http") ? "_blank" : undefined} rel={link[2].startsWith("http") ? "noreferrer" : undefined}>{link[1]}</a>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

type Block = {
  type: "heading" | "paragraph" | "quote" | "code" | "ul" | "ol" | "table";
  level?: number;
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
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

  const flushParagraph = () => { if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") }); paragraph = []; };
  const flushList = () => { if (list) blocks.push(list); list = null; };

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (line.startsWith("```")) {
      flushParagraph(); flushList();
      if (code) { blocks.push({ type: "code", text: code.join("\n") }); code = null; } else { code = []; }
      continue;
    }
    if (code) { code.push(line); continue; }
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
    if (line.startsWith("> ")) { flushParagraph(); flushList(); blocks.push({ type: "quote", text: line.slice(2) }); continue; }
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    paragraph.push(line.trim());
  }
  flushParagraph(); flushList();
  if (code) blocks.push({ type: "code", text: code.join("\n") });
  return blocks;
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  return <>{parse(markdown).map((block, index) => {
    if (block.type === "heading") {
      const id = slugifyHeading(block.text ?? "");
      if (block.level === 1) return <h1 id={id} key={index}>{inline(block.text ?? "")}</h1>;
      if (block.level === 2) return <h2 id={id} key={index}>{inline(block.text ?? "")}</h2>;
      return <h3 id={id} key={index}>{inline(block.text ?? "")}</h3>;
    }
    if (block.type === "paragraph") return <p key={index}>{inline(block.text ?? "")}</p>;
    if (block.type === "quote") return <blockquote key={index}><p>{inline(block.text ?? "")}</p></blockquote>;
    if (block.type === "code") return <pre key={index}><code>{block.text}</code></pre>;
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
