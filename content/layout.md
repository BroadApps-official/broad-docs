# Вёрстка по макету

Размеры экрана считаются от ширины iPhone, поэтому макет выглядит одинаково на
маленьком и большом телефоне. Готовая реализация — в `BroadAppTemplate`:
[Scalable.swift](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Examples/BroadAppTemplate/BroadAppTemplate/Core/DesignSystem/Scalable.swift)
и [AppTokens.swift](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Examples/BroadAppTemplate/BroadAppTemplate/Core/DesignSystem/AppTokens.swift).
Скопируйте их в приложение на этапе каркаса.

## Базовая ширина

Задаётся один раз — `LayoutScale.designWidth` в `Scalable.swift`.

| Проект | Базовая ширина |
|---|---|
| По Figma | Ширина устройства, на котором нарисован макет: 375, 393, 402… |
| No-code | 393 |

## Как верстать

- Число из макета записывается в токен как есть и масштабируется:
  `static let cardPadding = 18.0.scale`. Во view используются только токены.
- Коэффициент ограничен 0,85…1,25, чтобы экран не сжимался и не раздувался на
  крайних размерах.
- Шрифты не масштабируются от ширины: системные стили или
  `Font.broadCustom(name, size:, relativeTo:)` — они растут вместе с размером текста
  в настройках iPhone.
- Зона нажатия кнопок, строк продукта, Restore, ссылок и крестика — не меньше
  44×44 pt без масштабирования.
- Текст переносится на несколько строк; фиксированной высоты у текста нет.

```swift
enum Spacing {
    static let screenHorizontal = 20.0.scale
    static let cardPadding = 18.0.scale
}

enum Radius {
    static let card = 22.0.scale
}
```

## Проверка

Сравните каждый экран с макетом на маленьком (iPhone SE) и большом iPhone
Simulator.
