# Как править docs

## Самое короткое правило

**Сайт — главный человекочитаемый справочник: здесь собраны architecture,
операционные guides, визуальные references и поиск по всем public repositories.
README каждого модуля дублирует его обязательный usage/behavior рядом с кодом,
а DocC остаётся точным symbol-level описанием конкретного tag.**

Сценарии намеренно доступны и на сайте, и у owner module. Public API signatures
не перепечатываются вручную: их source of truth — код, DocC и автоматически
проверяемый API report.

## Что открыть

| Если вам нужно | Откройте |
|---|---|
| Понять архитектуру, flow, визуальный reference или перенести старое app | этот сайт |
| Найти инструкцию по ключевым словам | поиск сайта |
| Подключить и вызвать API конкретного модуля | README или DocC этого module tag |
| Узнать точные совместимые версии | `Compatibility/current.yml` в integration repository |
| Быстро начать работу с platform example | integration README |
| Исправить общую инструкцию | `Edit this page` внизу страницы |

Сайт показывает основные operational guides как полноценные страницы и отдельно
индексирует README, Documentation, changelog и examples всех шести public
repositories. Поэтому поиск охватывает подробности, даже если они слишком
низкоуровневые для sidebar-страницы. Для точной сигнатуры конкретного release
перейдите из результата в module README/DocC.

## Всё публично и редактируется

Markdown, README и DocC лежат в публичных GitHub repositories. Внизу каждой
страницы сайта есть `Edit this page`: ссылка открывает её исходный Markdown.
После обычного pull request и merge сайт пересобирается. Закрытая CMS, пароль
читателя и роль «только просмотр» не нужны.

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

Исходники страниц находятся в `content/*.md`. Измените Markdown и обновите
страницу в локальном браузере — публиковать сайт для предварительного просмотра
не требуется.

## Проверка перед merge

1. Все local и external links валидны.
2. Нет секретов, real credentials, user data и raw SDK payload.
3. Код-примеры совпадают с released public API.
4. Сайт собирается, а поиск находит новые keywords.
5. Changelog обновлён, если изменился публичный contract.

## Что остаётся рядом с кодом

Появление сайта не удаляет README, Markdown и DocC из module repositories. Они
нужны для review, offline-работы и точного совпадения документации с кодом
конкретного tag. Сайт добавляет удобную точку входа и поиск, а не заменяет их.
