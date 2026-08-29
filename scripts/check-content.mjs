import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const contentRoot = join(projectRoot, "content");
const publicRoot = join(projectRoot, "public");
const contentFiles = (await readdir(contentRoot)).filter((name) => name.endsWith(".md")).sort();
const registry = await readFile(new URL("../lib/docs.ts", import.meta.url), "utf8");
const githubIndex = await readFile(new URL("../lib/github-docs.generated.ts", import.meta.url), "utf8");
const docVisualSource = await readFile(new URL("../app/doc-visual.tsx", import.meta.url), "utf8");
const mediaManifest = JSON.parse(await readFile(new URL("../public/media-manifest.json", import.meta.url), "utf8"));
const failures = [];
const referencedMedia = new Set();

function fail(message) {
  failures.push(message);
}

function cleanMediaSource(rawSource) {
  const source = rawSource.trim().split(/\s+/)[0]?.replace(/^<|>$/g, "") ?? "";
  return source.split(/[?#]/, 1)[0];
}

async function hasExactCase(filePath) {
  const pathFromPublic = relative(publicRoot, filePath);
  if (!pathFromPublic || pathFromPublic.startsWith(`..${sep}`) || pathFromPublic === "..") return false;
  let current = publicRoot;
  for (const component of pathFromPublic.split(sep)) {
    const entries = await readdir(current);
    if (!entries.includes(component)) return false;
    current = join(current, component);
  }
  return true;
}

function validatePNG(buffer, label) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 33 || !buffer.subarray(0, 8).equals(signature)) return fail(`${label}: invalid PNG signature.`);
  if (buffer.toString("ascii", 12, 16) !== "IHDR") return fail(`${label}: PNG does not start with IHDR.`);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (!width || !height || width > 16_384 || height > 16_384) fail(`${label}: invalid PNG dimensions ${width}x${height}.`);
  if (!buffer.includes(Buffer.from("IEND"))) fail(`${label}: PNG has no IEND chunk.`);
}

function validateJPEG(buffer, label) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer.at(-2) !== 0xff || buffer.at(-1) !== 0xd9) {
    return fail(`${label}: invalid JPEG boundary markers.`);
  }
  let offset = 2;
  let dimensions;
  while (offset + 4 <= buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && length >= 7) {
      dimensions = [buffer.readUInt16BE(offset + 3), buffer.readUInt16BE(offset + 5)];
      break;
    }
    offset += length;
  }
  if (!dimensions || dimensions.some((value) => !value || value > 16_384)) fail(`${label}: JPEG dimensions could not be decoded safely.`);
}

function skipGIFBlocks(buffer, start, label) {
  let offset = start;
  while (offset < buffer.length) {
    const size = buffer[offset];
    offset += 1;
    if (size === 0) return offset;
    if (offset + size > buffer.length) {
      fail(`${label}: truncated GIF data block.`);
      return buffer.length;
    }
    offset += size;
  }
  fail(`${label}: unterminated GIF data blocks.`);
  return buffer.length;
}

function validateGIF(buffer, label) {
  const signature = buffer.toString("ascii", 0, 6);
  if (signature !== "GIF87a" && signature !== "GIF89a") return fail(`${label}: invalid GIF signature.`);
  if (buffer.length < 14) return fail(`${label}: truncated GIF header.`);
  const width = buffer.readUInt16LE(6);
  const height = buffer.readUInt16LE(8);
  if (!width || !height || width > 16_384 || height > 16_384) fail(`${label}: invalid GIF dimensions ${width}x${height}.`);
  let offset = 13;
  const globalColorTable = (buffer[10] & 0x80) !== 0;
  if (globalColorTable) offset += 3 * (2 ** ((buffer[10] & 0x07) + 1));
  let frames = 0;
  let trailer = false;
  while (offset < buffer.length) {
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0x3b) { trailer = true; break; }
    if (marker === 0x21) {
      if (offset >= buffer.length) break;
      offset += 1;
      offset = skipGIFBlocks(buffer, offset, label);
      continue;
    }
    if (marker !== 0x2c || offset + 9 > buffer.length) {
      fail(`${label}: invalid GIF block marker.`);
      break;
    }
    frames += 1;
    const packed = buffer[offset + 8];
    offset += 9;
    if ((packed & 0x80) !== 0) offset += 3 * (2 ** ((packed & 0x07) + 1));
    if (offset >= buffer.length) break;
    offset += 1;
    offset = skipGIFBlocks(buffer, offset, label);
  }
  if (!frames) fail(`${label}: GIF contains no frames.`);
  if (!trailer) fail(`${label}: GIF has no trailer.`);
}

function validateSVG(buffer, label) {
  const source = buffer.toString("utf8");
  if (!/<svg\b/i.test(source) || !/<\/svg>/i.test(source)) fail(`${label}: invalid SVG root.`);
  if (!/\bviewBox\s*=\s*["'][^"']+["']/i.test(source)) fail(`${label}: SVG must define viewBox.`);
  if (!/<title(?:\s[^>]*)?>[^<]+<\/title>/i.test(source)) fail(`${label}: SVG must contain a nonempty title.`);
  if (!/<desc(?:\s[^>]*)?>[^<]+<\/desc>/i.test(source)) fail(`${label}: SVG must contain a nonempty description.`);
  if (/<script\b|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|file:|\/\/)/i.test(source)) fail(`${label}: SVG contains executable or remote content.`);
}

async function validateMediaFile(publicPath) {
  const label = `public/${publicPath}`;
  const filePath = resolve(publicRoot, publicPath);
  if (!filePath.startsWith(`${publicRoot}${sep}`)) return fail(`${label}: media path escapes public/.`);
  try {
    await access(filePath);
  } catch {
    return fail(`${label}: media file is missing.`);
  }
  if (!(await hasExactCase(filePath))) fail(`${label}: path casing does not match the filesystem exactly.`);

  const buffer = await readFile(filePath);
  if (!buffer.length) return fail(`${label}: media file is empty.`);
  const extension = extname(publicPath).toLowerCase();
  if (extension === ".png") validatePNG(buffer, label);
  else if (extension === ".jpg" || extension === ".jpeg") validateJPEG(buffer, label);
  else if (extension === ".gif") validateGIF(buffer, label);
  else if (extension === ".svg") validateSVG(buffer, label);
  else return fail(`${label}: unsupported media type ${extension || "without extension"}.`);

  const manifestEntry = mediaManifest.assets?.[publicPath];
  if (!manifestEntry) return fail(`${label}: missing from media-manifest.json.`);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  if (manifestEntry.sha256 !== sha256) fail(`${label}: SHA-256 differs from media-manifest.json.`);
  if (manifestEntry.bytes !== buffer.length) fail(`${label}: byte size differs from media-manifest.json.`);
  if (!manifestEntry.source?.repository || !manifestEntry.source?.ref || !manifestEntry.source?.path) fail(`${label}: provenance is incomplete in media-manifest.json.`);
}

async function registerMediaReference(file, rawSource, alt, requiresAlt = true) {
  const source = cleanMediaSource(rawSource);
  if (requiresAlt && !alt.trim()) fail(`${file}: media alt text must not be empty.`);
  if (/^(?:https?:|data:|file:|\/|~)/i.test(source) || source.includes("/var/folders/") || source.includes("/Users/") || source.includes("\\")) {
    return fail(`${file}: media source must be a repository-relative public path: ${rawSource}`);
  }
  if (!source.startsWith("../public/")) return fail(`${file}: media must use a GitHub-safe ../public/ path: ${rawSource}`);
  const publicPath = source.slice("../public/".length);
  if (!publicPath || publicPath.split("/").includes("..")) return fail(`${file}: invalid public media path: ${rawSource}`);
  referencedMedia.add(publicPath);
}

async function listMediaFiles(directory, prefix = "") {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === "media-manifest.json") continue;
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) result.push(...await listMediaFiles(join(directory, entry.name), relativePath));
    else if (/\.(?:png|jpe?g|gif|svg)$/i.test(entry.name)) result.push(relativePath);
  }
  return result.sort();
}

if (mediaManifest.schema !== 1) fail("public/media-manifest.json: unsupported schema.");
if (contentFiles.length < 10) fail("Documentation index must contain at least ten public pages.");
for (const file of contentFiles) {
  const slug = file.slice(0, -3);
  const body = await readFile(join(contentRoot, file), "utf8");
  if (!body.startsWith("# ")) fail(`${file}: first line must be an H1.`);
  if (!registry.includes(`slug: "${slug}"`)) fail(`${file}: slug is missing from lib/docs.ts.`);
  if (!docVisualSource.includes(`"${slug}"`) && !docVisualSource.includes(`slug === "${slug}"`)) {
    fail(`${file}: every public article must have a visual explanation in app/doc-visual.tsx.`);
  }
  if (/\b(?:sk_live|secret|bearer)\b/i.test(body)) fail(`${file}: possible secret-bearing text.`);
  if (/\]\(\/docs\//.test(body)) fail(`${file}: site-root document links break the GitHub Markdown fallback; use ./slug.md.`);
  if (!githubIndex.includes(JSON.stringify(body))) fail(`${file}: GitHub search index is stale; run pnpm run github-index:refresh.`);
  for (const phrase of [
    "Package resolve завершается",
    "Generic iOS compile",
    "Fixture/probe",
    "App-owned configuration",
    "Host app подключает",
    "## Composition root",
    "real keys",
    "placements, strings, assets",
    "use cases/ViewModels",
    "additional verifier",
    "backend authorization",
  ]) if (body.toLocaleLowerCase("ru-RU").includes(phrase.toLocaleLowerCase("ru-RU"))) {
    fail(`${file}: unexplained mixed-language phrase is forbidden: ${phrase}`);
  }

  for (const match of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) await registerMediaReference(file, match[2], match[1]);
  for (const match of body.matchAll(/<img\b[^>]*>/gi)) {
    const source = match[0].match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
    const alt = match[0].match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    await registerMediaReference(file, source, alt);
  }
  for (const match of body.matchAll(/<source\b[^>]*\bsrcset\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
    for (const candidate of match[1].split(",")) await registerMediaReference(file, candidate, "source", false);
  }

  for (const match of body.matchAll(/\[[^\]]+\]\(\.\/([a-z0-9-]+)\.md(?:#[^)]+)?\)/gi)) {
    if (!contentFiles.includes(`${match[1]}.md`)) fail(`${file}: linked Markdown page is missing: ${match[1]}.md`);
  }
  if (file === "legacy-app-migration.md") {
    for (const contract of [
      "https://github.com/BroadApps-official/broad-platform-integration",
      "Repository приложения",
      "APP MIGRATION · BLOCKED",
      "platform_set",
      "не перезаписывает его пустым",
      "Cutover topology",
      "Atomic cutover group",
      "Legacy owner",
      "Conflicting targets",
      "Runtime slices after cutover",
    ]) if (!body.includes(contract)) fail(`${file}: canonical source contract is missing: ${contract}`);
  }
}

const mediaFiles = await listMediaFiles(publicRoot);
for (const publicPath of mediaFiles) await validateMediaFile(publicPath);
for (const publicPath of referencedMedia) if (!mediaFiles.includes(publicPath)) fail(`Referenced media is not a validated public asset: ${publicPath}`);
for (const publicPath of Object.keys(mediaManifest.assets ?? {})) if (!mediaFiles.includes(publicPath)) fail(`media-manifest.json references a missing asset: ${publicPath}`);

const allFiles = await readdir(projectRoot);
if (allFiles.some((name) => name.toLowerCase() === "tests")) fail("Tests directories are forbidden.");
if (/"test"\s*:/.test(await readFile(new URL("../package.json", import.meta.url), "utf8"))) fail("Test scripts are forbidden.");

for (const repository of ["broad-core-ios", "broad-extensions-ios", "broad-monetization-ios", "broad-ui-flows-ios", "broad-platform-integration", "broad-docs"]) {
  if (!githubIndex.includes(`"repository": "${repository}"`)) fail(`GitHub search index is missing ${repository}.`);
}
if ((githubIndex.match(/"id":/g) ?? []).length < 20) fail("GitHub search index must contain at least twenty public documents.");
if (/sk_live_[a-z0-9]+/i.test(githubIndex)) fail("GitHub search index contains a possible private live key.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Content contract passed: ${contentFiles.length} pages, ${mediaFiles.length} decoded media assets, ${referencedMedia.size} references.`);
