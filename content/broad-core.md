# BroadCore

## Зачем нужен

`BroadCore` — основа для iPhone-приложений: bootstrap engine, loadable state, versioned cache, retry/timeout, safe logging и Tracking Authorization boundary.

Текущий проверенный release: [`1.0.0`](https://github.com/BroadApps-official/broad-core-ios/releases/tag/1.0.0).

## Dependency graph

- Platform dependencies: нет.
- External dependency: Swinject `2.10.0`.
- Consumers: host apps, BroadMonetization, BroadUIFlows.

Core не импортирует Monetization или UIFlows. В нём нет Adapty, StoreKit и SwiftUI-экранов.

## Public boundaries

- `AppBootstrapCoordinator` выполняет critical/background steps в явном порядке.
- `LoadableState` описывает loading/content/empty/error/retry без знания о SwiftUI.
- `VersionedJSONCacheRepository` хранит ограниченные снимки с TTL.
- `BroadLoggerProtocol` не пропускает payload, keys, tokens и raw SDK errors.
- Tracking adapter держит native ATT API в одном infrastructure boundary.

## Проверка

Standalone gate проверяет format, lint, architecture, privacy manifest, Swift build, generic iOS compile, executable probes, DocC и iPhone sandbox. Tests/test targets/XCTest не добавляются.

[Открыть public repository](https://github.com/BroadApps-official/broad-core-ios).

[Runtime, cache и recovery →](/docs/runtime-reliability) ·
[Onboarding и ATT boundary →](/docs/onboarding-att)
