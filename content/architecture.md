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

«Отдельный модуль» означает отдельный source owner, changelog и SemVer release.
Это не означает отсутствие зависимостей: UIFlows использует Monetization/Core,
а Monetization использует Core. Graph остаётся направленным снизу вверх.

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

| Изменение | Canonical owner |
|---|---|
| Public API или implementation одного product | Module repository |
| Exact-набор совместимых tags | Integration repository |
| Общее объяснение нескольких modules | Docs repository |
| Keys, URLs, placements, DTO adapters, strings и assets | Host app |

## Порядок изменения

Cross-repository change идёт снизу вверх: сначала owner public API, затем dependent modules, затем integration catalog и docs. Каждый шаг имеет свой PASS до следующего release. Backward-compatible patch может выйти только в owner module, но dependent gates и integration acceptance всё равно повторяются. Breaking contract может потребовать новых releases consumers.
