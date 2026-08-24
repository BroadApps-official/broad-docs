# Contributing

## Маленькая правка

1. Откройте ссылку `Edit this page`.
2. Измените canonical Markdown-файл.
3. Объясните в pull request, что изменилось и почему.
4. Дождитесь public quality workflow.

## Новая страница

1. Добавьте `content/<slug>.md`.
2. Добавьте import и metadata в `lib/docs.ts`.
3. Проверьте navigation, search и `Edit this page`.
4. Выполните `pnpm run check`.

## Границы

- Не публикуйте keys, tokens, receipts/JWS, user data и raw SDK payload.
- Не копируйте app-owned IDs, URLs, texts и assets в platform guide.
- API-пример должен совпадать с released module tag.
- Не добавляйте tests, test runner или test script; repository использует static checks и production build.
