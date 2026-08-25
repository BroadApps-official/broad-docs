# Runtime и надёжность

## Запуск и cache

![Critical/background startup и cache fallback](/guides/readme/startup-cache-light.svg)

Composition root собирает configuration/adapters один раз. Critical steps идут
последовательно с bounded timeout/retry; UI открывается после safe readiness;
analytics, telemetry и prewarm запускаются background.

Cache возвращает только `fresh`, `stale` или `missing(reason)`. Stale content
можно показать с явным состоянием и Retry, но cache не доказывает entitlement,
purchase или remote financial gate.

## Полный пользовательский flow

![Первый запуск и entitlement confirmation](/guides/readme/full-flow.gif)

```text
launch → optional onboarding → initial paywall policy
       → purchase/restore/RU return → fresh entitlement
       → active: premium / inactive-unresolved: main without premium
```

`unresolved` не равен `inactive`, а `pending` не превращается в success/failure
по timeout.

## Async feedback

![Spinner до Task и первого await](/guides/readme/debug-feedback-light.svg)

Любая backend/SDK-кнопка синхронно ставит `isInFlight` до создания `Task`.
Повторный tap блокируется. Error и offline завершают ожидание и дают безопасное
действие: Retry, Close или reconciliation.

## Entitlement authority

Purchase/restore callback является evidence, а не premium access. Доступ
открывает только fresh confirmed `active` от разрешённых StoreKit/backend/RU
sources. Local cache может ускорить initial UI, но не выдаёт premium.

## Network interruption

| Точка | Безопасное поведение |
|---|---|
| Catalog load | stale/empty/error с Retry |
| Purchase/restore | состояние остаётся pending/unresolved до reconciliation |
| Token charge | сеть не запускает второе списание автоматически |
| RU checkout | foreground/network только проверяют существующий operation |
| Cancellation | повторная проверка status, не новая cancel request без действия пользователя |

## Recovery после переустановки

- Apple subscription/lifetime — StoreKit и entitlement provider;
- token balance — backend current app account;
- RU purchase/subscription — RU backend current app account;
- local cache — только ускорение, не source of truth.

## Debug Keychain

Cleaner разрешён только в Debug, после подтверждения и только для явно
перечисленных app-owned service/access group. Он не удаляет payment pending и
полностью отсутствует в Release.

[BroadCore](https://github.com/BroadApps-official/broad-core-ios) ·
[BroadMonetization](https://github.com/BroadApps-official/broad-monetization-ios) ·
[Network interruption contract](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/NetworkInterruptions.md)
