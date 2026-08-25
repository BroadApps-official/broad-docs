# Как править docs

## Самое короткое правило

**Сайт отвечает на вопрос «как части платформы работают вместе». README и DocC
модуля отвечают на вопрос «как использовать код этого модуля».**

Так мы не храним две расходящиеся копии одного API-описания.

## Что открыть

| Если вам нужно | Откройте |
|---|---|
| Понять общую архитектуру, выбрать модуль или перенести старое app | этот сайт |
| Найти инструкцию по ключевым словам | поиск сайта |
| Подключить и вызвать API конкретного модуля | README или DocC этого module tag |
| Узнать точные совместимые версии | `Compatibility/current.yml` в integration repository |
| Быстро начать работу с platform example | integration README |
| Исправить общую инструкцию | `Edit this page` внизу страницы |

Сайт ищет по общим страницам из `broad-docs/content/*.md`. Он не копирует
автоматически весь README и DocC каждого модуля. Если нужного API-символа нет в
поиске, откройте страницу модуля и перейдите в его README или DocC.

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
