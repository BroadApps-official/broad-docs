# Как править docs

## Публичная модель

Все исходники открыты. Markdown и DocC живут в public GitHub repositories и редактируются обычным pull request. Закрытой CMS и роли «только чтение» нет.

## Canonical owner

- Module API/usage docs — repository самого модуля.
- Cross-module architecture, selection, compatibility и migration — `broad-docs`.
- Compatibility YAML и integration evidence — `broad-platform-integration`.

Сайт агрегирует контент и даёт поиск. Он не становится единственной копией API docs.

## Edit this page

Внизу каждой страницы есть `Edit this page`. Ссылка открывает canonical Markdown-файл на GitHub. После merge public pipeline пересобирает сайт.

## Проверка перед merge

1. Все local и external links валидны.
2. Нет секретов, real credentials, user data и raw SDK payload.
3. Код-примеры совпадают с released public API.
4. Сайт собирается, а поиск находит новые keywords.
5. Changelog обновлён, если изменился публичный contract.

## Что не удаляется

Появление сайта не удаляет README и Markdown из module repositories. Они нужны для versioned review, offline-работы и совпадения docs с кодом конкретного tag.
