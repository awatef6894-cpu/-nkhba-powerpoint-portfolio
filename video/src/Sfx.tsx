// المؤثرات الصوتية — ملفات مجانية من Mixkit و Freesound (CC0)، انظر public/sfx/CREDITS.md
import React from "react";
import { Html5Audio, Sequence, staticFile } from "remotion";
import { CLICK_AT, FREE_AT } from "./scenes";

const s = (sec: number) => Math.round(sec * 30);

// lead = الصمت في بداية الملف (مللي ثانية) — نقدّم الصوت بقدره ليقع على الإطار بالضبط
const FILES = {
  scratch: { src: "record-scratch.mp3", lead: 36, vol: 0.55 },
  softPop: { src: "soft-pop.mp3", lead: 53, vol: 0.55 },
  tick: { src: "counter-tick.mp3", lead: 0, vol: 0.14 },
  ding: { src: "ding.mp3", lead: 47, vol: 0.4 },
  whoosh: { src: "whoosh.mp3", lead: 132, vol: 0.6 },
  click: { src: "soft-click.mp3", lead: 0, vol: 0.9 },
  strike: { src: "marker-strike.mp3", lead: 13, vol: 0.5 },
  sparkle: { src: "sparkle.mp3", lead: 1, vol: 0.9 },
  impact: { src: "soft-impact.mp3", lead: 61, vol: 0.75 },
  check: { src: "check.mp3", lead: 100, vol: 0.7 },
  popBright: { src: "pop-bright.mp3", lead: 46, vol: 0.85 },
  mouse: { src: "mouse-click.mp3", lead: 189, vol: 0.9 },
} as const;

type Cue = [keyof typeof FILES, number];

const range = (from: number, to: number, step: number) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

const CUES: Cue[] = [
  // ٠–٢ وقفة سريعة
  ["scratch", 0],
  // ٢–٨ الشعارات (نفس توقيت ظهورها في IntroScene)
  ...[40, 85, 130].map((f): Cue => ["softPop", s(2) + f]),
  // ٨–١٢ العدّاد: تكتكة خفيفة أثناء العد + Ding عند الوقوف
  ...range(s(8) + 8, s(8) + 48, 3).map((f): Cue => ["tick", f]),
  ["ding", s(8) + 50],
  ...range(s(8) + 62, s(8) + 100, 3).map((f): Cue => ["tick", f]),
  ["ding", s(8) + 102],
  // ١٢–١٨ تغيير الخط
  ["whoosh", s(12) + 78],
  // ١٨–٢٣ المراحل الخمس
  ...[8, 22, 36, 50, 64].map((f): Cue => ["click", s(18) + f]),
  // ٢٣–٢٦ الشطب
  ["strike", s(23) + 18],
  ["strike", s(23) + 56],
  // ٢٦–٢٩ بطاقات الآراء + النجوم
  ...range(0, 55, 11).map((f): Cue => ["softPop", s(26) + f]),
  ["sparkle", s(26) + 70],
  // ٢٩–٣٢ الدفعة ٨
  ["impact", s(29) + 5],
  // ٣٢–٣٨ المميزات + «مجانية»
  ...[10, 40, 74, 116].map((f): Cue => ["check", s(32) + f]),
  ["popBright", s(32) + FREE_AT],
  // ٣٨–٤٣ زر احجز مقعدك
  ["mouse", s(38) + CLICK_AT],
  // ٤٣–٤٥ بدون صوت
  // ٤٥–٤٨ الرجوع للشرح — نفس ملف ١٢–١٨
  ["whoosh", s(45)],
];

export const Sfx: React.FC = () => (
  <>
    {CUES.map(([k, at], i) => {
      const f = FILES[k];
      const lead = Math.round((f.lead / 1000) * 30);
      const from = at - lead;
      return (
        <Sequence key={i} from={Math.max(0, from)} durationInFrames={45} layout="none">
          <Html5Audio src={staticFile(`sfx/${f.src}`)} volume={f.vol} trimBefore={from < 0 ? -from : undefined} />
        </Sequence>
      );
    })}
  </>
);
