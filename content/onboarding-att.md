# Onboarding и ATT

## Один источник количества страниц

`OnboardingConfiguration.pages` — единственный источник длины onboarding.
Три страницы в BroadAppTemplate являются fixture-примером, а не default,
лимитом или скрытым `slidesCount`.

![Как определить onboarding pages](../public/guides/readme/onboarding-decision-flow-light.svg)

До реализации разработчик или агент сверяет Kaiten/ТЗ, Figma/no-code материалы,
reference и app specification. Если порядок, copy, media или action
неоднозначны, Integration Plan получает `BLOCKED`; template content не
подставляется молча.

## Два renderer-пути

| Нужен экран | Использовать |
|---|---|
| Стандартная platform-композиция | `BroadOnboardingView` |
| Полностью app-owned SwiftUI | `BroadOnboardingFlowHost` |
| Onboarding не нужен | `.disabled` |

Logic-only host сохраняет lifecycle, progress и ATT boundary, но не навязывает
layout приложения.

## Момент ATT

ATT нельзя вызывать в bootstrap, loader, `init`, до первого кадра или при
выключенном onboarding. Допустимая последовательность:

```text
onboarding route выбран
  → первый слайд реально появился
  → окно foreground-active
  → configured delay всё ещё валиден
  → tracking authorization use case
```

Если пользователь успел закрыть/завершить flow, window стал inactive или задача
отменена, системный prompt не появляется.

## Rate Us

Rate Us допустим в приложении, но запрещён внутри onboarding. Он не является
заменой CTA, footer action или ATT.

## Проверка

- 1, 2, 3, 4 и 8 страниц завершаются на последнем элементе массива;
- custom renderer не копирует lifecycle/ATT logic;
- `.disabled` не планирует ATT;
- пустая invalid configuration завершается безопасно;
- first slide виден до системного prompt;
- iPhone-only layout проверен без настоящих финансовых операций.

[BroadUIFlows](https://github.com/BroadApps-official/broad-ui-flows-ios) ·
[App workflow](https://github.com/BroadApps-official/broad-platform-integration/blob/main/Documentation/AppCreationWorkflow.md)
