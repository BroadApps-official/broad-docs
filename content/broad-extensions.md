# BroadExtensions

`BroadExtensions` — самая маленькая и независимая часть платформы. Она нужна,
когда приложению требуются только общие Swift-утилиты, а запуск, оплата и
готовые экраны не нужны.

## Что находится внутри

- создание `Color` из HEX-значения;
- регистрация собственных шрифтов;
- закрытие клавиатуры;
- управляемый жест возврата назад.

## Чего внутри нет

Подключение `BroadExtensions` не загружает `BroadCore`, Adapty,
`BroadMonetization` или `BroadUIFlows`. В модуле также не должно быть фирменных
цветов, шрифтов конкретного приложения, изображений и правил навигации продукта.
Эти значения остаются в приложении.

## Как подключить

В Xcode добавьте публичный адрес:

```text
https://github.com/BroadApps-official/broad-extensions-ios.git
```

В списке библиотек выберите `BroadExtensions` и добавьте его в основное
iPhone-приложение.
Текущая проверенная версия —
[`1.0.0`](https://github.com/BroadApps-official/broad-extensions-ios/releases/tag/1.0.0).

## Как проверить

1. Xcode скачивает модуль без логина и пароля.
2. Приложение собирается в Debug и Release.
3. Работает именно использованная утилита, например HEX-цвет.
4. В списке зависимостей не появились Core, Adapty или готовые UI-модули.

[Открыть публичный репозиторий](https://github.com/BroadApps-official/broad-extensions-ios) ·
[изменить документацию модуля](https://github.com/BroadApps-official/broad-extensions-ios/edit/main/Documentation/BroadExtensions.md)
