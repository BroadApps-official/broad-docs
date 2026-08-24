# Разделение platform repository

> Эта страница описывает перенос **кода самой платформы** из прежнего общего
> repository в независимые module repositories. Если нужно перевести уже
> работающее host-приложение со старого BroadApps monolith/local sources,
> откройте [«Миграция старого app»](/docs/legacy-app-migration).

## Порядок

```text
Contracts → Docs → Extensions → Core → Monetization → UIFlows → Cutover
```

Порядок идёт снизу вверх, чтобы dependent package никогда не ссылался на ещё не опубликованный dependency tag.

Extensions, Core, Monetization и UIFlows выпущены как `1.0.0`, прошли
standalone/remote/release gates и собираются из exact tags. Локальные дубликаты
production sources удалены из integration checkout после byte-for-byte
сравнения. `BroadAppTemplate` подключает каждый нужный product напрямую.

Публичный [`broad-platform-integration`](https://github.com/BroadApps-official/broad-platform-integration)
хранит exact-набор, host example, Xcode/SwiftPM lockfiles и cross-module gate.
Он не является runtime umbrella и не требуется host app.

## После каждого шага

1. Repository публичен и клонируется без credentials.
2. `Package.swift` объявляет только разрешённые dependencies.
3. Module gate и iPhone sandbox compile прошли.
4. Нет `Tests/`, test targets, XCTest и Swift Testing.
5. README, DocC, links и assets валидны.
6. Integration repository продолжает собираться.
7. Changelog фиксирует что сделано и почему.

## Сохранение истории

Исходники модуля переносятся с релевантной Git-историей. После выделения первый standalone commit добавляет package manifest, scripts, sandbox и docs, но не переписывает происхождение Swift-файлов.

## Cutover

После четырёх standalone releases integration repository фиксирует exact tags,
обновляет BroadAppTemplate на remote packages, проходит clean-clone acceptance
и только затем публикует catalog со статусом `passed`. Тот же набор остаётся
доступен по отдельности: host app выбирает один или несколько модулей по своей
задаче.
