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
    ["01", "Placement", "загрузить special_offer или фактический fallback"],
    ["02", "Все продукты", "передать весь массив Adapty без фильтрации"],
    ["03", "Один флаг", "показ разрешает только special_offer = true"],
    ["04", "Второй paywall", "после крестика первого; таймер циклический 24 часа"],
  ];
  return (
    <section className="doc-visual" aria-label="Порядок обработки Special Offer">
      <div className="doc-visual-head"><span>SPECIAL OFFER · 4 ШАГА</span><b>Placement решает, что показывать</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>Без скрытых правил</b><span>Нет schedule, server clock, фильтрации карточек или блокировки на нуле таймера.</span></div>
    </section>
  );
}

function LegacyMigrationVisual() {
  const steps = [
    ["01", "Baseline", "Собрать работающий app и снять dependency inventory"],
    ["02", "Topology", "Найти legacy owners и conflicting target names"],
    ["03", "Cutover group", "Переключить весь связанный dependency graph атомарно"],
    ["04", "Runtime slices", "Проверять behavior по одному flow после cutover"],
    ["05", "Cleanup", "Удалить legacy code только после usages и review"],
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
        <div><small>MANUAL</small><b>Разработчик ведёт каждую group</b><span>graph → topology → final resolve → runtime review</span></div>
        <div><small>CODEX / CLAUDE</small><b>Агент выводит topology из evidence</b><span>audit → plan → group → slices → cleanup</span></div>
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

function LegacyBroadCoreVisual() {
  const steps = [
    ["01", "Старый repository", "BroadApps-official/BroadCore остаётся только legacy evidence"],
    ["02", "Выберите маршрут", "новое app — Getting Started; существующее — migration guide"],
    ["03", "Текущий Core", "BroadApps-official/broad-core-ios и verified compatibility set"],
  ];
  return (
    <section className="doc-visual legacy-repository-visual" aria-label="Переход со старого BroadCore на актуальную платформу">
      <div className="doc-visual-head"><span>LEGACY BROADCORE</span><b>Старый код не является текущим контрактом</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>Главная точка входа</b><span>Сайт → current module README/DocC → compatibility catalog.</span></div>
    </section>
  );
}

export function DocVisual({ slug }: DocVisualProps) {
  if (slug === "architecture") return <ArchitectureVisual />;
  if (slug === "compatibility") return <CompatibilityVisual />;
  if (slug === "special-offer") return <SpecialOfferVisual />;
  if (slug === "legacy-app-migration") return <LegacyMigrationVisual />;
  if (slug === "legacy-broadcore") return <LegacyBroadCoreVisual />;
  if (slug === "public-package-access") return <PublicPackageAccessVisual />;
  return null;
}
