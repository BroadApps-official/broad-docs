import { Link } from "./plain-link";
import type { DocEntry } from "@/lib/docs";
import { termsForText } from "@/lib/technical-terms";

export function DocOrientation({ doc }: { doc: DocEntry }) {
  const terms = termsForText(doc.body).slice(0, 6);
  return (
    <section className="doc-orientation" aria-label="Что даст эта инструкция">
      <div className="doc-orientation-title">
        <span>ПЕРЕД ЧТЕНИЕМ</span>
        <b>Сначала поймите задачу — технические названия встретятся ниже только там, где без них нельзя.</b>
      </div>
      <div className="doc-orientation-grid">
        <div><span>ЧТО ВЫ ПОЙМЁТЕ</span><p>{doc.purpose}</p></div>
        <div><span>ЭТА СТРАНИЦА НУЖНА, ЕСЛИ</span><p>{doc.when}</p></div>
        <div><span>ПОСЛЕ ВЫПОЛНЕНИЯ</span><p>{doc.outcome}</p></div>
      </div>
      {terms.length ? (
        <details className="doc-terms">
          <summary><span>Встретилось незнакомое слово?</span><b>Показать простые объяснения</b></summary>
          <div className="doc-terms-head"><b>Точные названия, которые понадобятся в Xcode или коде</b><Link href="/docs/glossary">Весь словарь →</Link></div>
          <dl>{terms.map((term) => <div key={term.label}><dt>{term.label}</dt><dd>{term.definition}</dd></div>)}</dl>
        </details>
      ) : null}
    </section>
  );
}
