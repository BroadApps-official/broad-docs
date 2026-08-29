# Changelog

## Unreleased

### Changed

- the homepage now introduces BroadApps iOS in plain language for a developer
  seeing it for the first time: what the platform is, what every module owns,
  why the code is split and what a host app actually adds in Xcode;
- Adapty, Special Offer, token paywall and Getting Started now lead with the
  simple product contract: public key + placements, every provider product,
  StoreKit for the default Apple entitlement path, and no custom verifier
  boilerplate for an ordinary anonymous app;
- the Special Offer visual now explains four concrete Russian-language steps
  and the fixed 24-hour visual loop instead of leading with provenance jargon;
- the Adapty diagram now shows one direct four-step path from public key and
  placement to the complete provider response and UI, without verifier,
  provenance or RU Billing terminology in the basic setup;
- Special Offer and token pages now separate the small platform display
  contract from app-owned UI and future product decisions;
- the BroadCore page documents the upcoming runtime logging subsystem and
  file-backed cache store without presenting unreleased API as `1.0.0`;
- Знак `B◇` в общей шапке и подвале заменён на фирменную иконку BroadApps из четырёх синих плиток.
- Непонятный абстрактный module graph на главной заменён на русскоязычную карту
  выбора: задача приложения → один подключаемый product → зависимости, которые
  придут автоматически.
- README и contribution guide закрепляют соседний `broad-docs/` как постоянную
  рабочую копию и явно отделяют её от удаляемого `.build/DocsSite` cache clone.

### Fixed

- the homepage map now switches to its persistent vertical sidebar at ordinary
  notebook widths instead of expanding into a wide navigation banner;
- article navigation now grows to its full content height and follows the page
  scroll instead of creating a second scrollbar inside the sidebar;
- the shared `⌘ K` shortcut now uses a properly sized keycap component instead
  of an undersized font glyph in the header and homepage search preview;
- all article images now use repository-relative `../public/` paths, so the
  same canonical Markdown renders correctly both on the documentation site and
  in GitHub Preview instead of showing broken alt-text placeholders;
- internal article links now use neighboring `.md` files in GitHub and are
  translated back to `/docs/...` by the website renderer;
- every documentation page now exposes its canonical GitHub source, commit
  history, raw Markdown and edit route at the top and bottom of the article;
- the shared article template now gives all pages a consistent reading layout,
  source status, improved typography, captioned media, code headers, responsive
  navigation and previous/next document links;
- content validation now fails when a referenced image or neighboring Markdown
  page is missing, or when a site-only `/docs/...` link is added to canonical
  content.
- media validation now covers Markdown and HTML `img/picture/srcset`, exact
  filename casing, PNG/JPEG/GIF/SVG structure, nonempty alt text, temporary or
  absolute paths, GIF frames and a SHA-256 provenance manifest for every public
  asset.
- pnpm now explicitly permits install scripts only for the pinned build
  dependencies `esbuild`, `sharp` and `workerd`, making the canonical check
  reproducible without approving arbitrary packages.
- Vite now treats Markdown as a raw content asset in development, preventing
  import-analysis errors that left local documentation pages half-rendered.

### Added

- the space above the homepage hero now explains the platform in 30 seconds:
  what the four modules own, why the packages are separate and how a developer
  chooses the first product to add;
- the homepage now has a persistent, numbered site map with active-section
  highlighting, direct anchors to every major block and a clear route to all
  documentation; compact layouts show the same complete map above the page;
- a dedicated `Старый BroadCore: куда переехал` landing page and a prominent
  documentation-index notice now route developers and agents away from
  `BroadApps-official/BroadCore` to the current module or migration guide;
- `public/media-manifest.json` records the exact source repository, commit,
  path, byte size and SHA-256 of every image, GIF and SVG copied into the site;

- a two-stage alphabetical directory with section filters, per-section and
  per-letter counts, reset-on-section-change behavior and visually separated
  letter groups; monetization, architecture and development pages can now be
  browsed independently without entering a text query;
- a complete, current top-level map for “what this is”, quick task routing,
  all product flows, app-level QA readiness and what to open after cloning;
  each route now points to the public module/integration owner instead of the
  legacy monolith layout;
- an updated `Создание приложения` start guide that restores the useful
  “choose a path / Codex or Claude / manual” navigation from the legacy README
  without restoring its private monolith URLs or obsolete umbrella setup;
- eighteen quick-search chips for app workflow, monetization, reliability,
  support, migration and release topics, with synonym groups for agent stages,
  Adapty, Special Offer, tokens, recovery and Usedesk;
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

The legacy README let a developer jump directly to the task they were doing,
but those anchors were lost when the monolith guide was split. Restoring the
navigation without its old repository assumptions makes the shorter site guide
as practical as the historical README while preserving current ownership.

The legacy README exposed the two development routes prominently, while the
new site described package installation but did not give new-app developers an
equally visible choice between staged agent work and the same workflow done
manually. The new guide preserves the useful entry points and points every
canonical action to the current public integration repository.

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
