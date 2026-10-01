// يصدّر صورة PNG لكل لقطة (للمراجعة قبل تصدير MP4)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SHOTS = [
  ["01-pause", 40],
  ["02-intro", 210],
  ["03-counter", 355],
  ["04-font-before", 420],
  ["04-font-after", 480],
  ["05-system", 668],
  ["06-strike", 768],
  ["07-reviews", 846],
  ["07-reviews-rating", 868],
  ["08-batch", 925],
  ["09-features", 1070],
  ["09-features-free", 1120],
  ["10-cta", 1235],
  ["11-calm", 1320],
  ["12-outro", 1400],
];

const only = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const out = path.resolve("out/stills");
mkdirSync(out, { recursive: true });
for (const id of ["Montage"]) {
  const composition = await selectComposition({ serveUrl, id, inputProps: {} });
  for (const [name, frame] of SHOTS) {
    if (only.length && !only.some((o) => name.startsWith(o))) continue;
    await renderStill({ serveUrl, composition, frame, output: `${out}/${name}.png`, inputProps: {} });
    console.log(name);
  }
}
