# Getting Started

## Главное правило

Host app подключает только те public repositories и products, которые ему нужны. Нет обязательного `BroadPlatform` и нет требования тянуть всю платформу.

> Если app импортирует public API модуля напрямую, добавьте этот product в app target явно.

## Выбор product

- `BroadExtensions` — utility без других platform dependencies.
- `BroadCore` — bootstrap, cache, state, retry, logging и ATT boundary.
- `BroadMonetization` — Adapty, StoreKit, entitlement, RU Billing и analytics; подтягивает compatible Core.
- `BroadUIFlows` — готовые SwiftUI-flow; подтягивает compatible Monetization и Core.

[Полная матрица выбора](/docs/module-selection).

## Подключение через SwiftPM

Добавьте URL нужного repository в Xcode: `File → Add Package Dependencies…`. Выберите версию из [compatibility catalog](/docs/compatibility), затем добавьте product нужному iPhone target.

```swift
dependencies: [
    .package(
        url: "https://github.com/BroadApps-official/broad-core-ios",
        from: "1.0.0"
    )
]
```

## Composition root

Конфигурация, real keys, URLs, placements, strings, assets и product policies остаются в host app. Repository модуля не должен содержать данные конкретного app.

Собирайте зависимости снизу вверх: Core, затем Monetization, затем UIFlows, после этого app-owned repositories/use cases/ViewModels. Если модуль не подключён, его assembly не создаётся.

## Проверка

1. Package resolve завершается без local path dependencies.
2. App собирается для iPhone Simulator в Debug и Release.
3. Generic iOS compile проходит без signing.
4. Fixture/probe не выполняет purchase, restore или RU payment.
5. App-owned configuration не попала в package repository.
