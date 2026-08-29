import { Link } from "./plain-link";

type ArchitectureMapProps = {
  showLink?: boolean;
};

export function ArchitectureMap({ showLink = false }: ArchitectureMapProps) {
  return (
    <div className="platform-map" aria-label="Схема подключения модулей BroadApps iOS">
      <div className="platform-map-head">
        <div>
          <span>КАК ЭТО РАБОТАЕТ</span>
          <b>Приложение выбирает модули. Служебные репозитории помогают, но не входят в сборку.</b>
        </div>
        {showLink ? <Link href="/docs/architecture">Полная схема и правила ↗</Link> : null}
      </div>

      <div className="platform-map-main">
        <div className="map-host">
          <span>ВАШ ПРОДУКТ</span>
          <b>Ваше iPhone-приложение</b>
          <small>ПРИЛОЖЕНИЕ</small>
          <p>Подключает одну или несколько нужных библиотек Swift Package.</p>
        </div>

        <div className="map-choice" aria-hidden="true"><span>выбирает</span>→</div>

        <div className="map-products">
          <div className="map-products-label">МОДУЛИ, КОТОРЫЕ МОЖНО ПОДКЛЮЧИТЬ</div>
          <div className="map-products-grid">
            <div className="map-product map-extensions">
              <b>Extensions</b>
              <small>самостоятельные Swift-утилиты</small>
              <em>без других модулей</em>
            </div>

            <div className="map-chain" aria-label="Зависимости UIFlows, Monetization и Core">
              <div className="map-product map-flows"><b>UIFlows</b><small>готовые SwiftUI-экраны</small></div>
              <div className="map-dependency"><span>использует</span>↓</div>
              <div className="map-product map-money"><b>Monetization</b><small>покупки и подтверждение Premium</small></div>
              <div className="map-dependency"><span>использует</span>↓</div>
              <div className="map-product map-core"><b>Core</b><small>запуск, кеш и логи</small></div>
            </div>
          </div>
        </div>
      </div>

      <div className="platform-map-support">
        <div>
          <span className="status-dot green" />
          <p><b>Integration</b><small>Хранит точный набор версий, которые уже проверили вместе.</small></p>
          <em>не подключается к приложению</em>
        </div>
        <div>
          <span className="status-dot blue" />
          <p><b>Docs + сайт</b><small>Объясняет общие сценарии, даёт поиск и ведёт к README нужного модуля.</small></p>
          <em>не подключается к приложению</em>
        </div>
      </div>
    </div>
  );
}
