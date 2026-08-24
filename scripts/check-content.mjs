import { readdir, readFile } from "node:fs/promises";

const contentFiles = (await readdir(new URL("../content/", import.meta.url))).filter((name) => name.endsWith(".md")).sort();
const registry = await readFile(new URL("../lib/docs.ts", import.meta.url), "utf8");
const failures = [];

if (contentFiles.length < 10) failures.push("Documentation index must contain at least ten public pages.");
for (const file of contentFiles) {
  const slug = file.slice(0, -3);
  const body = await readFile(new URL(`../content/${file}`, import.meta.url), "utf8");
  if (!body.startsWith("# ")) failures.push(`${file}: first line must be an H1.`);
  if (!registry.includes(`slug: "${slug}"`)) failures.push(`${file}: slug is missing from lib/docs.ts.`);
  if (/\b(?:sk_live|secret|bearer)\b/i.test(body)) failures.push(`${file}: possible secret-bearing text.`);
}

const allFiles = await readdir(new URL("../", import.meta.url));
if (allFiles.some((name) => name.toLowerCase() === "tests")) failures.push("Tests directories are forbidden.");
if (/"test"\s*:/.test(await readFile(new URL("../package.json", import.meta.url), "utf8"))) failures.push("Test scripts are forbidden.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Content contract passed: ${contentFiles.length} public Markdown pages.`);
