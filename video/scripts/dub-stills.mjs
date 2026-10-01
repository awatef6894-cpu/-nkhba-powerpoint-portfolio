// صور ثابتة من فيديو الدفعة 7 (Dub) للمراجعة
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import path from "node:path";

const T = process.argv.slice(2).map(Number);
const SHOTS = T.length ? T : [1.0, 1.7, 2.3, 2.9, 4.4, 6.8, 7.8, 9.0, 11.3, 13.0, 14.2, 15.9, 16.6, 18.0, 20.9, 23.0, 25.0, 26.4, 28.6, 29.9, 30.3, 32.5, 33.7, 36.5, 38.2, 42.8, 47.0];
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "Batch7", inputProps: {} });
const out = path.resolve("out/dub");
mkdirSync(out, { recursive: true });
for (const t of SHOTS) {
  const name = `t${t.toFixed(1).padStart(4, "0")}`;
  await renderStill({ serveUrl, composition, frame: Math.round(t * 30), output: `${out}/${name}.png`, inputProps: {} });
  console.log(name);
}
