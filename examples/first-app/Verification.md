# Проверка BroadStart — 8 сентября 2026

## Результат

PASS для перечисленных сборок и локальных сценариев. Пример использует реальные
публичные библиотеки, а содержимое каталога и ошибки воспроизводятся локально.

| Проверка | Результат |
|---|---|
| Xcode 26.3, iOS Simulator 26.3, iPhone | PASS |
| Debug Simulator, strict concurrency, warnings as errors | BUILD SUCCEEDED |
| Release Simulator | BUILD SUCCEEDED |
| Release iphoneos без подписи | BUILD SUCCEEDED |
| Три публичных зависимости из Package.resolved | Core 1.2.0, Extensions 1.0.1, Swinject 2.10.0 |
| Строгая проверка отпечатка пакета | `-packageFingerprintPolicy strict`; отключение проверки не использовалось |
| iPhone SE: запуск и первый экран | PASS: текст и список отображаются; полный набор действий проверен на iPhone 17 Pro |
| Первый запуск → три материала | PASS, настоящий Simulator |
| Материал → назад | PASS, текст выбранного материала и возврат к списку |
| Обновление | PASS: список остаётся, кнопка недоступна во время загрузки |
| Пустой результат | PASS: сообщение и переключатель следующего состояния |
| Ошибка после пустого результата | PASS: ошибка без контента, явный повтор |
| Повтор | PASS: загрузка заканчивается тремя материалами |
| Ошибка обновления после списка | PASS: три материала сохраняются и появляется сообщение |
| Публичное чтение четырёх тегов платформы без Git credentials | PASS для Core 1.2.0, Extensions 1.0.1, Monetization 1.4.1, UIFlows 1.1.0 |
| Полный `bash Scripts/agent_gate.sh` интеграционного репозитория | PASS: правила, формат, lint, package, template и compile-only live Adapty schemes |

## Команды сборки

Из папки примера; DerivedData можно выбрать в любой отдельной временной папке.

```bash
xcodebuild -project BroadStart.xcodeproj -scheme BroadStart \
  -configuration Debug -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath /tmp/BroadStartDerivedData \
  -packageFingerprintPolicy strict CODE_SIGNING_ALLOWED=NO build

xcodebuild -project BroadStart.xcodeproj -scheme BroadStart \
  -configuration Release -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath /tmp/BroadStartDerivedData \
  -packageFingerprintPolicy strict -onlyUsePackageVersionsFromResolvedFile \
  CODE_SIGNING_ALLOWED=NO build

xcodebuild -project BroadStart.xcodeproj -scheme BroadStart \
  -configuration Release -sdk iphoneos \
  -destination 'generic/platform=iOS' \
  -derivedDataPath /tmp/BroadStartDerivedData \
  -packageFingerprintPolicy strict -onlyUsePackageVersionsFromResolvedFile \
  CODE_SIGNING_ALLOWED=NO build
```

## Найденная локальная проблема

При первом resolve Xcode сообщил несовпадение ранее записанного коммита
BroadExtensions 1.0.1. Локальная запись содержала
`95482e707f492b3c8e8245c8b05477621fee70fd`, публичный тег указывал на
`51a2172ce87980bf99a9cf2badadf45675a3664b`.

Сверены публичный тег (включая разыменование аннотированного тега), опубликованный
релиз 1.0.1 и исходники модуля. Исправлена только соответствующая локальная
запись с резервной копией; другие версии, credentials и настройки проверки не
менялись. После этого повторная сборка прошла со строгой проверкой. Это локальная
диагностика, а не рекомендация отключать проверку при любом несовпадении.

## Происхождение скриншотов

Снимки Xcode показывают создание и подключение BroadStart. Для кадров добавления
пакета использован отдельный временный пустой проект с тем же учебным target;
итоговый target снят с опубликованного проекта. Снимки интерфейса получены через
simctl из собранного BroadStart. Это реальные кадры, не макеты и не генерация.
План, исходники и Package.resolved опубликованы рядом.

## Границы результата

- Нет реального сервера, HTTP-запросов, аккаунтов и секретных ключей.
- Нет настоящих purchase, restore или RU-платежей.
- SDK Adapty в BroadStart не подключается; live-конфигурации платформы только собирались.
- Выпуск, подпись, установка на физический iPhone и App Store не проверялись.
- Источники модулей и reference-приложений не изменялись.
- Platform PASS не заменяет приёмку производственного приложения.
