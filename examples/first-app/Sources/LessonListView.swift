import BroadCore
import SwiftUI

struct LessonListView: View {
    @ObservedObject var model: LessonListModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    introduction
                    content
                    demoControls
                }
                .padding(24)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("BroadStart")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button { model.load() } label: {
                        if model.state.isLoading {
                            ProgressView().accessibilityLabel("Загрузка материалов")
                        } else {
                            Image(systemName: "arrow.clockwise")
                        }
                    }
                    .accessibilityLabel("Обновить материалы")
                    .disabled(model.state.isLoading)
                }
            }
            .task {
                if case .idle = model.state { model.load() }
            }
        }
    }

    private var introduction: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("ПЕРВЫЙ ПРОЕКТ", systemImage: "sparkle")
                .font(.caption.weight(.semibold)).foregroundStyle(.blue)
            Text("Разберёмся\nна практике.")
                .font(.system(size: 34, weight: .bold, design: .rounded))
            Text("Три коротких материала о платформе. Откройте любой и вернитесь к списку.")
                .foregroundStyle(.secondary)
        }
    }

    @ViewBuilder private var content: some View {
        if let lessons = model.state.value, !lessons.isEmpty {
            // One stable list branch preserves the screen during a refresh.
            VStack(spacing: 12) {
                ForEach(lessons) { lesson in
                    NavigationLink {
                        LessonDetailView(lesson: lesson)
                    } label: { lessonRow(lesson) }
                    .buttonStyle(.plain)
                }
            }
            if let error = model.state.error { failureNotice(error) }
        } else {
            switch model.state {
            case .idle, .loading:
                ProgressView("Открываем материалы…")
                    .frame(maxWidth: .infinity, minHeight: 220)
            case .empty:
                ContentUnavailableView(
                    "Материалов пока нет", systemImage: "tray",
                    description: Text("В учебном режиме выбран пустой ответ. Переключитесь на «Список» ниже.")
                )
            case let .error(error, _):
                failureNotice(error)
            case .loaded, .stale:
                EmptyView()
            }
        }
    }

    private func lessonRow(_ lesson: Lesson) -> some View {
        HStack(alignment: .top, spacing: 14) {
            Image(systemName: lesson.symbol)
                .font(.title3).foregroundStyle(.blue)
                .frame(width: 42, height: 42)
                .background(.blue.opacity(0.08), in: RoundedRectangle(cornerRadius: 12))
            VStack(alignment: .leading, spacing: 6) {
                Text(lesson.title).font(.headline).foregroundStyle(.primary)
                Text(lesson.summary).font(.subheadline).foregroundStyle(.secondary)
                Text("\(lesson.minutes) мин чтения").font(.caption).foregroundStyle(.secondary)
            }
            Spacer(minLength: 0)
            Image(systemName: "chevron.right").font(.caption.bold()).foregroundStyle(.tertiary)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 20))
    }

    private func failureNotice(_ error: AppError) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            Label("Не получилось обновить", systemImage: "wifi.slash").font(.headline)
            Text(error.userMessage).foregroundStyle(.secondary)
            Button("Повторить со списком") { model.load(mode: .content) }
                .buttonStyle(.borderedProminent)
                .disabled(model.state.isLoading)
        }
        .padding(20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 20))
    }

    private var demoControls: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("ПРОВЕРКА СОСТОЯНИЙ").font(.caption.weight(.semibold)).foregroundStyle(.secondary)
            Picker("Ответ учебного источника", selection: Binding(
                get: { model.mode }, set: { model.load(mode: $0) }
            )) {
                ForEach(DemoMode.allCases) { Text($0.rawValue).tag($0) }
            }
            .pickerStyle(.segmented)
            .disabled(model.state.isLoading)
            Text("Учебный пример · локальные данные.\nПереключатель имитирует ответы; интернет не используется.")
                .font(.footnote).foregroundStyle(.secondary)
        }
    }
}

struct LessonDetailView: View {
    let lesson: Lesson

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                Image(systemName: lesson.symbol).font(.largeTitle).foregroundStyle(.blue)
                Text(lesson.title).font(.largeTitle.bold())
                Text("\(lesson.minutes) мин · Учебный материал").font(.subheadline).foregroundStyle(.secondary)
                ForEach(lesson.paragraphs, id: \.self) { Text($0).lineSpacing(5) }
            }
            .padding(24)
        }
        .navigationTitle("Материал")
        .navigationBarTitleDisplayMode(.inline)
    }
}
