# BroadUIFlows

**Логика экранов, которые есть в каждом приложении:** первый запуск, онбординг, пейвол
и покупка токенов. Экран по Figma вы рисуете сами и подключаете к этой логике —
поведение писать заново не нужно.

![BroadUIFlows даёт логику первого запуска, онбординга, пейвола и токенов; экран по Figma получает данные и вызывает методы ViewModel](../public/guides/readme/ui-flows-logic-light.svg)

## Что брать

| Сценарий | Что подключить | Что уже работает |
|---|---|---|
| Первый запуск | `BroadAppFlowView` | Сплэш → онбординг → пейвол → главный экран; Special Offer после закрытия пейвола |
| Онбординг | `BroadOnboardingFlowHost` | Страницы из `OnboardingConfiguration.pages`, запрос ATT после первого слайда |
| Пейвол | `PaywallViewModel` | Подписки от длинной к короткой, выбрана самая длинная, крестик через 5 с, покупка и Restore без двойного нажатия |
| Токены | `BroadTokenPaywallViewModel` | Пакеты токенов, покупка, подтверждение баланса |
| Загрузка и ошибки | `BroadLoadableView` | Загрузка, пустой ответ, ошибка с повтором |
| Письмо в поддержку | `BroadSupportEmailComposer` | Письмо по шаблону поддержки |

## Свой экран пейвола

Экран только рисует: берёт тарифы из `displayedProducts` и вызывает методы ViewModel.

```swift
ForEach(viewModel.displayedProducts, id: \.presentationID) { product in
    PlanRow(
        product: product,
        isSelected: product.presentationID == viewModel.selectedProductPresentationID
    )
    .contentShape(Rectangle())
    .onTapGesture { viewModel.selectProduct(presentationID: product.presentationID) }
}

Button("Продолжить") { viewModel.purchaseButtonTapped() }
    .disabled(!viewModel.canPurchase)

Button("Восстановить") { viewModel.restorePurchases() }

if viewModel.isCloseAvailable {
    CloseButton { _ = viewModel.requestClose() }
}
```

> Важно: не сортируйте тарифы на экране и не выбирайте тариф при открытии сами — это уже делает ViewModel.

## Готовые экраны

`BroadPaywallView`, `BroadOnboardingView` и `BroadTokenPaywallView` — готовые экраны с
темой. Они подходят для no-code-приложения и как образец поведения. Для проекта по
Figma рисуйте свой экран поверх той же логики.

## Правила поведения

> [!CAUTION]
> **Выбор тарифа не запускает покупку.**
> Нажатие на карточку выбирает тариф. Покупка — отдельной кнопкой; пока она идёт,
> повторное нажатие заблокировано.

> [!CAUTION]
> **Special Offer — только по разрешению.**
> Нужен строгий `special_offer == true` и активное окно: 24 часа показа, затем 24 часа
> перерыва. Продукты — из отдельного плейсмента `special_offer`. [Подробнее](./special-offer.md).

Покупка и Restore открывают Premium только после подтверждения доступа.

## Как подключить

В Xcode: **File → Add Package Dependencies…** → адрес ниже → product **BroadUIFlows**.
Версию берите из [проверенного набора](./compatibility.md). Для пейвола сначала
настройте [Adapty](./adapty-setup.md); RU-оплата — отдельный пакет
[BroadRUBilling](./ru-billing.md).

```text
https://github.com/BroadApps-official/broad-ui-flows-ios.git
```

## Где посмотреть больше примеров

| Нужно разобраться | Откройте |
|---|---|
| Страницы онбординга, завершение и переход к подписке | [Онбординг: полные проходы](./ui-flows-onboarding.md) |
| Тарифы, покупка и отдельный экран оффера | [Paywall и Special Offer](./ui-flows-paywall.md) |
| Настройки, письмо, чат и действия при недоступной почте | [Настройки и поддержка](./ui-flows-settings-support.md) |
| Состояния загрузки и повтор после ошибки | [Запуск, ошибки и восстановление](./runtime-reliability.md) |

## Что проверить

1. Пройти онбординг до конца и отдельно проверить закрытие пейвола без покупки.
2. Показать ноль, один и несколько тарифов: сверху самая длинная подписка, она же выбрана.
3. Дважды нажать кнопку покупки: активная операция должна остаться одна.
4. Проверить разрешённый оффер, запрет флага и завершение таймера.
5. Открыть настройки, Restore, поддержку и ссылки на документы; убедиться, что можно вернуться.

[README и API](https://github.com/BroadApps-official/broad-ui-flows-ios) · [Платёжная логика](./broad-monetization.md) · [Как устроена платформа](./architecture.md)
