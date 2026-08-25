# Public package access

## Короткий ответ

Все четыре module repositories публичны и скачиваются по HTTPS без GitHub
account, password, Personal Access Token или API key. Старый repository
`BroadApps-official/BroadCore` — private monolith; новый Core находится в
`BroadApps-official/broad-core-ios`. Это соответствует модели GitHub: public
repositories [доступны всем в интернете](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories).

SwiftPM получает source во время resolve/build. В App Store загружается уже
собранный app binary, поэтому пользователь iPhone не обращается к GitHub и не
получает credentials. Авторизация App Store Connect относится к публикации
binary и не используется для чтения public package. Apple отдельно описывает
[загрузку собранного app binary](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/)
через Xcode или другие инструменты.

## Какие URL использовать

| Задача | Public repository | Product |
|---|---|---|
| Utility | `https://github.com/BroadApps-official/broad-extensions-ios.git` | `BroadExtensions` |
| Runtime foundation | `https://github.com/BroadApps-official/broad-core-ios.git` | `BroadCore` |
| Purchase и entitlement | `https://github.com/BroadApps-official/broad-monetization-ios.git` | `BroadMonetization` |
| Готовые SwiftUI-flow | `https://github.com/BroadApps-official/broad-ui-flows-ios.git` | `BroadUIFlows` |

Выберите version из [compatibility catalog](/docs/compatibility). Для обычной
module dependency используется совместимый `from`-диапазон; для
воспроизведения verified set или первого migration acceptance — exact catalog
version.

## Почему Xcode показывает Keychain

Окно `git-credential-osxkeychain wants to use ... github.com` означает, что Git
или Xcode попытался прочитать сохранённый GitHub credential. Для новых public
module URLs он не является требованием BroadApps.

Самые частые причины:

1. В host `.xcodeproj` остался старый private URL
   `https://github.com/BroadApps-official/BroadCore.git`.
2. Workspace `Package.resolved` или Xcode package cache сохранил старую
   identity/location.
3. В global Git config есть `url.*.insteadOf`, который переписывает public HTTPS
   URL на SSH или URL с credential.
4. Credential helper настроен для другого private repository и вызывается
   локальной конфигурацией Mac.

Название product `BroadCore` корректно и после миграции. Проверять нужно именно
`repositoryURL`/`location`, а не имя в списке Package Dependencies.

## Как исправить existing Xcode project

1. Откройте `Project → Package Dependencies` и найдите package, который выдаёт
   product `BroadCore`.
2. Если repository указывает на `BroadApps-official/BroadCore`, удалите этот
   package reference. Не держите old/new packages одновременно: они могут
   экспортировать одинаковые Swift modules.
3. Добавьте нужный public `broad-*-ios.git` URL и version из catalog.
4. Верните соответствующий product нужному iPhone target.
5. Выполните `File → Packages → Reset Package Caches`, затем
   `Resolve Package Versions`.
6. Проверьте diff `.pbxproj` и `Package.resolved`: private monolith URL должен
   исчезнуть, а app-owned code и configuration не должны измениться.

Обычный `git pull` platform repository не меняет package reference внутри
host-приложения: он хранится в project/workspace самого app.

## Проверка без аккаунта и Keychain

Команда ниже временно отключает global/system Git config, интерактивный prompt
и credential helper только для текущего вызова:

```bash
GIT_CONFIG_GLOBAL=/dev/null \
GIT_CONFIG_NOSYSTEM=1 \
GIT_TERMINAL_PROMPT=0 \
GIT_ASKPASS=/usr/bin/false \
git -c credential.helper= ls-remote --exit-code \
  https://github.com/BroadApps-official/broad-core-ios.git \
  refs/tags/1.0.0
```

PASS — команда печатает SHA tag и завершается без окна входа. Тем же способом
можно проверить остальные module URLs. Если нужно проверить весь graph,
клонируйте public `broad-platform-integration` в чистую папку с теми же
переменными и выполните `swift package resolve`.

Для диагностики локальных rewrite/helper правил используйте read-only команды:

```bash
git config --global --get-regexp '^url\..*\.insteadof$'
git config --global --get-all credential.helper
```

Не удаляйте все GitHub credentials из Keychain: они могут быть нужны другим
private repositories. Исправляйте только старый package URL или конкретное
rewrite-правило.

## App Store и CI

- Public Swift package не требует GitHub credential на developer Mac или CI.
- Private host-app repository по-прежнему требует доступ CI к самому app; это
  отдельная настройка и не относится к BroadApps modules.
- Signing, provisioning и вход в App Store Connect нужны на этапе публикации
  app binary, а не для package resolve.
- Никакой BroadApps API key в app добавлять не нужно.

Public source доступен всем, поэтому client-side API key не может запретить
другим разработчикам читать или повторно использовать библиотеку. Секрет,
встроенный в iOS app, извлекается из binary и не является защитой source.
