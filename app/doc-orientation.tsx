import { Link } from "./plain-link";
import type { DocEntry } from "@/lib/docs";
import { termsForText } from "@/lib/technical-terms";

export function DocOrientation({ doc }: { doc: DocEntry }) {
  const terms = termsForText(doc.body).slice(0, 6);
  return (
    <section className="doc-orientation" aria-label="Как пользоваться этой статьёй">
      <div className="doc-orientation-grid">
        <div><span>ЗАЧЕМ</span><p>{doc.purpose}</p></div>
        <div><span>КОГДА ОТКРЫВАТЬ</span><p>{doc.when}</p></div>
        <div><span>РЕЗУЛЬТАТ</span><p>{doc.outcome}</p></div>
      </div>
      {terms.length ? (
        <div className="doc-terms">
          <div className="doc-terms-head"><b>Термины этой страницы</b><Link href="/docs/glossary">Весь словарь →</Link></div>
          <dl>{terms.map((term) => <div key={term.label}><dt>{term.label}</dt><dd>{term.definition}</dd></div>)}</dl>
        </div>
      ) : null}
    </section>
  );
}
