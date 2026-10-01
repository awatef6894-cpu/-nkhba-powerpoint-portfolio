// يولّد مؤثر «Record scratch» اصطناعيًا (WAV) — استبدله بملفك الخاص في public/sfx/ إن أردت.
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 48000;
const DUR = 0.55;
const n = Math.floor(SR * DUR);
const out = new Float32Array(n);

// حركتان: سحبة للأمام ثم للخلف، بتردد يتغير بسرعة مع ضجيج احتكاك
let phase = 0;
let seed = 1;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
let lp = 0;
for (let i = 0; i < n; i++) {
  const t = i / SR;
  const p = t / DUR;
  const stroke = p < 0.45 ? p / 0.45 : (p - 0.45) / 0.55;
  const dir = p < 0.45 ? 1 : -1;
  const speed = Math.sin(Math.PI * stroke);
  const freq = 120 + 900 * speed * (dir > 0 ? 1 : 0.7);
  phase += (2 * Math.PI * freq) / SR;
  const tone = Math.sign(Math.sin(phase)) * 0.35 + Math.sin(phase * 2.01) * 0.25;
  lp += 0.25 * (rand() - lp);
  const noise = lp * 0.9;
  const env = Math.min(1, t / 0.01) * Math.min(1, (DUR - t) / 0.06) * (0.35 + 0.65 * speed);
  out[i] = Math.tanh((tone + noise) * env * 1.6) * 0.8;
}

const buf = Buffer.alloc(44 + n * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8);
buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, out[i])) * 32767), 44 + i * 2);

mkdirSync(new URL("../public/sfx/", import.meta.url), { recursive: true });
writeFileSync(new URL("../public/sfx/record-scratch.wav", import.meta.url), buf);
console.log("public/sfx/record-scratch.wav");
