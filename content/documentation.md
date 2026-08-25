# Как править docs

## Публичная модель

Все исходники открыты. Markdown и DocC живут в public GitHub repositories и редактируются обычным pull request. Закрытой CMS и роли «только чтение» нет.

## Canonical owner

- Module API/usage docs — repository самого модуля.
- Cross-module architecture, selection, compatibility и migration — `broad-docs`.
- Compatibility YAML и integration evidence — `broad-platform-integration`.

Сайт агрегирует cross-module content и даёт поиск по страницам из
`broad-docs/content/*.md`. Он не индексирует автоматически каждый module README
или DocC catalog и не становится единственной копией API docs.

## README или сайт

| Источник | Задача |
|---|---|
| Integration README | Быстро выбрать product, увидеть platform boundaries и перейти к следующему шагу |
| Public site | Искать по страницам docs repository, читать migration, compatibility и release process |
| Public package access | Проверить anonymous SwiftPM resolve и убрать старый private package URL |
| Module README/DocC | Работать с API конкретного Core, Extensions, Monetization или UIFlows tag |
| Compatibility YAML | Зафиксировать exact versions и evidence проверенного integration set |

В README остаётся маршрут и минимальный quick start. Подробный cross-module
текст пишется здесь один раз и появляется на сайте; module API не копируется на
сайт, если canonical описание уже принадлежит module repository.

Если нужного API-символа нет в поиске сайта, откройте README/DocC release-а
со страницы соответствующего модуля. Это намеренная граница ownership, а не
пропущенная копия документации.

## Edit this page

Внизу каждой страницы есть `Edit this page`. Ссылка открывает canonical Markdown-файл на GitHub. После merge public pipeline пересобирает сайт.

## Как открыть сайт локально

Нужны Node.js `22.13+` и pnpm `10.15.1`.

```bash
git clone https://github.com/BroadApps-official/broad-docs.git
cd broad-docs
pnpm install --frozen-lockfile
pnpm run dev
```

Откройте адрес `Local`, напечатанный dev server; по умолчанию это
`http://localhost:3000`. Перед pull request выполните `pnpm run check`: команда
проверяет content contract, lint и production build без unit-test runner.

## Проверка перед merge

1. Все local и external links валидны.
2. Нет секретов, real credentials, user data и raw SDK payload.
3. Код-примеры совпадают с released public API.
4. Сайт собирается, а поиск находит новые keywords.
5. Changelog обновлён, если изменился публичный contract.

## Что не удаляется

Появление сайта не удаляет README и Markdown из module repositories. Они нужны для versioned review, offline-работы и совпадения docs с кодом конкретного tag.
