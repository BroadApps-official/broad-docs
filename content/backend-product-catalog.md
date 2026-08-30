# Продукты с backend для RU Billing

Эта страница показывает, **как получить тарифы с backend**, кто пишет сетевой
запрос и какую часть уже делает `BroadMonetization`.

> Начните с контракта backend. Не копируйте URL, токен или JSON из другого
> приложения: у него могут быть другой сервер, единицы цены и способы оплаты.

## Кто за что отвечает

```text
backend
  возвращает массив продуктов
        ↓
код конкретного приложения
  знает URL, заголовки, авторизацию и timeout
        ↓
decoder BroadMonetization
  проверяет JSON и создаёт одну модель на каждую строку
        ↓
общая логика оплаты
  связывает продукт по точному ID и предлагает Apple / СБП / карту
        ↓
экран приложения или BroadUIFlows
  показывает весь полученный список
```

Public-библиотека не должна хранить production URL и секреты приложений.
Поэтому приложение передаёт маленький HTTP transport, а платформа отвечает за
модели, decoder, проверки и общий checkout flow.

## Что спросить у backend-разработчика

До Swift-кода заполните эту таблицу в плане приложения:

| Вопрос | Пример ответа | Зачем |
|---|---|---|
| URL и HTTP method | `GET /products` | выполнить запрос |
| авторизация | app-owned header/session | не копировать чужой секрет |
| форма JSON | `{ "products": [...] }` | выбрать готовый или свой decoder |
| единица `price` | рубли, не копейки | не показать 4,99 ₽ вместо 499 ₽ |
| стабильный backend ID | `premium_month_ru` | создать нужный checkout |
| точный App Store ID | `com.company.app.premium.month` | связать с карточкой Adapty |
| способы оплаты | `sbp`, `card` | показать только реально доступные кнопки |
| empty/offline policy | Apple-only или Retry | предсказуемый экран при ошибке |

Если ответа нет, пометьте этот пункт `BLOCKED` и уточните у backend/team lead.
Не угадывайте production-контракт по одному референсному приложению.

## Простой JSON, который уже поддерживается

Готовый `FlatRUCatalogResponseDecoder` понимает ответ
`{ "products": [...] }`:

```json
{
  "products": [
    {
      "productId": "premium_month_ru",
      "appStoreProductId": "com.company.app.premium.month",
      "title": "Premium на месяц",
      "kind": "subscription",
      "period": "month",
      "price": 499,
      "currency": "RUB",
      "paymentMethods": ["sbp", "card"]
    },
    {
      "productId": "tokens_100_ru",
      "appStoreProductId": "com.company.app.tokens.100",
      "title": "100 токенов",
      "kind": "consumable",
      "price": 199,
      "currency": "RUB",
      "credits": 100,
      "paymentMethods": ["sbp", "card"]
    }
  ]
}
```

Decoder также принимает snake_case для ID, например `product_id` и
`app_store_product_id`.

## Важное правило цены

В готовом decoder поле `price` содержит **основные единицы валюты**:

```text
price: 499 + currency: RUB = 499 ₽
```

Если сервер отдаёт копейки/minor units, например `49900`, нельзя молча передать
их готовому decoder. Либо backend меняет контракт, либо приложение добавляет
свой decoder, который явно делит сумму по согласованному правилу.

## Подключение готового decoder

```swift
let wire = RUBillingWireAdapters.broadAppsFlatCatalog(
    supportedMethods: [.sbp, .card]
)

let catalogRepository = HTTPRUCatalogRepository(
    transport: appOwnedTransport,
    decoder: wire.catalog
)
```

`appOwnedTransport` выполняет только HTTP-запрос: добавляет base URL, path,
headers/auth и timeout, затем возвращает `Data`. Он не решает, показывать ли
RU Billing, и не открывает Premium.

## Если JSON другой

Не нужно переделывать всю платформу. Напишите в приложении небольшой тип,
который реализует `RUCatalogResponseDecoderProtocol`:

```swift
struct AppRUCatalogDecoder: RUCatalogResponseDecoderProtocol {
    func decodeCatalog(from data: Data, fetchedAt: Date) throws -> RUCatalogPayload {
        // 1. Decode production schema.
        // 2. Validate every required field.
        // 3. Map every row to RUCatalogProduct in the same order.
    }
}
```

Свой decoder нужен, если у ответа другой envelope, другие названия полей,
minor units или данные собираются из нескольких endpoints. Общая логика gate,
сопоставления, checkout и entitlement при этом остаётся той же.

## Почему нельзя «почистить» массив в платформе

Платформа обязана вернуть backend-массив 1:1:

- без сортировки;
- без фильтрации;
- без удаления дублей;
- без ограничения первыми двумя строками;
- без превращения в dictionary по SKU.

Backend мог намеренно вернуть одинаковый SKU в разных предложениях. Скрытая
deduplication потеряет коммерческий вариант. Если конкретному приложению нужны
две карточки, оно выбирает их своим UI/config после получения полного массива.

## Только точное сопоставление

```text
Adapty product ID = backend appStoreProductId
```

Совпадение должно быть полным и чувствительным к каждому символу. Цена,
название, период и позиция в списке не являются идентификатором. При отсутствии
точного совпадения RU method не показывается для этого продукта.

## Что происходит при ошибке одной строки

Готовый decoder проверяет обязательный ID, валюту, цену и payment methods.
Некорректная строка не исчезает молча через `compactMap`: весь ответ считается
ошибочным, а UI следует согласованной policy — например показывает Apple-only
или Retry.

Так разработчик видит проблему контракта сразу, а пользователь не начинает
оплату по случайно неполному каталогу.

## Минимальная проверка

1. Ответ с 0, 1, 2 и 20+ строками.
2. Два одинаковых SKU остаются двумя строками.
3. Порядок совпадает с JSON.
4. camelCase и snake_case ID.
5. Нет обязательного ID — понятная ошибка.
6. Неизвестный payment method — понятная ошибка.
7. Цена интерпретируется в согласованной единице.
8. Точный product ID совпал.
9. Почти такой же ID не совпал.
10. Timeout/offline не запускает checkout.

После этого отдельно проверьте полный gate на странице
[«Оплата картой и СБП»](./ru-billing.md): каталог сам по себе не включает
RU methods без свежего `ru_pay=true` и российского Storefront/региона.

## Куда идти дальше

- [Оплата картой и СБП](./ru-billing.md)
- [BroadMonetization](./broad-monetization.md)
- [Экран подписки](./paywall-ui.md)
- [Создание приложения](./app-creation.md)

