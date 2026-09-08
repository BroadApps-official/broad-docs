import BroadCore
import Combine
import Foundation

@MainActor
final class LessonListModel: ObservableObject {
    @Published private(set) var state: LoadableState<[Lesson]> = .idle
    @Published private(set) var mode: DemoMode = .content
    private let loadLessons: LoadLessonsUseCase
    private var task: Task<Void, Never>?

    init(loadLessons: LoadLessonsUseCase) {
        self.loadLessons = loadLessons
    }

    func load(mode nextMode: DemoMode? = nil) {
        guard !state.isLoading else { return }
        if let nextMode { mode = nextMode }
        let requestMode = mode
        let previousState = state
        let previousValue = state.value
        state = state.beginLoading()

        task = Task { [weak self, loadLessons] in
            do {
                let lessons = try await loadLessons(mode: requestMode)
                try Task.checkCancellation()
                self?.state = lessons.isEmpty ? .empty : .loaded(lessons)
            } catch is CancellationError {
                self?.state = previousState
            } catch {
                let failure = error as? AppError ?? AppError(
                    kind: .unknown,
                    userMessage: "Не удалось открыть материалы. Попробуйте ещё раз.",
                    diagnosticCode: "lessons.load.failed",
                    isRetryable: true
                )
                // These read-only teaching materials are safe to keep during a failed refresh.
                if let previousValue {
                    self?.state = .stale(value: previousValue, error: failure)
                } else {
                    self?.state = .error(failure, previousValue: nil)
                }
            }
        }
    }

    deinit { task?.cancel() }
}
