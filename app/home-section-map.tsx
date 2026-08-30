import { docs, docGroups } from "@/lib/docs";
import { Link } from "./plain-link";

const groupDescriptions = {
  "Старт": "Начать и перейти",
  "Части платформы": "Четыре библиотеки",
  "Монетизация": "Apple, СБП, карта и Premium",
  "Архитектура": "Как всё устроено",
  "Разработка": "Версии и процессы",
} as const;

export function HomeSectionMap() {
  return (
    <aside className="home-section-map" aria-label="Карта сайта со всеми документами">
      <div className="home-map-heading">
        <span>КАРТА САЙТА</span>
        <b>{docs.length} ДОКУМЕНТА</b>
      </div>

      <div className="home-map-roots" aria-label="Основные страницы сайта">
        <Link className="home-map-root active" href="#top" aria-current="page">
          <span>00</span><b>Главная</b><i aria-hidden="true">→</i>
        </Link>
        <Link className="home-map-root" href="/search">
          <span>⌕</span><b>Поиск</b><i aria-hidden="true">→</i>
        </Link>
      </div>

      <nav aria-label={`Все ${docs.length} документов по разделам`}>
        {docGroups.map((group, groupIndex) => {
          const groupDocs = docs.filter((doc) => doc.group === group);

          return (
            <section className="home-map-group" aria-labelledby={`home-map-group-${groupIndex}`} key={group}>
              <div className="home-map-group-title" id={`home-map-group-${groupIndex}`}>
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <div><b>{group}</b><small>{groupDescriptions[group]}</small></div>
                <em>{groupDocs.length}</em>
              </div>
              <div className="home-map-group-links">
                {groupDocs.map((doc) => {
                  const documentNumber = docs.findIndex((item) => item.slug === doc.slug) + 1;

                  return (
                    <Link href={`/docs/${doc.slug}`} key={doc.slug}>
                      <span className="home-map-node">{String(documentNumber).padStart(2, "0")}</span>
                      <span className="home-map-copy"><b>{doc.title}</b></span>
                      <i aria-hidden="true">→</i>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </nav>

      <Link className="home-map-docs-link" href="/docs">
        <span>{docs.length} / {docs.length} В КАРТЕ</span>
        <b>Каталог и поиск →</b>
      </Link>
    </aside>
  );
}
