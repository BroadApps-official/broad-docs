# Архитектура

## Repository graph

```text
Host App
 ├─ broad-extensions-ios      optional, standalone
 ├─ broad-core-ios            optional foundation
 ├─ broad-monetization-ios    → BroadCore
 └─ broad-ui-flows-ios        → BroadMonetization → BroadCore
```

Host app подключает любой нужный модуль. `broad-platform-integration` не является обязательной runtime dependency: он хранит known-good versions, integration example и cross-module evidence.

## Границы внутри модуля

```text
Presentation → Application → Domain
                       ↓
                     Data → Infrastructure
```

- Domain/Data не импортируют SwiftUI.
- Presentation не импортирует Adapty и StoreKit.
- View не ищет dependencies через resolver.
- SDK/wire models не выходят за adapter boundary.
- App strings, assets, real IDs/keys/URLs не попадают в shared package.

## Ownership

Module repository владеет Swift-кодом, README, DocC, module gate и iPhone sandbox. `broad-docs` владеет cross-module guides и поисковой точкой входа. Integration repository владеет compatibility catalog и целостным example.

## Порядок изменения

Cross-repository change идёт снизу вверх: сначала owner public API, затем dependent modules, затем integration catalog и docs. Каждый шаг имеет свой PASS до следующего release.
