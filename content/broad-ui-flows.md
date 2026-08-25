# BroadUIFlows

## Зачем нужен

`BroadUIFlows` даёт готовые SwiftUI-сценарии: loader/error/retry, onboarding, ATT timing, AppFlow, adaptive paywall, RU payment sheet и subscription management.

Текущий проверенный release: [`1.0.0`](https://github.com/BroadApps-official/broad-ui-flows-ios/releases/tag/1.0.0).

## Dependency graph

- Platform dependencies: compatible `BroadCore` и `BroadMonetization`.
- External dependency: Swinject.
- Consumer: host app, который хочет готовые flow.

## Подключение 1.0.0

```swift
dependencies: [
    .package(
        url: "https://github.com/BroadApps-official/broad-ui-flows-ios.git",
        exact: "1.0.0"
    )
]
```

Добавьте product `BroadUIFlows` только в тот iPhone target, которому нужны
готовые экраны. Подключать `broad-platform-integration` или все остальные
модули не требуется: совместимые Core, Monetization, Adapty и Swinject приходят
по dependency graph самого release.

## UI boundaries

View получает готовую ViewModel через `init`. View не вызывает SDK, repository или DI resolver. Тексты, assets, links, themes и product configuration передаются из host app.

## Критические flow

- ATT запрашивается только после фактического появления первого onboarding-слайда.
- Rate Us не находится в onboarding.
- Adaptive paywall принимает 0, 1 или любое число products.
- Нажатие не затемняет и не уменьшает product card; pending виден отдельно.
- Special Offer показывается только как второй paywall.
- Special Offer разрешается после закрытия первого subscription paywall и
  после полного получения provider products; platform cache не блокирует
  parsing и не авторизует offer.
- Визуальный ноль countdown не скрывает и не отключает уже показанный offer.

## Публичная Gallery и проверка

Standalone iPhone Gallery показывает реальные public UI-сценарии: onboarding,
loader/empty/error/stale, subscription и Special Offer paywalls, token paywall
и RU subscription management. Она не активирует SDK и не выполняет purchase,
restore или RU payment.

`bash Scripts/module_gate.sh` проверяет package structure, public API/DocC,
архитектурные и UI contracts, Gallery в Debug/Release Simulator и unsigned
generic iPhone compile. По решению владельца `Tests/`, XCTest и Swift Testing
не добавляются.

[Onboarding и ATT →](/docs/onboarding-att) · [Paywall visual guide →](/docs/paywall-ui) ·
[Special Offer →](/docs/special-offer) · [RU Billing UI →](/docs/ru-billing)

[Открыть public repository](https://github.com/BroadApps-official/broad-ui-flows-ios) · [release 1.0.0](https://github.com/BroadApps-official/broad-ui-flows-ios/releases/tag/1.0.0).
