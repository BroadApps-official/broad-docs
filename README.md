# BroadApps iOS Documentation

Публичная поисковая точка входа для модулей BroadApps iOS. Сайт дополняет
README/DocC модулей, но не удаляет и не заменяет их.

## Что читать и когда

| Источник | Используйте для |
|---|---|
| Integration README | первого входа, выбора product и обязательных правил платформы |
| Этот сайт | поиска, cross-module сценариев, legacy migration, compatibility и release process |
| Module README и DocC | public API и usage конкретного module tag |
| `Compatibility/current.yml` | exact-набора версий, прошедшего integration gate |

Сайт не хранит вторую копию module API. Он помогает найти canonical owner и
перейти к нужному repository.

## Что здесь есть

- выбор нужного Swift Package product без обязательного umbrella;
- architecture и ownership repositories;
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
