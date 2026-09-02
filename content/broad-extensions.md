# BroadExtensions

`BroadExtensions` — маленький независимый набор SwiftUI/UIKit-утилит. Он решает локальные UI-задачи: прочитать HEX-цвет, зарегистрировать шрифт, закрыть клавиатуру по tap и вернуть системный жест назад.

> Пример: дизайн передал цвет `#4F8CFF`. Вместо копирования собственного HEX-parser в очередное приложение разработчик подключает только `BroadExtensions` и получает `Color(broadHex: "#4F8CFF")`.

## Почему это отдельный модуль

Для таких маленьких функций не нужны запуск платформы, платёжная система или готовые экраны. Поэтому `BroadExtensions` не зависит от других BroadApps-библиотек и не тянет Adapty, StoreKit или Swinject.

Это важно для небольших приложений и отдельных targets: можно взять одну полезную утилиту, не превращая её в скрытое подключение всей платформы.

## Четыре готовые задачи

### HEX-цвет без собственного parser

```swift
let accent = Color(broadHex: "#4F8CFF")
let overlay = UIColor(broadHex: "101828CC")
let shortGreen = BroadRGBAColor(hex: "#0F08")
```

Поддерживаются формы RGB, RGBA, RRGGBB и RRGGBBAA. Решётка `#` необязательна. Неверная строка возвращает `nil`, поэтому приложение не получает случайный «запасной» цвет и может сразу заметить ошибку конфигурации.

| Строка | Смысл |
|---|---|
| `#0AF` | Короткие RGB-каналы |
| `#0AF8` | Короткие RGB + alpha |
| `#4F8CFF` | Полный RGB |
| `101828CC` | Полный RGB + alpha |

### Свои шрифты и Dynamic Type

```swift
try BroadFontRegistrar.register(
    resourceNames: ["Inter-Regular", "Inter-Bold"],
    withExtension: "ttf",
    in: .main
)

let title = Font.broadCustom("Inter-Bold", size: 28, relativeTo: .title)
let body = UIFont.broadCustom("Inter-Regular", size: 16)
```

Registrar ищет конкретные ресурсы в переданном bundle и сообщает typed-ошибку, если файл отсутствует или не зарегистрировался. `relativeTo` сохраняет поддержку системного Dynamic Type — пользователь может увеличить текст в настройках iPhone.

Шрифты и их файлы принадлежат приложению. Модуль знает только безопасный способ регистрации и создания `Font`/`UIFont`.

### Закрытие клавиатуры по tap

```swift
Form {
    TextField("Email", text: $email)
}
.broadDismissKeyboardOnTap()
```

Modifier добавляет simultaneous gesture: tap закрывает клавиатуру, но не «съедает» нажатие дочерней кнопки или строки. Это удобнее, чем добавлять глобальный gesture поверх всего приложения.

### Системный swipe-back при скрытой кнопке Back

```swift
DetailView()
    .navigationBarBackButtonHidden(true)
    .broadInteractiveSwipeBack()
```

Когда приложение рисует собственную кнопку назад, SwiftUI может потерять системный свайп от левого края. Modifier локально возвращает этот gesture для нужного экрана, сохраняет прежний delegate и восстанавливает его после закрытия.

> Важно: это не новая навигационная система и не глобальный swizzling. Modifier применяется только к экрану, которому действительно нужен системный жест.

## Что выбрать для конкретной задачи

| Нужно | Используйте | Не нужно подключать |
|---|---|---|
| Превратить HEX в `Color` или `UIColor` | `Color.init?(broadHex:)`, `UIColor.init?(broadHex:)` | Core и оплату |
| Разобрать цвет без UI-типа | `BroadRGBAColor` | SwiftUI view |
| Зарегистрировать bundled fonts | `BroadFontRegistrar.register(...)` | Собственный registrar в каждом app |
| Создать масштабируемый custom font | `Font.broadCustom(...)`, `UIFont.broadCustom(...)` | Жёсткий размер без Dynamic Type |
| Закрыть клавиатуру по tap | `.broadDismissKeyboardOnTap()` | Глобальный прозрачный overlay |
| Вернуть edge swipe-back | `.broadInteractiveSwipeBack()` | Собственный navigation coordinator |

## Чего здесь намеренно нет

- bootstrap, кеша, timeout и логирования — это `BroadCore`;
- purchase, restore и Premium — это `BroadMonetization`;
- onboarding, paywall и готовых экранов — это `BroadUIFlows`;
- фирменных цветов, картинок и шрифтов конкретного приложения;
- product IDs, placements, URL или ключей;
- общих extensions без префикса `broad`, которые могли бы конфликтовать с кодом приложения;
- глобального изменения поведения всех navigation controllers.

## Как подключить

В Xcode откройте `File → Add Package Dependencies…` и вставьте:

```text
https://github.com/BroadApps-official/broad-extensions-ios.git
```

Выберите product `BroadExtensions` только для target, где нужны helpers, затем добавьте:

```swift
import BroadExtensions
```

Текущая проверенная версия — [`1.0.1`](https://github.com/BroadApps-official/broad-extensions-ios/releases/tag/1.0.1).

## Что проверить после подключения

1. Xcode скачивает package по публичному HTTPS без логина и токена.
2. В dependency graph не появились Core, Adapty, StoreKit или UIFlows.
3. Неверный HEX возвращает `nil`, а корректные 3/4/6/8-digit варианты дают ожидаемые каналы.
4. Отсутствующий файл шрифта возвращает ошибку, а не молча подменяется системным шрифтом.
5. Tap вне поля закрывает клавиатуру и не блокирует кнопку внутри формы.
6. Swipe-back работает только на нужном экране и корректно восстанавливается после закрытия.
7. Приложение собирается в Debug и Release.

## Где посмотреть живые примеры

В репозитории есть `BroadExtensionsGallery`. Она запускается на iPhone Simulator и показывает реальные production helpers: набор HEX-цветов, форму с закрытием клавиатуры и detail screen со swipe-back.

```bash
bash Scripts/generate_gallery.sh
open Examples/BroadExtensionsGallery/BroadExtensionsGallery.xcodeproj
```

Gallery проверяет поведение утилит, но не задаёт дизайн конкретного приложения.

[Открыть README модуля](https://github.com/BroadApps-official/broad-extensions-ios) · [Посмотреть автоматически обновляемый Public API](https://github.com/BroadApps-official/broad-extensions-ios/blob/main/Documentation/PublicAPI.md) · [Предложить правку документации](https://github.com/BroadApps-official/broad-extensions-ios/edit/main/Documentation/BroadExtensions.md)
