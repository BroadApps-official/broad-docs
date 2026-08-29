# Special Offer

## Коротко

Special Offer — обычный второй paywall из Adapty. Никакой отдельной системы
правил вокруг него нет:

- приложение запрашивает placement `special_offer`;
- платформа показывает **все** products, которые вернул Adapty;
- offer открывается после крестика первого paywall, если покупка или restore не
  подтвердили подписку;
- показ разрешает один флаг `special_offer = true` из payload фактически
  загруженного placement;
- на экране работает визуальный цикл `24:00:00 → 00:00:00 → 24:00:00`.

## Весь flow

```text
первый subscription paywall
  ├─ purchase / restore подтвердил доступ → main
  └─ пользователь закрыл экран
       → запросить placement special_offer
       → получить paywall + все 0…N products
       → проверить special_offer = true
       → показать второй paywall
```

Платформа не фильтрует, не сортирует, не объединяет и не обрезает массив
products. Если конкретному приложению нужны только две карточки, это отдельное
решение UI этого приложения, а не скрытое правило платформы.

## Таймер 24 часа

Таймер — чистая визуализация и намеренно простой hardcode:

```text
24:00:00 → 00:00:00 → снова 24:00:00
```

Он не читает дату, server clock, persistence или schedule, не скрывает offer и
не блокирует CTA на нуле. Динамический таймер и его возможное применение в RU
Billing оставлены на будущее, пока для них нет отдельного согласованного
контракта.

## Placement и fallback

Host app передаёт логический placement ID. Платформа использует ответ Adapty для
фактически загруженного placement; если сработал существующий fallback, она
показывает именно его paywall и products. Второго REST-клиента, verifier-а или
повторной загрузки каталога перед показом не требуется.

![Шаг 1 — обычный subscription paywall](../public/guides/readme/References/special-offer-step-1-paywall.png)

![Шаг 2 — Special Offer после закрытия первого paywall](../public/guides/readme/References/special-offer-step-2-offer.png)

Кадры показывают только порядок экранов. Background, copy, число карточек,
discount и legal content принадлежат конкретному приложению и ответу Adapty.

## Что проверяет платформа

- первый paywall остаётся первым;
- подтверждённая подписка не ведёт в downsell;
- `special_offer = false` или отсутствие флага не показывает второй экран;
- в UI передаётся весь массив products в порядке Adapty;
- таймер зацикливается и не влияет на возможность покупки.

Проверки выполняются fixture/probe-кодом без настоящих purchase, restore и RU
payment.

[Adapty setup](./adapty-setup.md) · [Paywall UI](./paywall-ui.md) · [RU Billing](./ru-billing.md)
