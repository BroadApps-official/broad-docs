# Adapty и placements

## Коротко

Для обычного приложения нужны две вещи:

1. публичный Adapty SDK key;
2. placement ID нужного экрана.

Приложение запрашивает placement, Adapty возвращает paywall и products, а
платформа показывает **весь** полученный список в исходном порядке. Отдельный
verifier, собственный REST-клиент и access level для базовой загрузки paywall не
нужны.

```text
public SDK key + placement ID
  → Adapty.getPaywall
  → Adapty.getPaywallProducts
  → все 0…N products
  → subscription / token / Special Offer UI
```

Apple-доступ после purchase/restore подтверждается StoreKit. Это отдельная
задача от загрузки paywall и не должна усложнять настройку Adapty.

## Что настраивает приложение

| Что | Где задаётся |
|---|---|
| Public SDK key | composition root приложения |
| Placement IDs | typed registry приложения |
| Paywall и products | Adapty Dashboard |
| Тексты и внешний вид | Adapty payload и/или app-owned UI |

Типичные логические placements: `main`, `onboarding`, `pro_icon`, `settings`,
`CTR`, `tokens`, `special_offer`. Приложение подключает только те, которые ему
действительно нужны.

## Главное правило products

Платформа сохраняет весь provider array: 0, 1 или N products, исходный порядок
и повторяющиеся SKU. Она не выбирает «лучший» тариф, не оставляет только два
продукта и не сортирует по цене.

Если конкретному приложению нужны две карточки, разработчик реализует это как
явное app-owned UI-решение. Общий platform pipeline остаётся полным.

## Remote Config

Remote Config — это payload выбранного placement, а не вторая конфигурационная
система приложения. Платформа читает известные ей поля из того ответа, который
вернул Adapty. Например, для второго paywall сейчас нужен только:

```json
{
  "special_offer": true
}
```

Существующий fallback остаётся внутренней частью platform adapter. Host app не
добавляет поверх него второй cache, verifier или REST transport.

![Путь от Adapty placement до UI](../public/guides/readme/remote-config-cache-flow-light.svg)

## Проверка подключения

- public SDK key передан один раз в composition root;
- View использует логический placement, а не строку provider ID;
- requested placement и фактический fallback различимы в диагностике;
- в UI приходит весь массив products;
- purchase использует product из уже загруженного paywall;
- настоящая финансовая операция для platform gate не выполняется.

[BroadMonetization](https://github.com/BroadApps-official/broad-monetization-ios) ·
[Special Offer](./special-offer.md) · [Token paywall](./token-paywall.md)
