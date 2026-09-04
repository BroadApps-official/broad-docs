# RU Billing: продукты с backend

Эта страница показывает, **как получить тарифы с backend**, кто пишет сетевой
запрос и какую часть уже делает `BroadMonetization`.

> Начните с контракта backend. Не копируйте URL, токен или JSON из другого
> приложения: у него могут быть другой сервер, единицы цены и способы оплаты.

> Готовый `FlatRUCatalogResponseDecoder` относится к следующему обновлению
> `BroadMonetization`. Перед копированием примера проверьте публичный API
> установленного тега. Если adapter ещё не выпущен, используйте собственный
> `RUCatalogResponseDecoderProtocol` с тем же контрактом массива.

## Какие backend-методы нужны приложению

До Swift-кода разработчик получает точные методы текущего приложения. Названия
путей ниже — понятный пример контракта, а не значения, которые можно вставить
без подтверждения:

| Метод | Для чего нужен | Что должны сообщить разработчику |
|---|---|---|
| catalog | получить подписки, coupon и пакеты токенов | URL, HTTP method, JSON и единицу цены |
| checkout | получить ссылку на оплату картой/СБП | URL, request body и обязательные поля |
| status/policy | после браузера проверить оплату и Premium | URL, успешный статус и pending policy |
| cancel, если есть автопродление | отключить продление RU-подписки | URL, допустимые состояния и результат |

Если конкретное приложение использует `GET /v1/tokens/products`,
`POST /v1/billing/cloudpayments/checkout` и `GET /v1/policy/effective`, эти пути
должны быть явно записаны в его Integration Plan. Разработчик не подбирает их
по другому приложению.

## Пример API-контракта

Домен и session authorization передаются конфигурацией текущего приложения:

```http
GET https://<backend-конкретного-приложения>/v1/tokens/products
Authorization: <session-authorization-текущего-пользователя>
Accept: application/json
```

Общий минимальный shape ответа выглядит так:

```json
{
  "products": [
    {
      "productId": "premium_month_ru",
      "title": "Premium на месяц",
      "kind": "subscription",
      "period": "month",
      "price": 499,
      "currency": "RUB"
    },
    {
      "productId": "tokens_100_ru",
      "title": "100 токенов",
      "kind": "tokens",
      "price": 199,
      "currency": "RUB",
      "credits": 100
    }
  ]
}
```

Backend может использовать `productId` или `product_id`. Поля `title`, `kind`,
`period`, `price`, `currency`, `credits` зависят от подтверждённой версии API.
Поэтому наличие поля в этом примере ещё не заменяет проверку реального ответа.

### Как из продукта получается ссылка на оплату

Пользователь выбирает строку каталога, а приложение отправляет **её точный
backend `productId`**, не цену и не позицию карточки:

```http
POST https://<backend-конкретного-приложения>/v1/billing/cloudpayments/checkout
Authorization: <session-authorization-текущего-пользователя>
Content-Type: application/json

{
  "productId": "premium_month_ru",
  "customerEmail": "buyer@example.com"
}
```

```json
{
  "paymentId": "payment_123",
  "paymentUrl": "https://<платёжная-страница>",
  "status": "pending",
  "expiresAt": "2026-08-30T12:30:00Z"
}
```

`paymentUrl` открывает платёжную страницу. Возврат из браузера **не означает
успешную оплату**. Для подписки приложение повторно читает
`GET /v1/policy/effective`; для токенов сверяет подтверждённый backend balance,
например через account/wallet endpoint текущего приложения.

### Важное различие ID

В API нет автоматической гарантии отдельного `appStoreProductId`. Поэтому до
кода нужно получить один из двух подтверждённых вариантов:

1. backend `productId` уже в точности равен ID продукта Adapty/App Store;
2. ID различаются — тогда backend добавляет явное поле соответствия либо host
   app передаёт проверенную явную таблицу/decoder.

Искать соответствие по цене, названию, периоду или позиции в массиве нельзя.

## Что нельзя придумывать внутри приложения

Не добавляйте скрытую сортировку, фильтрацию, превращение массива в dictionary,
вывод `kind` из имени SKU или оптимистическое включение Premium после закрытия
браузера. Такие решения меняют коммерческий контракт без явного требования.

Платформенный adapter должен сохранить весь массив, порядок и дубли, а успех
оплаты подтверждать только backend/entitlement. Production domain, session
credential, product IDs и региональный gate передаются конфигурацией текущего
приложения и правилами платформы.

## Кто за что отвечает

```text
backend
  возвращает массив продуктов
        ↓
конфигурация конкретного приложения
  передаёт URL, заголовки, авторизацию и timeout
        ↓
URLSession repository + decoder BroadMonetization
  выполняют запрос, проверяют JSON и создают одну модель на каждую строку
        ↓
общая логика оплаты
  связывает продукт по точному ID и предлагает Apple / СБП / карту
        ↓
экран приложения или BroadUIFlows
  показывает весь полученный список
```

Public-библиотека не должна хранить production URL и секреты приложений.
Поэтому приложение передаёт HTTPS configuration и авторизацию, а платформа
выполняет запрос и отвечает за модели, decoder, проверки и общий checkout flow.

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
Не угадывайте production-контракт.

## Если проект делает Codex или Claude

Дайте агенту не просьбу «добавь RU Billing», а проверяемую задачу:

```text
Изучи host app, AppIntegrationPlan и переданный API-контракт.

1. Выпиши catalog, checkout, policy/entitlement, wallet/balance и cancellation
   endpoints, auth injection и request/response DTO.
2. Не открывай платёжный кабинет и не копируй значения другого приложения.
3. Не показывай production URL, токены, ключи и персональные данные.
4. Выпиши неизвестные contract values: price units, ID mapping, обязательные
   поля, payment methods, email source, offline policy и backend authority.
5. Задай мне только вопросы, ответы на которые меняют реализацию.
6. До моего ответа не меняй Swift. Заверши отчёт строкой:
   BACKEND CONTRACT REVIEW REQUIRED.
7. После подтверждения используй платформенный adapter; сохрани весь массив,
   порядок и дубли. Browser return не считай успешной оплатой.
```

Так агент сначала доказывает, **что именно подключает**, и не угадывает
production-контракт.

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
      "kind": "tokens",
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

### Какие значения понимает готовый decoder

| Поле | Поддерживаемые значения | Что важно |
|---|---|---|
| `kind` | `subscription`, `token`/`tokens`, `coupon` | другое значение становится `unknown`; для пакета токенов не пишите `consumable` |
| `period` | `day`, `week`, `month`, `year` и их обычные английские формы | неизвестное непустое значение сохраняется как custom period |
| `paymentMethods` | `sbp`, `card` | неизвестное значение или повтор считается ошибкой |
| `credits` | целое число от нуля | отрицательное число считается ошибкой |
| `price` + `currency` | неотрицательная сумма и трёхбуквенный код валюты | если цена есть, валюта обязательна |

Если `paymentMethods` отсутствует у строки, используются методы, явно
переданные в `supportedMethods`. Это fallback конфигурации, а не догадка
платформы.

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

let ruBillingFactory = RUBillingCompositionFactory(
    configuration: ruBillingConfiguration,
    dependencies: ruBillingDependencies,
    wire: wire
)
```

`ruBillingConfiguration` хранит app-owned HTTPS endpoints и timeout, а
`ruBillingDependencies` — авторизацию, пользователя, кеш и остальные зависимости
конкретного приложения. Factory создаёт настоящий
`URLSessionRUCatalogRepository`; отдельного `HTTPRUCatalogRepository` в public
API нет.

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

Готовый decoder проверяет обязательный ID, пару цена/валюта, payment methods и
неотрицательное количество `credits`.
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
[«Карта и СБП»](./ru-billing.md): каталог сам по себе не включает
RU methods без свежего `ru_pay=true` и российского Storefront/региона.

Если backend отдаёт coupon/дожим, не выбирайте одну строку сортировкой.
RU-продукт Special Offer приходит именно из платёжного каталога backend: строка
выбирается по отметке `isSpecialOffer`, а показ разрешает булев флаг в Remote
Config основного paywall. Ни Adapty, ни App Store не являются источником этого
RU-продукта. Полный маршрут с циклом «окно оффера → cooldown»:
[«RU Billing: спешл оффер»](./ru-special-offer.md).

## Куда идти дальше

- [Карта и СБП](./ru-billing.md)
- [RU Billing: спешл оффер](./ru-special-offer.md)
- [BroadMonetization](./broad-monetization.md)
- [Экран подписки](./paywall-ui.md)
- [Создание приложения](./app-creation.md)
