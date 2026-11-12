import fs from "node:fs/promises";
import path from "node:path";

const verifiedAt = "2026-11-12T19:30:00-05:00";
const collectionHandles = ["jassen", "voorjaarsjassen", "bodywarmers", "setjes", "t-shirts", "polo-t-shirts", "werkkleding", "jeans", "truien", "petten", "brillen"];
const selectedHandles = new Set([
  "heren-softshell-jas-zwart", "heren-softshell-jas-donker-grijs", "heren-puffer-jacket-zwart", "heren-puffer-jacket-beige",
  "zwarte-heren-winterjas-met-capuchon", "essential-winter-jacket-beige", "alpine-jacket-grijs", "alpine-jacket-zwart",
  "arctic-hooded-jacket-zwart", "arctic-hooded-jacket-beige",
  "naamloos-21apr_12-01", "bomberjack-zwart", "bomberjack-legergroen", "bomberjack-donkerblauw", "bomberjack-lichtgrijs", "bomberjack-bruin",
  "heren-lichtgewicht-gewatteerde-jas-donkergrijs", "heren-lichtgewicht-gewatteerde-jas-donkerblauw-2", "heren-lichtgewicht-gewatteerde-jas-olijfgroen", "heren-lichtgewicht-gewatteerde-jas-beige-2",
  "bodywarmer-donkerblauw", "bodywarmer-beige", "bodywarmer-zwart", "bodywarmer-legergroen", "bodywarmer-taupe",
  "bodywarmer-met-capuchon-zwart-r", "bodywarmer-met-capuchon-legergroen-r", "bodywarmer-met-capuchon-bruin-r",
  "set", "set-1", "set-2", "set-3", "set-7", "set-11",
  "t-shirt-21", "t-shirt-22", "t-shirt-23", "t-shirt-32", "naamloos-23apr_14-27", "amazigh-t-shirt-wit", "amazigh-roots-t-shirts", "urban-wit",
  "polo-korte-mouwen-7", "polo-korte-mouwen-6", "polo-korte-mouwen-5", "polo-korte-mouwen-4", "t-shirt-45", "polo-beige",
]);

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...value] = arg.replace(/^--/, "").split("=");
  return [key, value.join("=")];
}));
const cacheDir = args["from-cache"];
const output = path.resolve(args.output || "data/catalog-snapshot.json");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readCollection(handle) {
  if (cacheDir) return JSON.parse(await fs.readFile(path.join(cacheDir, `collection-${handle}.json`), "utf8"));
  const response = await fetch(`https://samkill.nl/collections/${handle}/products.json?limit=250`, { headers: { "User-Agent": "SamkillLocalCatalogAudit/1.0" } });
  if (!response.ok) throw new Error(`${handle}: HTTP ${response.status}`);
  const data = await response.json();
  await wait(2500);
  return data;
}

const stripHtml = (value = "") => value
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/p>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/[ \t]+/g, " ")
  .replace(/\n\s+/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

const colorFromTitle = (title) => {
  const colors = ["donkerblauw", "donker grijs", "donkergrijs", "legergroen", "lichtgrijs", "antraciet", "kastanjebruin", "donkerbruin", "turquoise", "bordeaux", "olijfgroen", "koningsblauw", "lichtblauw", "grijs", "zwart", "beige", "bruin", "blauw", "groen", "wit", "crème", "creme", "taupe", "rood", "geel"];
  const match = colors.find((color) => title.toLocaleLowerCase("nl-NL").includes(color));
  if (!match) return "Overig";
  return match.replace("creme", "crème").replace("donker grijs", "donkergrijs").replace(/^./, (letter) => letter.toUpperCase());
};

const categoryFromTitle = (title) => {
  const value = title.toLocaleLowerCase("nl-NL");
  if (value.includes("werkbroek") || value.includes("broeken")) return "Werkbroeken";
  if (value.includes("softshell") || value.includes("winterjas") || value.includes("jas")) return "Werkjassen";
  if (value.includes("bodywarmer")) return "Bodywarmers";
  if (value.includes("polo")) return "Polo’s";
  if (value.includes("t-shirt")) return "T-shirts";
  if (value.includes("blouse")) return "Blouses";
  if (value.includes("hoodie") || value.includes("hoedie") || value.includes("trui")) return "Truien & hoodies";
  return "Overige werkkleding";
};

const merged = new Map();
const collectionCounts = {};
for (const handle of collectionHandles) {
  let data;
  try { data = await readCollection(handle); } catch (error) { console.warn(String(error)); continue; }
  collectionCounts[handle] = data.products.length;
  for (const product of data.products) {
    const inquiryOnly = handle === "werkkleding";
    if (!inquiryOnly && !selectedHandles.has(product.handle)) continue;
    const existing = merged.get(product.handle);
    if (existing) { existing.collections.push(handle); continue; }
    merged.set(product.handle, {
      id: String(product.id),
      handle: product.handle,
      title: product.title,
      description: stripHtml(product.body_html),
      publishedAt: product.published_at,
      updatedAt: product.updated_at,
      vendor: product.vendor,
      color: colorFromTitle(product.title),
      category: inquiryOnly ? categoryFromTitle(product.title) : null,
      commerceModel: inquiryOnly ? "inquiry" : "direct",
      inquiryPhone: inquiryOnly ? "+31620267670" : null,
      collections: [handle],
      available: product.variants.some((variant) => variant.available),
      images: product.images.map(({ src, width, height }) => ({ src, width, height })),
      options: product.options,
      variants: product.variants.map((variant) => ({
        id: String(variant.id), title: variant.title, available: variant.available, sku: variant.sku || null,
        price: Number(variant.price), compareAt: variant.compare_at_price ? Number(variant.compare_at_price) : null,
        option1: variant.option1, option2: variant.option2, option3: variant.option3,
      })),
    });
  }
}

const products = [...merged.values()].sort((a, b) => a.collections[0].localeCompare(b.collections[0]) || a.title.localeCompare(b.title, "nl"));
const snapshot = {
  source: "Openbare Shopify collectiefeeds van samkill.nl",
  sourceCountry: "NL",
  verifiedAt,
  fullPublicSitemapProductCount: 595,
  collectionCounts,
  selectedProductCount: products.length,
  selectedVariantCount: products.reduce((sum, product) => sum + product.variants.length, 0),
  missingSelectedHandles: [...selectedHandles].filter((handle) => !merged.has(handle)),
  products,
};
await fs.writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(JSON.stringify({ output, products: snapshot.selectedProductCount, variants: snapshot.selectedVariantCount, missing: snapshot.missingSelectedHandles }, null, 2));
