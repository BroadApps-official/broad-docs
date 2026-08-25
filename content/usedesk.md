# Usedesk

## Опциональный host-app flow

Usedesk не входит в Core, Monetization или UIFlows автоматически. Его
подключают только если конкретному приложению нужен чат.

![Вход Онлайн-чат из Settings](/guides/readme/Usedesk/settings-online-chat-highlighted.png)

SDK открывается только после явного действия `Настройки → Онлайн-чат`, а не из
loader/bootstrap.

![Экран чата](/guides/readme/Usedesk/chat-screen.png)

## Что запросить до реализации

- Company ID и Channel ID;
- нужен ли готовый GUI;
- нужна ли База знаний;
- нужны ли push notifications;
- authenticated backend endpoints для user chat token;
- account/logout behavior.

Для готового GUI SDK устанавливается через CocoaPods в app target. После
`pod install` открывается `.xcworkspace`.

## Три разных значения

| Значение | Назначение |
|---|---|
| Company ID | tenant Usedesk |
| Channel ID | конкретный канал |
| User chat token | identity/history текущего app account |

Обычный `api_token` для клиентского чата остаётся `nil`. Server/admin token не
публикуется в app.

## Backend и Keychain

```text
backend current app account = source user chat token
account-scoped Keychain     = cache + durable pending sync
device ID                   = не identity пользователя
```

При callback нового token app сначала сохраняет account-scoped local pending,
затем синхронизирует backend. Ошибка не проглатывается; logout не должен
показывать историю другого account.

![Санитизированная карта данных проекта](/guides/readme/Usedesk/pm-data-sanitized.png)

## Offline

Offline может показать понятное состояние и Retry. Он не создаёт новую identity
и не заменяет backend device ID или случайной локальной строкой.

## Проверка

- Settings action открывает правильный channel;
- повторная установка восстанавливает историю после login того же account;
- другой account не видит предыдущий token/history;
- pending sync переживает временную network error;
- secrets и raw token не попадают в logs/README;
- permissions добавлены только для реально включённых features.

[Полная integration-инструкция](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/Usedesk.md)
