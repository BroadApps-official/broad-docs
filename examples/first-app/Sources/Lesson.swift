import Foundation

struct Lesson: Identifiable, Equatable, Sendable {
    let id: String
    let title: String
    let summary: String
    let symbol: String
    let minutes: Int
    let paragraphs: [String]
}

enum DemoMode: String, CaseIterable, Identifiable, Sendable {
    case content = "Список"
    case empty = "Пусто"
    case failure = "Ошибка"

    var id: Self { self }
}

protocol LessonRepository: Sendable {
    func lessons(mode: DemoMode) async throws -> [Lesson]
}

struct LoadLessonsUseCase: Sendable {
    let repository: any LessonRepository

    func callAsFunction(mode: DemoMode) async throws -> [Lesson] {
        try await repository.lessons(mode: mode)
    }
}
