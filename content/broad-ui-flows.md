# BroadUIFlows

## Зачем нужен

`BroadUIFlows` даёт готовые SwiftUI-сценарии: loader/error/retry, onboarding, ATT timing, AppFlow, adaptive paywall, RU payment sheet и subscription management.

## Dependency graph

- Platform dependencies: compatible `BroadCore` и `BroadMonetization`.
- External dependency: Swinject.
- Consumer: host app, который хочет готовые flow.

## UI boundaries

View получает готовую ViewModel через `init`. View не вызывает SDK, repository или DI resolver. Тексты, assets, links, themes и product configuration передаются из host app.

## Критические flow

- ATT запрашивается только после фактического появления первого onboarding-слайда.
- Rate Us не находится в onboarding.
- Adaptive paywall принимает 0, 1 или любое число products.
- Нажатие не затемняет и не уменьшает product card; pending виден отдельно.
- Special Offer показывается только как второй paywall.

[Открыть public repository](https://github.com/BroadApps-official/broad-ui-flows-ios).
