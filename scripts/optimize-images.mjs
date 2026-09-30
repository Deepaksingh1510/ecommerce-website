// Downloads every product and site image once and writes a resized WebP into
// public/images, plus data/image-manifest.json with dimensions and a tiny blur
// placeholder. Pages then only ever load local, pre-sized images.
//
// Image sources in data/ProductData.json are either a URL / local path, or
// "detail:<source>", which produces a close-up crop of that image centred on
// its most visually interesting region (or "detail@x,y:<source>" to pick the
// focal point yourself).
//
//   npm run images             process new images, delete unused ones
//   npm run images -- --force  re-process everything
import { mkdir, readFile, readdir, rm, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const force = process.argv.includes("--force");

const siteImages = {
  "site:gaming": "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
  "site:tech": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
  "site:fragrance": "https://images.unsplash.com/photo-1622618991746-fe6004db3a47",
  "site:home": "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
  "site:kitchen": "https://mimoucadesign.com/wp-content/uploads/2020/10/kitchen-design-4.jpg",
  "site:sports": "https://images.unsplash.com/photo-1554139844-af2fc8ad3a3a",
  "site:banner": "https://d1hy6t2xeg0mdl.cloudfront.net/image/538225/8b7f2245b4/standard",
};

const manifestPath = path.join(root, "data", "image-manifest.json");
const products = JSON.parse(await readFile(path.join(root, "data", "ProductData.json"), "utf8"));
let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {}

const jobs = [];
for (const product of products) {
  product.images.forEach((key, index) => {
    jobs.push({ key, name: `products/p${product.id}-${index + 1}`, maxSize: 1400 });
  });
}
for (const [key, source] of Object.entries(siteImages)) {
  jobs.push({ key, source, name: `site/${key.slice(5)}`, maxSize: 1800 });
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function load(source, width) {
  if (!/^https?:/.test(source)) return readFile(path.join(root, source));
  const url = source.startsWith("https://images.unsplash.com/")
    ? `${source}?w=${width}&q=85&fm=jpg`
    : source;
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (image-optimizer)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// Crops a 4:5 close-up (about half the frame). With an explicit focal point
// ("detail@0.4,0.7:<source>", as fractions of width and height) the crop is
// centred there; otherwise it goes where sharp's attention strategy finds the
// most salient region, in two passes that each crop along one axis so
// nothing is scaled down before the crop.
async function detailCrop(input, focus) {
  const { width: w, height: h } = await sharp(input).metadata();
  const rh = Math.round(Math.min(h * 0.72, w * 0.56 * 1.25));
  const rw = Math.round(rh * 0.8);
  if (focus) {
    const clamp = (v, max) => Math.round(Math.min(Math.max(v, 0), max));
    return sharp(input)
      .extract({
        left: clamp(focus[0] * w - rw / 2, w - rw),
        top: clamp(focus[1] * h - rh / 2, h - rh),
        width: rw,
        height: rh,
      })
      .toBuffer();
  }
  const strip = await sharp(input)
    .resize(rw, h, { fit: "cover", position: sharp.strategy.attention })
    .toBuffer();
  return sharp(strip)
    .resize(rw, rh, { fit: "cover", position: sharp.strategy.attention })
    .toBuffer();
}

async function processJob({ key, source = key, name, maxSize }) {
  const existing = manifest[key]?.src;
  if (
    !force &&
    existing?.startsWith(`/images/${name}-`) &&
    (await exists(path.join(root, "public", existing)))
  ) {
    return;
  }

  const detail = source.match(/^detail(?:@([\d.]+),([\d.]+))?:(.+)$/);
  let input = await load(detail ? detail[3] : source, detail ? 3200 : 2000);
  if (detail) {
    input = await detailCrop(input, detail[1] && [Number(detail[1]), Number(detail[2])]);
  }

  const resized = await sharp(input)
    .rotate()
    .resize(maxSize, maxSize, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const { data, info } = await sharp(resized)
    .webp({ quality: 80, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // The content hash in the filename means a changed image always gets a new
  // URL, so long-lived browser and optimizer caches can never serve a stale one.
  const hash = createHash("sha256").update(data).digest("hex").slice(0, 10);
  const out = `${name}-${hash}.webp`;
  await mkdir(path.join(imagesDir, path.dirname(out)), { recursive: true });
  await writeFile(path.join(imagesDir, out), data);
  const blur = await sharp(resized).resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer();

  manifest[key] = {
    src: `/images/${out}`,
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

const failures = [];
const queue = [...jobs];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        await processJob(job);
        process.stdout.write(".");
      } catch (error) {
        failures.push(`${job.name}  ${job.source ?? job.key}  (${error.message})`);
      }
    }
  })
);

// Drop manifest entries and files for images that are no longer referenced.
const used = new Set(jobs.map((job) => job.key));
manifest = Object.fromEntries(Object.entries(manifest).filter(([key]) => used.has(key)).sort());
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const keep = new Set(Object.values(manifest).map((image) => path.join(root, "public", image.src)));
let removed = 0;
for (const dir of ["products", "site"]) {
  const folder = path.join(imagesDir, dir);
  for (const file of await readdir(folder).catch(() => [])) {
    const full = path.join(folder, file);
    if (!keep.has(full)) {
      await rm(full);
      removed++;
    }
  }
}

console.log(`\n${jobs.length - failures.length}/${jobs.length} images ready, ${removed} unused files deleted.`);
if (failures.length) {
  console.error("Failed:\n  " + failures.join("\n  "));
  process.exitCode = 1;
}
