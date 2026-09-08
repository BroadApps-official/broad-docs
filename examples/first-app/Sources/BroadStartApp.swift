import BroadExtensions
import SwiftUI

@main
struct BroadStartApp: App {
    @StateObject private var model: LessonListModel

    init() {
        let repository = DemoLessonRepository()
        let loadLessons = LoadLessonsUseCase(repository: repository)
        _model = StateObject(wrappedValue: LessonListModel(loadLessons: loadLessons))
    }

    var body: some Scene {
        WindowGroup {
            LessonListView(model: model)
                .tint(Color(broadHex: "245FDC") ?? .blue)
        }
    }
}
