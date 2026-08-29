export type TechnicalTerm = { label: string; definition: string; patterns: RegExp[] };

export const technicalTerms: TechnicalTerm[] = [
  { label: "Swift Package", definition: "Библиотека, которую Xcode скачивает и подключает к приложению.", patterns: [/Swift Package/i, /SwiftPM/i] },
  { label: "Repository / репозиторий", definition: "Отдельная папка проекта с собственной историей Git и адресом на GitHub.", patterns: [/\brepositor(?:y|ies)\b/i, /репозитори[йяею]/i] },
  { label: "Product", definition: "Готовая библиотека внутри Swift Package, которую добавляют в приложение.", patterns: [/\bproducts?\b/i] },
  { label: "Target", definition: "Цель сборки в Xcode — например основное iPhone-приложение.", patterns: [/\btargets?\b/i] },
  { label: "Host app", definition: "Конкретное iPhone-приложение, которое использует платформу.", patterns: [/host app/i] },
  { label: "Bootstrap", definition: "Последовательность действий при запуске приложения: конфигурация, кеш и загрузка данных.", patterns: [/bootstrap/i] },
  { label: "Composition root", definition: "Одно место при запуске приложения, где создаются SDK, сервисы и зависимости.", patterns: [/composition root/i] },
  { label: "Placement", definition: "Имя места показа в Adapty; по нему сервис возвращает нужный paywall и продукты.", patterns: [/placements?/i] },
  { label: "Paywall", definition: "Экран с вариантами подписки или покупки.", patterns: [/paywalls?/i] },
  { label: "Entitlement", definition: "Подтверждённое право пользователя на Premium или другую купленную функцию.", patterns: [/entitlement/i] },
  { label: "Payload", definition: "Данные, которые вернул внешний сервис или backend.", patterns: [/payload/i] },
  { label: "Provider", definition: "Внешний источник данных или оплаты, например Adapty, StoreKit или backend приложения.", patterns: [/provider/i] },
  { label: "Fallback", definition: "Запасной безопасный вариант, когда основной источник недоступен.", patterns: [/fallback/i] },
  { label: "Cache / кеш", definition: "Локальная сохранённая копия данных для быстрого или офлайн-запуска.", patterns: [/\bcache\b/i, /кеш/i] },
  { label: "Runtime", definition: "Момент, когда собранное приложение уже запущено и работает.", patterns: [/runtime/i] },
  { label: "Adapter", definition: "Небольшая прослойка, которая переводит API внешнего сервиса в понятные платформе данные.", patterns: [/adapters?/i] },
  { label: "Boundary", definition: "Явная граница ответственности между приложением, платформой и внешним сервисом.", patterns: [/boundar(?:y|ies)/i] },
  { label: "Gate", definition: "Автоматическая проверка, которая должна завершиться успешно перед выпуском изменений.", patterns: [/(?:^|\s)gates?(?:\s|[.,;:]|$)/im] },
  { label: "Fixture / probe", definition: "Безопасный демонстрационный сценарий: проверяет код, но не списывает деньги и не меняет реальные данные.", patterns: [/fixtures?/i, /probes?/i] },
  { label: "Acceptance", definition: "Финальная приёмка по заранее записанному списку ожидаемых результатов.", patterns: [/acceptance/i] },
  { label: "Vertical slice", definition: "Один законченный пользовательский сценарий от экрана до данных, например открытие paywall.", patterns: [/vertical slice/i] },
  { label: "Cutover", definition: "Момент переключения со старого подключения платформы на новое.", patterns: [/cutover/i] },
  { label: "ATT", definition: "Системный запрос Apple на разрешение отслеживания пользователя.", patterns: [/\bATT\b/] },
  { label: "Backend", definition: "Сервер приложения, который хранит данные и подтверждает операции.", patterns: [/backend/i] },
  { label: "SDK", definition: "Готовый набор кода внешнего сервиса, подключённый как библиотека.", patterns: [/\bSDK\b/i] },
  { label: "Debug / Release", definition: "Тестовая и предназначенная для выпуска конфигурации сборки приложения.", patterns: [/\bDebug\b/i, /\bRelease\b/i] },
  { label: "QA", definition: "Этап проверки приложения специалистом по качеству после проверки разработчиком.", patterns: [/\bQA\b/i] },
];

export function termsForText(text: string) {
  return technicalTerms.filter((term) => term.patterns.some((pattern) => pattern.test(text)));
}
