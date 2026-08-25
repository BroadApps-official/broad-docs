import { ArchitectureMap } from "./architecture-map";

type DocVisualProps = { slug: string };

const Arrow = () => <span className="visual-arrow" aria-hidden="true">→</span>;

function ArchitectureVisual() {
  return <ArchitectureMap />;
}

function CompatibilityVisual() {
  return (
    <section className="doc-visual" aria-label="Разница между диапазоном и точной версией">
      <div className="doc-visual-head"><span>VERSION POLICY</span><b>Две политики для двух разных задач</b></div>
      <div className="version-visual-grid">
        <div className="version-card range-card"><small>MODULE DEPENDENCY</small><code>from: &quot;1.0.0&quot;</code><b>Совместимый диапазон</b><p>Разрешает patch/minor до следующего major.</p></div>
        <div className="version-join"><span>≠</span><small>не одно и то же</small></div>
        <div className="version-card exact-card"><small>VERIFIED SET</small><code>exact: &quot;1.0.0&quot;</code><b>Воспроизводимый набор</b><p>Integration и migration acceptance используют конкретные tags.</p></div>
      </div>
      <div className="visual-callout"><b>Package.resolved</b><span>фиксирует версию, которую resolver выбрал фактически</span></div>
    </section>
  );
}

function SpecialOfferVisual() {
  const steps = [
    ["01", "Provider payload", "remote · SDK cache · dashboard fallback"],
    ["02", "Parse all products", "без filter, sort и deduplicate"],
    ["03", "Evaluate special_offer", "gate читает уже разобранный payload"],
    ["04", "Second paywall", "только после закрытия первого без покупки"],
  ];
  return (
    <section className="doc-visual" aria-label="Порядок обработки Special Offer">
      <div className="doc-visual-head"><span>SPECIAL OFFER PIPELINE</span><b>Gate стоит после парсинга provider products</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>RU Billing отдельно</b><span><code>ru_pay</code> по-прежнему требует verified-fresh remote payload</span></div>
    </section>
  );
}

function LegacyMigrationVisual() {
  const steps = [
    ["01", "Baseline", "Собрать работающий app и снять dependency inventory"],
    ["02", "Boundary", "Атомарно переключить одного source owner"],
    ["03", "One slice", "Проверить один реальный пользовательский flow"],
    ["04", "Cleanup", "Удалить legacy code только после usages и review"],
  ];
  return (
    <section className="doc-visual legacy-visual" aria-label="Безопасная последовательность миграции">
      <div className="doc-visual-head"><span>LEGACY MIGRATION</span><b>Не rewrite, а серия обратимых переходов</b></div>
      <div className="migration-timeline">
        {steps.map(([number, title, detail]) => (
          <div className="migration-step" key={number}><span>{number}</span><div><b>{title}</b><small>{detail}</small></div></div>
        ))}
      </div>
      <div className="migration-routes">
        <div><small>MANUAL</small><b>Разработчик ведёт каждый switch</b><span>package graph → build → functional review</span></div>
        <div><small>CODEX / CLAUDE</small><b>Агент работает по checkpoint</b><span>audit → plan → switch → slice → cleanup</span></div>
      </div>
    </section>
  );
}

function PublicPackageAccessVisual() {
  const steps = [
    ["01", "Public HTTPS", "broad-*-ios.git без login и token"],
    ["02", "SwiftPM resolve", "SemVer tag скачивается во время build"],
    ["03", "Compiled app", "module code входит в собранный binary"],
    ["04", "App Store", "пользователь не обращается к GitHub"],
  ];
  return (
    <section className="doc-visual" aria-label="Публичная установка Swift package без GitHub credentials">
      <div className="doc-visual-head"><span>ANONYMOUS PACKAGE FLOW</span><b>GitHub credential не является runtime-зависимостью app</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout"><b>Видите Keychain prompt?</b><span>Ищите private <code>BroadApps-official/BroadCore</code> в repository URL, а не product name <code>BroadCore</code></span></div>
    </section>
  );
}

export function DocVisual({ slug }: DocVisualProps) {
  if (slug === "architecture") return <ArchitectureVisual />;
  if (slug === "compatibility") return <CompatibilityVisual />;
  if (slug === "special-offer") return <SpecialOfferVisual />;
  if (slug === "legacy-app-migration") return <LegacyMigrationVisual />;
  if (slug === "public-package-access") return <PublicPackageAccessVisual />;
  return null;
}
