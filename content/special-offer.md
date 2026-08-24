# Special Offer

## Ответ на претензию

Прежняя проблема возникала до парсинга subscriptions: paywall из provider-managed SDK cache помечался как недостаточно fresh, и общая qualification удаляла `special_offer` ещё до того, как resolver мог разобрать products.

Исправление разделило две разные capability:

- `special_offer` — provider-managed presentation gate; текущий Adapty payload, включая внутренний SDK cache/Dashboard fallback, может разрешить второй paywall;
- `ru_pay` — financial availability gate; он по-прежнему требует verified-fresh remote payload.

Так provider cache не блокирует Special Offer до парсинга subscriptions и одновременно не ослабляет финансовое правило RU Billing.

## Порядок flow

```text
Adapty.getPaywall
        ↓
Adapty.getPaywallProducts
        ↓ map всего provider array
store exact raw product references
        ↓ qualify parsed provider payload
subscription paywall
        ↓ close без purchase/restore
Special Offer resolver
        ↓ explicit special_offer = true
second paywall
```

До Special Offer gate должен существовать полный `PaywallPayload` со всеми
products. Массив нельзя `filter`, `compactMap`, `sorted`, truncate или
deduplicate; provider order и каждое product occurrence часть контракта.

Special Offer никогда не является первым paywall. Confirmed purchase/restore первого paywall ведёт в main и обходит downsell.

## Placement и fallback

Если requested `special_offer` placement загружен, gate читается из его payload. `main` используется только при фактическом fallback. Persistent cache самой платформы не может заново включить `special_offer`.

## Purchase и products

Purchase второго paywall использует raw product из того же provider registry и не перезагружает paywall перед оплатой. Products не фильтруются, не сортируются и не объединяются.

## Безопасная проверка

- provider-enabled;
- provider-disabled;
- platform-cache downgrade;
- requested placement → main fallback;
- repeated resolver/presentation lifecycle;
- confirmed purchase/restore bypass;
- raw product registry continuity.

Эти сценарии выполняются fixture/probe-кодом без настоящих purchase, restore и RU payment.
Они входят в [BroadMonetization 1.0.0](https://github.com/BroadApps-official/broad-monetization-ios/releases/tag/1.0.0).
