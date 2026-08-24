# Выбор модуля

## Короткая матрица

- Нужны только Hex Color, fonts, keyboard dismiss и swipe-back — `BroadExtensions`.
- Нужны bootstrap, cache, state, retry, logging или ATT adapter — `BroadCore`.
- Нужна monetization, но UI полностью app-owned — `BroadMonetization`.
- Нужны готовые onboarding/paywall/AppFlow — `BroadUIFlows`.

## Транзитивные dependencies

`BroadExtensions` не тянет ничего. `BroadCore` зависит только от Swinject. `BroadMonetization` подтягивает Core, Swinject и Adapty. `BroadUIFlows` подтягивает Core, Monetization и Swinject.

SwiftPM разрешает graph снизу вверх. Host app добавляет нижележащий product напрямую, только если импортирует его public API.

## Что не является модулем

Real IDs, keys, legal URLs, texts, assets, backend paths и product decisions принадлежат host app. Usedesk GUI тоже подключается app target, а не внутрь shared package.

## Когда смотреть compatibility catalog

Каталог не заставляет подключать всё. Он показывает, какая версия выбранного модуля уже прошла integration gate вместе с остальными.
