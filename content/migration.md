# Миграция

## Порядок

```text
Contracts → Docs → Extensions → Core → Monetization → UIFlows → Cutover
```

Порядок идёт снизу вверх, чтобы dependent package никогда не ссылался на ещё не опубликованный dependency tag.

Сейчас завершены Extensions и Core: оба модуля выпущены как `1.0.0`,
прошли standalone/remote/release/integration gates и собираются из exact tags.
Следующий шаг — BroadMonetization.

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

После четырёх standalone releases integration repository фиксирует exact tags, обновляет BroadAppTemplate на remote packages, проходит clean-clone acceptance и только затем публикует catalog со статусом `passed`.
