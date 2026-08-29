import { ArchitectureMap } from "./architecture-map";

type DocVisualProps = { slug: string };

const Arrow = () => <span className="visual-arrow" aria-hidden="true">→</span>;

function ArchitectureVisual() {
  return <ArchitectureMap />;
}

function GettingStartedVisual() {
  const steps = [
    ["01", "Выберите задачу", "запуск · оплата · готовые экраны · утилиты"],
    ["02", "Добавьте один модуль", "Xcode → Add Package Dependencies"],
    ["03", "Соберите приложение", "обязательные зависимости придут автоматически"],
  ];
  return (
    <section className="doc-visual getting-started-visual" aria-label="Первое подключение платформы за три шага">
      <div className="doc-visual-head"><span>ПЕРВОЕ ПОДКЛЮЧЕНИЕ · 3 ШАГА</span><b>В Xcode добавляется один нужный модуль</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>ПРИМЕР</b><span>Нужен готовый экран подписки → добавьте BroadUIFlows. Платёжная логика, Core и Adapty придут сами.</span></div>
    </section>
  );
}

function CompatibilityVisual() {
  return (
    <section className="doc-visual" aria-label="Разница между диапазоном и точной версией">
      <div className="doc-visual-head"><span>КАК ВЫБРАТЬ ВЕРСИЮ</span><b>Два режима для двух разных задач</b></div>
      <div className="version-visual-grid">
        <div className="version-card range-card"><small>ОБЫЧНОЕ ПРИЛОЖЕНИЕ</small><code>from: &quot;1.0.0&quot;</code><b>Совместимый диапазон</b><p>Xcode может взять исправление или совместимое обновление до 2.0.0.</p></div>
        <div className="version-join"><span>≠</span><small>не одно и то же</small></div>
        <div className="version-card exact-card"><small>ПРОВЕРКА И МИГРАЦИЯ</small><code>exact: &quot;1.0.0&quot;</code><b>Точная версия</b><p>Xcode всегда берёт ровно версию 1.0.0.</p></div>
      </div>
      <div className="visual-callout"><b>Package.resolved</b><span>записывает версию, которую Xcode фактически выбрал и скачал</span></div>
    </section>
  );
}

function SpecialOfferVisual() {
  const steps = [
    ["01", "Ответ Adapty", "загрузить placement special_offer или его запасной вариант"],
    ["02", "Все продукты", "передать весь массив Adapty без фильтрации"],
    ["03", "Один флаг", "показ разрешает только special_offer = true"],
    ["04", "Второй paywall", "после крестика первого; таймер циклический 24 часа"],
  ];
  return (
    <section className="doc-visual" aria-label="Порядок обработки Special Offer">
      <div className="doc-visual-head"><span>SPECIAL OFFER · 4 ШАГА</span><b>Adapty решает, какие продукты показать</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>Без скрытых правил</b><span>Нет расписания, серверного времени, фильтрации карточек или блокировки на нуле таймера.</span></div>
    </section>
  );
}

function LegacyMigrationVisual() {
  const steps = [
    ["01", "Проверить приложение", "Собрать и запустить его до изменений"],
    ["02", "Подключить новые модули", "Убрать старый BroadCore и добавить только нужные модули"],
    ["03", "Проверить одну функцию", "Например запуск, оплату или первые экраны"],
    ["04", "Убрать остатки старого кода", "Только когда приложение снова собирается и работает"],
  ];
  return (
    <section className="doc-visual legacy-visual" aria-label="Безопасная последовательность миграции">
      <div className="doc-visual-head"><span>ПЕРЕНОС СО СТАРОГО BROADCORE</span><b>Меняем подключение общего кода, а не переписываем приложение</b></div>
      <div className="migration-timeline">
        {steps.map(([number, title, detail]) => (
          <div className="migration-step" key={number}><span>{number}</span><div><b>{title}</b><small>{detail}</small></div></div>
        ))}
      </div>
      <div className="migration-routes">
        <div><small>САМОСТОЯТЕЛЬНО</small><b>Разработчик выполняет четыре шага</b><span>проверка → новые модули → одна функция → очистка</span></div>
        <div><small>CODEX / CLAUDE</small><b>Агент сначала показывает план</b><span>он не меняет приложение, пока разработчик не подтвердит следующий шаг</span></div>
      </div>
    </section>
  );
}

function PublicPackageAccessVisual() {
  const steps = [
    ["01", "Публичный HTTPS", "broad-*-ios.git без логина и токена"],
    ["02", "Xcode скачивает", "выбранная версия загружается во время сборки"],
    ["03", "Готовое приложение", "код модуля входит в собранное приложение"],
    ["04", "App Store", "пользователь не обращается к GitHub"],
  ];
  return (
    <section className="doc-visual" aria-label="Публичная установка Swift package без GitHub credentials">
      <div className="doc-visual-head"><span>ПОДКЛЮЧЕНИЕ БЕЗ ПАРОЛЯ</span><b>Доступ к GitHub не требуется пользователю приложения</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout"><b>Появилось окно Keychain?</b><span>Ищите старый <code>BroadApps-official/BroadCore</code> в URL package, а не в названии библиотеки <code>BroadCore</code></span></div>
    </section>
  );
}

function LegacyBroadCoreVisual() {
  const steps = [
    ["01", "Старый репозиторий", "BroadApps-official/BroadCore остаётся только историческим источником"],
    ["02", "Выберите маршрут", "новое приложение — первое подключение; существующее — миграция"],
    ["03", "Текущий Core", "BroadApps-official/broad-core-ios и каталог проверенных версий"],
  ];
  return (
    <section className="doc-visual legacy-repository-visual" aria-label="Переход со старого BroadCore на актуальную платформу">
      <div className="doc-visual-head"><span>СТАРЫЙ BROADCORE</span><b>Старый код не является текущей платформой</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>Главная точка входа</b><span>Сайт → README или DocC нужного модуля → каталог совместимых версий.</span></div>
    </section>
  );
}

export function DocVisual({ slug }: DocVisualProps) {
  if (slug === "getting-started") return <GettingStartedVisual />;
  if (slug === "architecture") return <ArchitectureVisual />;
  if (slug === "compatibility") return <CompatibilityVisual />;
  if (slug === "special-offer") return <SpecialOfferVisual />;
  if (slug === "legacy-app-migration") return <LegacyMigrationVisual />;
  if (slug === "legacy-broadcore") return <LegacyBroadCoreVisual />;
  if (slug === "public-package-access") return <PublicPackageAccessVisual />;
  return null;
}
