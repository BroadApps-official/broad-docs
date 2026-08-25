# Changelog

## Unreleased

### Added

- a dedicated `Монетизация` navigation group for Special Offer, Adapty,
  Paywall UI, Token paywall and RU Billing, so product payment guides are no
  longer mixed with repository and runtime architecture;
- first-class visual guides for Adapty setup, onboarding/ATT, adaptive paywall,
  token paywall, RU Billing, runtime reliability and Usedesk;
- responsive Markdown image/GIF blocks that restore the vetted visual atlas
  from the last full platform README;
- current references for 0/1/N products, loader without flicker, Special Offer
  sequencing, token packages and RU checkout, explicitly separated from
  app-owned design and production payment evidence;
- a provenance audit that excludes obsolete umbrella installation and an
  internal chat screenshot while preserving its current rules as public text;
- search snapshots for module documentation now follow each public `main`
  branch, while compatibility/release pages continue to identify the verified
  `1.0.0` code set explicitly;
- a universal legacy migration topology model: the agent derives
  `Cutover topology`, `Legacy owner`, `Conflicting targets` and each
  `Atomic cutover group` from the host package graph, then migrates
  `Runtime slices after cutover` one at a time;
- a migration visual and searchable guide that distinguish an independent
  boundary from a multi-product atomic package cutover instead of prescribing
  one hard-coded module order for every app;
- a canonical source map for legacy migration that separates host app files,
  public platform workflow, private legacy evidence and exact module releases,
  plus a direct link to the self-contained Codex/Claude prompt;
- an explicit non-destructive Integration Plan rule: create the canonical
  template only when the host file is absent; otherwise preserve decisions,
  blockers, evidence and checkpoints, add only missing fields, and require
  developer review for replacements;
- a separate keyword search across 91 README, guide, changelog, example and
  compatibility files from all six public BroadApps repositories, with
  repository filters, synonym-aware matching and direct GitHub links;
- native full-page navigation for every internal link so header, cards,
  documentation sidebars and search results remain usable when the current
  vinext client-side RSC prefetch runtime fails;
- a dedicated `/docs` catalog so the Documentation navigation item always
  opens visible content instead of relying on a homepage anchor;
- independent full-text and alphabetical document finders with Russian and
  Latin initial-letter filters, result counts and accessible reset controls;
- a working global `Command/Ctrl + K` shortcut for the search affordance shown
  in the site header;
- an early homepage architecture map that separates app dependencies from the
  integration catalog and documentation repository;
- six plain-language architecture benefits covering dependency scope, review,
  release, verified versions, documentation discovery and legacy migration;
- a three-step "site / README-DocC / Edit this page" documentation route placed
  directly after the architecture explanation;
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

Monetization workflows have a distinct owner and developer task. Grouping them
under architecture made the documentation hierarchy misleading even though the
individual pages were correct.

The federated repository migration shortened the old 2,829-line README and
left useful GIFs, screenshots and operational explanations discoverable mostly
through Git history. The restored pages make the site the primary readable
reference while keeping module README/DocC beside the code and preserving the
new ownership/dependency boundaries.

Internal conversation screenshots are not suitable as duplicated public
documentation. Their verified Adapty rules are represented as searchable
tables, while product UI captures remain labelled fixture/reference material
rather than a mandatory design or proof of a real payment.

### Previous reasons

The site previously searched only the fourteen cross-module pages stored in
`broad-docs`. Developers still had to open each module repository separately
to find an API rule or operational guide. The new generated public snapshot
keeps Git canonical while giving `/docs` one fast search across module README,
Documentation, changelog, examples and the integration catalog.

Опубликованный vinext runtime падал во время RSC prefetch и клиентского
перехода, поэтому Next Link менял focus, но не открывал новый route.
Обычные anchors отдают переход браузеру и не зависят от сломанного
клиентского router. Полная загрузка страницы здесь малозаметна, но зато
гарантирует работу всей навигации.

Пунк «Документация» раньше вёл только к якорю далеко внизу главной
страницы, а `/docs` возвращал `404`. В итоге навигация выглядела как
пустой экран. Теперь `/docs` — самостоятельная карта всех материалов.
Поиск нормализует пунктуацию, `Ё/Е`, регистр и многословные запросы,
а алфавитный указатель не зависит от текстового поля.

Главная раньше начинала с карточек модулей, а роль documentation repository
объясняла только в пятом блоке смешанными русско-английскими терминами. При этом
полную связь между host app, module repositories, integration и docs было видно
только в отдельной статье. Теперь разработчик сразу видит одну читаемую схему,
шесть практических преимуществ и простое правило выбора источника: сайт — для
общих сценариев, README/DocC — для API конкретного модуля. Подробности остаются
в статьях и не дублируются на главной.

Код модулей делится на отдельные repositories, поэтому нужна единая
поисковая точка входа. Сайт не заменяет repository docs: исходники остаются
публично редактируемыми и versioned в Git.

Миграция работающего приложения и историческое разделение platform repository
имеют разные риски. Legacy host graphs тоже не одинаковы: module-by-module
порядок безопасен только для независимых owners без duplicate target names в
промежуточном graph. Если один legacy owner объявляет несколько targets,
конфликтующих с новыми packages, dependency switch становится одной atomic
group, а resolve запускается только на final graph. После cutover behavior
по-прежнему мигрируется небольшими runtime slices, поэтому atomic dependency
group не превращается в один большой rewrite.

Существующий App Integration Plan хранит фактическое состояние migration.
Замена его пустым template стёрла бы уже принятые решения, blocker-ы и
checkpoint-ы, поэтому обновление schema допустимо только как additive diff.

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
