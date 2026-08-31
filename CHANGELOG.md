# Changelog

## 2026-08-29 — Исправлена логика выбора библиотек

- Сайт больше не утверждает, что приложению разрешена только одна библиотека: для одной возможности может хватить одного product, для нескольких подключаются несколько верхних products.
- Во всех картах явно отделены выбранные app target products от зависимостей, которые Xcode загружает автоматически и которые не нужно дублировать.
- RU Billing помечен как будущая работа до утверждения общего app/backend-контракта, а не как готовая инструкция интеграции.
- Единственный чрезмерно тяжёлый крупный заголовок на главной получил спокойное начертание; выделение в статьях также стало мягче.

## 2026-08-29 — Сбалансирован главный сценарий

- Заголовок сценария уменьшен и ограничен по ширине, чтобы сохранять три осмысленные строки и не перекрывать остальные элементы страницы.
- Для мобильных экранов добавлен отдельный компактный размер без потери читаемости.

## 2026-08-29 — Убрано повторное объяснение на главной

- Верхний блок отвечает только на вопрос «что такое BroadApps iOS».
- Следующий большой блок больше не повторяет определение платформы: теперь он ведёт от задач приложения к нужным products для Xcode.
- Текст и кнопки описывают конкретное действие, а настройки приложения явно отделены от автоматических зависимостей.

## 2026-08-29 — Понятная иерархия первого объяснения

- «Готовая основа для iOS-приложений компании» стало главным крупным заголовком вводного блока.
- Определение BroadApps iOS и четырёх библиотек перенесено в спокойный поясняющий подзаголовок.

## 2026-08-29 — Рабочий поиск прямо на главной

- Вместо крупного объяснения и кнопки перехода на главной появилось настоящее поле поиска с мгновенными результатами.
- Добавлены понятные готовые запросы для первого подключения, paywall, своей оплаты, миграции, версий и ошибки сборки.
- Каждый результат сразу объясняет, зачем открывать страницу, и ведёт к пошаговой инструкции.

## 2026-08-29 — Понятная карта подключения для нового разработчика

- Главная схема теперь начинается с трёх конкретных шагов и не требует заранее знать названия модулей.
- Для каждой из четырёх задач явно показано: какой product добавить в Xcode и какие зависимости Xcode скачает сам; задачи можно сочетать.
- Добавлен разобранный пример готового paywall и границы ответственности app, библиотек и командных инструментов.
- Абстрактные преимущества заменены практическими ответами: что подключать, что настраивать и где исправлять.

## Unreleased

### Changed

- public UI examples were audited as developer guidance rather than an internal
  report: duplicate walkthroughs and reference-status notes were removed,
  screenshots with visible technical user IDs were excluded, media cards now
  identify UI captures as screen examples, and the remaining pages state the
  reusable onboarding, paywall, settings and support standard directly;
- RU Billing получил отдельную страницу для аккаунт-менеджера: точное
  приложение, продукты, выбор одного источника A/B assignment, поля кабинета,
  карточка передачи разработчику, безопасная проверка и запуск;
- BroadUIFlows больше не представлен как «страница про paywall»: добавлены
  отдельные визуальные статьи про onboarding, paywall/Special Offer и
  settings/support с обезличенными примерами экранов;
- разработческая статья RU Special Offer очищена от кабинетной инструкции и
  теперь объясняет только входные данные, шесть шагов кода, два таймера,
  региональный gate и подтверждение Premium;
- the RU Billing guide now restores the complete seven-screen reference path
  from tariff selection through consent, receipt email and external checkout;
  the screenshots are presented as a compact responsive Markdown gallery and
  clearly separated from app-owned design and backend confirmation;
- the Adapty setup guide now records the still-current placement naming map and
  the `nottrial` dashboard convention recovered from the legacy README audit,
  while explicitly keeping custom mappings app-owned and runtime independent
  from product names;
- the article catalog now keeps its title visible while all 26 documents scroll
  inside a viewport-height sidebar; the scrollbar is visible, wheel scrolling
  stays inside the catalog and the existing horizontal mobile navigation is
  preserved;
- the RU Billing Special Offer guide now includes a complete account-manager
  checklist: the exact responsibilities of the payment cabinet, product
  catalog and Adapty, a safe handoff card for the developer, shared-product
  warnings and an end-to-end preflight without exposing credentials;
- the documentation search modes now read as an explicit two-step control:
  “where to search” shows a selected state, click instruction and concrete
  examples for site versus GitHub search, while the field below states which
  source is currently active;
- the Usedesk guide now follows the actual manager handoff card only: Token,
  Company ID, Channel ID and the web-widget script; unsupported knowledge-base,
  push, backend, Keychain, account-switch and token-taxonomy requirements were
  removed, while the iOS path now ends directly at the ready Usedesk screen;
- the architecture guide is now a beginner-facing platform map: it explains the
  four library choices, direct versus automatic SwiftPM dependencies, app-owned
  configuration, an end-to-end purchase action, repository ownership and the
  dependent-module release path with concrete diagrams and worked examples;
- the documentation directory is now a task-first workbench: its search is in
  the first viewport, 16 common developer scenarios link directly to an
  actionable guide, site and GitHub search are adjacent modes, result cards
  state the expected outcome, and all 24 guides remain visible by section;
- the documentation directory now introduces its search with the task-focused
  heading “Find the right guide”; the 24-article count is supporting context
  instead of the section title;
- the fixed homepage panel is now a complete site map: it links to the homepage,
  search and all 24 documents grouped into Start, Platform Parts,
  Monetization, Architecture and Development; the document list scrolls inside
  the full-height panel on shorter screens;
- the homepage migration routes now say explicitly whether the developer is
  working manually or with a Claude/Codex agent, and each card explains what
  happens after it is opened;
- the desktop homepage map is wider and uses the full safe viewport height;
  its seven-section list scrolls independently on short screens while the map
  title, progress indicator and link to all 24 documents remain visible;
- the documentation directory now shows all 24 site guides immediately in five
  compact task groups; the oversized introduction and redundant alphabetical
  directory were removed, the site search filters the visible catalog in place,
  and the separate GitHub-wide search remains below the primary navigation;
- the four public module guides are now complete beginner-facing product tours:
  BroadUIFlows opens with a real 0/1/N SwiftUI screen gallery and uses the
  existing onboarding, paywall, loader, Special Offer and token media; Core,
  Monetization and Extensions each have a purpose-built animated responsibility
  map, plain-language boundaries, worked scenarios, exact entry points and
  integration checklists instead of a repeated generic three-card diagram;
- documentation pages now expose a live reading progress bar, numbered
  sections, an active table of contents, estimated reading time, clearer
  emphasis, step-style ordered lists, semantic example/warning notes and
  one-click code copying;
- tables now emphasise the decision column, react to row focus, explain
  horizontal scrolling on small screens, and media captions distinguish a
  diagram from a reference screen; restrained reveal animation respects the
  operating system's reduced-motion preference;
- all 24 articles now include a page-specific visual “human action → platform
  action → visible result” explanation; long prose sections use stronger visual
  hierarchy, and exact technical terms are introduced only after a plain
  Russian explanation;
- Getting Started no longer leads with “Composition root” or mixed architecture
  shorthand: it uses a concrete engine analogy, an application-versus-platform
  responsibility table, a worked Adapty example and a good-versus-bad setup
  comparison;
- homepage, architecture map, module descriptions and monetization guides now
  say “library”, “screen”, “server” and “purchase option” before exposing exact
  Xcode or Adapty labels; the content gate also requires a visual explanation
  for every public article and rejects the jargon regression shown in review;
- 24 unused legacy media copies (old screenshots, unused dark diagram variants
  and the replaced social card) were removed; the validated media manifest now
  contains only the 29 assets still referenced by the site;
- all public guide pages were editorially rebuilt around plain-language
  purpose, timing, action and success criteria; unexplained mixed-language
  checklists were replaced with concrete Russian instructions while exact API
  names remain available where developers need them;
- every guide now opens with a compact “why / when / result” orientation and a
  page-specific term explainer, backed by a new searchable “Словарь без
  жаргона” page;
- homepage module cards, architecture map, navigation map, documentation
  directory, search hints, visual explainers and footer now use the same plain
  Russian wording instead of switching back to internal English shorthand;
- the GitHub-wide search snapshot was regenerated from the rewritten local
  Markdown and current public repositories, and content validation now rejects
  stale local search copies plus the specific jargon-only phrases that caused
  the onboarding regression;
- Getting Started is now a visual, task-first onboarding guide: a three-step
  diagram, plain-Russian module choice table, exact Xcode actions, public URLs,
  product explanation, two existing architecture illustrations and a concrete
  acceptance checklist replace the previous jargon-led introduction;
- Getting Started now begins with a normal two-route choice instead of two
  oversized quote banners; shared blockquotes across all documentation pages
  are compact supporting notes rather than primary visual cards, and
  consecutive Markdown quote lines render as one note instead of several
  disconnected boxes;
- shared article chrome across all 23 documentation pages now keeps source
  provenance visibly secondary: the oversized sync banner is a compact status
  line, the hero source box is smaller, and the end-of-article GitHub panel no
  longer competes with the article hierarchy;
- the homepage migration section and legacy migration visual now explain in
  Russian what changes, what stays untouched and which four concrete actions a
  developer performs; internal terms remain only in the advanced part of the
  canonical guide where they are defined;
- homepage documentation guidance and the search page now start from a
  developer's task in plain Russian instead of requiring repository, module or
  API terminology; common tasks are clickable and every result explains why
  the linked instruction is useful;
- search URLs now preserve the query, common Russian task phrases receive
  intent-aware ranking, and the empty state offers direct recovery routes;
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

- the page-level overflow rule no longer disables sticky positioning: the
  compact 24-page catalog and current-article navigation now remain visible
  during long reads without introducing a second scrollbar;
- the homepage sidebar is now a compact, clickable route map with a connected
  section path, per-section explanations, immediate active-state feedback and
  an explicit progress indicator instead of oversized stretched rows;
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
