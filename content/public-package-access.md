# Подключение без пароля

Все четыре актуальных модуля публичны. Xcode скачивает их по HTTPS без GitHub
аккаунта, пароля, Personal Access Token или API key.

Если появилось окно Keychain или запрос авторизации, это почти всегда означает,
что в проекте осталась ссылка на старый закрытый `BroadApps-official/BroadCore`.

## Правильные адреса

| Что нужно | Адрес GitHub | Библиотека в Xcode |
|---|---|---|
| Swift-утилиты | `https://github.com/BroadApps-official/broad-extensions-ios.git` | `BroadExtensions` |
| Запуск, кеш и логи | `https://github.com/BroadApps-official/broad-core-ios.git` | `BroadCore` |
| Покупки со своим UI | `https://github.com/BroadApps-official/broad-monetization-ios.git` | `BroadMonetization` |
| Готовые SwiftUI-экраны | `https://github.com/BroadApps-official/broad-ui-flows-ios.git` | `BroadUIFlows` |

Версию возьмите из [каталога совместимости](./compatibility.md).

## Почему Xcode открывает Keychain

Наиболее вероятные причины:

1. В Xcode Project → Package Dependencies остался старый URL
   `https://github.com/BroadApps-official/BroadCore.git`.
2. `Package.resolved` или кеш Xcode помнит старый адрес.
3. Настройка Git на этом Mac автоматически заменяет HTTPS на SSH.
4. Сохранённый GitHub-пароль нужен другому закрытому репозиторию и Git пытается
   применить его здесь.

Название библиотеки `BroadCore` остаётся правильным. Проверять нужно адрес
GitHub, а не название библиотеки в списке Xcode.

## Как исправить проект

1. Откройте `Project → Package Dependencies`.
2. Выберите package, который предоставляет `BroadCore`, и посмотрите его URL.
3. Если URL содержит `BroadApps-official/BroadCore`, удалите эту package-ссылку.
4. Добавьте нужный публичный адрес из таблицы выше.
5. В **Add to Target** выберите основное iPhone-приложение — это поле отвечает,
   куда Xcode добавит библиотеку.
6. Выполните `File → Packages → Reset Package Caches`, затем
   `Resolve Package Versions`.
7. Соберите и запустите приложение.

Старый и новый BroadCore нельзя держать одновременно: они могут предоставить
Xcode две библиотеки с одинаковым именем.

## Проверка без аккаунта

Эта команда только читает публичный список тегов. Она временно отключает
сохранённые пароли Git для одного запуска и ничего не удаляет из Keychain:

```bash
GIT_CONFIG_GLOBAL=/dev/null \
GIT_CONFIG_NOSYSTEM=1 \
GIT_TERMINAL_PROMPT=0 \
GIT_ASKPASS=/usr/bin/false \
git -c credential.helper= ls-remote --exit-code \
  https://github.com/BroadApps-official/broad-core-ios.git \
  refs/tags/1.2.0
```

Успех: команда печатает длинный Git SHA и завершается без окна входа. Если это
произошло, репозиторий доступен, а проблему нужно искать в ссылках Xcode-проекта
или настройках Git на Mac.

Для просмотра правил, которые могут переписывать адрес, используйте команды
только для чтения:

```bash
git config --global --get-regexp '^url\..*\.insteadof$'
git config --global --get-all credential.helper
```

Не удаляйте все GitHub-данные из Keychain: они могут быть нужны другим закрытым
проектам.

## Что происходит после сборки

Xcode скачивает исходники во время сборки. В App Store отправляется уже
собранное приложение, поэтому пользователь iPhone не подключается к GitHub.
Доступ к App Store Connect и подпись приложения — отдельная настройка и к
загрузке публичного Swift Package не относится.

[Переход со старого BroadCore](./legacy-app-migration.md) ·
[Первое подключение](./getting-started.md)
