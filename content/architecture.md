# Архитектура

## Схема за 30 секунд

```text
Ваше iPhone-приложение (host app)
 ├─ BroadExtensions                         самостоятельно
 ├─ BroadCore                               фундамент
 ├─ BroadMonetization ────────────────────→ BroadCore
 └─ BroadUIFlows ─────→ BroadMonetization → BroadCore

 broad-platform-integration   проверяет точный набор версий
 broad-docs                   объясняет общие сценарии и даёт поиск
```

Приложение подключает любой нужный модуль — один, несколько или все четыре.
SwiftPM сам добавляет нижележащие зависимости. Например, вместе с
`BroadUIFlows` придут `BroadMonetization` и `BroadCore`.

`broad-platform-integration` и `broad-docs` в приложение не подключаются.
Первый repository доказывает, что конкретные версии работают вместе, второй
помогает найти инструкцию и перейти к владельцу нужного кода.

## Почему этот подход удобнее

- **Меньше лишнего.** App не получает UI или SDK, которые не использует.
- **Review проще.** Изменение одного модуля видно в небольшом отдельном
  repository, а не среди изменений всей платформы.
- **Release точнее.** Backward-compatible исправление выпускает repository,
  который владеет кодом. Проверки зависимых модулей всё равно повторяются.
- **Совместимость не нужно угадывать.** Integration catalog хранит точные tags,
  которые уже собирались и проверялись вместе.
- **Документация не теряется.** Общие инструкции ищутся на сайте, а README и
  DocC конкретной версии остаются рядом с её кодом.
- **Старое app можно переносить по частям.** Сначала меняется одна граница и
  один пользовательский flow; только затем удаляется старый код.

## Какой модуль подключать

| Задача приложения | Нужный product | Что придёт автоматически |
|---|---|---|
| Общие extensions | `BroadExtensions` | ничего |
| Bootstrap, cache, logging, retry | `BroadCore` | platform dependencies Core |
| Свой UI для оплаты | `BroadMonetization` | совместимый `BroadCore` |
| Готовые onboarding, AppFlow и paywall | `BroadUIFlows` | совместимые Monetization и Core |

Если app напрямую импортирует API нижележащего модуля, добавьте и его product в
app target. Это делает прямую зависимость приложения видимой в Xcode.

## Кто за что отвечает

| Часть | Простыми словами |
|---|---|
| Module repository | код модуля, его README, DocC, changelog и SemVer release |
| Integration repository | точные проверенные версии, целостный example и общая проверка |
| Docs repository и сайт | общие инструкции, поиск и ссылки к нужному module repository |
| Host app | ключи, URL, placements, backend adapters, строки, assets и решения продукта |

Отдельный repository не означает, что модули никогда не зависят друг от друга.
Он означает понятного владельца кода и отдельную область review.

## Границы внутри модуля

```text
Presentation → Application → Domain
                       ↓
                     Data → Infrastructure
```

- Domain/Data не импортируют SwiftUI.
- Presentation не импортирует Adapty и StoreKit.
- View не ищет dependencies через resolver.
- SDK/wire models не выходят за adapter boundary.
- App strings, assets, real IDs/keys/URLs не попадают в shared package.

## Если изменение затрагивает несколько repositories

Изменение идёт снизу вверх: сначала владелец public API, затем зависимые модули,
после них integration catalog и общая документация. Backward-compatible patch
может выйти только в repository-владельце, но зависимые проверки и общая
integration-проверка повторяются. Breaking public contract может потребовать
новых releases модулей-потребителей.
