/* eslint-disable @next/next/no-img-element -- The module gallery reuses audited PNG fixtures from public documentation. */
import type { CSSProperties } from "react";

type DocVisualProps = { slug: string };

const Arrow = () => <span className="visual-arrow" aria-hidden="true">→</span>;

function ArchitectureVisual() {
  const choices = [
    {
      tone: "extensions",
      number: "01",
      need: "Нужны маленькие UI-утилиты",
      product: "BroadExtensions",
      arrives: "Только Extensions",
      detail: "HEX-цвета · шрифты · клавиатура · жест назад",
    },
    {
      tone: "core",
      number: "02",
      need: "Нужна основа запуска",
      product: "BroadCore",
      arrives: "Core + Swinject",
      detail: "запуск · состояния загрузки · кеш · повторы · логи",
    },
    {
      tone: "money",
      number: "03",
      need: "Нужна оплата со своим экраном",
      product: "BroadMonetization",
      arrives: "Monetization + Core + Adapty + Swinject",
      detail: "все продукты · покупка · restore · проверка Premium",
    },
    {
      tone: "flows",
      number: "04",
      need: "Нужны готовые экраны",
      product: "BroadUIFlows",
      arrives: "UIFlows + Monetization + Core + Adapty + Swinject",
      detail: "onboarding · paywall · состояния · переход в приложение",
    },
  ];

  return (
    <section className="doc-visual architecture-explainer" aria-label="Как приложение выбирает нужные библиотеки и что Xcode добавляет автоматически">
      <div className="doc-visual-head">
        <span>АРХИТЕКТУРА БЕЗ ЗАГАДОК</span>
        <b>Вы выбираете нужные функции — Xcode достраивает их обязательную основу</b>
      </div>

      <div className="architecture-rule">
        <div className="architecture-rule-step app-step">
          <span>1 · РАЗРАБОТЧИК</span>
          <b>Называет задачи приложения</b>
          <small>Например: «нужен paywall и Swift-утилиты»</small>
        </div>
        <Arrow />
        <div className="architecture-rule-step xcode-step">
          <span>2 · XCODE</span>
          <b>Добавляет выбранные products</b>
          <small>По одному для каждой нужной верхней функции</small>
        </div>
        <Arrow />
        <div className="architecture-rule-step result-step">
          <span>3 · ПРИЛОЖЕНИЕ</span>
          <b>Xcode загружает зависимости</b>
          <small>А приложение передаёт ключи, placements, тексты и изображения</small>
        </div>
      </div>

      <div className="architecture-choice-list">
        <div className="architecture-choice-head" aria-hidden="true">
          <span>ЗАДАЧА</span><span>ДОБАВИТЬ В TARGET</span><span>XCODE СКАЧАЕТ</span>
        </div>
        {choices.map((choice) => (
          <div className={`architecture-choice-row ${choice.tone}`} key={choice.product}>
            <span className="architecture-choice-number">{choice.number}</span>
            <div className="architecture-choice-need"><b>{choice.need}</b><small>{choice.detail}</small></div>
            <div className="architecture-choice-product"><small>ВЫБРАТЬ PRODUCT</small><b>{choice.product}</b></div>
            <div className="architecture-choice-arrives"><small>АВТОМАТИЧЕСКИ</small><b>{choice.arrives}</b></div>
          </div>
        ))}
      </div>

      <div className="architecture-owner-map">
        <div className="owner-lane owner-app">
          <span>ОСТАЁТСЯ В ВАШЕМ APP</span>
          <b>То, что делает продукт именно вашим</b>
          <small>ключи · placements · серверные адреса · тексты · изображения · цвета · правила показа</small>
        </div>
        <div className="owner-lane owner-platform">
          <span>ЖИВЁТ В БИБЛИОТЕКАХ</span>
          <b>Повторяемое поведение для разных приложений</b>
          <small>запуск · состояния · покупка · restore · готовые SwiftUI-компоненты · безопасные утилиты</small>
        </div>
        <div className="owner-lane owner-tools">
          <span>НЕ ДОБАВЛЯЕТСЯ В APP</span>
          <b>Инструменты команды</b>
          <small>integration проверяет сочетания версий · этот сайт объясняет сценарии и ведёт к точному API</small>
        </div>
      </div>

      <div className="visual-callout safe">
        <b>ГЛАВНОЕ</b>
        <span>Добавьте верхние библиотеки для всех нужных задач. Нижние зависимости не дублируйте — Xcode загрузит их сам.</span>
      </div>
    </section>
  );
}

function GettingStartedVisual() {
  const steps = [
    ["01", "Выберите нужные задачи", "запуск · оплата · готовые экраны · утилиты"],
    ["02", "Добавьте нужные products", "один или несколько через Add Package Dependencies"],
    ["03", "Соберите приложение", "всё обязательное Xcode скачает автоматически"],
  ];
  return (
    <section className="doc-visual getting-started-visual" aria-label="Первое подключение платформы за три шага">
      <div className="doc-visual-head"><span>ПЕРВОЕ ПОДКЛЮЧЕНИЕ · 3 ШАГА</span><b>В Xcode добавляются библиотеки только для выбранных возможностей</b></div>
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

function UIFlowsModuleVisual() {
  const screens = [
    ["ОНБОРДИНГ", "/guides/ui-flows/sample-safety/onboarding.gif", "Объясняет пользу и ведёт дальше"],
    ["PAYWALL", "/guides/ui-flows/sample-assistant/paywall-1.png", "Показывает и переключает продукты"],
    ["НАСТРОЙКИ", "/guides/ui-flows/sample-assistant/settings-support.png", "Upgrade, Restore, Support и legal"],
  ];
  return (
    <section className="doc-visual module-showcase ui-flows-showcase" aria-label="Три группы реальных экранов BroadUIFlows">
      <div className="doc-visual-head"><span>BROADUIFLOWS · ЭКРАНЫ, КОТОРЫЕ ВИДИТ ЧЕЛОВЕК</span><b>От первого запуска до настроек и поддержки</b></div>
      <div className="ui-screen-gallery">
        {screens.map(([label, source, detail], index) => (
          <figure className="ui-screen-example" key={label} style={{ "--screen-delay": `${index * 1.35}s` } as CSSProperties}>
            <div className="ui-screen-device"><img src={source} alt={detail} /></div>
            <figcaption><b>{label}</b><span>{detail}</span></figcaption>
          </figure>
        ))}
      </div>
      <div className="visual-callout safe"><b>ПОЧЕМУ ЗДЕСЬ PAYWALL</b><span>UIFlows рисует экран и обрабатывает нажатия. Monetization загружает продукты, проводит операцию и подтверждает Premium.</span></div>
    </section>
  );
}

function MonetizationModuleVisual() {
  return (
    <section className="doc-visual module-showcase monetization-showcase" aria-label="Граница между интерфейсом, платёжным модулем и Adapty или StoreKit">
      <div className="doc-visual-head"><span>BROADMONETIZATION · ДВИЖОК БЕЗ ЭКРАНА</span><b>UI остаётся в приложении, финансовая операция — в модуле</b></div>
      <div className="module-lane-flow">
        <div className="module-lane ui-lane"><span>01 · ВИДИТ ЧЕЛОВЕК</span><b>Экран приложения</b><small>карточки · кнопка · loader · ошибка</small></div>
        <Arrow />
        <div className="module-lane engine-lane"><span>02 · ДЕЛАЕТ МОДУЛЬ</span><b>BroadMonetization</b><small>products · purchase · restore · Premium check</small><i aria-hidden="true" /></div>
        <Arrow />
        <div className="module-lane provider-lane"><span>03 · ДАЁТ ИСТИНУ</span><b>Adapty / StoreKit</b><small>placement · raw product · entitlement</small></div>
      </div>
      <div className="module-result-strip"><span>tap «Купить»</span><i>→</i><span>одна операция</span><i>→</i><span>повторная проверка</span><i>→</i><b>Premium подтверждён</b></div>
      <div className="visual-callout safe"><b>ГЛАВНОЕ ПРАВИЛО</b><span>Ответ SDK не открывает доступ сам по себе. Main открывается после подтверждённого entitlement.</span></div>
    </section>
  );
}

function CoreModuleVisual() {
  const states = [
    ["СТАРТ", "критические шаги"],
    ["СЕТЬ", "timeout и retry"],
    ["КЕШ", "fresh / stale / missing"],
    ["UI", "данные или понятная ошибка"],
  ];
  return (
    <section className="doc-visual module-showcase core-showcase" aria-label="Как BroadCore помогает приложению запуститься при нормальной и плохой сети">
      <div className="doc-visual-head"><span>BROADCORE · НЕВИДИМАЯ ОСНОВА</span><b>Пользователь видит результат: приложение не зависает</b></div>
      <div className="core-runtime-line">
        {states.map(([title, detail], index) => (
          <div className="core-runtime-fragment" key={title}>
            <div className="core-runtime-node"><span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b><small>{detail}</small></div>
            {index < states.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="core-outcomes">
        <div><span className="status-dot" /><b>Сеть работает</b><small>актуальные данные → обычный экран</small></div>
        <div><span className="status-dot warning-dot" /><b>Сети нет</b><small>допустимый кеш или ошибка с Retry</small></div>
      </div>
      <div className="visual-callout"><b>CORE НЕ РИСУЕТ UI</b><span>Он сообщает точное состояние. Экран создаёт приложение или BroadUIFlows.</span></div>
    </section>
  );
}

function ExtensionsModuleVisual() {
  return (
    <section className="doc-visual module-showcase extensions-showcase" aria-label="Четыре независимые UI утилиты BroadExtensions">
      <div className="doc-visual-head"><span>BROADEXTENSIONS · БЕЗ ЛИШНИХ ЗАВИСИМОСТЕЙ</span><b>Четыре маленькие задачи — одна лёгкая библиотека</b></div>
      <div className="extensions-demo-grid">
        <div className="extension-demo color-demo"><span>HEX → COLOR</span><div className="color-swatches"><i /><i /><i /></div><code>#4F8CFF</code><small>точный SwiftUI / UIKit цвет</small></div>
        <div className="extension-demo font-demo"><span>CUSTOM FONT</span><strong>Aa</strong><b>Dynamic Type</b><small>текст растёт вместе с настройками iPhone</small></div>
        <div className="extension-demo keyboard-demo"><span>KEYBOARD</span><div className="fake-field">email@example.com</div><div className="fake-keyboard">tap снаружи ↓</div><small>кнопки под gesture продолжают работать</small></div>
        <div className="extension-demo swipe-demo"><span>SWIPE BACK</span><div className="swipe-track"><i>←</i><b>Detail</b></div><small>системный жест возвращается локально</small></div>
      </div>
      <div className="visual-callout safe"><b>0 ДОП. ЗАВИСИМОСТЕЙ</b><span>Core, Adapty, StoreKit, Monetization и готовые paywall не загрузятся.</span></div>
    </section>
  );
}

function CompatibilityVisual() {
  const steps = [
    ["01", "Опишите нужную функцию", "например: готовый экран подписки"],
    ["02", "Агент выберет библиотеки", "только верхние products для этой задачи"],
    ["03", "Возьмёт проверенные версии", "точные номера из Compatibility/current.yml"],
    ["04", "Подключит и соберёт", "проверит Package.resolved и iPhone target"],
  ];
  return (
    <section className="doc-visual compatibility-visual" aria-label="Как агент подключает проверенные версии библиотек">
      <div className="doc-visual-head"><span>ВЕРСИИ ПОДБИРАЕТ АГЕНТ</span><b>Вы описываете задачу — Codex или Claude делает остальное</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>ВАША ЧАСТЬ</b><span>Сказать, какая функция нужна приложению. Номера версий вручную выбирать не требуется.</span></div>
    </section>
  );
}

function SpecialOfferVisual() {
  const steps = [
    ["01", "Ответ Adapty", "получить экран special_offer или запасной вариант"],
    ["02", "Все варианты", "передать весь список Adapty без фильтрации"],
    ["03", "Один переключатель", "показ разрешает только special_offer = true"],
    ["04", "Спешл оффер Adapty", "после крестика первого; таймер циклический 24 часа"],
  ];
  return (
    <section className="doc-visual" aria-label="Порядок показа спешл оффера от Adapty">
      <div className="doc-visual-head"><span>СПЕШЛ ОФФЕР ОТ ADAPTY · 4 ШАГА</span><b>Adapty решает, какие варианты покупки показать</b></div>
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

function RUSpecialOfferVisual() {
  const steps = [
    ["01", "Закрыт обычный экран", "покупки и восстановления не было"],
    ["02", "Получено разрешение", "только явное true показывает второй экран"],
    ["03", "Загружены цены", "Apple отдельно · СБП и карта отдельно"],
    ["04", "Найден нужный товар", "по точному ID, который передали разработчику"],
    ["05", "Оплата подтверждена", "только ответ active открывает Premium"],
  ];
  return (
    <section className="doc-visual ru-special-offer-visual" aria-label="Пять проверок спешл оффера RU Billing">
      <div className="doc-visual-head"><span>RU BILLING · ВТОРОЙ ЭКРАН ОПЛАТЫ</span><b>Сначала разрешение, затем цена, затем подтверждение оплаты</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="architecture-owner-map">
        <div className="owner-lane owner-app"><span>APPLE</span><b>Цена приходит через Adapty</b><small>если RU backend не работает, Apple может остаться</small></div>
        <div className="owner-lane owner-platform"><span>СБП И КАРТА</span><b>Цена приходит с backend</b><small>кнопки видны только после проверки ru_pay и региона</small></div>
        <div className="owner-lane owner-tools"><span>ПОСЛЕ БРАУЗЕРА</span><b>Backend сообщает результат</b><small>вернуться в приложение ещё не значит заплатить</small></div>
      </div>
      <div className="visual-callout safe"><b>ДВА РАЗНЫХ ТАЙМЕРА</b><span>Один управляет повторным показом между сессиями, второй рисует countdown открытого экрана. Значения сообщает владелец задачи.</span></div>
    </section>
  );
}

function RUBillingManagerVisual() {
  const steps = [
    ["01", "Точное приложение", "среда и платёжный провайдер подтверждены"],
    ["02", "Продукты", "ID, цена, тип, период и способы оплаты"],
    ["03", "Режим теста", "без A/B, Adapty или RU Billing — один источник"],
    ["04", "Карточка разработчику", "все значения переданы одним сообщением"],
    ["05", "Проверка и запуск", "сначала тестовая сборка, затем активация"],
  ];
  return (
    <section className="doc-visual ru-special-offer-visual" aria-label="Порядок настройки RU Billing для аккаунт-менеджера">
      <div className="doc-visual-head"><span>АККАУНТ-МЕНЕДЖЕР · ОТ КАБИНЕТА ДО ПЕРЕДАЧИ</span><b>Не менять код — подготовить точные входные данные</b></div>
      <div className="pipeline-visual">
        {steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={number}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>ГЛАВНОЕ</b><span>Обычный A/B в Adapty и RU Billing Experiment нельзя независимо включать для одной аудитории без подтверждённого контракта.</span></div>
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

type SimpleVisualContent = {
  label: string;
  title: string;
  steps: [string, string, string][];
  result: string;
};

const simpleVisuals: Record<string, SimpleVisualContent> = {
  "app-creation": {
    label: "НОВОЕ ПРИЛОЖЕНИЕ · БЕЗ ДОГАДОК",
    title: "Сначала выясняем, что строить; затем пишем код",
    steps: [
      ["01", "Соберите исходные данные", "задача, дизайн, серверные методы и тексты"],
      ["02", "Выберите одну функцию", "например: запуск → первый экран"],
      ["03", "Сделайте и проверьте", "покажите результат разработчику до следующей функции"],
    ],
    result: "Вместо большого проекта на догадках появляется один понятный рабочий сценарий.",
  },
  "module-selection": {
    label: "ВЫБОР НУЖНЫХ БИБЛИОТЕК",
    title: "Начинайте со всех функций приложения, а не с названий модулей",
    steps: [
      ["01", "Назовите задачи", "утилиты, запуск, оплата и/или готовые экраны"],
      ["02", "Выберите верхние модули", "таблица даст точное название для каждой функции"],
      ["03", "Не дублируйте", "необходимые нижние библиотеки Xcode скачает сам"],
    ],
    result: "В приложение попадают выбранные функции и их обязательные зависимости — одна библиотека или несколько.",
  },
  "glossary": {
    label: "ПЕРЕВОДЧИК ТЕХНИЧЕСКИХ СЛОВ",
    title: "Термин нужен только для того, чтобы найти точное место в Xcode или коде",
    steps: [
      ["01", "Увидели слово", "например target, placement или restore"],
      ["02", "Прочитайте перевод", "одно предложение объясняет смысл"],
      ["03", "Вернитесь к действию", "делайте шаг инструкции, а не учите словарь"],
    ],
    result: "Незнакомое слово больше не блокирует конкретное действие.",
  },
  "broad-core": {
    label: "BROADCORE · ЗАПУСК И ОШИБКИ",
    title: "Это служебная основа приложения, а не экран для пользователя",
    steps: [
      ["01", "Приложение запускается", "Core выполняет обязательные действия по порядку"],
      ["02", "Что-то не загрузилось", "Core показывает кеш, ошибку или повтор"],
      ["03", "Экран продолжает работу", "пользователь не остаётся перед вечной загрузкой"],
    ],
    result: "Подключайте Core ради запуска, кеша и ошибок — не ради оплаты или готового интерфейса.",
  },
  "broad-extensions": {
    label: "BROADEXTENSIONS · МАЛЕНЬКИЕ УТИЛИТЫ",
    title: "Берите только готовую мелочь, не подключая остальную платформу",
    steps: [
      ["01", "Нужна утилита", "например цвет из HEX или закрытие клавиатуры"],
      ["02", "Добавьте Extensions", "одна независимая библиотека"],
      ["03", "Используйте в коде", "оплата, Core и готовые экраны не загрузятся"],
    ],
    result: "Приложение получает маленькие переиспользуемые функции без лишних библиотек.",
  },
  "broad-monetization": {
    label: "BROADMONETIZATION · ЛОГИКА ОПЛАТЫ",
    title: "Приложение рисует свой экран, модуль безопасно проводит покупку",
    steps: [
      ["01", "Получить варианты", "Adapty возвращает все доступные покупки"],
      ["02", "Показать свой экран", "приложение само выбирает дизайн"],
      ["03", "Подтвердить доступ", "Premium открывается только после проверки покупки"],
    ],
    result: "Дизайн остаётся у приложения, а общую платёжную логику не приходится писать заново.",
  },
  "broad-ui-flows": {
    label: "BROADUIFLOWS · ГОТОВЫЕ ЭКРАНЫ",
    title: "Приложение передаёт содержимое, модуль показывает готовый сценарий",
    steps: [
      ["01", "Передайте настройки", "тексты, изображения, цвета и порядок экранов"],
      ["02", "Модуль показывает", "первые страницы, оплату или нужный переход"],
      ["03", "Получите результат", "закрытие, покупка или переход в приложение"],
    ],
    result: "Используйте UIFlows, когда нужен готовый интерфейс, а не только методы оплаты.",
  },
  "ui-flows-onboarding": {
    label: "ОНБОРДИНГ · ПЕРВЫЙ ЗАПУСК",
    title: "Приложение задаёт страницы — UIFlows проводит человека по ним",
    steps: [
      ["01", "Передать страницы", "тексты, изображения, порядок и тема приложения"],
      ["02", "Показать по порядку", "без пропусков и повторного завершения"],
      ["03", "Закончить маршрут", "перейти в paywall или main по правилу продукта"],
    ],
    result: "Количество и дизайн экранов меняются, а понятный порядок и результат остаются стандартом.",
  },
  "ui-flows-paywall": {
    label: "PAYWALL · ВЫБОР НЕ РАВЕН ПОКУПКЕ",
    title: "UIFlows показывает продукты — Monetization проводит операцию",
    steps: [
      ["01", "Показать все варианты", "0, 1 или N продуктов без скрытого обрезания"],
      ["02", "Выбрать карточку", "сменить product ID без запуска оплаты"],
      ["03", "Нажать Continue", "запустить одну purchase или checkout операцию"],
    ],
    result: "Premium открывается только после подтверждённого результата, а не после нажатия или возврата из браузера.",
  },
  "ui-flows-settings-support": {
    label: "НАСТРОЙКИ · ПОНЯТНЫЕ ДЕЙСТВИЯ",
    title: "Каждая строка сообщает, что произойдёт после нажатия",
    steps: [
      ["01", "Upgrade / Restore", "открыть оплату или восстановить покупку"],
      ["02", "Support", "открыть чат или подготовить письмо"],
      ["03", "Legal и версия", "показать точные документы и данные сборки"],
    ],
    result: "Необязательные строки можно менять, но платёжные, support- и legal-действия не должны вводить человека в заблуждение.",
  },
  "adapty-setup": {
    label: "ADAPTY · ДВА ВХОДНЫХ ЗНАЧЕНИЯ",
    title: "Ключ говорит, чьё это приложение; имя экрана — что загрузить",
    steps: [
      ["01", "Передайте ключ", "публичный ключ вашего приложения из Adapty"],
      ["02", "Назовите место", "например main, tokens или special_offer"],
      ["03", "Покажите ответ", "все продукты приходят на экран без скрытой фильтрации"],
    ],
    result: "Дополнительные проверяющие сервисы для обычной загрузки экрана не нужны.",
  },
  "paywall-ui": {
    label: "ЭКРАН ПОДПИСКИ · ЛЮБОЙ ОТВЕТ",
    title: "Один экран должен понятно работать с нулём, одним и многими вариантами",
    steps: [
      ["0", "Нет вариантов", "сообщение, повтор и возможность закрыть экран"],
      ["1", "Один вариант", "одна полноценная карточка без пустых мест"],
      ["N", "Много вариантов", "все карточки в порядке, который вернул Adapty"],
    ],
    result: "Экран не ломается и не скрывает тарифы при неожиданном количестве продуктов.",
  },
  "token-paywall": {
    label: "ПОКУПКА ТОКЕНОВ · ОТ КАРТОЧКИ ДО БАЛАНСА",
    title: "Покупка ещё не равна начислению: итог подтверждает сервер приложения",
    steps: [
      ["01", "Показать пакеты", "все варианты, которые вернул Adapty"],
      ["02", "Провести покупку", "защититься от повторного нажатия"],
      ["03", "Обновить баланс", "только после ответа сервера приложения"],
    ],
    result: "Пользователь не платит дважды и видит только подтверждённый баланс.",
  },
  "ru-billing": {
    label: "КАРТА И СБП · ВСЕ УСЛОВИЯ В ОДНОЙ СТРОКЕ",
    title: "Сначала разрешение, затем точный продукт, после оплаты — подтверждение",
    steps: [
      ["01 · AND", "Свежий ru_pay = true", "отсутствие, false, сломанное значение и кеш закрывают RU methods"],
      ["02 · OR", "Storefront RU или регион iPhone RU", "язык, IP, клавиатура и timezone не участвуют"],
      ["03 · AND", "Точный продукт backend", "полный массив без сортировки, обрезки и удаления дублей"],
      ["04 · AND", "Backend подтвердил Premium", "возврат из браузера сам по себе не считается оплатой"],
    ],
    result: "СБП/карта появляются только после всех проверок. Один провал оставляет безопасный Apple-only или Retry.",
  },
  "backend-product-catalog": {
    label: "КАТАЛОГ С BACKEND · ГРАНИЦА БЕЗ КОСТЫЛЕЙ",
    title: "Приложение передаёт настройки, платформа выполняет запрос и сохраняет весь массив",
    steps: [
      ["01", "Backend отдаёт JSON", "стабильные ID, цена, валюта и доступные способы оплаты"],
      ["02", "App передаёт configuration", "endpoints, auth и timeout принадлежат конкретному приложению"],
      ["03", "Repository + decoder", "запрос выполняется, каждая строка, порядок и дубли сохраняются"],
      ["04", "Exact ID связывает продукт", "никаких догадок по цене, названию, периоду или позиции"],
    ],
    result: "Если конкретному UI нужны две карточки, он выбирает их после полного ответа; общий package ничего не теряет.",
  },
  "onboarding-att": {
    label: "ПЕРВЫЕ ЭКРАНЫ И РАЗРЕШЕНИЕ APPLE",
    title: "Сначала пользователь видит приложение, потом системный вопрос",
    steps: [
      ["01", "Показать первый экран", "он должен реально появиться на iPhone"],
      ["02", "Дождаться готовности", "приложение активно, окно видно"],
      ["03", "Показать запрос Apple", "только если пользователь ещё в этом сценарии"],
    ],
    result: "Системное окно не появляется раньше интерфейса и не пугает пользователя на старте.",
  },
  "runtime-reliability": {
    label: "КОГДА ЧТО-ТО ПОШЛО НЕ ТАК",
    title: "У каждого действия есть загрузка, понятная ошибка и безопасный повтор",
    steps: [
      ["01", "Показать действие", "загрузка начинается сразу после нажатия"],
      ["02", "Дождаться ответа", "повторное нажатие не создаёт вторую операцию"],
      ["03", "Завершить понятно", "результат, ошибка, повтор или проверка статуса"],
    ],
    result: "Сеть и таймаут не превращают неизвестный результат в ложный успех.",
  },
  "usedesk": {
    label: "USEDESK · ОДНА КАРТОЧКА ОТ МЕНЕДЖЕРА",
    title: "Берём только присланные данные и открываем готовый чат",
    steps: [
      ["01", "Получить карточку", "Token · Company ID · Channel ID · web-script"],
      ["02", "Настроить iOS", "Company ID и Channel ID — в config; Token — только в подтверждённое поле SDK"],
      ["03", "Открыть чат", "Настройки → Онлайн-чат → готовый экран Usedesk"],
    ],
    result: "Одна карточка → одна конфигурация → готовый экран. Дополнительная система не нужна.",
  },
  "release-process": {
    label: "ВЫПУСК НОВОЙ ВЕРСИИ",
    title: "Сначала изменить и проверить, потом объявить версию готовой",
    steps: [
      ["01", "Изменить владельца кода", "правка делается в нужном модуле"],
      ["02", "Проверить зависимости", "собрать сам модуль и всё, что его использует"],
      ["03", "Опубликовать набор", "обновить версию, каталог и документацию"],
    ],
    result: "Разработчик приложения видит только сочетания версий, которые уже собирались вместе.",
  },
  "migration": {
    label: "ПОЧЕМУ СТАЛО ЧЕТЫРЕ МОДУЛЯ",
    title: "Большой общий репозиторий разделили по задачам приложения",
    steps: [
      ["БЫЛО", "Один большой BroadCore", "приложение получало и нужный, и лишний код"],
      ["СТАЛО", "Четыре библиотеки", "каждая отвечает за свою задачу"],
      ["ИТОГ", "Выбор по функциям", "приложение подключает одну или несколько нужных верхних частей"],
    ],
    result: "Модули можно обновлять отдельно, а совместимые версии проверяются вместе.",
  },
  "documentation": {
    label: "ГДЕ ИСПРАВЛЯТЬ ИНФОРМАЦИЮ",
    title: "Общее объяснение — на сайте; точный код — рядом с модулем",
    steps: [
      ["01", "Общий вопрос", "выбор модуля и пользовательский сценарий — этот сайт"],
      ["02", "Подключение версии", "команды и примеры — README модуля"],
      ["03", "Точный метод", "параметры и типы — справочник DocC"],
    ],
    result: "Разработчик знает, где искать ответ и где предложить исправление.",
  },
};

function SimpleVisual({ content }: { content: SimpleVisualContent }) {
  return (
    <section className="doc-visual simple-doc-visual" aria-label={content.title}>
      <div className="doc-visual-head"><span>{content.label}</span><b>{content.title}</b></div>
      <div className="pipeline-visual">
        {content.steps.map(([number, title, detail], index) => (
          <div className="pipeline-fragment" key={`${number}-${title}`}>
            <div className="pipeline-card"><span>{number}</span><b>{title}</b><small>{detail}</small></div>
            {index < content.steps.length - 1 ? <Arrow /> : null}
          </div>
        ))}
      </div>
      <div className="visual-callout safe"><b>ЧТО ПОЛУЧИТСЯ</b><span>{content.result}</span></div>
    </section>
  );
}

export function DocVisual({ slug }: DocVisualProps) {
  if (slug === "getting-started") return <GettingStartedVisual />;
  if (slug === "broad-ui-flows") return <UIFlowsModuleVisual />;
  if (slug === "broad-monetization") return <MonetizationModuleVisual />;
  if (slug === "broad-core") return <CoreModuleVisual />;
  if (slug === "broad-extensions") return <ExtensionsModuleVisual />;
  if (slug === "architecture") return <ArchitectureVisual />;
  if (slug === "compatibility") return <CompatibilityVisual />;
  if (slug === "special-offer") return <SpecialOfferVisual />;
  if (slug === "ru-special-offer") return <RUSpecialOfferVisual />;
  if (slug === "ru-billing-account-manager") return <RUBillingManagerVisual />;
  if (slug === "legacy-app-migration") return <LegacyMigrationVisual />;
  if (slug === "legacy-broadcore") return <LegacyBroadCoreVisual />;
  if (slug === "public-package-access") return <PublicPackageAccessVisual />;
  if (simpleVisuals[slug]) return <SimpleVisual content={simpleVisuals[slug]} />;
  return null;
}
