import architecture from "@/content/architecture.md?raw";
import broadCore from "@/content/broad-core.md?raw";
import broadExtensions from "@/content/broad-extensions.md?raw";
import broadMonetization from "@/content/broad-monetization.md?raw";
import broadUIFlows from "@/content/broad-ui-flows.md?raw";
import compatibility from "@/content/compatibility.md?raw";
import documentation from "@/content/documentation.md?raw";
import gettingStarted from "@/content/getting-started.md?raw";
import legacyAppMigration from "@/content/legacy-app-migration.md?raw";
import migration from "@/content/migration.md?raw";
import moduleSelection from "@/content/module-selection.md?raw";
import publicPackageAccess from "@/content/public-package-access.md?raw";
import releaseProcess from "@/content/release-process.md?raw";
import specialOffer from "@/content/special-offer.md?raw";
import adaptySetup from "@/content/adapty-setup.md?raw";
import onboardingATT from "@/content/onboarding-att.md?raw";
import paywallUI from "@/content/paywall-ui.md?raw";
import ruBilling from "@/content/ru-billing.md?raw";
import runtimeReliability from "@/content/runtime-reliability.md?raw";
import tokenPaywall from "@/content/token-paywall.md?raw";
import usedesk from "@/content/usedesk.md?raw";

export type DocEntry = {
  slug: string;
  title: string;
  description: string;
  group: "Старт" | "Модули" | "Монетизация" | "Архитектура" | "Разработка";
  body: string;
};

export const docs: DocEntry[] = [
  { slug: "getting-started", title: "Getting Started", description: "Подключение нужных Swift Package products к host app.", group: "Старт", body: gettingStarted },
  { slug: "module-selection", title: "Выбор модуля", description: "Как выбрать Extensions, Core, Monetization или UIFlows.", group: "Старт", body: moduleSelection },
  { slug: "public-package-access", title: "Public package access", description: "Установка без GitHub account, password, token и Keychain.", group: "Старт", body: publicPackageAccess },
  { slug: "legacy-app-migration", title: "Миграция старого app", description: "Package graph, cutover topology, atomic groups и runtime slices.", group: "Старт", body: legacyAppMigration },
  { slug: "broad-core", title: "BroadCore", description: "Bootstrap, cache, state, retry, logging и ATT boundary.", group: "Модули", body: broadCore },
  { slug: "broad-extensions", title: "BroadExtensions", description: "Независимые utility-расширения без platform dependencies.", group: "Модули", body: broadExtensions },
  { slug: "broad-monetization", title: "BroadMonetization", description: "Adapty, StoreKit, entitlement, RU Billing и analytics.", group: "Модули", body: broadMonetization },
  { slug: "broad-ui-flows", title: "BroadUIFlows", description: "SwiftUI onboarding, AppFlow, paywall и payment sheets.", group: "Модули", body: broadUIFlows },
  { slug: "special-offer", title: "Special Offer", description: "Второй paywall, provider authorization и безопасные fallback.", group: "Монетизация", body: specialOffer },
  { slug: "adapty-setup", title: "Adapty и placements", description: "Paywall names, placements, Remote Config и provenance flags.", group: "Монетизация", body: adaptySetup },
  { slug: "paywall-ui", title: "Paywall UI", description: "0…N products, loader без моргания и визуальные reference.", group: "Монетизация", body: paywallUI },
  { slug: "token-paywall", title: "Token paywall", description: "Consumable packages, exactly-once fulfillment и balance recovery.", group: "Монетизация", body: tokenPaywall },
  { slug: "ru-billing", title: "RU Billing", description: "Fail-closed availability, checkout sequence и backend reconciliation.", group: "Монетизация", body: ruBilling },
  { slug: "architecture", title: "Архитектура", description: "Границы repositories, products и однонаправленный dependency graph.", group: "Архитектура", body: architecture },
  { slug: "onboarding-att", title: "Onboarding и ATT", description: "Динамические страницы, lifecycle и момент системного запроса.", group: "Архитектура", body: onboardingATT },
  { slug: "runtime-reliability", title: "Runtime и надёжность", description: "Bootstrap, cache, entitlement, pending и network interruptions.", group: "Архитектура", body: runtimeReliability },
  { slug: "usedesk", title: "Usedesk", description: "Опциональный чат из Settings и account-scoped token recovery.", group: "Разработка", body: usedesk },
  { slug: "compatibility", title: "Совместимость", description: "Known-good наборы версий и machine-readable catalog.", group: "Разработка", body: compatibility },
  { slug: "release-process", title: "Release process", description: "SemVer, public API review и порядок cross-repository release.", group: "Разработка", body: releaseProcess },
  { slug: "migration", title: "Разделение platform repository", description: "Как platform code был вынесен в независимые repositories.", group: "Разработка", body: migration },
  { slug: "documentation", title: "Как править docs", description: "Public Markdown, DocC, Edit this page и публикация.", group: "Разработка", body: documentation },
];

export const docGroups = ["Старт", "Модули", "Монетизация", "Архитектура", "Разработка"] as const;
export function getDoc(slug: string) { return docs.find((doc) => doc.slug === slug); }
export function slugifyHeading(value: string) {
  return value.toLocaleLowerCase("ru-RU").replace(/[`*_]/g, "").replace(/[^a-zа-яё0-9]+/gi, "-").replace(/^-|-$/g, "");
}
