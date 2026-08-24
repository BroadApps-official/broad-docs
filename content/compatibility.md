# Совместимость

## Зачем нужен каталог

Каждый модуль выпускается независимо. Публичный
[`broad-platform-integration`](https://github.com/BroadApps-official/broad-platform-integration)
хранит machine-readable набор exact versions, который прошёл общую сборку и probes.

[Открыть integration release 1.0.0](https://github.com/BroadApps-official/broad-platform-integration/releases/tag/1.0.0).

> Каталог не является runtime umbrella. Host app может взять из него версию только одного нужного product.

## Проверенный platform set 1.0.0

- Platform set: `1.0.0`.
- Minimum iOS: `17.0`.
- Swift tools: `6.0`.
- BroadCore: [`1.0.0`](https://github.com/BroadApps-official/broad-core-ios/releases/tag/1.0.0) — standalone, remote quality, release и integration gates прошли.
- BroadExtensions: [`1.0.0`](https://github.com/BroadApps-official/broad-extensions-ios/releases/tag/1.0.0) — standalone, remote quality, release и integration gates прошли.
- BroadMonetization: [`1.0.0`](https://github.com/BroadApps-official/broad-monetization-ios/releases/tag/1.0.0) — standalone, remote quality, release и integration gates прошли.
- BroadUIFlows: [`1.0.0`](https://github.com/BroadApps-official/broad-ui-flows-ios/releases/tag/1.0.0) — standalone, remote quality, release и integration gates прошли.
- Verification: `passed` 25 августа 2026 года.

Каждый из четырёх tags отдельно прошёл `module_gate.sh` из public clean clone.
Integration set прошёл полный clean-runner gate на `macos-15`, включая
BroadAppTemplate и две compile-only live Adapty configurations. Настоящие
purchase, restore и RU payments не запускались.

Host app может подключить один нужный release или их сочетание. Статус всего
set не превращает integration repository в обязательную dependency.

## Schema

```yaml
schema: 1
platform_set: "1.0.0"
ios: "17.0"
swift_tools: "6.0"
modules:
  BroadCore: "1.0.0"
  BroadExtensions: "1.0.0"
  BroadMonetization: "1.0.0"
  BroadUIFlows: "1.0.0"
verification:
  status: passed
  command: "bash Scripts/agent_gate.sh"
  checked_at: "2026-08-25"
```

## Когда ставится passed

1. Все module tags существуют в public repositories.
2. Clean clone каждого package собирается.
3. Standalone module gates и iPhone sandboxes прошли.
4. Integration example собран с теми же exact versions.
5. Cross-module probes завершились PASS.
6. README, DocC, links и docs-site синхронизированы.
