# Release process

## SemVer

- Patch — backward-compatible fix.
- Minor — backward-compatible public API.
- Major — breaking public API или поведение.

Каждый repository имеет свой `CHANGELOG.md`. Release note объясняет не только **что** изменилось, но и **почему** выбрано такое решение.

## Dependency policy

Module package указывает `upToNextMajor` от минимальной проверенной версии. Integration repository фиксирует `exact`, чтобы acceptance был reproducible.

## Cross-repository release

1. Изменить самый нижний owner module.
2. Пройти module gate, sandbox compile, DocC и public API review.
3. Выпустить его SemVer tag.
4. Поднять dependency range в dependent module.
5. Повторить для каждого consumer снизу вверх.
6. Обновить exact versions integration repository.
7. Пройти full integration gate.
8. Обновить compatibility catalog и public docs.

## Обязательный gate

Gate проверяет structure, format, lint, architecture, privacy, Swift build, generic iOS compile, executable probes, iPhone sandbox, DocC, docs/assets и public API report. Tests, test targets, XCTest и Swift Testing намеренно запрещены и отклоняются static check.

## Emergency fix

Срочность не отменяет gate. До завершения integration acceptance catalog не помечает новый набор `passed`.
