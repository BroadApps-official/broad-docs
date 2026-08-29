import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const publicRoot = join(projectRoot, "public");
const platformRoot = join(projectRoot, "..", "BroadAppsIOSPlatform");

function gitRef(directory, fallbackVariable) {
  if (process.env[fallbackVariable]) return process.env[fallbackVariable];
  return execFileSync("git", ["-C", directory, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
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

const platformRef = gitRef(platformRoot, "BROADAPPS_PLATFORM_MEDIA_REF");
const docsRef = gitRef(projectRoot, "BROADAPPS_DOCS_MEDIA_REF");
const assets = {};
for (const publicPath of await listMediaFiles(publicRoot)) {
  const buffer = await readFile(join(publicRoot, publicPath));
  const fromPlatform = publicPath.startsWith("guides/readme/");
  const sourcePath = fromPlatform
    ? `Documentation/Assets/README/${publicPath.slice("guides/readme/".length)}`
    : `public/${publicPath}`;
  assets[publicPath] = {
    sha256: createHash("sha256").update(buffer).digest("hex"),
    bytes: buffer.length,
    source: {
      repository: fromPlatform
        ? "https://github.com/BroadApps-official/broad-platform-integration"
        : "https://github.com/BroadApps-official/broad-docs",
      ref: fromPlatform ? platformRef : docsRef,
      path: sourcePath,
    },
  };
}

await writeFile(
  join(publicRoot, "media-manifest.json"),
  `${JSON.stringify({ schema: 1, assets }, null, 2)}\n`,
  "utf8",
);
console.log(`Updated public/media-manifest.json for ${Object.keys(assets).length} assets.`);
