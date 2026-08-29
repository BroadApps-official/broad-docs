import architecture from "@/content/architecture.md?raw";
import appCreation from "@/content/app-creation.md?raw";
import broadCore from "@/content/broad-core.md?raw";
import broadExtensions from "@/content/broad-extensions.md?raw";
import broadMonetization from "@/content/broad-monetization.md?raw";
import broadUIFlows from "@/content/broad-ui-flows.md?raw";
import compatibility from "@/content/compatibility.md?raw";
import documentation from "@/content/documentation.md?raw";
import gettingStarted from "@/content/getting-started.md?raw";
import glossary from "@/content/glossary.md?raw";
import legacyBroadCore from "@/content/legacy-broadcore.md?raw";
import legacyAppMigration from "@/content/legacy-app-migration.md?raw";
import migration from "@/content/migration.md?raw";
import moduleSelection from "@/content/module-selection.md?raw";
import publicPackageAccess from "@/content/public-package-access.md?raw";
import releaseProcess from "@/content/release-process.md?raw";
import specialOffer from "@/content/special-offer.md?raw";
import adaptySetup from "@/content/adapty-setup.md?raw";
import onboardingATT from "@/content/onboarding-att.md?raw";
import paywallUI from "@/content/paywall-ui.md?raw";
import ruBilling from "@/content/ru-billing.md?raw";
import runtimeReliability from "@/content/runtime-reliability.md?raw";
import tokenPaywall from "@/content/token-paywall.md?raw";
import usedesk from "@/content/usedesk.md?raw";

export type DocEntry = {
  slug: string;
  title: string;
  description: string;
  purpose: string;
  when: string;
  outcome: string;
  group: "Старт" | "Части платформы" | "Монетизация" | "Архитектура" | "Разработка";
  body: string;
};

export const docs: DocEntry[] = [
  { slug: "getting-started", title: "Первое подключение", description: "Выберите нужные функции, добавьте одну или несколько библиотек в Xcode и убедитесь, что приложение работает.", purpose: "Подключить готовый общий код без лишних и продублированных зависимостей.", when: "Когда добавляете BroadApps в новый или существующий Xcode-проект.", outcome: "Выбранные библиотеки загружены, приложение собирается и нужные функции открываются.", group: "Старт", body: gettingStarted },
  { slug: "app-creation", title: "Создание приложения", description: "Понятный маршрут создания приложения вручную или с Codex/Claude.", purpose: "Провести новое приложение от исходных требований до передачи в QA.", when: "До первого изменения Swift-кода нового приложения.", outcome: "Есть подтверждённый план, один рабочий сценарий и список оставшихся проверок.", group: "Старт", body: appCreation },
  { slug: "module-selection", title: "Какие части платформы выбрать", description: "Отметьте все нужные функции и получите точные названия библиотек для Xcode.", purpose: "Подключить все нужные возможности без лишних и продублированных зависимостей.", when: "До добавления библиотек в Xcode.", outcome: "Вы знаете, какие products добавить; всё обязательное Xcode загрузит автоматически.", group: "Старт", body: moduleSelection },
  { slug: "public-package-access", title: "Подключение без пароля", description: "Что делать, если Xcode неожиданно просит пароль GitHub или доступ к сохранённым паролям Mac.", purpose: "Скачать открытые библиотеки платформы без аккаунта и секретного токена.", when: "Когда Xcode просит войти в GitHub или не может скачать библиотеку.", outcome: "В проекте стоят открытые адреса GitHub, и Xcode скачивает код без авторизации.", group: "Старт", body: publicPackageAccess },
  { slug: "legacy-broadcore", title: "Старый BroadCore: куда переехал", description: "Старый репозиторий больше не используется; здесь указаны новые адреса и безопасный переход.", purpose: "Не принять архивный BroadCore за актуальную платформу.", when: "Когда ссылка или поиск привели в BroadApps-official/BroadCore.", outcome: "Вы открыли актуальный модуль или инструкцию миграции.", group: "Старт", body: legacyBroadCore },
  { slug: "legacy-app-migration", title: "Переход со старого BroadCore", description: "Замените старое подключение новыми библиотеками небольшими шагами, сохраняя рабочую версию приложения.", purpose: "Обновить существующее приложение без большого переписывания.", when: "Когда в проекте есть старый BroadCore, библиотека из папки на Mac или скопированные файлы платформы.", outcome: "Старое подключение удалено только после проверки каждой затронутой функции приложения.", group: "Старт", body: legacyAppMigration },
  { slug: "glossary", title: "Словарь без жаргона", description: "Короткие переводы точных названий, которые вы увидите в Xcode, Swift и настройках оплаты.", purpose: "Быстро расшифровать незнакомое слово из инструкции.", when: "Когда термин мешает понять действие или ожидаемый результат.", outcome: "Вы понимаете слово и сразу возвращаетесь к конкретному шагу инструкции.", group: "Старт", body: glossary },
  { slug: "broad-core", title: "BroadCore", description: "Основа запуска приложения: последовательность старта, кеш, повтор запросов и безопасные логи.", purpose: "Дать приложению общие механизмы запуска и восстановления после ошибок.", when: "Когда нужен запуск, кеш, логи, повтор запроса или ATT.", outcome: "Приложение запускает критические шаги по порядку и понятно сообщает об ошибках.", group: "Части платформы", body: broadCore },
  { slug: "broad-extensions", title: "BroadExtensions", description: "Маленькие готовые функции для цвета, клавиатуры и навигации — без оплаты и остальных частей платформы.", purpose: "Повторно использовать небольшие Swift-функции без подключения всей платформы.", when: "Когда нужны только маленькие функции языка или интерфейса.", outcome: "Приложение получает утилиты, но не загружает Core, Adapty или готовые экраны.", group: "Части платформы", body: broadExtensions },
  { slug: "broad-monetization", title: "BroadMonetization", description: "Общая логика покупки и восстановления для приложения, которое рисует экран оплаты самостоятельно.", purpose: "Использовать готовую платёжную логику со своим дизайном экранов.", when: "Когда приложение рисует экран оплаты само, но не хочет заново писать работу с покупками.", outcome: "Экран получает все варианты покупки и открывает Premium только после подтверждения.", group: "Части платформы", body: broadMonetization },
  { slug: "broad-ui-flows", title: "BroadUIFlows", description: "Готовые экраны первого запуска, подписки и переходов внутри приложения.", purpose: "Быстро добавить готовые пользовательские экраны поверх платёжной логики.", when: "Когда приложению нужен готовый интерфейс, а не только методы покупки.", outcome: "Приложение передаёт свои тексты и настройки, а библиотека показывает нужные экраны.", group: "Части платформы", body: broadUIFlows },
  { slug: "special-offer", title: "Второе предложение", description: "Как показать дополнительный экран покупки после того, как пользователь закрыл первый без оплаты.", purpose: "Показать второй экран по одному разрешающему флагу Adapty без скрытых условий.", when: "Когда настраиваете предложение после закрытия первого экрана оплаты.", outcome: "Второй экран показывает все полученные варианты и визуальный таймер на 24 часа.", group: "Монетизация", body: specialOffer },
  { slug: "adapty-setup", title: "Adapty: что нужно передать", description: "Два значения для загрузки экрана оплаты: публичный ключ приложения и имя нужного экрана в Adapty.", purpose: "Подключить Adapty без дополнительных проверяющих сервисов и лишних настроек.", when: "Перед первой загрузкой экрана оплаты или при добавлении нового места показа.", outcome: "Ключ передан один раз, нужный экран назван явно, все варианты покупки сохранены.", group: "Монетизация", body: adaptySetup },
  { slug: "paywall-ui", title: "Экран подписки", description: "Как показать ноль, один или много вариантов, загрузку, ошибку и восстановление покупки.", purpose: "Сделать экран подписки понятным при любом ответе Adapty.", when: "Когда реализуете или проверяете экран подписки.", outcome: "Все варианты видны, загрузка не мигает, повторные нажатия заблокированы.", group: "Монетизация", body: paywallUI },
  { slug: "token-paywall", title: "Покупка токенов", description: "Как показать все пакеты, провести покупку один раз и обновить баланс только после ответа сервера.", purpose: "Продавать пакеты токенов и не потерять варианты, настроенные в Adapty.", when: "Когда приложение продаёт расходуемый баланс вместо подписки.", outcome: "Все пакеты показаны, покупка подтверждена сервером, баланс обновлён ровно один раз.", group: "Монетизация", body: tokenPaywall },
  { slug: "ru-billing", title: "Оплата картой и СБП: будущая работа", description: "Какие решения ещё нужно утвердить до подключения российской оплаты в приложение.", purpose: "Не принять незавершённые контракты платформы за готовую инструкцию интеграции.", when: "Когда планируется СБП или банковская карта вместо оплаты Apple.", outcome: "Команда видит обязательные решения и не включает RU Billing до утверждения общего контракта.", group: "Монетизация", body: ruBilling },
  { slug: "architecture", title: "Как устроена платформа", description: "Как выбрать нужные библиотеки, что Xcode скачает автоматически и где должен жить каждый вид кода.", purpose: "Понять платформу от задач приложения до зависимостей, данных и владельца изменения.", when: "Перед первым подключением, изменением общей библиотеки или разбором спорного решения.", outcome: "Вы знаете, какие products добавить, что придёт автоматически и какой репозиторий менять.", group: "Архитектура", body: architecture },
  { slug: "onboarding-att", title: "Первые экраны и разрешение Apple", description: "Сколько может быть первых экранов и когда показать системный вопрос о разрешении отслеживания.", purpose: "Не ограничивать первый запуск тремя страницами и не показывать системное окно слишком рано.", when: "Когда настраиваете первый запуск приложения.", outcome: "Количество страниц задаёт приложение, а запрос Apple появляется после видимого первого экрана.", group: "Архитектура", body: onboardingATT },
  { slug: "runtime-reliability", title: "Запуск, ошибки и восстановление", description: "Что увидит человек при медленной сети, устаревших данных, двойном нажатии и незавершённой оплате.", purpose: "Сделать действия приложения предсказуемыми при ошибках и повторном запуске.", when: "Когда добавляете загрузку, кнопку повтора, кеш или финансовую операцию.", outcome: "У каждого действия есть загрузка, понятная ошибка, безопасный повтор и подтверждённый результат.", group: "Архитектура", body: runtimeReliability },
  { slug: "usedesk", title: "Чат поддержки Usedesk", description: "Что реально присылает менеджер и как из этих данных открыть готовый чат в приложении.", purpose: "Подключить Usedesk без придуманных требований, собственного экрана и лишней серверной архитектуры.", when: "Когда менеджер прислал Token, Company ID, Channel ID и web-script.", outcome: "Строка в настройках открывает готовый чат нужной компании и канала.", group: "Разработка", body: usedesk },
  { slug: "compatibility", title: "Какие версии ставить", description: "Таблица версий модулей, которые уже были собраны и проверены вместе.", purpose: "Не угадывать совместимые версии Swift Package.", when: "Перед подключением или обновлением любого модуля.", outcome: "Проект использует конкретный проверенный набор версий.", group: "Разработка", body: compatibility },
  { slug: "release-process", title: "Как выпускать новые версии", description: "Простой порядок выпуска модуля: проверка, тег версии, повторная проверка зависимых модулей и обновление каталога.", purpose: "Выпустить изменение и не сломать приложения, использующие другие модули.", when: "Когда меняется публичный API или готовится новый тег.", outcome: "Новая версия опубликована, зависимые модули проверены, каталог обновлён.", group: "Разработка", body: releaseProcess },
  { slug: "migration", title: "Почему платформу разделили", description: "Почему вместо одного большого BroadCore появились четыре библиотеки и отдельный каталог проверенных версий.", purpose: "Понять нынешнюю структуру и не собирать всю платформу обратно в одну обязательную библиотеку.", when: "Когда старые инструкции расходятся с текущими репозиториями.", outcome: "Вы знаете, где теперь находятся код, документация и проверенные версии.", group: "Разработка", body: migration },
  { slug: "documentation", title: "Как исправлять документацию", description: "Где лежит текст сайта, как предложить правку и как проверить картинки и ссылки.", purpose: "Синхронно обновлять сайт, Markdown в GitHub и документацию модулей.", when: "Когда меняется поведение платформы или инструкция непонятна.", outcome: "Правка находится в правильном репозитории и проходит проверку контента.", group: "Разработка", body: documentation },
];

export const docGroups = ["Старт", "Части платформы", "Монетизация", "Архитектура", "Разработка"] as const;
export function getDoc(slug: string) { return docs.find((doc) => doc.slug === slug); }
export function slugifyHeading(value: string) {
  return value.toLocaleLowerCase("ru-RU").replace(/[`*_]/g, "").replace(/[^a-zа-яё0-9]+/gi, "-").replace(/^-|-$/g, "");
}
