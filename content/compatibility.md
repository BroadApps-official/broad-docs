# Какие версии ставить

У каждого модуля своя версия. Каталог совместимости отвечает на простой вопрос:
**какие конкретные версии уже собирались и проверялись вместе?**

Каталог лежит в публичном
[`broad-platform-integration`](https://github.com/BroadApps-official/broad-platform-integration)
и читается как человеком, так и автоматическими скриптами.

## Готовый ответ

Текущий проверенный набор:

| Что | Версия |
|---|---:|
| iOS | 17.0 и новее |
| Режим языка Swift | 5 |
| Формат `Package.swift` | Swift tools 6.0 |
| `BroadCore` | [`1.0.0`](https://github.com/BroadApps-official/broad-core-ios/releases/tag/1.0.0) |
| `BroadExtensions` | [`1.0.0`](https://github.com/BroadApps-official/broad-extensions-ios/releases/tag/1.0.0) |
| `BroadMonetization` | [`1.0.0`](https://github.com/BroadApps-official/broad-monetization-ios/releases/tag/1.0.0) |
| `BroadUIFlows` | [`1.0.0`](https://github.com/BroadApps-official/broad-ui-flows-ios/releases/tag/1.0.0) |
| Последняя общая проверка | 25 августа 2026 года |

Приложение не обязано подключать весь набор. Возьмите из таблицы версию только
того модуля, который нужен приложению.

## Exact или from

В Xcode встречаются два способа выбрать версию:

| Запись | Что делает | Когда использовать |
|---|---|---|
| `exact: "1.0.0"` | Всегда берёт ровно `1.0.0` | Миграция, интеграционный пример и воспроизводимая проверка |
| `from: "1.0.0"` | Разрешает Xcode выбрать более новую совместимую версию до `2.0.0` | Обычное приложение после решения команды |

`from: "1.0.0"` не гарантирует, что фактически будет скачана `1.0.0`.
Выбранная Xcode версия записывается в `Package.resolved`. Поэтому статус
«проверено» относится к точным версиям из таблицы, а не ко всем будущим
обновлениям.

## Что именно было проверено

Для каждого модуля система:

1. скачала чистую копию публичного репозитория;
2. собрала Swift Package;
3. собрала демонстрационное iPhone-приложение в Debug и Release;
4. проверила документацию, ссылки, privacy manifest и публичный API;
5. затем собрала все четыре версии вместе в `BroadAppTemplate`.

Безопасные демонстрационные сценарии не выполняли настоящую покупку или
восстановление подписки: их готовность проверяется отдельно в конкретном
приложении. Для RU Billing статус `passed` подтверждает сборку общего кода, но
не production URL, backend auth, legal-настройки и реальную оплату конкретного
приложения. Актуальное правило платформы и предупреждение о rollout указаны в
[RU Billing guide](./ru-billing.md).

## Почему Swift 5 и tools 6.0 не конфликтуют

Swift 5 — режим компиляции исходного кода платформы. `swift-tools-version: 6.0`
— версия формата файла `Package.swift`, которую должен понимать установленный
Xcode. Эта запись не переводит приложение на язык Swift 6.

## Машиночитаемая запись

Ниже тот же набор для скриптов. Разработчику обычно достаточно таблицы выше.

```yaml
schema: 1
platform_set: "1.0.0"
ios: "17.0"
swift_language_mode: "5"
swift_tools: "6.0"
modules:
  BroadCore: "1.0.0"
  BroadExtensions: "1.0.0"
  BroadMonetization: "1.0.0"
  BroadUIFlows: "1.0.0"
verification:
  status: passed
  command: "bash Scripts/agent_gate.sh"
  checked_at: "2026-08-25"
```

[Открыть integration release 1.0.0](https://github.com/BroadApps-official/broad-platform-integration/releases/tag/1.0.0)
