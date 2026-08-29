# Paywall UI

## Адаптивный renderer

Paywall получает готовые provider-neutral models из BroadMonetization. Он не
загружает Adapty напрямую, не фильтрует products и не решает entitlement.

![Paywall для разного количества продуктов](../public/guides/readme/adaptive-paywall.gif)

Один UI обязан безопасно показывать:

- 0 products — понятный empty/unavailable state;
- 1 product — устойчивую единственную карточку;
- 2 products — без специального hardcoded layout;
- N products — scrollable список со стабильным CTA;
- duplicate SKU — как отдельные provider occurrences.

![Paywall empty state](../public/guides/readme/Screenshots/paywall-empty-ru-v2.png)

![Paywall с одним продуктом](../public/guides/readme/Screenshots/paywall-one-ru-v2.png)

![Paywall с большим числом продуктов](../public/guides/readme/Screenshots/paywall-many-ru-v2.png)

Кадры показывают fixture-state, а не обязательный дизайн. Тексты, фон, theme,
prices, legal URLs и media принадлежат host app/provider.

## Loader без моргания

Catalog loading и financial operation — разные состояния, но визуальный
контракт одинаков: ранее показанный контент не уничтожается.

![Загрузка каталога поверх сохранённого paywall](../public/guides/readme/PaywallLoader/catalog-loading.gif)

![Purchase loader поверх сохранённого paywall](../public/guides/readme/PaywallLoader/purchase-loading-5115.gif)

Правила:

1. Spinner рисуется отдельным overlay.
2. Products, их порядок и текущий выбор сохраняются.
3. Повторное финансовое действие блокируется общим operation gate.
4. Product row не получает opacity/scale/brightness/pressed effect.
5. Error/timeout снимают overlay и показывают Retry/Close.
6. Loader не запрашивает ATT и сам не начинает purchase.

Первый GIF взят из другого приложения только как пример поведения; trial,
тексты и цены из него не являются platform contract.

## Legal и действия

Restore остаётся отдельным действием. Purchase/restore callback не открывает
premium напрямую: UI ждёт свежий entitlement result. `pending` не превращается
в success или failure по timeout.

## Special Offer

![Первый subscription paywall](../public/guides/readme/References/special-offer-step-1-paywall.png)

![Special Offer как второй paywall](../public/guides/readme/References/special-offer-step-2-offer.png)

Special Offer появляется только после close первого paywall без confirmed
purchase/restore. Его timer — циклическая визуализация
`24:00:00 → 00:00:00 → 24:00:00`; ноль не скрывает offer.

[BroadUIFlows](https://github.com/BroadApps-official/broad-ui-flows-ios) ·
[Special Offer](./special-offer.md) · [Token paywall](./token-paywall.md)
