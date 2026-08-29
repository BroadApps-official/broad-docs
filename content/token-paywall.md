# Token paywall

## Коротко

Token paywall загружается по placement `tokens` точно так же, как subscription
paywall:

```text
placement tokens
  → paywall + все 0…N products
  → карточки в порядке Adapty
  → выбор пользователя
  → purchase
```

Платформа не фиксирует два или пять packages, не сортирует их и не выбирает
«лучшие» SKU. Что вернул placement, то общий UI и получает.

![Reference token paywall](../public/guides/readme/References/5115-token-paywall-dark.png)

Reference показывает пять packages, но это пример конкретного приложения, а
не лимит или шаблон platform API. Copy, prices, discount, image и entry point
остаются app-owned.

## Если приложению нужен свой набор

Приложение может сделать собственный UI, например оставить две карточки. Это
должно быть явным решением app target. Общая платформа по-прежнему возвращает
полный массив, чтобы другие приложения не теряли данные placement.

## Что не относится к отображению paywall

Начисление consumable tokens, account balance, защита от повторного начисления
и восстановление после переустановки принадлежат backend конкретного
приложения. Platform paywall не должен придумывать эти правила из названия SKU
или локального cache.

Минимальное безопасное правило: UI показывает новый balance только после ответа
backend, а timeout не считается успешным начислением.

## UI contract

- 0 packages — понятное empty state;
- 1…N — все карточки provider в исходном порядке;
- длинный список прокручивается, CTA остаётся доступным;
- loader не удаляет уже загруженный paywall;
- повторный tap во время purchase не запускает вторую операцию.

[Adapty setup](./adapty-setup.md) ·
[BroadMonetization](https://github.com/BroadApps-official/broad-monetization-ios) ·
[BroadUIFlows](https://github.com/BroadApps-official/broad-ui-flows-ios)
