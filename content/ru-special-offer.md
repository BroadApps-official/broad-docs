# RU Billing: Special Offer на примере 232 Claude

Сначала полностью подключите обычный RU Billing по инструкции
[«RU Billing: карта и СБП»](./ru-billing.md): каталог, `ru_pay`, региональный
gate, checkout, возврат из браузера, проверку статуса и подтверждение Premium.
Ниже описана только добавка для Special Offer — ровно так, как продукт
выбирается в приложении 232 Claude.

> **Главное правило.** Приложение читает булевый `kupon` из Remote Config
> основного paywall Adapty. `kupon = true` означает: после закрытия обычного
> paywall без покупки или restore **всегда показать Special Offer**.
> `false`, отсутствие поля, неверный тип или ошибка означают: открыть главный
> экран приложения. Таймеров, 24-часовых окон, cooldown, лимитов и правил
> повторного показа нет.

## Готовый пример 232 Claude

| Настройка | Значение в 232 Claude |
|---|---|
| Приложение в RU Billing | `232 Claude` |
| Bundle ID | `com.arm.232C1aude` |
| Флаг в Remote Config основного paywall | `kupon` — строгое boolean-значение |
| Источник RU-продукта | платёжный каталог `nextgenwebapps` |
| Product ID из каталога | `monthly_12.99_nottrial` |
| Метка продукта в `nextgenwebapps` | `widgetTitle == "kupon"` |
| Тип строки в `nextgenwebapps` | `isForSubscription == true` |
| Цена примера | `990 ₽` |

> **Откуда берётся продукт.** RU-продукт не приходит из Adapty и не выбирается
> из App Store. Приложение запрашивает платёжный каталог `nextgenwebapps` для
> своего bundle ID и берёт строку, у которой `widgetTitle == "kupon"`.

В 232 эта строка возвращает `productId = monthly_12.99_nottrial` и цену 990 ₽.
Именно полученный из `nextgenwebapps` `productId` передаётся в RU checkout.

## Как проходит решение

```text
пользователь закрыл обычный paywall без подтверждённой покупки или restore
                              ↓
             Remote Config основного paywall Adapty
                              ↓
                 точное boolean kupon == true?
        ├─ нет → открыть главный экран приложения
        └─ да  → запросить платёжный каталог nextgenwebapps
                 для bundleId=com.arm.232C1aude
                              ↓
       оставить isForSubscription == true и widgetTitle == "kupon"
                              ↓
              взять productId monthly_12.99_nottrial
                              ↓
       передать тот же productId в существующий RU checkout
                              ↓
     Premium открыть только после подтверждённого статуса оплаты
```

Здесь три разных владельца настройки:

| Система | За что отвечает |
|---|---|
| Adapty Remote Config | разрешает или запрещает показ через `kupon` |
| Платёжный каталог `nextgenwebapps` | выбирает RU-продукт по `widgetTitle == "kupon"` и отдаёт его `productId` и рублёвую цену |
| RU Billing checkout | создаёт оплату для `productId`, полученного из `nextgenwebapps` |

Наличие строки каталога само по себе не включает экран. Флаг Adapty не выбирает
продукт. App Store также не участвует в выборе RU-продукта. Для рабочего
сценария нужны обе части: `kupon = true` и строка `nextgenwebapps` с точной
меткой `widgetTitle == "kupon"`.

## Что настроить в Adapty

Добавьте строго булево поле:

```json
{
  "kupon": true
}
```

Не используйте строку `"true"`, число `1` или отдельный локальный флаг в
приложении. Решение принимается по текущему фактически полученному Remote
Config.

На этом роль Adapty в выборе RU-продукта заканчивается: он передаёт gate показа,
но не продукт и не рублёвую цену. Не ищите RU-продукт Special Offer в Adapty
или App Store.

## Что должно быть в платёжном каталоге nextgenwebapps

232 запрашивает существующим авторизованным клиентом:

```text
GET https://nextgenwebapps.shop/api/v1/services/paywallProducts
    ?bundleId=com.arm.232C1aude
```

Не публикуйте учётные данные каталога и не вшивайте их в общий package. В
ответе для bundle `com.arm.232C1aude` строка Special Offer должна иметь:

```text
productId         = monthly_12.99_nottrial
widgetTitle       = kupon
isForSubscription = true
price             = 990
```

Приложение 232 не выбирает самый дешёвый или первый тариф и не начинает с
Adapty/App Store SKU. Оно оставляет только подписочные строки
`nextgenwebapps` с `widgetTitle == "kupon"`. Если такой строки нет, подставлять
обычный месячный тариф нельзя.

## Что передать в RU Billing checkout

RU checkout должен принимать продукт, который вернул `nextgenwebapps`:

```text
Код продукта: monthly_12.99_nottrial
Цена:          990 ₽
Статус:        активен
```

Код не выбирается и не сопоставляется через Adapty или App Store. Истина для
RU Special Offer — строка платёжного каталога `nextgenwebapps`; её `productId`
передаётся в checkout без подмены по цене, позиции или похожему названию.

Не копируйте app-level переключатель «сделать все продукты разовыми» как часть
Special Offer: тип оплаты задаётся базовой настройкой RU Billing конкретного
приложения.

## Что добавить в приложение

1. После закрытия обычного paywall убедитесь, что purchase и restore не
   подтвердили Premium.
2. Прочитайте `kupon` из текущего Remote Config основного paywall.
3. Если значение не равно строгому boolean `true`, откройте главный экран
   приложения.
4. При `true` запросите каталог `nextgenwebapps` по bundle ID приложения.
5. Найдите подписочный продукт с точным `widgetTitle == "kupon"`.
6. Передайте его `productId` в уже реализованный checkout из основной статьи
   RU Billing.
7. После возврата из браузера проверьте статус на backend. Сам возврат не
   означает успешную оплату.

Для 232 итоговый `productId`, отправляемый в checkout, —
`monthly_12.99_nottrial`.

Источник RU-продукта в этом сценарии — только каталог
`nextgenwebapps.shop/api/v1/services/paywallProducts`. Не используйте для его
выбора Adapty, App Store или старый маршрут `pay.broadapps.dev/product`.

## Никакой временной логики

При `kupon = true` Special Offer показывается после каждого подходящего
закрытия обычного paywall.

Не добавляйте:

- сохранённую дату первого или последнего показа;
- окно доступности на 10 минут, 24 часа или другой срок;
- задержку до повторного показа;
- счётчик показов;
- закрытие или блокировку покупки по окончании таймера;
- server-driven дату окончания, если её нет в отдельном продуктовом
  требовании.

## Что проверить без настоящей оплаты

| Проверка | Ожидаемый результат |
|---|---|
| `kupon = true` | Special Offer открывается всегда |
| повторное закрытие обычного paywall при `kupon = true` | Special Offer открывается снова без паузы |
| `kupon = false` или поля нет | открывается главный экран приложения |
| строка `"true"` вместо boolean | Special Offer не показывается |
| в `nextgenwebapps` нет `widgetTitle == "kupon"` | обычный тариф из Adapty или App Store не подставляется |
| `nextgenwebapps` вернул продукт | его `productId` без подмены передаётся в RU checkout |
| пользователь вернулся из браузера без подтверждения | Premium не открывается |
| backend подтвердил активную оплату | Premium открывается |

## Задание для Codex или Claude

```text
Сначала подключи обычный RU Billing строго по статье «RU Billing: карта и СБП».
Не дублируй checkout, browser return, проверку статуса и подтверждение Premium.

Реализуй RU Billing Special Offer по примеру 232 Claude:
- bundle ID: com.arm.232C1aude;
- Remote Config основного paywall: строгое boolean kupon;
- источник RU-продукта: платёжный каталог nextgenwebapps;
- endpoint: /api/v1/services/paywallProducts?bundleId=com.arm.232C1aude;
- выбери только подписочный продукт с widgetTitle == kupon;
- для 232 nextgenwebapps возвращает productId monthly_12.99_nottrial;
- для примера 232 цена равна 990 ₽.

После закрытия обычного paywall без подтверждённой покупки или restore:
kupon == true всегда показывает Special Offer; любое другое значение открывает
главный экран приложения. Не добавляй таймеры, 24-часовые окна, cooldown,
лимиты, даты или правила повторного показа.

Не бери RU-продукт из Adapty или App Store и не выбирай его по цене, позиции
или похожему названию. Передай productId строки nextgenwebapps в существующий
RU checkout. Возврат из браузера не считай оплатой; Premium открывай только
после подтверждения backend. Настоящий платёж не выполняй.
```

## Куда идти дальше

- [Сначала: RU Billing — карта и СБП](./ru-billing.md)
- [Аккаунт-менеджеру: продукт Special Offer](./ru-billing-account-manager.md)
- [RU Billing: продукты с backend](./backend-product-catalog.md)
- [Как выглядит paywall и Special Offer](./ui-flows-paywall.md)
