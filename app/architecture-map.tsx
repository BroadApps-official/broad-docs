import { Link } from "./plain-link";

type ArchitectureMapProps = {
  showLink?: boolean;
};

export function ArchitectureMap({ showLink = false }: ArchitectureMapProps) {
  return (
    <div className="platform-map" aria-label="Какие готовые части может подключить iPhone-приложение">
      <div className="platform-map-head">
        <div>
          <span>КАК ЭТО РАБОТАЕТ</span>
          <b>Приложение выбирает нужную функцию. Всё обязательное для неё Xcode добавляет автоматически.</b>
        </div>
        {showLink ? <Link href="/docs/architecture">Полная схема и правила ↗</Link> : null}
      </div>

      <div className="platform-map-main">
        <div className="map-host">
          <span>ВАШ ПРОДУКТ</span>
          <b>Ваше iPhone-приложение</b>
          <small>ПРИЛОЖЕНИЕ</small>
          <p>Добавляет только тот готовый код, который решает его задачу.</p>
        </div>

        <div className="map-choice" aria-hidden="true"><span>выбирает</span>→</div>

        <div className="map-products">
          <div className="map-products-label">ЧТО НУЖНО ВАШЕМУ ПРИЛОЖЕНИЮ?</div>
          <div className="map-products-grid">
            <div className="map-product map-extensions">
              <b>Extensions</b>
              <small>цвета, клавиатура и навигация</small>
              <em>подключается отдельно</em>
            </div>

            <div className="map-chain" aria-label="Готовые экраны используют оплату, а оплата использует основу запуска">
              <div className="map-product map-flows"><b>Готовые экраны</b><small>UIFlows</small></div>
              <div className="map-dependency"><span>получают</span>↓</div>
              <div className="map-product map-money"><b>Оплата</b><small>Monetization</small></div>
              <div className="map-dependency"><span>получает</span>↓</div>
              <div className="map-product map-core"><b>Запуск и ошибки</b><small>Core</small></div>
            </div>
          </div>
        </div>
      </div>

      <div className="platform-map-support">
        <div>
          <span className="status-dot green" />
          <p><b>Проверка версий</b><small>Хранит точный набор библиотек, которые уже собирали вместе.</small></p>
          <em>только инструмент команды</em>
        </div>
        <div>
          <span className="status-dot blue" />
          <p><b>Инструкции и поиск</b><small>Объясняют сценарии и ведут к точной документации нужной версии.</small></p>
          <em>только для разработчика</em>
        </div>
      </div>
    </div>
  );
}
