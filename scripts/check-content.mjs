import { readdir, readFile } from "node:fs/promises";

const contentFiles = (await readdir(new URL("../content/", import.meta.url))).filter((name) => name.endsWith(".md")).sort();
const registry = await readFile(new URL("../lib/docs.ts", import.meta.url), "utf8");
const githubIndex = await readFile(new URL("../lib/github-docs.generated.ts", import.meta.url), "utf8");
const failures = [];

if (contentFiles.length < 10) failures.push("Documentation index must contain at least ten public pages.");
for (const file of contentFiles) {
  const slug = file.slice(0, -3);
  const body = await readFile(new URL(`../content/${file}`, import.meta.url), "utf8");
  if (!body.startsWith("# ")) failures.push(`${file}: first line must be an H1.`);
  if (!registry.includes(`slug: "${slug}"`)) failures.push(`${file}: slug is missing from lib/docs.ts.`);
  if (/\b(?:sk_live|secret|bearer)\b/i.test(body)) failures.push(`${file}: possible secret-bearing text.`);
  if (file === "legacy-app-migration.md") {
    for (const contract of [
      "https://github.com/BroadApps-official/broad-platform-integration",
      "Repository приложения",
      "APP MIGRATION · BLOCKED",
      "platform_set",
    ]) {
      if (!body.includes(contract)) failures.push(`${file}: canonical source contract is missing: ${contract}`);
    }
  }
}

const allFiles = await readdir(new URL("../", import.meta.url));
if (allFiles.some((name) => name.toLowerCase() === "tests")) failures.push("Tests directories are forbidden.");
if (/"test"\s*:/.test(await readFile(new URL("../package.json", import.meta.url), "utf8"))) failures.push("Test scripts are forbidden.");

for (const repository of ["broad-core-ios", "broad-extensions-ios", "broad-monetization-ios", "broad-ui-flows-ios", "broad-platform-integration", "broad-docs"]) {
  if (!githubIndex.includes(`"repository": "${repository}"`)) failures.push(`GitHub search index is missing ${repository}.`);
}
if ((githubIndex.match(/"id":/g) ?? []).length < 20) failures.push("GitHub search index must contain at least twenty public documents.");
if (/sk_live_[a-z0-9]+/i.test(githubIndex)) failures.push("GitHub search index contains a possible private live key.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Content contract passed: ${contentFiles.length} public Markdown pages.`);
