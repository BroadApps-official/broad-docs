# BroadMonetization

## Зачем нужен

`BroadMonetization` изолирует placements, Adapty paywalls/products, StoreKit purchase/restore, Entitlement Engine, RU Billing, token flow и analytics.

## Dependency graph

- Platform dependency: compatible `BroadCore`.
- External dependencies: Adapty и Swinject.
- Consumers: host apps со своим UI, BroadUIFlows.

SDK models не выходят из Infrastructure/Data boundary. Presentation не импортирует Adapty или StoreKit.

## Финансовые инварианты

- Purchase/restore response сам по себе не открывает premium.
- Premium открывает только новая подтверждённая entitlement-проверка.
- Timeout/offline оставляет операцию pending/unresolved, а не превращает её в успех или отказ.
- Product arrays сохраняют provider order и не фильтруются.
- `ru_pay` авторизует RU methods только из verified-fresh remote payload.

## Special Offer

Special Offer — второй paywall после крестика обычного subscription paywall без покупки. Полный contract: [Special Offer](/docs/special-offer).

[Открыть public repository](https://github.com/BroadApps-official/broad-monetization-ios).
