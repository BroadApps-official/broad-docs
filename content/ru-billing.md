# RU Billing

## Fail-closed availability

RU methods доступны, только когда одновременно доказаны:

1. host app зарегистрировал RU Billing;
2. `.verifiedFreshRemote` payload содержит `ru_pay = true`;
3. region iPhone — `RU/RUS` **или** первый preferred language — Russian;
4. RU catalog не пуст и точно сопоставлен выбранному product;
5. backend authorization и kill switch разрешают flow;
6. entitlement не доказывает активный premium.

Отсутствующий, invalid или `false` flag всегда оставляет Apple flow. SDK cache,
Dashboard fallback и BroadMonetization cache не авторизуют СБП/карту.

## Debug и Release

| Сборка | Поведение |
|---|---|
| Release | только verified-fresh `ru_pay` |
| Debug — «Как в Adapty» | тот же strict contract |
| Debug — force on/off | process-local UI/gate проверка, не меняет Dashboard |

Force-on не обходит host opt-in, device context, catalog, backend kill switch
или entitlement.

## Последовательность экранов

```text
тариф → способ Apple/СБП/карта → обязательные согласия
      → email для чека, если нужен → hosted checkout
      → foreground return → backend reconciliation
```

![Выбор тарифа](/guides/readme/References/5115-paywall-dark.png)

![Выбор способа оплаты](/guides/readme/References/5115-payment-methods-dark.png)

![Обязательные согласия](/guides/readme/References/5115-payment-ready-dark.png)

![Понятная ошибка отсутствующего согласия](/guides/readme/References/5115-consent-alert-dark.png)

![Email для чека](/guides/readme/References/5115-receipt-email-dark.png)

![Внешняя форма банковской карты](/guides/readme/References/5115-cloudpayments-light.png)

![Hosted checkout](/guides/readme/References/5115-hosted-checkout-light.png)

Эти экраны — reference последовательности. Внешний стиль, copy, provider,
products, prices и legal content принадлежат конкретному приложению.

## Backend contract

Host app передаёт typed configuration и implementations для:

- загрузки RU catalog;
- создания checkout с idempotency key;
- проверки status после возврата;
- entitlement source;
- отмены subscription, если product это поддерживает.

Payment URL и raw payload никогда не логируются. Возврат из браузера не равен
success: пока backend не подтвердил результат, операция остаётся `pending`.

## Recovery

После переустановки RU purchases восстанавливаются по авторизованному app
account из backend. Checkout ID нужен для exactly-once fulfillment, но не
заменяет account identity.

## Проверка без платежа

- `ru_pay` true/false/absent/invalid;
- RU region и Russian language по отдельности;
- cache/fallback downgrade;
- empty и mismatched catalog;
- backend kill switch;
- active entitlement;
- pending foreground reconciliation;
- Debug force-on/off отсутствует в Release.

[Полный технический contract](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/RUBilling.md) ·
[BroadMonetization](https://github.com/BroadApps-official/broad-monetization-ios) ·
[BroadUIFlows](https://github.com/BroadApps-official/broad-ui-flows-ios)
