import BroadCore
import Foundation

/// Local, deterministic teaching data. This repository makes no network requests.
struct DemoLessonRepository: LessonRepository {
    func lessons(mode: DemoMode) async throws -> [Lesson] {
        // A visible delay lets readers check loading and repeated taps.
        try await Task.sleep(nanoseconds: 800_000_000)
        switch mode {
        case .empty:
            return []
        case .failure:
            throw AppError(
                kind: .offline,
                userMessage: "Это учебная ошибка загрузки. Нажмите «Повторить со списком».",
                diagnosticCode: "demo.offline",
                isRetryable: true
            )
        case .content:
            return [
                Lesson(
                    id: "connection", title: "Подключаем платформу",
                    summary: "От адреса GitHub до первого запуска.",
                    symbol: "shippingbox", minutes: 5,
                    paragraphs: [
                        "В этом приложении два модуля. BroadCore описывает загрузку, содержимое и ошибку. BroadExtensions помогает задать цвет по HEX-коду.",
                        "Xcode скачивает исходники по публичным адресам GitHub. Оба product добавлены в target BroadStart, потому что приложение напрямую использует оба модуля.",
                        "Каталог учебный: материалы находятся в DemoLessonRepository. Он не обращается к интернету. Заменять его серверным источником нужно только после согласования адреса, формата ответа и правил доступа."
                    ]
                ),
                Lesson(
                    id: "states", title: "Проверяем состояния",
                    summary: "Загрузка, пустой список и понятная ошибка.",
                    symbol: "arrow.triangle.2.circlepath", minutes: 4,
                    paragraphs: [
                        "Обновление не убирает уже открытый список. LoadableState хранит предыдущие материалы, пока выполняется запрос.",
                        "Кнопка становится недоступной до создания Task. Повторное нажатие не создаёт второй запрос.",
                        "Выберите «Пусто» или «Ошибка» на главном экране. Это специально подготовленные локальные сценарии, а не настоящий сбой сети."
                    ]
                ),
                Lesson(
                    id: "next", title: "Добавляем свою функцию",
                    summary: "Один законченный пользовательский путь.",
                    symbol: "square.stack.3d.up", minutes: 6,
                    paragraphs: [
                        "Сначала определите экран, его состояния и источник данных. Затем реализуйте один путь целиком: действие пользователя, получение результата и отображение.",
                        "Тексты, дизайн и правила продукта остаются в приложении. Общий модуль не должен знать его бренд или адрес сервера.",
                        "Если потребуется подписка, выберите BroadMonetization для собственного интерфейса или BroadUIFlows для готового сценария. Получите конфигурацию именно своего приложения до подключения оплаты."
                    ]
                )
            ]
        }
    }
}
