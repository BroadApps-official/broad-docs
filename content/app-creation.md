# Создание приложения

[🚀 С чего начать](#с-чего-начать) · [🤖 С Codex / Claude](#с-codex-claude) · [🛠️ Без агента](#без-агента)

Эта страница восстанавливает удобный выбор пути из старого большого README,
но использует текущую federated-архитектуру. Canonical источник workflow,
совместимых версий и agent prompts — публичный repository
[`broad-platform-integration`](https://github.com/BroadApps-official/broad-platform-integration).
Private `BroadCore`, branch `vers_niiaz` и старый umbrella package могут быть
только legacy evidence существующего приложения.

## С чего начать

| Задача | Правильный маршрут |
|---|---|
| Подключить один модуль к существующему host app | [Getting Started](/docs/getting-started) |
| Создать новое приложение или новую feature с Codex/Claude | [С Codex / Claude](#с-codex-claude) |
| Создать новое приложение вручную | [Без агента](#без-агента) |
| Перенести приложение со старого monolith/local package | [Legacy migration](/docs/legacy-app-migration) |
| Понять, какие products нужны | [Выбор модуля](/docs/module-selection) |
| Проверить exact known-good версии | [Совместимость](/docs/compatibility) |

Для нового приложения и нового feature действует один порядок:

```text
0 PREFLIGHT → 1 PLAN → 2 SKELETON → 3 ONE SLICE
            → 4 FUNCTIONAL → 5 VISUAL → 6 ACCEPTANCE
```

![Поэтапное создание приложения с обязательными developer checkpoints](/guides/readme/app-delivery-iterations-light.svg)

С агентом и без агента меняется исполнитель, но не evidence, checkpoints или
критерии готовности.

| Этап | С Codex / Claude | Без агента |
|---|---|---|
| Исходные данные | Агент проверяет реальные источники и возвращает `READY/BLOCKED` | Разработчик проверяет те же источники сам |
| Integration Plan | Агент заполняет только доказанные поля | Разработчик заполняет тот же template вручную |
| Реализация | Один подтверждённый vertical slice за prompt | Один подтверждённый vertical slice за итерацию |
| Review | Агент останавливается на каждом checkpoint | Разработчик фиксирует тот же checkpoint сам |
| Результат | `READY FOR QA` только после acceptance | Те же критерии `READY FOR QA` |

## С Codex / Claude

### 1. Откройте правильную рабочую папку

- Для нового app создайте отдельную папку host repository и откройте её в
  Codex/Claude через `Open Folder` или `Open Project`.
- Для существующего app откройте его настоящий repository. Не создавайте второй
  target и не начинайте переписывание до gap analysis.
- Reference и platform repository остаются read-only источниками; агент не
  работает внутри них вместо host app.

### 2. Начните только с Stage 0

Откройте canonical
[`AgentPreflight.md`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/AgentPreflight.md)
и отправьте единственный Stage 0 prompt. Он обязан прочитать:

1. инструкции host repository;
2. public `broad-platform-integration` и фактический commit SHA;
3. `Compatibility/current.yml` и `platform_set`;
4. Kaiten, точный design source, reference, backend, monetization и legal.

Stage 0 ничего не создаёт. Недоступный источник получает `BLOCKED`; агент не
рисует похожий экран, не придумывает endpoint и не выбирает module version по
памяти.

### 3. Создайте или актуализируйте Integration Plan

После preflight агент выполняет только Stage 1 из
[`Agent Prompt Pack`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/AgentPromptPack.md).

- Если `Documentation/AppIntegrationPlan.md` отсутствует, создаётся файл по
  [template](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/Templates/AppIntegrationPlan.md).
- Если Plan уже существует, он не перезаписывается: сохраняются решения,
  blockers, evidence и checkpoints, добавляются только отсутствующие поля.
- Swift, Xcode project и configurations на этом этапе не меняются.

Результат этапа — `PLAN REVIEW REQUIRED`. Продолжать можно только после явного
подтверждения разработчика.

### 4. Отправляйте stages по одному

Не объединяйте весь Prompt Pack в один запрос:

1. безопасный skeleton;
2. один `READY` vertical slice;
3. review этого slice;
4. следующий slice;
5. functional review;
6. visual review;
7. acceptance и handoff.

Обязательные остановки: `SKELETON REVIEW REQUIRED`, `SLICE REVIEW REQUIRED`,
`FUNCTIONAL REVIEW REQUIRED`, `VISUAL REVIEW REQUIRED`, затем `READY FOR QA`.
После паузы или нового чата агент сначала перечитывает Plan, последний
checkpoint и diff, а не начинает работу заново.

> Для приложения на старом BroadCore/monolith используйте отдельный
> [migration workflow](/docs/legacy-app-migration): агент сначала выводит
> cutover topology и atomic groups из реального package graph.

## Без агента

Ручной путь использует тот же
[`App Creation Workflow`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/AppCreationWorkflow.md),
только все действия выполняет разработчик.

1. Проверьте Kaiten, design source, reference, backend, monetization и legal.
2. Создайте или бережно дополните `Documentation/AppIntegrationPlan.md` до
   первого Swift-изменения.
3. Для нового app создайте `iOS → App` target с `Team = None`. Для существующего
   app не создавайте второй target: сначала опишите current state и gaps.
4. Подключите только нужные public module repositories и версии из
   [compatibility catalog](/docs/compatibility); umbrella package не нужен.
5. Соберите один composition root и безопасный skeleton.
6. Реализуйте по одному vertical slice с состояниями
   loading/content/empty/error/offline и защитой от повторного действия.
7. После functional review отдельно выполните visual review по настоящим source
   frames на маленьком и большом iPhone Simulator.
8. Соберите Debug и Release, заполните Project Delivery и передайте QA.

Настоящие purchase, restore и RU checkout не входят в platform gate. Fixture,
успешная компиляция или Dashboard fallback не доказывают production backend,
финансовый результат или entitlement.

## Что изменилось относительно старого BroadCore

| В старом README | Сейчас |
|---|---|
| Private `BroadCore/vers_niiaz` как источник платформы | Public `broad-platform-integration` как canonical workflow |
| Один umbrella repository/package | Независимые Core, Extensions, Monetization и UIFlows |
| Большая инструкция внутри monolith README | Сайт объясняет маршрут, canonical prompts остаются рядом с integration workflow |
| Возможность прочитать stages как один большой prompt | Stages отправляются строго по одному с developer checkpoints |
| Новый проект как основной сценарий | New app, existing app и legacy migration разведены явно |

## Перед переходом к коду

- известен фактически прочитанный platform commit и `platform_set`;
- открыт правильный host repository, а reference остаётся read-only;
- design source определён по реальным материалам;
- backend contracts сопоставлены с функциями;
- app-owned monetization и legal решения имеют владельцев;
- Integration Plan сохранён и подтверждён;
- следующий stage и условие его остановки названы явно.
