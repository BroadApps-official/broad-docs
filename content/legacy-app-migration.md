# Миграция старого приложения

Эта инструкция — точка входа для уже работающего iPhone-приложения, которое
использует прежний BroadApps monolith, local package checkout или скопированные
platform sources. Она не относится к историческому
[разделению самой платформы](/docs/migration) на repositories.

## Что меняется

Раньше код Core, Monetization, UI flows и часть extensions находились в одной
области изменений. Теперь host app подключает напрямую только нужные public
products, каждый module имеет отдельную область review и SemVer release, а
integration repository фиксирует exact known-good набор версий.

Это даёт четыре практических преимущества:

1. diff и review можно ограничить владельцем одного module;
2. backward-compatible исправление можно выпустить в owner module, повторив dependent gates;
3. host app не получает лишние dependencies «на будущее»;
4. совместимость берётся из проверенного catalog, а не угадывается.

```text
legacy app
  → baseline + dependency inventory
  → manual или staged AI route
  → один dependency boundary
  → один vertical slice
  → build + developer review
  → удалить только доказанный legacy owner
  → повторить или передать в QA
```

## Выберите подход

| Подход | Когда подходит | Canonical инструкция |
|---|---|---|
| Вручную | Разработчик сам проверяет package graph, меняет project membership и проходит каждый flow | [Ручная миграция](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/MigrationGuide.md) |
| Codex / Claude | Coding agent делает audit, plan, switch, slice и cleanup, останавливаясь на review checkpoints | [Конкретная инструкция для ИИ](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/LegacyAppMigrationAgent.md) |

Обе инструкции публичны и редактируются обычным pull request. Сайт помогает их
найти; подробный исполняемый процесс остаётся в integration repository рядом с
compatibility catalog и host example.

## Общая безопасная граница

- Не создавайте новое приложение или второй app target вместо migration.
- Не подключайте одновременно old/new source owners, экспортирующие одинаковый
  Swift module.
- Берите exact versions из
  [`Compatibility/current.yml`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Compatibility/current.yml).
- Оставляйте keys, URLs, placements, DTO/adapters, strings, assets и product
  decisions в host app.
- Переключайте один dependency boundary и один vertical slice за раз.
- Удаляйте legacy source только после поиска usages, сборок и developer review.
- Не добавляйте `Tests/`, XCTest или Swift Testing.
- Не выполняйте настоящие purchase, restore и RU payment.

Если старый package экспортирует несколько одноимённых modules и частичный
switch невозможен, сначала сделайте отдельное dependency-only переключение
конфликтующих references. Поведение приложения всё равно мигрируется и
проверяется небольшими slices.

Exact versions нужны здесь намеренно: migration сначала воспроизводит уже
проверенный catalog set. После acceptance команда отдельно решает, оставить
exact requirement или перейти на совместимый `from`-диапазон.

## Что делает ИИ

Перед началом скопируйте
[`AppIntegrationPlan.md`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/Templates/AppIntegrationPlan.md)
в repository приложения. Агент проходит только один stage и завершает его
точным checkpoint:

1. audit → `MIGRATION PREFLIGHT REVIEW REQUIRED`;
2. план → `MIGRATION PLAN REVIEW REQUIRED`;
3. dependency boundary → `DEPENDENCY SWITCH REVIEW REQUIRED`;
4. vertical slice → `MIGRATION SLICE REVIEW REQUIRED`;
5. legacy cleanup → `LEGACY CLEANUP REVIEW REQUIRED`;
6. acceptance → `READY FOR QA` или `APP MIGRATION · BLOCKED`.

Готовый стартовый prompt и prompt возобновления находятся внутри
[AI migration instruction](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/LegacyAppMigrationAgent.md).

## Когда миграция завершена

Миграция готова к QA, когда app использует exact catalog versions, local paths
и copied platform sources удалены, Debug/Release Simulator и unsigned generic
iOS compile прошли, а разработчик проверил затронутые flows. Реальные
финансовые операции в автоматическую проверку не входят.
