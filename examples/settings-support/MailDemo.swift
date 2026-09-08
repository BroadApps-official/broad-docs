import SwiftUI

@main struct SupportMailDemo: App {
    var body: some Scene { WindowGroup { DemoSettings().preferredColorScheme(.light) } }
}

struct DemoSettings: View {
    @State private var showMail = false
    @State private var unavailable = false
    @State private var copied = false
    var body: some View {
        NavigationStack {
            List {
                Section {
                    Label("Учебный пример · Simulator", systemImage: "play.rectangle")
                        .font(.subheadline).foregroundStyle(.blue)
                    Text("Демонстрация содержания письма. Это не системный экран Apple Mail.")
                        .font(.subheadline).foregroundStyle(.secondary)
                }
                Section("Поддержка") {
                    Button { showMail = true } label: { Label("Написать в поддержку", systemImage: "envelope") }
                    Button { unavailable = true } label: { Label("Если почта недоступна", systemImage: "envelope.badge") }
                }
                Section("Что получает поддержка") {
                    Label("Описание проблемы", systemImage: "text.alignleft")
                    Label("Версия приложения и iOS", systemImage: "iphone")
                    Label("ID аккаунта приложения", systemImage: "person.crop.circle")
                    Label("Очищенная диагностика", systemImage: "doc.text")
                }
                Section { Text("Все данные вымышлены. Отправка отключена.").font(.footnote).foregroundStyle(.secondary) }
            }.navigationTitle("Поддержка")
            .sheet(isPresented: $showMail) { DemoLetter() }
            .alert("Почта недоступна", isPresented: $unavailable) {
                Button("Скопировать адрес") { UIPasteboard.general.string = "support@example.com"; copied = true }
                Button("Закрыть", role: .cancel) {}
            } message: { Text("Напишите нам из удобного почтового приложения:\nsupport@example.com") }
            .overlay(alignment: .bottom) { if copied { Text("Адрес скопирован").font(.subheadline.bold()).padding().background(.regularMaterial,in:Capsule()).padding(.bottom,20) } }
        }
    }
}

struct DemoLetter: View {
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text("ДЕМОНСТРАЦИЯ · НЕ APPLE MAIL")
                        .font(.caption.bold()).foregroundStyle(.blue)
                        .padding(12).frame(maxWidth:.infinity).background(Color.blue.opacity(0.08),in:RoundedRectangle(cornerRadius:12))
                    Group {
                        LabeledContent("Кому", value: "support@example.com")
                        Divider()
                        LabeledContent("Тема", value: "[Demo App] Support")
                        Divider()
                    }.font(.subheadline)
                    Text("Здравствуйте! Нужна помощь с приложением.").font(.body)
                    Text("Что случилось\nПосле нажатия кнопки экран не открылся.\n\nКак повторить\n1. Открыть настройки.\n2. Нажать нужный пункт.\n\nОжидаемый результат\nОткрывается следующий экран.")
                    Divider()
                    Text("Данные для поддержки").font(.headline)
                    Text("App: Demo App\nVersion: 1.0 (100)\niOS: 26.3\nDevice: iPhone Simulator\nLocale: ru_RU\nAccount ID: DEMO-ACCOUNT\nSubscription: inactive")
                        .font(.system(.subheadline,design:.monospaced)).foregroundStyle(.secondary)
                    Label("support-log.txt · пример вложения",systemImage:"doc.text").font(.subheadline)
                        .padding().frame(maxWidth:.infinity,alignment:.leading).background(Color(.secondarySystemBackground),in:RoundedRectangle(cornerRadius:12))
                    Text("В настоящем письме вложение содержит только очищенную диагностику. Токены, пароли и платёжные данные исключаются.")
                        .font(.footnote).foregroundStyle(.secondary)
                    Text("Отправка отключена в демонстрации").font(.footnote.bold()).foregroundStyle(.blue)
                }.padding(20)
            }.navigationTitle("Письмо в поддержку").navigationBarTitleDisplayMode(.inline)
                .toolbar { ToolbarItem(placement:.topBarLeading) { Button("Закрыть") { dismiss() } } }
        }
    }
}
