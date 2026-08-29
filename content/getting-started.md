# Getting Started

## С чего начать

- **Создаёте новое приложение:** откройте готовый маршрут
  [с Codex/Claude или вручную](./app-creation.md).
- **Добавляете платформу в существующее приложение:** продолжайте эту
  инструкцию и выберите только нужный модуль.

## Главное правило

Host app подключает только те public repositories и products, которые ему нужны. Нет обязательного `BroadPlatform` и нет требования тянуть всю платформу.

**Важно:** если приложение напрямую импортирует API модуля, добавьте product
этого модуля в target приложения.

## Swift version

Модули и host example собираются в **Swift 5 language mode**. Заголовок
`swift-tools-version: 6.0` в package manifests задаёт версию SwiftPM manifest и
toolchain, а не Swift 6 language mode для production sources. Поэтому app target
может оставаться на `SWIFT_VERSION = 5.0`, но package resolve должен выполняться
toolchain, который понимает SwiftPM tools `6.0`.

## Выбор product

- `BroadExtensions` — utility без других platform dependencies.
- `BroadCore` — bootstrap, cache, state, retry, logging и ATT boundary.
- `BroadMonetization` — Adapty, StoreKit, entitlement, RU Billing и analytics; подтягивает compatible Core.
- `BroadUIFlows` — готовые SwiftUI-flow; подтягивает compatible Monetization и Core.

[Полная матрица выбора](./module-selection.md).

## Подключение через SwiftPM

Добавьте URL нужного repository в Xcode: `File → Add Package Dependencies…`. Выберите версию из [compatibility catalog](./compatibility.md), затем добавьте product нужному iPhone target.

```swift
dependencies: [
    .package(
        url: "https://github.com/BroadApps-official/broad-core-ios.git",
        from: "1.0.0"
    )
]
```

Public module repositories скачиваются без GitHub account, password, token или
API key. Если Xcode открывает `git-credential-osxkeychain`, проверьте, что host
project не хранит старый private URL `BroadApps-official/BroadCore`, затем
сбросьте package cache. [Пошаговая диагностика](./public-package-access.md).

## Composition root

Конфигурация, real keys, URLs, placements, strings, assets и product policies остаются в host app. Repository модуля не должен содержать данные конкретного app.

Собирайте зависимости снизу вверх: Core, затем Monetization, затем UIFlows, после этого app-owned repositories/use cases/ViewModels. Если модуль не подключён, его assembly не создаётся.

Для обычного Adapty paywall не стройте отдельную систему вокруг SDK: host
передаёт public key и placement mapping, `BroadMonetization` загружает весь
provider catalog, а `BroadUIFlows` умеет показать 0, 1, 2 или N products. Для
Apple premium базовый entitlement source — StoreKit. Custom identity и
additional verifier подключаются только при реальном signed-in/server contract.

## Проверка

1. Package resolve завершается без local path dependencies.
2. App собирается для iPhone Simulator в Debug и Release.
3. Generic iOS compile проходит без signing.
4. Fixture/probe не выполняет purchase, restore или RU payment.
5. App-owned configuration не попала в package repository.
