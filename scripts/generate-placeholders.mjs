/**
 * Generates dimension-named placeholder images for every asset referenced in
 * the catalogue data, plus hero/OG. Industrial look: obsidian bg, faint grid,
 * VIPEX-red corner brackets, and a centered label so each placeholder is
 * self-describing and trivial to replace with the real shot later.
 *
 *   node scripts/generate-placeholders.mjs
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

async function readJson(rel) {
  return JSON.parse(await readFile(join(root, "src/data", rel), "utf8"));
}

const [categories, products] = await Promise.all([
  readJson("categories.json"),
  readJson("products.json"),
]);

/** Collect { src, width, height, label } for every asset. */
const assets = [];
const push = (img, label) =>
  assets.push({ src: img.src, width: img.width, height: img.height, label });

for (const c of categories) push(c.image, c.name);
for (const p of products) p.images.forEach((img) => push(img, p.name));

// Non-data assets
assets.push({ src: "/images/hero/hero-vipex-1200x1500.webp", width: 1200, height: 1500, label: "VIPEX" });
assets.push({ src: "/images/og/og-default-1200x630.webp", width: 1200, height: 630, label: "PERSIAN STAR · Building Hardware & Tools" });
assets.push({ src: "/images/contact/map-location-1200x800.webp", width: 1200, height: 800, label: "Map · Dubai, UAE" });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function svg({ width, height, label, src }) {
  const file = basename(src);
  const short = Math.min(width, height);
  const titleSize = Math.max(18, Math.round(short * 0.06));
  const metaSize = Math.max(11, Math.round(short * 0.028));
  const b = Math.round(short * 0.07); // bracket length
  const m = Math.round(short * 0.06); // margin
  const t = Math.max(2, Math.round(short * 0.006)); // stroke
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17181a"/>
      <stop offset="1" stop-color="#0a0a0b"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <circle cx="${width / 2}" cy="${height * 0.42}" r="${short * 0.09}" fill="none" stroke="#da1f2a" stroke-width="${t}"/>
  <path d="M${width / 2 - short * 0.045} ${height * 0.42} h${short * 0.09} M${width / 2} ${height * 0.42 - short * 0.045} v${short * 0.09}" stroke="#da1f2a" stroke-width="${t}"/>
  <text x="${width / 2}" y="${height * 0.6}" fill="#f4f4f1" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="700" text-anchor="middle" letter-spacing="1">${esc(label)}</text>
  <text x="${width / 2}" y="${height * 0.6 + titleSize * 1.6}" fill="#9aa0a6" font-family="monospace" font-size="${metaSize}" text-anchor="middle">${width} × ${height}</text>
  <text x="${width / 2}" y="${height - m}" fill="#6b7075" font-family="monospace" font-size="${metaSize}" text-anchor="middle">${esc(file)}</text>
  <path d="M${m} ${m + b} V${m} H${m + b}" fill="none" stroke="#da1f2a" stroke-width="${t}"/>
  <path d="M${width - m - b} ${height - m} H${width - m} V${height - m - b}" fill="none" stroke="#da1f2a" stroke-width="${t}"/>
</svg>`;
}

let count = 0;
for (const asset of assets) {
  const out = join(pub, asset.src);
  await mkdir(dirname(out), { recursive: true });
  const buffer = Buffer.from(svg(asset));
  await sharp(buffer).webp({ quality: 82 }).toFile(out);
  count++;
}

// A simple monogram favicon-ish asset kept for reference
await writeFile(
  join(pub, "images/README.txt"),
  "Placeholder images. Filenames encode final intended dimensions — replace in place.\n",
);

console.log(`Generated ${count} placeholder images.`);
