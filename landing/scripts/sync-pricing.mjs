// Copies the price from config/pricing.js into the HTML fallback text
// (shown before JavaScript runs, and to crawlers), so the number is never typed by hand.
//   node scripts/sync-pricing.mjs          → rewrite index.html
//   node scripts/sync-pricing.mjs --check  → fail if index.html is out of sync
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRICING = createRequire(import.meta.url)(join(root, "config/pricing.js"));
const file = join(root, "index.html");
const html = readFileSync(file, "utf8");

const values = { priceNow: PRICING.PRICE_SAR, priceWas: PRICING.PRICE_WAS_SAR, currency: PRICING.currencyLabel };
let out = html;
for (const [key, val] of Object.entries(values)) {
  out = out.replace(new RegExp(`(data-cfg="${key}">)[^<]*(<)`, "g"), `$1${val}$2`);
}

if (process.argv.includes("--check")) {
  if (out !== html) { console.error("index.html prices are out of sync with config/pricing.js"); process.exit(1); }
  console.log(`prices in sync: ${PRICING.PRICE_SAR} ${PRICING.currencyLabel} (was ${PRICING.PRICE_WAS_SAR})`);
} else {
  if (out !== html) writeFileSync(file, out);
  console.log(`synced: ${PRICING.PRICE_SAR} ${PRICING.currencyLabel} (was ${PRICING.PRICE_WAS_SAR})`);
}
