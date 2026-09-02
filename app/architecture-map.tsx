import { Link } from "./plain-link";

type ArchitectureMapProps = {
  showLink?: boolean;
};

const choices = [
  {
    number: "01",
    tone: "extensions",
    need: "Нужны только маленькие Swift-утилиты",
    examples: "HEX-цвета · шрифты · клавиатура · жест назад",
    product: "BroadExtensions",
    automatic: "Ничего дополнительного",
    note: "Лёгкая самостоятельная библиотека",
  },
  {
    number: "02",
    tone: "core",
    need: "Нужна надёжная основа запуска",
    examples: "loading и error · кеш · повтор запроса · безопасные логи",
    product: "BroadCore",
    automatic: "Swinject",
    note: "Техническая зависимость Core",
  },
  {
    number: "03",
    tone: "money",
    need: "Нужна оплата, но экран вы рисуете сами",
    examples: "все продукты Adapty · purchase · restore · Premium",
    product: "BroadMonetization",
    automatic: "BroadCore + Adapty + Swinject",
    note: "Платёжная логика без готового paywall",
  },
  {
    number: "04",
    tone: "flows",
    need: "Нужны готовые экраны и переходы",
    examples: "onboarding · paywall · состояния · главный экран приложения",
    product: "BroadUIFlows",
    automatic: "BroadMonetization + BroadCore + Adapty + Swinject",
    note: "Вся обязательная основа готовых экранов",
  },
];

export function ArchitectureMap({ showLink = false }: ArchitectureMapProps) {
  return (
    <div className="platform-map platform-map-guide" aria-label="Как выбрать нужные библиотеки BroadApps и что Xcode добавит автоматически">
      <div className="platform-map-head">
        <div>
          <span>ПЛАТФОРМА ЗА 1 МИНУТУ</span>
          <b>Отметьте все нужные возможности приложения и добавьте products из соответствующих строк. Автоматические зависимости не дублируйте.</b>
        </div>
        {showLink ? <Link href="/docs/architecture">Подробная архитектура и правила ↗</Link> : null}
      </div>

      <div className="map-howto" aria-label="Три шага подключения библиотек">
        <div><span>1</span><p><b>Отметьте нужные задачи</b><small>Их может быть одна или несколько. Названия библиотек знать не нужно.</small></p></div>
        <i aria-hidden="true">→</i>
        <div><span>2</span><p><b>Добавьте указанные products</b><small>Точное имя для каждой задачи написано во второй колонке.</small></p></div>
        <i aria-hidden="true">→</i>
        <div><span>3</span><p><b>Остальное сделает Xcode</b><small>Всё из третьей колонки загрузится автоматически.</small></p></div>
      </div>

      <div className="map-choice-table">
        <div className="map-choice-head" aria-hidden="true">
          <span>ЧТО НУЖНО ПРИЛОЖЕНИЮ</span>
          <span>ВЫ ДОБАВЛЯЕТЕ В XCODE</span>
          <span>XCODE СКАЧИВАЕТ САМ</span>
        </div>
        {choices.map((choice) => (
          <div className={`map-choice-row ${choice.tone}`} key={choice.product}>
            <span className="map-choice-number">{choice.number}</span>
            <div className="map-choice-need">
              <small>ВАША ЗАДАЧА</small>
              <b>{choice.need}</b>
              <p>{choice.examples}</p>
            </div>
            <div className="map-choice-product">
              <small>ДОБАВИТЬ PRODUCT</small>
              <b>{choice.product}</b>
            </div>
            <div className="map-choice-auto">
              <small>АВТОМАТИЧЕСКИ · РУКАМИ НЕ ДОБАВЛЯТЬ</small>
              <b>{choice.automatic}</b>
              <p>{choice.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="map-example" aria-label="Разобранный пример для готового paywall">
        <div className="map-example-title"><span>ПРИМЕР</span><b>Нужен готовый экран подписки</b></div>
        <div className="map-example-flow">
          <div><small>ВАША ЗАДАЧА</small><b>Показать paywall</b></div>
          <i aria-hidden="true">→</i>
          <div className="example-pick"><small>ВЫ ДОБАВЛЯЕТЕ</small><b>BroadUIFlows</b></div>
          <i aria-hidden="true">→</i>
          <div><small>XCODE ДОБАВЛЯЕТ САМ</small><b>Monetization, Core, Adapty и Swinject</b></div>
          <i aria-hidden="true">→</i>
          <div className="example-result"><small>ПРИЛОЖЕНИЕ ПЕРЕДАЁТ</small><b>Adapty key, placement, тексты и изображения</b></div>
        </div>
        <p><strong>Итог:</strong> в Xcode вы выбираете только <code>BroadUIFlows</code>. Цепочку зависимостей вручную собирать не нужно.</p>
      </div>

      <div className="map-boundaries" aria-label="Что попадает в приложение, а что остаётся снаружи">
        <div className="map-boundary app-owned">
          <span>ОСТАЁТСЯ В ВАШЕМ APP</span>
          <b>Настройки конкретного продукта</b>
          <p>ключи · placement names · тексты · изображения · цвета · server URLs · правила показа</p>
        </div>
        <div className="map-boundary package-owned">
          <span>ПОПАДАЕТ В APP ИЗ БИБЛИОТЕК</span>
          <b>Готовое повторяемое поведение</b>
          <p>запуск · состояния · кеш · purchase · restore · paywall · Swift-утилиты</p>
        </div>
        <div className="map-boundary tools-only">
          <span>НЕ ПОПАДАЕТ В APP</span>
          <b>Инструменты разработчика</b>
          <p>integration repository проверяет версии · этот сайт объясняет подключение и использование</p>
        </div>
      </div>

      <div className="map-main-rule">
        <b>ГЛАВНОЕ ПРАВИЛО</b>
        <span>Подключайте products для всех нужных функций. Нижнюю библиотеку не добавляйте повторно, если она уже пришла автоматически; добавьте её явно, только когда app напрямую импортирует её API. <code>BroadExtensions</code> подключается отдельно, если нужны его утилиты.</span>
      </div>
    </div>
  );
}
