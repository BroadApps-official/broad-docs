# Миграция старого приложения

Эта инструкция — точка входа для уже работающего iPhone-приложения, которое
использует прежний BroadApps monolith, local package checkout или скопированные
platform sources. Она не относится к историческому
[разделению самой платформы](./migration.md) на repositories.

> **Простыми словами:** новое приложение создавать не нужно. Экраны, данные и
> бизнес-логика остаются на месте. Мы заменяем только подключение старой
> платформы на нужные новые Swift Packages, проверяем приложение и лишь затем
> удаляем старый код.

## Что меняется

Раньше приложение получало почти всю платформу через один старый BroadCore.
Теперь оно подключает только нужные части: основу запуска, оплату, готовые
экраны или Swift-утилиты. Обязательные зависимости добавятся автоматически.

Это даёт четыре практических преимущества:

1. в приложение не попадают лишние SDK и экраны;
2. изменения одного модуля проще проверить;
3. модули можно обновлять отдельно;
4. совместимые версии уже перечислены в готовом каталоге.

```text
работающее старое приложение
  → проверить, что оно собирается до изменений
  → записать, как подключён старый BroadCore
  → заменить его нужными новыми packages
  → проверить один важный сценарий
  → удалить оставшиеся старые подключения
  → передать приложение в QA
```

## Выберите подход

| Подход | Когда подходит | Canonical инструкция |
|---|---|---|
| Вручную | Разработчик сам проверяет подключённые packages, заменяет старую платформу и проходит важные сценарии | [Ручная миграция](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/MigrationGuide.md) |
| Codex / Claude | Агент сначала изучает app и показывает план; каждый следующий шаг выполняется только после проверки разработчиком | [Конкретная инструкция для ИИ](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/LegacyAppMigrationAgent.md) |

Обе инструкции публичны и редактируются обычным pull request. Сайт помогает их
найти; подробный исполняемый процесс остаётся в integration repository рядом с
compatibility catalog и host example.

## Откуда агент читает данные

| Источник | Что находится внутри | Режим |
|---|---|---|
| Repository приложения | `AGENTS.md`/`CLAUDE.md`, README, app-код и `Documentation/AppIntegrationPlan.md` | рабочий, изменения только в подтверждённом stage |
| [`broad-platform-integration`](https://github.com/BroadApps-official/broad-platform-integration) | canonical migration workflow, plan template и `Compatibility/current.yml` | read-only |
| Private `BroadApps-official/BroadCore`, local package или copied sources | доказательство того, как подключена старая платформа | legacy read-only до cleanup checkpoint |
| Public `broad-*-ios` repositories | новые module releases из compatibility catalog | подключаются по exact SemVer |

Предварительно «закидывать» агенту скрытую информацию о platform repository не
нужно. Обновлённый [стартовый prompt](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/LegacyAppMigrationAgent.md#стартовый-prompt-для-codex-или-claude)
сам содержит canonical public URL, разделяет host/platform/legacy и требует
записать прочитанный commit SHA вместе с `platform_set`. Если public source или
catalog недоступны, агент возвращает `APP MIGRATION · BLOCKED`, а не выбирает
private mirror или версию по памяти.

Существующий `Documentation/AppIntegrationPlan.md` — это журнал уже принятых
решений, evidence, blocker-ов и checkpoint-ов. Агент не перезаписывает его пустым
template: он сохраняет все непустые значения,
добавляет только отсутствующие поля и выносит любую замену на developer
review с diff.

## Как понять, что нужно заменить одновременно

Иногда старый BroadCore предоставляет сразу несколько Swift-модулей. Тогда его
нельзя удалять по кусочкам: Xcode временно увидит старую и новую копию одного
модуля. Агент проверяет package manifests, ссылки Xcode, products, target
membership и imports, чтобы определить минимальный набор изменений, который
нужно выполнить вместе. В техническом плане этот набор называется `cutover
group`.

| `Cutover topology` | Признак | Безопасная граница |
|---|---|---|
| `atomic package cutover` | один legacy package/source owner объявляет несколько target names, конфликтующих с новыми packages | удалить legacy owner и добавить минимальный набор нужных public products одной group |
| `independent package boundaries` | у modules разные owners и промежуточный graph не создаёт duplicate targets | переключать каждую boundary отдельной group |
| `copied-source boundary` | platform `.swift`-файлы входят прямо в app target | добавить product и исключить совпадающие files из membership атомарно |
| `wrapper boundary` | app-owned wrapper скрывает platform implementation | сохранить wrapper как adapter и заменить owner implementation |
| `mixed` | app сочетает несколько схем | построить отдельную group на каждую связанную область конфликтов |

В Integration Plan обязательно записываются:

- `Legacy owner` — точный package identity/URL/ref, local path, copied target
  membership или implementation за wrapper;
- `Conflicting targets` — target/module names, которые получили бы двух owners
  в промежуточном old/new graph;
- `Atomic cutover group` — минимальный набор dependency/project/membership
  изменений, который выполняется вместе;
- `Runtime slices after cutover` — behavior-срезы, которые проверяются по одному
  уже после принятого dependency switch.

Одна atomic group может содержать несколько repositories/products, но не
добавляет неиспользуемые modules «на будущее». Для independent topology group
может состоять из одного boundary.

## Общая безопасная граница

- Старый `BroadApps-official/BroadCore` является private monolith. Замените его
  на нужные public `broad-*-ios.git` references; не добавляйте password, token
  или API key в app. [Диагностика Keychain prompt](./public-package-access.md).
- Возможность открыть private repository из рабочего GitHub account не делает
  его canonical: актуальный workflow живёт в public integration repository.
- Не создавайте новое приложение или второй app target вместо migration.
- Не подключайте одновременно old/new source owners, экспортирующие одинаковый
  Swift module.
- Берите exact versions из
  [`Compatibility/current.yml`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Compatibility/current.yml).
- Оставляйте keys, URLs, placements, DTO/adapters, strings, assets и product
  decisions в host app.
- Переключайте одну подтверждённую cutover group; затем проверяйте один runtime
  slice за раз.
- Удаляйте legacy source только после поиска usages, сборок и developer review.
- Не добавляйте `Tests/`, XCTest или Swift Testing.
- Не выполняйте настоящие purchase, restore и RU payment.

Перед resolve final graph должен иметь ровно одного source owner для каждого
`Conflicting target`. Если один legacy package объявляет несколько
конфликтующих targets, все нужные replacements и удаление old owner входят в
одну atomic group; resolve промежуточного graph запрещён. `moduleAliases`,
временный fork manifest или второй owner требуют отдельного architecture plan,
а не используются агентом как автоматический обход. Поведение приложения всё
равно мигрируется и проверяется небольшими runtime slices after cutover.

Порядок «снизу вверх» нужен при выпуске зависимых platform repositories. Он не
доказывает, что host app может поэтапно держать старый monolith рядом с новыми
packages, объявляющими те же target names.

Exact versions нужны здесь намеренно: migration сначала воспроизводит уже
проверенный catalog set. После acceptance команда отдельно решает, оставить
exact requirement или перейти на совместимый `from`-диапазон.

## Что делает ИИ

Если в repository приложения ещё нет `Documentation/AppIntegrationPlan.md`,
скопируйте его из
[`canonical template`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/Templates/AppIntegrationPlan.md).
Если файл уже есть, не заменяйте его шаблоном: агент обновляет структуру
только additive diff и не меняет непустые значения без review. Затем агент
проходит только один шаг и останавливается, чтобы разработчик проверил результат:

1. изучает текущее приложение → `MIGRATION PREFLIGHT REVIEW REQUIRED`;
2. показывает план без изменений кода → `MIGRATION PLAN REVIEW REQUIRED`;
3. заменяет одну подтверждённую группу packages → `DEPENDENCY SWITCH REVIEW REQUIRED`;
4. проверяет один сценарий приложения → `MIGRATION SLICE REVIEW REQUIRED`;
5. удаляет старые подключения → `LEGACY CLEANUP REVIEW REQUIRED`;
6. передаёт результат разработчику → `READY FOR QA` или `APP MIGRATION · BLOCKED`.

Готовый стартовый prompt и prompt возобновления находятся внутри
[AI migration instruction](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/LegacyAppMigrationAgent.md).

## Когда миграция завершена

Миграция готова к QA, когда app использует exact catalog versions, local paths
и copied platform sources удалены, Debug/Release Simulator и unsigned generic
iOS compile прошли, а разработчик проверил затронутые flows. Реальные
финансовые операции в автоматическую проверку не входят.
