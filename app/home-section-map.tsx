import { docs, docGroups } from "@/lib/docs";
import { HomeMapPanel } from "./home-map-panel";
import { Link } from "./plain-link";

export function HomeSectionMap() {
  return (
    <HomeMapPanel count={docs.length}>
      <div className="home-map-roots" aria-label="Основные страницы сайта">
        <Link className="home-map-root active" href="#top" aria-current="page">Главная</Link>
        <Link className="home-map-root" href="/search">Поиск <span aria-hidden="true">↗</span></Link>
      </div>

      <nav aria-label={`Все ${docs.length} документов по разделам`}>
        {docGroups.map((group, groupIndex) => {
          const groupDocs = docs.filter((doc) => doc.group === group);
          const subgroups = Array.from(new Set(groupDocs.map((doc) => doc.subgroup).filter((value): value is string => Boolean(value))));

          return (
            <section className="home-map-group" aria-labelledby={`home-map-group-${groupIndex}`} key={group}>
              <h2 className="home-map-group-title" id={`home-map-group-${groupIndex}`}>
                {group}<span>{groupDocs.length}</span>
              </h2>
              <div className="home-map-group-links">
                {groupDocs.filter((doc) => !doc.subgroup).map((doc) => (
                  <Link href={`/docs/${doc.slug}`} key={doc.slug}>
                    <span>{doc.title}</span><i aria-hidden="true" />
                  </Link>
                ))}
                {subgroups.map((subgroup) => (
                  <div className="home-map-subgroup" key={subgroup}>
                    <h3>{subgroup}</h3>
                    {groupDocs.filter((doc) => doc.subgroup === subgroup).map((doc) => (
                      <Link href={`/docs/${doc.slug}`} key={doc.slug}>
                        <span>{doc.title}</span><i aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </nav>

      <Link className="home-map-docs-link" href="/docs">Вся документация <span aria-hidden="true">→</span></Link>
    </HomeMapPanel>
  );
}
