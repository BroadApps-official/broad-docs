# Создание приложения

[💡 Что это](#что-это) · [⚡️ Быстрый маршрут](#быстрый-маршрут) · [🗺️ Все flow](#все-flow) · [🚦 Перед QA](#перед-qa) · [📂 Что открыть](#что-открыть) · [🚀 С чего начать](#с-чего-начать) · [🤖 С Codex / Claude](#с-codex-claude) · [🛠️ Без агента](#без-агента)

Эта страница восстанавливает удобный выбор пути из старого большого README,
но использует текущую federated-архитектуру. Canonical источник workflow,
совместимых версий и agent prompts — публичный repository
[`broad-platform-integration`](https://github.com/BroadApps-official/broad-platform-integration).
Private `BroadCore`, branch `vers_niiaz` и старый umbrella package могут быть
только legacy evidence существующего приложения.

## Что это

BroadApps iOS Platform — не один package, который приложение обязано подключить
целиком. Это набор независимых public modules, проверяемый integration catalog
и общий сайт документации.

| Часть | За что отвечает |
|---|---|
| `BroadCore` | Bootstrap, state, cache/retry, typed logging и ATT boundary |
| `BroadExtensions` | Независимые utility без platform dependencies |
| `BroadMonetization` | Adapty, StoreKit, entitlement, tokens и RU Billing contracts |
| `BroadUIFlows` | Готовые onboarding, AppFlow, paywall и payment UI |
| `broad-platform-integration` | Canonical workflow, exact compatibility set и проверяемый host example; не dependency приложения |
| Этот сайт | Главный человекочитаемый справочник, visual guides и поиск по всем repositories |
| Host app | Бренд, экраны, тексты, assets, backend, keys/IDs, product policy и composition root |

Пример показывает способ соединения modules и безопасные fixture-сценарии, но
не является дизайном нового приложения и не доказывает готовность его backend.

## Быстрый маршрут

Выберите одну строку и не проходите остальные маршруты заранее.

| Что вы делаете | Начать | Собрать | Проверить |
|---|---|---|---|
| Посмотреть возможности платформы | [Открыть integration example](#что-открыть) | Запустить безопасный каталог на iPhone Simulator | Проверить fixture flow без purchase/restore/RU checkout |
| Подключить один module | [Getting Started](./getting-started.md) | Добавить нужный public product в host target | Debug/Release Simulator и generic unsigned compile |
| Создать app с Codex/Claude | Выполнить только canonical Stage 0 | Отправлять stages по одному | Пройти все developer checkpoints и acceptance |
| Создать app вручную | Заполнить тот же Integration Plan | Делать один vertical slice за итерацию | Functional review, visual review и handoff |
| Перенести legacy app | [Определить cutover topology](./legacy-app-migration.md) | Переключать atomic groups и runtime slices | Проверить final graph и удалить legacy только после review |
| Подготовить app к QA | Открыть [Project Delivery](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/ProjectDelivery.md) | Собрать app-owned functional/visual/config evidence | Передать QA только после личного developer review |

## Все flow

Эта карта ведёт к актуальному owner каждого сценария.

| Flow | Как начинается | Безопасный результат | Где читать |
|---|---|---|---|
| Создание приложения | Preflight реальных sources | Plan, slices и checkpoints без догадок | [Эта страница](#с-чего-начать) |
| Первый запуск | Bootstrap и выбранная onboarding policy | ATT только после видимого первого слайда; premium только после entitlement | [Onboarding и ATT](./onboarding-att.md) |
| Subscription paywall | Initial policy, Settings или app-owned entry point | Все provider products сохранены; purchase/restore требуют entitlement refresh | [Paywall UI](./paywall-ui.md) |
| Special Offer | Только close первого paywall без confirmed purchase | Второй paywall либо безопасный переход в main | [Special Offer](./special-offer.md) |
| Token paywall | Баланс или платная consumable feature | Exactly-once fulfillment и полный backend balance snapshot | [Token paywall](./token-paywall.md) |
| RU Billing | Verified-fresh `ru_pay` плюс все host/backend/device gates | Checkout return остаётся pending до backend reconciliation | [RU Billing](./ru-billing.md) |
| Loading/error/offline | Любой SDK/backend use case | Spinner до первого `await`, блокировка double tap, Retry без ложного success | [Runtime и надёжность](./runtime-reliability.md) |
| Support chat | Явное действие `Настройки → Онлайн-чат` | Account-scoped token recovery без device ID identity | [Usedesk](./usedesk.md) |
| Legacy migration | Анализ реального package/source graph | Один owner каждого target и принятые runtime slices | [Legacy migration](./legacy-app-migration.md) |

![Запуск, onboarding, paywall, entitlement и main](../public/guides/readme/full-flow-light.svg)

## Перед QA

> Platform PASS не означает, что конкретное приложение готово к QA.

| Уровень | Что должно быть подтверждено | Что не является доказательством |
|---|---|---|
| Платформа | Нужные module versions входят в current compatibility set | Одна успешная сборка host app |
| Функции app | Routes, backend mapping, paywall, recovery и offline states приняты в Debug и Release | Наличие кнопки или похожего fixture UI |
| Визуальная точность | Каждый обязательный экран сравнен со своим source frame на нужных iPhone-размерах | «Похожий» экран или общий цвет |
| Внешняя готовность | App-owned products, placements, URLs, backend contracts, support и legal подтверждены владельцами | Значения из reference app или Debug override |
| Handoff | Integration Plan и Project Delivery показывают `READY/BLOCKED/N/A`, developer лично прошёл review | Только platform gate, ответ агента или compile-only live scheme |

Настоящие финансовые операции не выполняются platform gate. Обязательный
app-level checklist находится в
[`ProjectDelivery.md`](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/ProjectDelivery.md).

## Что открыть

| Задача | Что открыть |
|---|---|
| Читать инструкции и искать правило | [Каталог документации](/docs) или [поиск](/search) |
| Подключить module к своему app | Свой `.xcodeproj`/workspace → `File → Add Package Dependencies…` → URL нужного public module |
| Посмотреть безопасный общий example | `broad-platform-integration/Examples/BroadAppTemplate/BroadAppTemplate.xcodeproj` |
| Создать новый app с Codex/Claude | Отдельную папку host repository, затем [маршрут с агентом](#с-codex-claude) |
| Создать новый app вручную | Новый Xcode `iOS → App`, затем [ручной маршрут](#без-агента) |
| Продолжить существующий app | Его настоящий repository и существующий `Documentation/AppIntegrationPlan.md` |
| Мигрировать private BroadCore/local sources | Repository существующего app и [legacy migration](./legacy-app-migration.md), а не private platform как новый source |
| Изменить module API | Repository конкретного module, его README/DocC и `Scripts/module_gate.sh` |

Чтобы запустить текущий integration example:

```bash
git clone https://github.com/BroadApps-official/broad-platform-integration.git
cd broad-platform-integration
open Examples/BroadAppTemplate/BroadAppTemplate.xcodeproj
```

В Xcode выберите scheme `BroadAppTemplate`, любой iPhone Simulator и `Run`.
Корневой `Package.swift` — integration package, а не проект нового продукта.

## С чего начать

| Задача | Правильный маршрут |
|---|---|
| Подключить один модуль к существующему host app | [Getting Started](./getting-started.md) |
| Создать новое приложение или новую feature с Codex/Claude | [С Codex / Claude](#с-codex-claude) |
| Создать новое приложение вручную | [Без агента](#без-агента) |
| Перенести приложение со старого monolith/local package | [Legacy migration](./legacy-app-migration.md) |
| Понять, какие products нужны | [Выбор модуля](./module-selection.md) |
| Проверить exact known-good версии | [Совместимость](./compatibility.md) |

Для нового приложения и нового feature действует один порядок:

```text
0 PREFLIGHT → 1 PLAN → 2 SKELETON → 3 ONE SLICE
            → 4 FUNCTIONAL → 5 VISUAL → 6 ACCEPTANCE
```

![Поэтапное создание приложения с обязательными developer checkpoints](../public/guides/readme/app-delivery-iterations-light.svg)

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
> [migration workflow](./legacy-app-migration.md): агент сначала выводит
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
   [compatibility catalog](./compatibility.md); umbrella package не нужен.
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
