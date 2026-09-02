# BroadUIFlows: paywall и Special Offer

Здесь показан именно нужный сценарий: сначала обычный paywall,
затем пользователь нажимает крестик и видит отдельный Special Offer.
Это не два состояния одного экрана, а два последовательных продуктовых шага.

> **Контракт общей платформы:** показ разрешает только Remote Config
> `special_offer = true`, а продукты второго экрана приходят из Adapty
> placement `special_offer`. Каталог `nextgenwebapps` здесь не используется.
> Ключ `kupon` и продукт из `nextgenwebapps` ниже относятся только к отдельному
> референсу приложения 232 Claude и не являются контрактом `BroadUIFlows`.

```text
Обычный paywall
        ├─ purchase / restore подтверждены → Premium / главный экран приложения
        └─ нажат крестик без покупки
                    ↓ если показ разрешён
              Special Offer
                    ├─ покупка подтверждена → Premium / главный экран приложения
                    └─ нажат крестик → главный экран приложения
```

## Adapty: реальный сценарий 5007

Ниже — актуальная сборка 5007. Сначала показывается обычный paywall с годовым
и недельным планами. Нажатие на тариф только меняет выбор и не запускает
покупку.

![5007: обновлённый обычный paywall](../public/guides/ui-flows/5007/paywall.png)

![5007: переключение между тарифами обычного paywall](../public/guides/ui-flows/5007/paywall.gif)

После нажатия на крестик основной paywall не закрывает весь сценарий: вместо
него появляется отдельный Limited-Time Offer со своей ценой и кнопкой
Continue.

![5007: переход по крестику из обычного paywall в Special Offer](../public/guides/ui-flows/5007/special-offer.gif)

![5007: обновлённый экран Special Offer](../public/guides/ui-flows/5007/special-offer.png)

## Adapty: реальный сценарий 5092

В 5092 дизайн другой, но контракт тот же: крестик не завершает
весь сценарий, а открывает второе предложение.

![5092: обычный Adapty paywall, крестик и LIMITED-TIME OFFER](../public/guides/ui-flows/paywall-special-offer/5092-adapty.gif)

## Отдельный референс: RU Billing в 232 Claude

Этот пример записан с языком **Russian** и регионом **Russia**. Обычный
русский paywall закрывается, после чего появляется специальное
предложение RU Billing с рублёвой ценой.

Это app-specific реализация 232 Claude, а не общее поведение платформы. Только
в этом приложении используются Remote Config `kupon = true`, bundle
`com.arm.232C1aude` и платёжный каталог `nextgenwebapps`. Каталог выбирает
строку по `widgetTitle == "kupon"` и возвращает
`monthly_12.99_nottrial` за 990 ₽. При `kupon = true` второй экран
показывается всегда, без таймера, cooldown, даты окончания и лимита показов.

![Claude232: русский RU Billing paywall, крестик и специальное предложение](../public/guides/ui-flows/paywall-special-offer/claude232-ru-billing.gif)

> Важно: Russian отвечает за русскую локализацию экрана, а Russia — за
> региональный маршрут. Для повтора этого GIF в Simulator включите оба значения.

## Почему здесь нет GIF 5115Copilot

Документация не должна показывать выдуманный маршрут. В доступной сборке
5115Copilot крестик обычного paywall открывает экран Privacy, а в
доступных исходниках нет перехода в Special Offer. Как только будет
доступна сборка с этим переходом, её можно добавить четвёртым подтверждённым
референсом.

## Граница UI и оплаты

```text
BroadUIFlows       рисует карточки, выбор, loader, ошибки и кнопки
BroadMonetization  загружает продукты, запускает purchase/restore и проверяет Premium
Adapty / backend   возвращают продукты и подтверждённый результат
Приложение         задаёт дизайн, тексты, placements и момент показа
```

Крестик только сообщает о закрытии обычного paywall. Для общего
`BroadUIFlows` + Adapty flow действует одна таблица решения:

```text
special_offer == true → показать второй экран
всё остальное         → не показывать второй экран
```

Для этого общего flow продукты приходят из Adapty placement `special_offer`.
`nextgenwebapps`, `kupon` и фиксированный RU-продукт в нём не используются.

## Что проверить в общем BroadUIFlows flow

| Проверяем | Ожидаемый результат |
|---|---|
| Крестик обычного paywall | Special Offer открывается только при точном boolean `special_offer = true` в текущем Adapty Remote Config |
| Продукты Special Offer | Приходят из Adapty placement `special_offer`; каталог `nextgenwebapps` не вызывается |
| Успешные purchase и restore | Второе предложение не открывается |
| Повторное открытие | Оффер появляется снова сразу, без таймера, cooldown и лимита показов |
| Повторный tap | Вторая операция не запускается |
| Loader | Выбранный продукт сохраняется |
| Крестик Special Offer | Открывается главный экран приложения без Premium |
| Доступ к Premium | Открывается только после подтверждённого entitlement или backend-статуса |

## Что проверять только в 232 Claude

| Проверяем | Ожидаемый результат |
|---|---|
| Gate показа | `kupon = true` в текущем Adapty Remote Config 232 |
| Продукт RU Billing Special Offer | `nextgenwebapps` возвращает `monthly_12.99_nottrial`, 990 ₽ по `widgetTitle == "kupon"`; Adapty и App Store не выбирают RU-продукт |
| Повторное открытие | Оффер появляется снова сразу, без таймера, cooldown и лимита показов |

[Назад к BroadUIFlows](./broad-ui-flows.md) · [Логика paywall](./paywall-ui.md) · [Special Offer от Adapty](./special-offer.md) · [Special Offer RU Billing](./ru-special-offer.md)
