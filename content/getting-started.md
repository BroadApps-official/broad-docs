# Первое подключение платформы

## Что вы делаете

BroadApps iOS — это не один большой SDK. Это четыре независимые части с общим
кодом для приложений компании. Вы выбираете задачу приложения и добавляете в
Xcode **один нужный модуль**. Если этому модулю нужны другие части платформы,
Xcode скачает их автоматически.

Например, если нужен готовый экран оплаты, приложение добавляет
`BroadUIFlows`. Вместе с ним автоматически придут `BroadMonetization`,
`BroadCore` и Adapty. Добавлять их второй раз «на всякий случай» не нужно.

## С чего начать

- **Создаёте новое приложение:** откройте готовый маршрут
  [с Codex/Claude или вручную](./app-creation.md).
- **Добавляете платформу в существующее приложение:** продолжайте эту
  инструкцию и выберите функцию, которая нужна приложению.
- **В приложении уже стоит старый BroadCore:** используйте
  [инструкцию перехода](./legacy-app-migration.md), не подключайте старые и
  новые модули одновременно.

## Выберите модуль по задаче

| Что нужно приложению | Что добавить в Xcode | Что придёт автоматически |
|---|---|---|
| Только Swift-утилиты: цвета, клавиатура, навигация | `BroadExtensions` | Ничего — модуль независимый |
| Запуск, кеш, логи и повтор сетевых запросов | `BroadCore` | Базовые зависимости Core |
| Оплата и подписка со своим интерфейсом | `BroadMonetization` | `BroadCore` и Adapty |
| Готовые экраны: первые экраны, paywall и маршрутизация | `BroadUIFlows` | `BroadMonetization`, `BroadCore` и Adapty |

Если задача не помещается в одну строку, откройте
[полную матрицу выбора](./module-selection.md).

![Какая часть платформы отвечает за запуск, оплату, готовые экраны и утилиты](../public/guides/readme/architecture-light.svg)

## Подключите модуль в Xcode

1. Откройте проект приложения в Xcode.
2. Выберите `File → Add Package Dependencies…`.
3. Вставьте публичную ссылку на нужный репозиторий из таблицы ниже.
4. Выберите версию из [каталога совместимости](./compatibility.md).
5. В списке **Add to Target** выберите основное iPhone-приложение. Xcode
   добавит в него библиотеку с тем же названием, что и модуль.
6. Дождитесь, пока Xcode загрузит package без ошибок, и соберите приложение.

| Модуль | Публичный URL |
|---|---|
| `BroadExtensions` | `https://github.com/BroadApps-official/broad-extensions-ios.git` |
| `BroadCore` | `https://github.com/BroadApps-official/broad-core-ios.git` |
| `BroadMonetization` | `https://github.com/BroadApps-official/broad-monetization-ios.git` |
| `BroadUIFlows` | `https://github.com/BroadApps-official/broad-ui-flows-ios.git` |

GitHub account, пароль, token и API key для этих URL не нужны. Если Xcode
просит доступ к Keychain, в проекте, скорее всего, осталась ссылка на старый
private repository `BroadApps-official/BroadCore`. Используйте
[пошаговую диагностику](./public-package-access.md).

## Что означает product в Xcode

Product — это библиотека внутри Swift Package. Именно её Xcode добавляет в
выбранное приложение. В нашем случае product называется так же, как модуль:
`BroadCore`, `BroadMonetization`, `BroadUIFlows` или `BroadExtensions`.

Простое правило: если в коде приложения написано `import BroadCore`, библиотека
`BroadCore` должна стоять в списке **Frameworks, Libraries, and Embedded
Content** у этого приложения. Зависимости, которые нужны только самой
платформе, Xcode подключит автоматически.

## Если подключаете через Package.swift

Этот вариант нужен только проектам, которые управляют зависимостями через
собственный Swift Package manifest. Для обычного Xcode app используйте шаги
выше.

```swift
dependencies: [
    .package(
        url: "https://github.com/BroadApps-official/broad-core-ios.git",
        from: "1.0.0"
    )
]
```

`swift-tools-version: 6.0` в package manifest не переводит код приложения в
Swift 6. Текущие модули и host example работают в Swift 5 language mode.

## Что остаётся внутри приложения

Платформа даёт общий механизм, но не принимает продуктовые решения за
конкретное приложение. В самом приложении остаются:

- реальные ключи и URL;
- Adapty placements и feature flags;
- тексты, изображения и цвета;
- правила показа экранов;
- app-owned adapters и backend DTO;
- выбор нужных модулей и их создание при запуске.

Соберите эти значения в одном месте при старте приложения. Не создавайте SDK,
HTTP-клиенты и зависимости заново внутри каждого SwiftUI View.

![Как приложение один раз собирает конфигурацию и зависимости модулей](../public/guides/readme/composition-root-light.svg)

## Проверьте результат

После подключения должно выполняться следующее:

1. Xcode завершает package resolve без local path dependencies.
2. В списке packages нет старого private `BroadApps-official/BroadCore`.
3. Приложение собирается для iPhone Simulator в Debug и Release.
4. Приложение запускается и открывает функцию, ради которой добавлен модуль.
5. В repository модуля не попали ключи и данные конкретного приложения.
6. Автоматическая проверка не выполняет настоящую покупку, restore или RU payment.

Дальше откройте страницу выбранного модуля: [BroadCore](./broad-core.md),
[BroadMonetization](./broad-monetization.md),
[BroadUIFlows](./broad-ui-flows.md) или
[BroadExtensions](./broad-extensions.md).
