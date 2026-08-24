# BroadDocs agent rules

- Сайт, repository и весь content публичны.
- Canonical страницы лежат в `content/*.md`.
- Не добавлять `tests/`, unit tests, test runners и test scripts.
- Не добавлять authentication: документы читаются анонимно.
- Не публиковать secrets, credentials, user data и raw financial/SDK payload.
- После изменений запустить `pnpm run check`.
- Changelog объясняет, что изменилось и почему.
