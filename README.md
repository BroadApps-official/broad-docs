# BroadApps iOS Documentation

Публичная поисковая точка входа для модулей BroadApps iOS. Сайт дополняет
README/DocC модулей, но не удаляет и не заменяет их.

## Что читать и когда

Короткое правило: сайт объясняет, как части платформы работают вместе;
README и DocC модуля объясняют его конкретный API.

| Источник | Используйте для |
|---|---|
| Integration README | первого запуска platform example и перехода к нужной инструкции |
| Этот сайт | поиска по страницам сайта и публичным GitHub README/guides, общей архитектуры, выбора модуля, миграции и совместимости |
| Module README и DocC | API конкретной версии модуля |
| `Compatibility/current.yml` | точного набора версий, уже проверенного вместе |

Сайт не хранит вторую копию module API. Он помогает найти canonical owner и
перейти к нужному repository.

Каждая статья сайта показывает путь к canonical `content/*.md`, ссылку на
GitHub Preview, историю коммитов, raw Markdown и форму публичной правки. Поэтому
разработчик может сверить опубликованный сайт с текущим `main`, даже если
deployment ещё не успел обновиться. Изображения используют относительные пути
к `public/`, чтобы одинаково открываться на сайте и прямо в GitHub.

## Что здесь есть

- выбор нужного Swift Package product без обязательного umbrella;
- заметная схема «host app → нужные модули» и простое объяснение преимуществ;
- Special Offer, актуальный RU Billing gate и отдельная инструкция получения
  продуктов с backend;
- compatibility, отдельные manual/AI маршруты legacy migration и release-правила;
- client-side поиск по всем canonical страницам этого docs repository;
- отдельный keyword search по README, guides, changelog и compatibility-файлам шести public repositories;
- визуальные карты architecture ownership, compatibility, Special Offer и legacy migration;
- anonymous public-package installation и диагностика Keychain/private URL;
- `Edit this page` для обычного public pull request.

## Редактирование

Контент лежит в `content/*.md`. Метаданные страниц и локальный поисковый индекс
описаны в `lib/docs.ts`. GitHub snapshot обновляется командой
`pnpm run github-index:refresh` и сохраняется в generated-файле, поэтому поиск
остаётся быстрым и не зависит от доступности GitHub во время запроса.

Правила contribution: [CONTRIBUTING.md](CONTRIBUTING.md).

## Локальный запуск

Требования: Node.js `22.13+` и pnpm `10.15.1` из поля `packageManager`.

Для постоянной работы держите repository сайта отдельной соседней папкой, а
не внутри integration repository:

```text
workspace/
├── BroadAppsIOSPlatform/     integration repository
└── broad-docs/               canonical рабочая копия сайта
```

Папка `BroadAppsIOSPlatform/.build/DocsSite/broad-docs` может создаваться
автоматическими проверками как clean clone. Это удаляемый кеш: не редактируйте
в нём статьи и не храните там единственную копию изменений. Рабочие исходники,
Git-история и `.openai/hosting.json` должны оставаться в соседнем `broad-docs/`.

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
