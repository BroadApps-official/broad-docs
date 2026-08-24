# Changelog

## Unreleased

### Added

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

SwiftPM manifest version раньше отображалась как просто `Swift 6.0`, из-за чего
разработчик мог ошибочно решить, что host app нужно переводить со Swift 5
language mode. Теперь language mode и tools version показаны отдельно.
