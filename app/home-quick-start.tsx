import { Link } from "./plain-link";

const tasks = [
  {
    tone: "flows",
    title: "Показать онбординг и пейвол",
    result: "Страницы знакомства → экран подписки → главный экран. Общая логика управляет переходами, загрузкой и ошибками.",
    product: "BroadUIFlows",
    setup: "Передайте свои страницы, тексты и оформление; для оплаты настройте Adapty.",
    action: "Подключить экраны",
    href: "/docs/broad-ui-flows#как-подключить",
  },
  {
    tone: "money",
    title: "Добавить оплату в свой пейвол",
    result: "Модуль загружает тарифы, выполняет покупку и Restore, затем проверяет право на Premium.",
    product: "BroadMonetization",
    setup: "Настройте Adapty и свяжите кнопки своего экрана с общими методами покупки и восстановления.",
    action: "Подключить оплату",
    href: "/docs/broad-monetization#как-подключить",
  },
  {
    tone: "core",
    title: "Обработать загрузку и ошибку",
    result: "Один объект хранит состояние экрана: идёт запрос, пришли данные, список пуст или произошла ошибка.",
    product: "BroadCore",
    setup: "Используйте LoadableState в своей ViewModel. Свяжите состояния с экраном и действием «Повторить».",
    action: "Подключить Core",
    href: "/docs/broad-core#как-подключить",
  },
  {
    tone: "extensions",
    title: "Взять готовые утилиты для UI",
    result: "Цвет из HEX, свой шрифт, закрытие клавиатуры по нажатию и системный свайп назад.",
    product: "BroadExtensions",
    setup: "Добавьте модуль и используйте нужную функцию или модификатор в своём экране.",
    action: "Подключить утилиты",
    href: "/docs/broad-extensions#как-подключить-и-запустить-пример",
  },
];

export function HomeQuickStart() {
  return (
    <section className="home-start section-wrap" id="top" aria-labelledby="home-start-title">
      <header className="home-start-heading">
        <span>РАЗРАБОТЧИКУ ПРИЛОЖЕНИЯ</span>
        <h1 id="home-start-title">Что взять из платформы<br />и как это подключить</h1>
        <p>Используйте общий код для онбординга, оплаты и состояний экрана. Тогда исправления и правила этих сценариев будут общими для приложений компании. Свои экраны, тексты и настройки вы задаёте в приложении.</p>
      </header>

      <div className="home-start-entry">
        <div className="home-start-example">
          <span className="home-start-label">ВПЕРВЫЕ ПОДКЛЮЧАЕТЕ ПЛАТФОРМУ</span>
          <h2>Сначала запустите BroadStart</h2>
          <p>Это небольшой готовый проект для Xcode: список материалов, загрузка, пустой ответ и ошибка с повтором. На нём видно, как общий код связан с экраном.</p>
          <Link className="home-start-primary" href="/docs/getting-started#вариант-1-откройте-готовый-проект">Открыть проект и шаги запуска <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-start-existing">
          <span className="home-start-label">ПРИЛОЖЕНИЕ УЖЕ НАПИСАНО</span>
          <h2>Начните с проверки</h2>
          <p>Получите список: что уже использует платформу, где осталась старая логика и что нужно исправить.</p>
          <Link href="/docs/app-standard#запустите-одну-проверку">Проверить своё приложение <span aria-hidden="true">→</span></Link>
          <Link href="/docs/legacy-app-migration">Перейти со старого BroadCore <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="home-start-tasks-heading">
        <h2>Нужна конкретная функция?</h2>
        <p>Найдите свою задачу и откройте инструкцию. Скопируйте из неё адрес пакета в Xcode → File → Add Package Dependencies… и выберите указанный ниже product для приложения.</p>
      </div>
      <div className="home-task-grid">
        {tasks.map((task) => (
          <article className={`home-task ${task.tone}`} key={task.product}>
            <h3>{task.title}</h3>
            <p className="home-task-result">{task.result}</p>
            <div className="home-task-product"><span>Подключить в Xcode</span><code>{task.product}</code></div>
            <p className="home-task-setup"><b>Что сделать вам.</b> {task.setup}</p>
            <Link href={task.href}>{task.action} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>

      <div className="home-start-combination">
        <h3>Если нужны и экраны, и оплата</h3>
        <p>Начните с <strong>BroadUIFlows</strong>: вместе с ним Xcode скачает Monetization, Core и Adapty. Если ваш код напрямую использует их API, добавьте соответствующие products в target. Установка пакета — первый шаг; ключ Adapty, placements и обработчики нужно настроить в приложении.</p>
        <Link href="/docs/module-selection#пять-практических-наборов">Посмотреть набор для своего приложения <span aria-hidden="true">→</span></Link>
      </div>
      <div className="home-start-followup">
        <span>После подключения пройдите сценарий, ошибку и повторное нажатие.</span>
        <Link href="/docs/app-standard">Правила и проверка приложения <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
