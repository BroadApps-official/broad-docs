# BroadApps iOS Documentation

Публичная поисковая точка входа для модулей BroadApps iOS. Сайт дополняет
README/DocC модулей, но не удаляет и не заменяет их.

## Что читать и когда

Короткое правило: сайт объясняет, как части платформы работают вместе;
README и DocC модуля объясняют его конкретный API.

| Источник | Используйте для |
|---|---|
| Integration README | первого запуска platform example и перехода к нужной инструкции |
| Этот сайт | поиска, общей архитектуры, выбора модуля, миграции и совместимости |
| Module README и DocC | API конкретной версии модуля |
| `Compatibility/current.yml` | точного набора версий, уже проверенного вместе |

Сайт не хранит вторую копию module API. Он помогает найти canonical owner и
перейти к нужному repository.

## Что здесь есть

- выбор нужного Swift Package product без обязательного umbrella;
- заметная схема «host app → нужные модули» и простое объяснение преимуществ;
- Special Offer, compatibility, отдельные manual/AI маршруты legacy migration и release-правила;
- client-side поиск по всем canonical страницам этого docs repository;
- визуальные карты architecture ownership, compatibility, Special Offer и legacy migration;
- anonymous public-package installation и диагностика Keychain/private URL;
- `Edit this page` для обычного public pull request.

## Редактирование

Контент лежит в `content/*.md`. Метаданные страниц и поисковый индекс
описаны в `lib/docs.ts`. Новая страница добавляется в оба места.

Правила contribution: [CONTRIBUTING.md](CONTRIBUTING.md).

## Локальный запуск

Требования: Node.js `22.13+` и pnpm `10.15.1` из поля `packageManager`.

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

Откройте URL `Local` из вывода команды; по умолчанию это
`http://localhost:3000`. Изменения в `content/*.md` обновляются локально без
публикации production-сайта.

## Обязательная проверка

```bash
pnpm run check
```

Команда выполняет static content contract, lint и production build. По решению
владельца не добавляются `tests/`, unit-test runner или test scripts.

## Swift version

Platform products и host example используют Swift 5 language mode. Значение
`swift-tools-version: 6.0` относится к SwiftPM manifest/toolchain и не означает,
что production sources переведены в Swift 6 language mode.

## Публикация

Сайт публикуется из `main` после успешного public quality workflow. Ни контент,
ни поиск не требуют авторизации посетителя.
