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
  group: "Старт" | "Модули" | "Монетизация" | "Архитектура" | "Разработка";
  body: string;
};

export const docs: DocEntry[] = [
  { slug: "getting-started", title: "Первое подключение", description: "Выберите одну нужную часть платформы, добавьте её в Xcode и убедитесь, что приложение работает.", purpose: "Подключить платформу к приложению без лишних модулей.", when: "Когда добавляете BroadApps в новый или существующий Xcode-проект.", outcome: "Выбранный модуль загружен, приложение собирается и нужная функция открывается.", group: "Старт", body: gettingStarted },
  { slug: "app-creation", title: "Создание приложения", description: "Понятный маршрут создания приложения вручную или с Codex/Claude.", purpose: "Провести новое приложение от исходных требований до передачи в QA.", when: "До первого изменения Swift-кода нового приложения.", outcome: "Есть подтверждённый план, один рабочий сценарий и список оставшихся проверок.", group: "Старт", body: appCreation },
  { slug: "module-selection", title: "Какой модуль выбрать", description: "Четыре вопроса, которые приводят к нужной библиотеке платформы.", purpose: "Не подключать всю платформу, когда приложению нужна одна функция.", when: "Перед добавлением Swift Package в Xcode.", outcome: "Вы знаете название одного стартового модуля и его автоматические зависимости.", group: "Старт", body: moduleSelection },
  { slug: "public-package-access", title: "Подключение без пароля", description: "Что делать, если Xcode неожиданно просит GitHub-пароль или открывает Keychain.", purpose: "Подключить публичные модули без аккаунта, токена и старого private BroadCore.", when: "Когда Xcode просит авторизацию или не может скачать package.", outcome: "В проекте стоят публичные GitHub-адреса и Xcode скачивает их анонимно.", group: "Старт", body: publicPackageAccess },
  { slug: "legacy-broadcore", title: "Старый BroadCore: куда переехал", description: "Старый репозиторий больше не используется; здесь указаны новые адреса и безопасный переход.", purpose: "Не принять архивный BroadCore за актуальную платформу.", when: "Когда ссылка или поиск привели в BroadApps-official/BroadCore.", outcome: "Вы открыли актуальный модуль или инструкцию миграции.", group: "Старт", body: legacyBroadCore },
  { slug: "legacy-app-migration", title: "Переход со старого BroadCore", description: "Замените старое подключение новыми модулями, сохранив рабочее приложение и путь назад.", purpose: "Перевести существующее приложение без большого переписывания.", when: "Когда в проекте есть private BroadCore, локальный package или скопированные файлы платформы.", outcome: "Старое подключение удалено только после проверки каждого рабочего сценария.", group: "Старт", body: legacyAppMigration },
  { slug: "glossary", title: "Словарь без жаргона", description: "Обычным русским языком: package, product, target, placement, entitlement, gate и другие термины.", purpose: "Быстро расшифровать незнакомое слово из инструкции.", when: "Когда термин мешает понять действие или результат.", outcome: "Вы понимаете термин и можете вернуться к конкретному шагу инструкции.", group: "Старт", body: glossary },
  { slug: "broad-core", title: "BroadCore", description: "Основа запуска приложения: последовательность старта, кеш, повтор запросов и безопасные логи.", purpose: "Дать приложению общие механизмы запуска и восстановления после ошибок.", when: "Когда нужен запуск, кеш, логи, повтор запроса или ATT.", outcome: "Приложение запускает критические шаги по порядку и понятно сообщает об ошибках.", group: "Модули", body: broadCore },
  { slug: "broad-extensions", title: "BroadExtensions", description: "Небольшие Swift-утилиты для цвета, клавиатуры и навигации — без SDK и оплаты.", purpose: "Переиспользовать безопасные Swift-утилиты без остальных модулей.", when: "Когда нужны только маленькие расширения языка или интерфейса.", outcome: "Приложение получает утилиты и не тянет Core, Adapty или готовые экраны.", group: "Модули", body: broadExtensions },
  { slug: "broad-monetization", title: "BroadMonetization", description: "Загрузка продуктов, покупка, восстановление и подтверждение Premium без готового интерфейса.", purpose: "Использовать общую платёжную логику со своим дизайном экранов.", when: "Когда приложение само рисует paywall, но не хочет заново писать оплату.", outcome: "UI получает все продукты и открывает Premium только после подтверждения доступа.", group: "Модули", body: broadMonetization },
  { slug: "broad-ui-flows", title: "BroadUIFlows", description: "Готовые SwiftUI-экраны первого запуска, paywall, оплаты и маршрутизации.", purpose: "Быстро добавить готовые пользовательские сценарии поверх платёжной логики.", when: "Когда приложению нужны готовые экраны, а не только API оплаты.", outcome: "Приложение передаёт тексты и настройки, а модуль показывает нужный сценарий.", group: "Модули", body: broadUIFlows },
  { slug: "special-offer", title: "Special Offer", description: "Когда и как показывается второе предложение после закрытия обычного paywall.", purpose: "Показать второй paywall по одному флагу Adapty без скрытых условий.", when: "Когда настраиваете предложение после закрытия первого paywall.", outcome: "Показываются все продукты ответа Adapty и простой визуальный таймер на 24 часа.", group: "Монетизация", body: specialOffer },
  { slug: "adapty-setup", title: "Adapty: ключ и placements", description: "Какие значения хранит приложение и что платформа показывает из ответа Adapty.", purpose: "Подключить Adapty без лишних слоёв конфигурации.", when: "Перед первым запросом paywall или при добавлении нового placement.", outcome: "Ключ задан один раз, placement выбран явно, все полученные продукты сохранены.", group: "Монетизация", body: adaptySetup },
  { slug: "paywall-ui", title: "Экран подписки", description: "Как показать ноль, один или много продуктов, загрузку, ошибку и восстановление покупки.", purpose: "Сделать paywall понятным и устойчивым при любом ответе Adapty.", when: "Когда реализуете или проверяете экран подписки.", outcome: "Все продукты видны, загрузка не мигает, повторные нажатия заблокированы.", group: "Монетизация", body: paywallUI },
  { slug: "token-paywall", title: "Покупка токенов", description: "Экран расходуемых пакетов: показываем всё, что вернул placement, без скрытой фильтрации.", purpose: "Продавать пакеты токенов и не потерять варианты из Adapty.", when: "Когда приложение использует расходуемый баланс вместо подписки.", outcome: "Все пакеты отображены, покупка подтверждена сервером, баланс обновлён один раз.", group: "Монетизация", body: tokenPaywall },
  { slug: "ru-billing", title: "Оплата картой и СБП", description: "Когда российская оплата доступна, какие экраны пройти и почему возврат из браузера ещё не успех.", purpose: "Безопасно добавить оплату через backend приложения.", when: "Когда подключаете СБП или банковскую карту вне StoreKit.", outcome: "Оплата доступна только при подтверждённых условиях, а Premium открывает backend.", group: "Монетизация", body: ruBilling },
  { slug: "architecture", title: "Как устроена платформа", description: "Что лежит в четырёх модулях, что остаётся в приложении и зачем репозитории разделены.", purpose: "Понять границы платформы до изменения кода или зависимостей.", when: "Когда выбираете модуль, проектируете интеграцию или проверяете спорное решение.", outcome: "Каждый код и параметр имеет одного понятного владельца.", group: "Архитектура", body: architecture },
  { slug: "onboarding-att", title: "Первые экраны и ATT", description: "Сколько может быть первых экранов и когда разрешено показывать системный запрос Apple.", purpose: "Не привязывать onboarding к трём экранам и не показывать ATT слишком рано.", when: "Когда настраиваете первый запуск приложения.", outcome: "Количество страниц задаёт приложение, ATT появляется только после видимого первого экрана.", group: "Архитектура", body: onboardingATT },
  { slug: "runtime-reliability", title: "Запуск, ошибки и восстановление", description: "Как приложение ведёт себя при медленной сети, старом кеше, повторном нажатии и незавершённой оплате.", purpose: "Сделать пользовательские сценарии предсказуемыми при ошибках и повторном запуске.", when: "Когда добавляете загрузку, Retry, кеш или финансовую операцию.", outcome: "У каждого сценария есть загрузка, ошибка, повтор и подтверждённый конечный результат.", group: "Архитектура", body: runtimeReliability },
  { slug: "usedesk", title: "Чат поддержки Usedesk", description: "Где открыть чат, как получить токен и что делать при ошибке или смене аккаунта.", purpose: "Добавить поддержку как отдельное действие из настроек.", when: "Когда приложению нужен чат Usedesk.", outcome: "Чат открывается по нажатию, корректно восстанавливается и не запускается при старте приложения.", group: "Разработка", body: usedesk },
  { slug: "compatibility", title: "Какие версии ставить", description: "Таблица версий модулей, которые уже были собраны и проверены вместе.", purpose: "Не угадывать совместимые версии Swift Package.", when: "Перед подключением или обновлением любого модуля.", outcome: "Проект использует конкретный проверенный набор версий.", group: "Разработка", body: compatibility },
  { slug: "release-process", title: "Как выпускать новые версии", description: "Простой порядок выпуска модуля: проверка, тег версии, повторная проверка зависимых модулей и обновление каталога.", purpose: "Выпустить изменение и не сломать приложения, использующие другие модули.", when: "Когда меняется публичный API или готовится новый тег.", outcome: "Новая версия опубликована, зависимые модули проверены, каталог обновлён.", group: "Разработка", body: releaseProcess },
  { slug: "migration", title: "Почему платформу разделили", description: "Как старый общий репозиторий превратился в четыре независимых модуля и интеграционный каталог.", purpose: "Понять происхождение нынешней структуры и не возвращать общий umbrella-package.", when: "Когда старые инструкции расходятся с текущими репозиториями.", outcome: "Вы знаете, где теперь живёт код, документация и проверенные версии.", group: "Разработка", body: migration },
  { slug: "documentation", title: "Как исправлять документацию", description: "Где лежит текст сайта, как предложить правку и как проверить картинки и ссылки.", purpose: "Синхронно обновлять сайт, Markdown в GitHub и документацию модулей.", when: "Когда меняется поведение платформы или инструкция непонятна.", outcome: "Правка находится в правильном репозитории и проходит проверку контента.", group: "Разработка", body: documentation },
];

export const docGroups = ["Старт", "Модули", "Монетизация", "Архитектура", "Разработка"] as const;
export function getDoc(slug: string) { return docs.find((doc) => doc.slug === slug); }
export function slugifyHeading(value: string) {
  return value.toLocaleLowerCase("ru-RU").replace(/[`*_]/g, "").replace(/[^a-zа-яё0-9]+/gi, "-").replace(/^-|-$/g, "");
}
