# Changelog

## Unreleased

### Added

- public package access guide with exact public module URLs, a no-Keychain
  verification command, old private-monolith migration steps and App Store/CI
  explanation;
- anonymous package-flow visual and homepage access notice so developers see
  before installation that GitHub login, password, token and API key are not
  required;
- visual architecture ownership, legacy migration, compatibility and Special
  Offer explainers built with responsive HTML/CSS;
- homepage sections showing repository ownership and the reversible migration
  path for manual and coding-agent workflows;
- a site-specific social preview card matching the modular architecture visual
  language and current Swift 5/iOS 17+ positioning;
- public legacy host-app migration entry point with separate manual and
  staged Codex/Claude routes;
- homepage migration action and search/navigation metadata for the new guide;
- Markdown table rendering and wrapped-list handling for readable public guides;
- grouped sidebar layout that keeps long guide titles out of article content;
- clear README/site/module DocC ownership guidance and reproducible local-site
  startup instructions;
- explicit Swift 5 language-mode wording, separated from SwiftPM tools `6.0`,
  across Getting Started, compatibility and the site chrome;
- BroadExtensions `1.0.0` release status, direct installation snippet and links
  to its public repository, release and editable module guide;
- BroadCore `1.0.0` release status, corrected public API names and links to its
  public repository/release;
- BroadMonetization `1.0.0` release status, direct installation and exact
  Special Offer pipeline after complete provider-products parsing;
- BroadUIFlows `1.0.0` release status, direct installation, public iPhone
  Gallery, standalone UI contracts and Special Offer presentation boundary;
- public `broad-platform-integration` with exact SwiftPM/Xcode lockfiles,
  direct-module host example and a clean-runner cross-module gate;
- verified platform set `1.0.0` after public clean-clone module gates and the
  clean `macos-15` integration runner;
- public multi-page BroadApps iOS documentation site;
- searchable index over editable Markdown sources;
- module selection, architecture, compatibility, migration and release guides;
- explicit Special Offer explanation covering the pre-subscription-parsing authorization defect;
- direct `Edit this page` links;
- static content contract, lint and production build workflow without tests/test targets.

### Why

Код модулей делится на отдельные repositories, поэтому нужна единая
поисковая точка входа. Сайт не заменяет repository docs: исходники остаются
публично редактируемыми и versioned в Git.

Миграция работающего приложения и историческое разделение platform repository
имеют разные риски. Отдельная legacy page сначала направляет разработчика к
baseline/inventory, затем к одному атомарному dependency boundary и одному
проверяемому slice, поэтому старую и новую реализацию не приходится линковать
одновременно или переписывать целиком.

Architecture labels раньше звучали как абсолютная гарантия независимого review
и release. Новые схемы показывают реальную границу: owner module можно менять и
выпускать отдельно, но dependent gates остаются обязательными, а breaking
contract может вызвать cascade. Version explainer также отделяет module
`from`-range от exact integration/migration set.

SwiftPM manifest version раньше отображалась как просто `Swift 6.0`, из-за чего
разработчик мог ошибочно решить, что host app нужно переводить со Swift 5
language mode. Теперь language mode и tools version показаны отдельно.

Старый private monolith URL сохраняется внутри host `.xcodeproj` и продолжает
вызывать credential helper даже после обновления документации платформы. Новая
страница отделяет этот legacy reference от public product name `BroadCore`,
запрещает небезопасный client API key и даёт воспроизводимый anonymous resolve.
