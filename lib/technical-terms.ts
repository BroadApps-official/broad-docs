export type TechnicalTerm = { label: string; definition: string; patterns: RegExp[] };

export const technicalTerms: TechnicalTerm[] = [
  { label: "Swift Package", definition: "Готовая библиотека, которую Xcode скачивает по адресу GitHub и добавляет в проект.", patterns: [/Swift Package/i, /SwiftPM/i] },
  { label: "Repository / репозиторий", definition: "Отдельный проект на GitHub со своими файлами и историей изменений.", patterns: [/\brepositor(?:y|ies)\b/i, /репозитори[йяею]/i] },
  { label: "Product", definition: "Библиотека, которую нужно отметить в окне Xcode после добавления адреса GitHub.", patterns: [/\bproducts?\b/i] },
  { label: "Target", definition: "То, куда Xcode добавит библиотеку; здесь почти всегда основное iPhone-приложение.", patterns: [/\btargets?\b/i] },
  { label: "Host app", definition: "Само приложение компании, которое подключает общий код платформы.", patterns: [/host app/i] },
  { label: "Bootstrap", definition: "Действия при запуске: создать общие сервисы, прочитать сохранённые данные и открыть первый экран.", patterns: [/bootstrap/i] },
  { label: "Composition root", definition: "Одно стартовое место, где приложение создаёт подключённые библиотеки и передаёт им настройки.", patterns: [/composition root/i] },
  { label: "Placement", definition: "Имя нужного экрана в Adapty, например main или tokens.", patterns: [/placements?/i] },
  { label: "Paywall", definition: "Экран, на котором человек выбирает подписку или покупку.", patterns: [/paywalls?/i] },
  { label: "Entitlement", definition: "Подтверждение от системы оплаты, что пользователю действительно доступен Premium.", patterns: [/entitlement/i] },
  { label: "Payload", definition: "Набор данных, который вернул Adapty или сервер приложения.", patterns: [/payload/i] },
  { label: "Provider", definition: "Сервис, который вернул данные или провёл оплату, например Adapty, Apple или сервер приложения.", patterns: [/provider/i] },
  { label: "Fallback", definition: "Запасной безопасный вариант, когда основной источник недоступен.", patterns: [/fallback/i] },
  { label: "Cache / кеш", definition: "Локальная сохранённая копия данных для быстрого или офлайн-запуска.", patterns: [/\bcache\b/i, /кеш/i] },
  { label: "Runtime", definition: "Работа уже запущенного приложения, а не его сборка в Xcode.", patterns: [/runtime/i] },
  { label: "Adapter", definition: "Небольшая прослойка, которая переводит API внешнего сервиса в понятные платформе данные.", patterns: [/adapters?/i] },
  { label: "Boundary", definition: "Правило о том, какая часть системы отвечает за конкретное действие или данные.", patterns: [/boundar(?:y|ies)/i] },
  { label: "Gate", definition: "Автоматическая проверка, которая должна завершиться успешно перед выпуском изменений.", patterns: [/(?:^|\s)gates?(?:\s|[.,;:]|$)/im] },
  { label: "Fixture / probe", definition: "Демонстрационная проверка кода без настоящей покупки и изменения данных пользователя.", patterns: [/fixtures?/i, /probes?/i] },
  { label: "Acceptance", definition: "Финальная приёмка по заранее записанному списку ожидаемых результатов.", patterns: [/acceptance/i] },
  { label: "Vertical slice", definition: "Одна функция приложения целиком: от нажатия на экран до получения результата.", patterns: [/vertical slice/i] },
  { label: "Cutover", definition: "Один шаг, в котором старую библиотеку отключают, а новую подключают.", patterns: [/cutover/i] },
  { label: "ATT", definition: "Системный запрос Apple на разрешение отслеживания пользователя.", patterns: [/\bATT\b/] },
  { label: "Backend", definition: "Сервер приложения: он хранит данные аккаунта и подтверждает операции.", patterns: [/backend/i] },
  { label: "SDK", definition: "Готовая библиотека внешнего сервиса, например Adapty или Usedesk.", patterns: [/\bSDK\b/i] },
  { label: "Debug / Release", definition: "Тестовая и предназначенная для выпуска конфигурации сборки приложения.", patterns: [/\bDebug\b/i, /\bRelease\b/i] },
  { label: "QA", definition: "Этап проверки приложения специалистом по качеству после проверки разработчиком.", patterns: [/\bQA\b/i] },
];

export function termsForText(text: string) {
  return technicalTerms.filter((term) => term.patterns.some((pattern) => pattern.test(text)));
}
