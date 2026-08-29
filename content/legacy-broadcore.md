# Старый BroadCore: куда переехал

> Если вы пришли из `BroadApps-official/BroadCore`, вы открыли устаревший
> legacy-репозиторий. Для нового приложения из него ничего подключать не нужно.

## Короткий ответ

Актуальная платформа разделена на независимые public modules. Текущий Core
находится в [`BroadApps-official/broad-core-ios`](https://github.com/BroadApps-official/broad-core-ios),
а общий человекочитаемый справочник находится на этом сайте.

| Что вы открыли | Статус | Куда перейти |
|---|---|---|
| `BroadApps-official/BroadCore` | Legacy evidence, не current package | Эта страница и migration guide |
| `BroadApps-official/broad-core-ios` | Актуальный public Core module | README, DocC и release конкретной версии |
| `BroadApps-official/broad-platform-integration` | Проверенный набор совместимых modules | Compatibility и platform workflow |
| Этот сайт | Главная точка входа для людей и агентов | Guides, схемы и поиск по всем repositories |

## Если вы создаёте новое приложение

Не добавляйте старый URL в SwiftPM. Подключите только нужный current module:

```swift
.package(
    url: "https://github.com/BroadApps-official/broad-core-ios.git",
    from: "1.0.0"
)
```

Затем выберите product `BroadCore` только для target, которому действительно
нужны bootstrap, cache, state, retry или logging boundaries.

[Открыть Getting Started →](./getting-started.md) ·
[Выбрать модуль →](./module-selection.md) ·
[Открыть текущий BroadCore →](./broad-core.md)

## Если старое приложение уже использует BroadCore

Не удаляйте repository или copied sources одним большим rewrite. Сначала:

1. найдите старый repository URL, local packages и copied sources;
2. зафиксируйте baseline работающего приложения;
3. определите atomic cutover group;
4. переключите владельцев API на current modules;
5. проверьте package graph и runtime flow;
6. удалите legacy только после review.

[Открыть пошаговую миграцию →](./legacy-app-migration.md)

## Почему старые файлы не удалены

Они остаются в `BroadApps-official/BroadCore` как историческое доказательство
того, как были устроены старые приложения. Это помогает миграции, но не делает
старый код актуальным API или шаблоном для нового проекта.

## Правило для Codex, Claude и других агентов

Считайте `BroadApps-official/BroadCore` read-only legacy evidence. Не выводите
из него текущую архитектуру, package URL, зависимости или product contracts.
Начинайте с этого сайта, затем открывайте README/DocC нужного current module и
проверяйте exact versions в compatibility catalog.

[Поиск по всей документации →](https://broadapps-ios-docs.nkhsnv.chatgpt.site/search) ·
[Совместимые версии →](./compatibility.md) ·
[Public package access →](./public-package-access.md)
