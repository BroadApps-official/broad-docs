# BroadExtensions

## Зачем нужен

`BroadExtensions` — намеренно маленький standalone package для повторяемых utility: Hex Color, custom font registration, keyboard dismiss и scoped interactive swipe-back.

Текущий проверенный release: [`1.0.0`](https://github.com/BroadApps-official/broad-extensions-ios/releases/tag/1.0.0).

```swift
.package(
    url: "https://github.com/BroadApps-official/broad-extensions-ios.git",
    from: "1.0.0"
)
```

## Dependency graph

- Platform dependencies: нет.
- External dependencies: нет.
- Consumers: host apps по надобности.

Подключение Extensions не должно тянуть Core, Adapty или готовые UI flow.

## Ownership

В package попадают только общие и атомарные extensions. Design tokens, brand fonts, app-specific navigation policy и assets остаются в host app.

## Проверка

Standalone gate доказал нулевой platform dependency graph, iOS 17+
package compile, runtime hex probe, Debug/Release iPhone Gallery, DocC, public API
report и отсутствие test targets/frameworks. Отдельные quality и release
workflows прошли на clean GitHub runner.

[Открыть public repository](https://github.com/BroadApps-official/broad-extensions-ios) ·
[изменить module guide](https://github.com/BroadApps-official/broad-extensions-ios/edit/main/Documentation/BroadExtensions.md).
