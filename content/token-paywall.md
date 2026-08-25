# Token paywall

## Чем tokens отличаются от subscription

Токен — расходуемая единица приложения. Subscription подтверждает доступ, а
token package начисляет balance на backend конкретного app account.

![Reference token paywall](/guides/readme/References/5115-token-paywall-dark.png)

Reference показывает пять packages, но platform не фиксирует их число, copy,
prices, discount, image или entry point.

## Когда подключать

| Product model | Composition |
|---|---|
| Только subscriptions | `SubscriptionPurchaseManager` |
| Subscriptions + tokens | отдельные subscription и token managers |
| Только tokens | `TokenPurchaseManager` и backend balance source |

## Flow

```text
balance / paid action
  → logical placement tokens
  → load 0…N consumable products
  → preserve provider order and raw identity
  → purchase / RU checkout
  → backend exactly-once fulfillment
  → full current balance snapshot
```

Fallback `main` допускается только если полученный catalog действительно
содержит consumable products. Requested context `.tokens` сохраняется для
analytics даже при resolved `.main`.

## Exactly-once fulfillment

Нажатие CTA, закрытие браузера или local purchase callback не начисляют tokens.
Backend принимает unique transaction/checkout ID один раз, атомарно выполняет
fulfillment и возвращает полный balance.

Offline/timeout оставляют operation `pending`. Retry и восстановление сети
проверяют уже начатую операцию, но не запускают второе списание автоматически.

## После переустановки

```text
login → current app account → backend full balance snapshot
```

StoreKit Restore не восстанавливает consumables. Transaction IDs служат
deduplication evidence для начисления, а не входом обычного balance recovery.
Local cache может ускорить UI, но не является источником balance.

## UI contract

- 0 packages — безопасное empty state;
- 1…N — все карточки provider в исходном порядке;
- sticky CTA остаётся доступным при scroll;
- выбор не мерцает и не уменьшает карточку;
- spinner появляется до первого `await`;
- новый balance показывается только после backend snapshot.

[BroadMonetization](https://github.com/BroadApps-official/broad-monetization-ios) ·
[BroadUIFlows](https://github.com/BroadApps-official/broad-ui-flows-ios)
