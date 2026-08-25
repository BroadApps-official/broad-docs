type DocVisualProps = { slug: string };

const Arrow = () => <span className="visual-arrow" aria-hidden="true">→</span>;

function ArchitectureVisual() {
  return (
    <section className="doc-visual" aria-label="Карта ответственности repositories">
      <div className="doc-visual-head"><span>ARCHITECTURE MAP</span><b>Код, совместимость и решения не смешиваются</b></div>
      <div className="architecture-visual-grid">
        <div className="visual-node host-node"><small>CONSUMER</small><b>Host app</b><p>Выбирает products и хранит app-owned configuration.</p></div>
        <Arrow />
        <div className="module-visual-stack">
          <div className="visual-node flow-node"><b>UIFlows</b><small>готовые SwiftUI-flow</small></div>
          <div className="visual-node money-node"><b>Monetization</b><small>purchase · entitlement</small></div>
          <div className="visual-node core-node"><b>Core</b><small>runtime foundation</small></div>
          <div className="visual-node extensions-node"><b>Extensions</b><small>standalone utility</small></div>
        </div>
      </div>
      <div className="visual-support-row">
        <div><span className="status-dot green" /><b>Integration</b><small>проверяет exact set, но не линкуется в app</small></div>
        <div><span className="status-dot blue" /><b>Docs</b><small>объясняет cross-module решения и ведёт к owner</small></div>
      </div>
    </section>
  );
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

export function DocVisual({ slug }: DocVisualProps) {
  if (slug === "architecture") return <ArchitectureVisual />;
  if (slug === "compatibility") return <CompatibilityVisual />;
  if (slug === "special-offer") return <SpecialOfferVisual />;
  if (slug === "legacy-app-migration") return <LegacyMigrationVisual />;
  return null;
}
