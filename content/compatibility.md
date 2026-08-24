# Совместимость

## Зачем нужен каталог

Каждый модуль выпускается независимо. `broad-platform-integration` хранит machine-readable набор exact versions, который прошёл общую сборку и probes.

> Каталог не является runtime umbrella. Host app может взять из него версию только одного нужного product.

## Текущий rollout

- Platform set: `unreleased-federation`.
- Minimum iOS: `17.0`.
- Swift tools: `6.0`.
- BroadCore: `pending`.
- BroadExtensions: `pending`.
- BroadMonetization: `pending`.
- BroadUIFlows: `pending`.
- Verification: `pending` до clean-clone acceptance всех repositories.

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
```

## Когда ставится passed

1. Все module tags существуют в public repositories.
2. Clean clone каждого package собирается.
3. Standalone module gates и iPhone sandboxes прошли.
4. Integration example собран с теми же exact versions.
5. Cross-module probes завершились PASS.
6. README, DocC, links и docs-site синхронизированы.
