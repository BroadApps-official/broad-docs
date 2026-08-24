# BroadApps iOS Documentation

Публичная поисковая точка входа для модулей BroadApps iOS. Сайт дополняет
README/DocC модулей, но не удаляет и не заменяет их.

## Что здесь есть

- выбор нужного Swift Package product без обязательного umbrella;
- architecture и ownership repositories;
- Special Offer, compatibility, migration и release-правила;
- client-side поиск по всем public Markdown-страницам;
- `Edit this page` для обычного public pull request.

## Редактирование

Контент лежит в `content/*.md`. Метаданные страниц и поисковый индекс
описаны в `lib/docs.ts`. Новая страница добавляется в оба места.

Правила contribution: [CONTRIBUTING.md](CONTRIBUTING.md).

## Локальный запуск

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

## Обязательная проверка

```bash
pnpm run check
```

Команда выполняет static content contract, lint и production build. По решению
владельца не добавляются `tests/`, unit-test runner или test scripts.

## Публикация

Сайт публикуется из `main` после успешного public quality workflow. Ни контент,
ни поиск не требуют авторизации посетителя.
