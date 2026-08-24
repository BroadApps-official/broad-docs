# BroadExtensions

## Зачем нужен

`BroadExtensions` — намеренно маленький standalone package для повторяемых utility: Hex Color, custom font registration, keyboard dismiss и scoped interactive swipe-back.

## Dependency graph

- Platform dependencies: нет.
- External dependencies: нет.
- Consumers: host apps по надобности.

Подключение Extensions не должно тянуть Core, Adapty или готовые UI flow.

## Ownership

В package попадают только общие и атомарные extensions. Design tokens, brand fonts, app-specific navigation policy и assets остаются в host app.

## Проверка

Gate доказывает нулевой platform dependency graph, iOS 17+ compile, documentation/assets и отсутствие test targets/frameworks.

[Открыть public repository](https://github.com/BroadApps-official/broad-extensions-ios).
