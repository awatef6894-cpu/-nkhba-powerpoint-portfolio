// نظام الحركة بأسلوب Dub — القيم من «بريف إعادة إنتاج فيديو الدفعة 7»
import React from "react";
import { AbsoluteFill, Easing, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { FONT } from "../brand";

export const FPS = 30;
export const f = (sec: number) => Math.round(sec * FPS);
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** تقدّم 0→1 بتسارع Ease-out قوي يبدأ عند sec ويستمر dur ثانية */
export const prog = (frame: number, sec: number, dur: number) => interpolate(frame, [sec * FPS, (sec + dur) * FPS], [0, 1], { ...CL, easing: EASE });
/** نفس الشيء بدون تسارع (للتداخل بين قيم) */
export const lin = (frame: number, sec: number, dur: number) => interpolate(frame, [sec * FPS, (sec + dur) * FPS], [0, 1], CL);
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const D = {
  base: "#FAF9F5",
  grid: "#ECEAE2",
  glowGreen: "#DBE7E1",
  glowOrange: "#FCEDDE",
  ink: "#11493c", // أخضر غابي غامق
  orange: "#f68616",
  orangeDeep: "#c46b12",
  muted: "#7d8a85",
  wordFrom: "#B8BDB9",
  strike: "#9ED9BF",
  red: "#b42318",
  gradNum: "linear-gradient(to left, #11493c 0%, #2e6e5e 40%, #e07a15 100%)",
  gradOrange: "linear-gradient(180deg, #f6a33a 0%, #e07a15 60%, #c46b12 100%)",
};

/** الخلفية الموحدة — ثابتة تمامًا من أول إطار لآخر إطار */
export const DubBg: React.FC = () => (
  <AbsoluteFill style={{ background: D.base, overflow: "hidden" }}>
    <AbsoluteFill
      style={{
        opacity: 0.55,
        backgroundImage: `linear-gradient(${D.grid} 1px, transparent 1px), linear-gradient(90deg, ${D.grid} 1px, transparent 1px)`,
        backgroundSize: "96px 96px",
        backgroundPosition: "center center",
      }}
    />
    <div style={{ position: "absolute", width: 900, height: 900, top: -330, right: -300, borderRadius: "50%", background: D.glowGreen, filter: "blur(140px)" }} />
    <div style={{ position: "absolute", width: 900, height: 900, bottom: -330, left: -300, borderRadius: "50%", background: D.glowOrange, filter: "blur(140px)" }} />
  </AbsoluteFill>
);

/** الكرت الزجاجي: أبيض 85% + Blur خلفي، حد 1px أبيض، زوايا 20px، ظل أخضر 8% */
export const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid #fff",
  borderRadius: 20,
  boxShadow: "0 12px 40px rgba(17,73,60,0.08)",
};

/** قياس عرض نص (بعد تحميل الخط) — نحتاجه للـ Morph */
const cache = new Map<string, number>();
export const measure = (text: string, size: number, weight = 700) => {
  const key = `${text}|${size}|${weight}`;
  if (cache.has(key)) return cache.get(key)!;
  if (typeof document === "undefined") return text.length * size * 0.5;
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.direction = "rtl";
  const w = ctx.measureText(text).width;
  cache.set(key, w);
  return w;
};

export type Word = string | { w: string; key?: boolean; color?: string; delay?: number };

/** بناء الكلمات: كلمة كلمة من اليمين، شفافية + Blur 8→0 + صعود 12px + رمادي→اللون. الكلمة المفتاحية برتقالي مع Overshoot */
export const Words: React.FC<{
  words: Word[];
  at: number;
  size: number;
  color?: string;
  weight?: number;
  gap?: number;
  style?: React.CSSProperties;
  keyColor?: string;
}> = ({ words, at, size, color = D.ink, weight = 700, gap, style, keyColor = D.orange }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", direction: "rtl", alignItems: "baseline", justifyContent: "center", gap: gap ?? size * 0.28, fontFamily: FONT, fontWeight: weight, fontSize: size, lineHeight: 1.45, whiteSpace: "nowrap", ...style }}>
      {words.map((wd, i) => {
        const o = typeof wd === "string" ? { w: wd } : wd;
        const start = at + i * 0.12 + (o.delay ?? 0);
        const p = prog(frame, start, 0.35);
        const target = o.key ? keyColor : o.color ?? color;
        const sc = o.key ? interpolate(frame, [start * FPS, (start + 0.3) * FPS, (start + 0.5) * FPS], [0.92, 1.04, 1], { ...CL, easing: Easing.out(Easing.cubic) }) : 1;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              filter: `blur(${8 * (1 - p)}px)`,
              transform: `translateY(${12 * (1 - p)}px) scale(${sc})`,
              color: interpolateColors(p, [0, 1], [D.wordFrom, target]),
            }}
          >
            {o.w}
          </span>
        );
      })}
    </div>
  );
};

/** دخول الكروت: تكبير 92→100%، صعود 24px، شفافية، 0.5 ث */
export const CardIn: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; from?: { x?: number; y?: number } }> = ({ at, children, style, from }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 0.5);
  return (
    <div style={{ opacity: p, transform: `translate(${(from?.x ?? 0) * (1 - p)}px, ${(from?.y ?? 24) * (1 - p)}px) scale(${mix(0.92, 1, p)})`, ...style }}>{children}</div>
  );
};

/** خروج العناصر: صعود 40px، Blur 10px، شفافية 0 خلال 0.4 ث */
export const Exit: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; dy?: number }> = ({ at, children, style, dy = -40 }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 0.4);
  if (p >= 1) return null;
  return <div style={{ opacity: 1 - p, filter: p > 0 ? `blur(${10 * p}px)` : undefined, transform: `translateY(${dy * p}px)`, ...style }}>{children}</div>;
};

/** قسم: يظهر بين from و to (+ مدة الخروج) مع دفع كاميرا بطيء 100→103% */
export const Section: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const frame = useCurrentFrame();
  if (frame < f(from) - 1 || frame > f(to) + f(0.6)) return null;
  const push = interpolate(frame, [f(from), f(to)], [1, 1.03], { ...CL, easing: Easing.inOut(Easing.sin) });
  return <AbsoluteFill style={{ transform: `scale(${push})` }}>{children}</AbsoluteFill>;
};

/** الدائرة الدوارة — شرطات متدرجة السماكة (مثل ملف الدائرة) بتدرج أخضر→برتقالي، دورة كل 3 ث */
export const Spinner: React.FC<{ size: number; opacity?: number; ticks?: number }> = ({ size, opacity = 1, ticks = 44 }) => {
  const frame = useCurrentFrame();
  const phase = ((frame / (3 * FPS)) * Math.PI * 2) % (Math.PI * 2);
  const r = size / 2;
  return (
    <svg width={size + 40} height={size + 40} viewBox={`${-r - 20} ${-r - 20} ${size + 40} ${size + 40}`} style={{ opacity, overflow: "visible" }}>
      <defs>
        <linearGradient id="spin-g" gradientUnits="userSpaceOnUse" x1={r} y1={-r} x2={-r} y2={r}>
          <stop offset="0" stopColor="#4a927f" />
          <stop offset="0.5" stopColor="#11493c" />
          <stop offset="1" stopColor="#f68616" />
        </linearGradient>
      </defs>
      {Array.from({ length: ticks }).map((_, i) => {
        const a = (i / ticks) * Math.PI * 2;
        // موجة تدور: الشرطات القريبة من رأس الموجة أسمك وأوضح
        let d = (a - phase) % (Math.PI * 2);
        if (d < 0) d += Math.PI * 2;
        const w = Math.pow(1 - d / (Math.PI * 2), 1.6);
        const len = 10 + 18 * w;
        const x1 = Math.cos(a) * (r - len / 2);
        const y1 = Math.sin(a) * (r - len / 2);
        const x2 = Math.cos(a) * (r + len / 2);
        const y2 = Math.sin(a) * (r + len / 2);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#spin-g)" strokeWidth={2 + 5 * w} strokeLinecap="round" opacity={0.12 + 0.88 * w} />;
      })}
    </svg>
  );
};
