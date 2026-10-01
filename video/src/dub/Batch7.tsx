// فيديو الدفعة 7 بأسلوب Dub — ٤٨ ثانية، خلفية واحدة ثابتة، ولا قطع واحد
import React from "react";
import { AbsoluteFill, Easing, Html5Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, FONT_OLD, G, img } from "../brand";
import { Icon, Stars } from "../ui";
import { CardIn, D, DubBg, EASE, Exit, FPS, Section, Spinner, Words, card, f, lin, measure, mix, prog } from "./kit";

const W = 1920;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const abs = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", ...s });
const centerX: React.CSSProperties = { left: 0, right: 0, display: "flex", justifyContent: "center" };

/* ══════════════ عناصر عامة تعبر بين الأقسام (الجسور) ══════════════ */

// الدائرة الدوارة: تفتح الفيديو، تصير إطار صورة الكوتش، ترجع حول 4.95 والدفعة 7، وتقفل الفيديو
const spinnerState = (t: number) => {
  if (t < 2.5) {
    const p = prog(t * FPS, 0, 0.4);
    return { x: 960, y: 540, size: 520 * mix(0.9, 1, p), op: p };
  }
  if (t < 7.6) {
    const p = prog(t * FPS, 2.5, 0.7);
    return { x: 960, y: mix(540, 230, p), size: mix(520, 300, p), op: 1 };
  }
  if (t < 8.0) return { x: 960, y: 230, size: 300, op: 1 - prog(t * FPS, 7.6, 0.4) };
  if (t < 30.0) return null;
  if (t < 33.25) {
    const p = prog(t * FPS, 30.0, 0.5);
    return { x: 960, y: 520, size: mix(560, 700, p), op: p };
  }
  if (t < 45.0) {
    const p = prog(t * FPS, 33.25, 0.4);
    return p >= 1 ? null : { x: 960, y: 520, size: 700, op: 1 - p };
  }
  const p = prog(t * FPS, 45.0, 0.6);
  return { x: 960, y: 500, size: 520 * mix(0.9, 1, p), op: p };
};

const GlobalSpinner: React.FC = () => {
  const frame = useCurrentFrame();
  const s = spinnerState(frame / FPS);
  if (!s || s.op <= 0) return null;
  return (
    <div style={abs({ left: s.x - s.size / 2 - 20, top: s.y - s.size / 2 - 20 })}>
      <Spinner size={s.size} opacity={s.op} />
    </div>
  );
};

/* ══════════════ ٠–٣.٢ وقفة سريعة ══════════════ */
const PAUSE_SIZE = 140;
const PAUSE_WORDS = [
  { n: "وقفة", s: "وقــــــــفـــــة" },
  { n: "سريعة", s: "ســـــريـــــــعـــــة" },
];
const PAUSE_GAP = 44;

const KashidaWord: React.FC<{ n: string; s: string; at: number }> = ({ n, s, at }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 0.35); // بناء الكلمة
  const m = prog(frame, 0.8, 0.6); // Morph: عادي ← ممدود
  const wn = measure(n, PAUSE_SIZE);
  const ws = measure(s, PAUSE_SIZE);
  const text: React.CSSProperties = { position: "absolute", top: 0, left: "50%", whiteSpace: "nowrap", fontFamily: FONT, fontWeight: 700, fontSize: PAUSE_SIZE, lineHeight: 1.45, color: D.orange };
  return (
    <div style={{ position: "relative", width: mix(wn, ws, m), height: PAUSE_SIZE * 1.45, opacity: p, filter: `blur(${8 * (1 - p)}px)`, transform: `translateY(${12 * (1 - p)}px)` }}>
      <span style={{ ...text, opacity: 1 - m, transform: `translateX(-50%) scaleX(${mix(1, ws / wn, m)})` }}>{n}</span>
      <span style={{ ...text, opacity: m, transform: `translateX(-50%) scaleX(${mix(wn / ws, 1, m)})` }}>{s}</span>
    </div>
  );
};

const PauseSection: React.FC = () => {
  const frame = useCurrentFrame();
  const lineW = PAUSE_WORDS.reduce((a, w) => a + measure(w.s, PAUSE_SIZE), 0) + PAUSE_GAP + 60;
  // المستطيل: Wipe من اليمين 2.0–2.5، ثم يقصر ويصعد للدائرة 2.5–3.2
  const wipe = prog(frame, 2.0, 0.5);
  const morph = prog(frame, 2.5, 0.7);
  const barW = lineW * wipe * (1 - morph);
  const barRight = (W - lineW) / 2 + morph * (lineW / 2);
  const barTop = mix(540 + 6, 230, morph);
  return (
    <>
      <Exit at={2.5} style={abs({ top: 540 - (PAUSE_SIZE * 1.45) / 2, ...centerX })}>
        <div style={{ display: "flex", direction: "rtl", gap: PAUSE_GAP }}>
          {PAUSE_WORDS.map((w, i) => (
            <KashidaWord key={w.n} {...w} at={0.3 + i * 0.12} />
          ))}
        </div>
      </Exit>
      {wipe > 0 && morph < 1 && (
        <div style={abs({ top: barTop - 4, right: barRight, width: barW, height: 8, borderRadius: 4, background: D.strike, opacity: 1 - morph * 0.6 })} />
      )}
    </>
  );
};

/* ══════════════ ٣.٢–٨ الكوتش ══════════════ */
const LOGOS = [
  { src: "logos/moi.webp", name: "وزارة الداخلية" },
  { src: "logos/energy.webp", name: "وزارة الطاقة" },
  { src: "logos/jeddah-health.webp", name: "تجمع جدة الصحي" },
];

const CoachSection: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = prog(frame, 3.2, 0.6);
  return (
    <>
      <Exit at={7.6} style={abs({ top: 230 - 120, left: 960 - 120 })}>
        <div style={{ width: 240, height: 240, borderRadius: "50%", overflow: "hidden", clipPath: `circle(${reveal * 50}% at 50% 50%)`, transform: `scale(${mix(0.92, 1, reveal)})` }}>
          <Img src={img("img/coach.webp")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }} />
        </div>
      </Exit>
      <Exit at={7.6} style={abs({ top: 372, ...centerX })}>
        <Words words={["الكوتش", "عواطف"]} at={3.8} size={64} />
      </Exit>
      <Exit at={7.6} style={abs({ top: 464, ...centerX })}>
        <Words words={["شريك", "مؤسس", "لنخبة", "البوربوينت"]} at={4.05} size={32} weight={400} color={D.muted} />
      </Exit>
      <Exit at={7.6} style={abs({ top: 524, ...centerX })}>
        <Words words={["منذ"]} at={4.6} size={30} weight={400} color={D.muted} />
      </Exit>
      <Exit at={7.6} style={abs({ top: 822, ...centerX })}>
        <div style={{ display: "flex", direction: "rtl", gap: 28 }}>
          {LOGOS.map((l, i) => (
            <CardIn key={l.src} at={5.6 + i * 0.15} from={{ x: -40, y: 24 }}>
              <div style={{ ...card, width: 300, height: 176, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <Img src={img(l.src)} style={{ maxHeight: 104, maxWidth: 250, objectFit: "contain", mixBlendMode: "multiply" }} />
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: D.ink }}>{l.name}</div>
              </div>
            </CardIn>
          ))}
        </div>
      </Exit>
    </>
  );
};

// «2022»: عداد دوار رقم رقم، ثم يصغر وينتقل لمكان الكرت الأول في قسم الأرقام
const Year2022: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < 4.5 || t > 8.3) return null;
  const SIZE = 200;
  const bridge = prog(frame, 7.6, 0.4);
  const fade = 1 - lin(frame, 7.9, 0.3);
  const settle = interpolate(frame, [f(4.9), f(5.15), f(5.4)], [1, 1.04, 1], { ...CL, easing: Easing.out(Easing.cubic) });
  const x = mix(960, 1290, bridge);
  const y = mix(560 + 115, 512, bridge);
  return (
    <div style={abs({ left: x, top: y, transform: `translate(-50%, -50%) scale(${mix(1, 0.62, bridge) * settle})`, opacity: fade })}>
      <div dir="ltr" style={{ display: "flex", overflow: "hidden", fontFamily: FONT, fontWeight: 400, fontSize: SIZE, lineHeight: 1.12, padding: "0 10px" }}>
        {"2022".split("").map((d, i) => {
          const p = prog(frame, 4.6 + i * 0.08, 0.5);
          return (
            <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - p) * 100}%)`, opacity: p, background: D.gradNum, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {d}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ══════════════ ٨–١٢ الأرقام ══════════════ */
const Pill: React.FC<{ children: React.ReactNode; size?: number; icon?: React.ReactNode }> = ({ children, size = 30, icon }) => (
  <div style={{ ...card, borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 14, padding: `${size * 0.32}px ${size * 0.9}px`, fontFamily: FONT, fontWeight: 700, fontSize: size, color: D.ink, direction: "rtl", whiteSpace: "nowrap" }}>
    {icon ?? <span style={{ width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: G.orb, boxShadow: "0 0 0 6px rgba(246,134,22,0.14)" }} />}
    {children}
  </div>
);

const NumberCard: React.FC<{ to: number; countAt: number; countDur: number; label: string }> = ({ to, countAt, countDur, label }) => {
  const frame = useCurrentFrame();
  const t = prog(frame, countAt, countDur);
  const v = Math.round(to * t);
  const glow = frame >= f(countAt + countDur) ? 1 - lin(frame, countAt + countDur, 0.8) : 0;
  return (
    <div style={{ ...card, width: 600, padding: "44px 30px 40px", textAlign: "center", boxShadow: `0 12px 40px rgba(17,73,60,0.08), 0 0 ${90 * glow}px ${16 * glow}px rgba(246,134,22,${0.35 * glow})` }}>
      <div dir="ltr" style={{ fontFamily: FONT, fontWeight: 700, fontSize: 132, lineHeight: 1.15, fontVariantNumeric: "tabular-nums", background: D.gradNum, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
        +{v.toLocaleString("en-US")}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 36, color: D.muted, marginTop: 8 }}>{label}</div>
    </div>
  );
};

const NumbersSection: React.FC = () => (
  <>
    <Exit at={11.6} style={abs({ top: 190, ...centerX })}>
      <CardIn at={8.0}>
        <Pill>بالأرقام</Pill>
      </CardIn>
    </Exit>
    <Exit at={11.6} dy={300} style={abs({ top: 350, left: 990 })}>
      <CardIn at={8.0}>
        <NumberCard to={829} countAt={8.15} countDur={1.85} label="عرض وتقرير مصمّم" />
      </CardIn>
    </Exit>
    <Exit at={11.6} dy={300} style={abs({ top: 350, left: 330 })}>
      <CardIn at={10.2}>
        <NumberCard to={5000} countAt={10.35} countDur={1.05} label="متدرب" />
      </CardIn>
    </Exit>
  </>
);

/* ══════════════ ١٢–١٧ التقرير ══════════════ */
const ReportSlide: React.FC<{ font: string; scale?: number; bars?: number[]; title?: string }> = ({ font, scale = 1, bars = [1, 1, 1, 1, 1], title = "ملخص الأداء الربعي" }) => {
  const s = scale;
  const H = [0.45, 0.6, 0.52, 0.78, 0.95];
  return (
    <div style={{ width: 1040 * s, height: 585 * s, background: "#fff", borderRadius: 14 * s, overflow: "hidden", position: "relative", direction: "rtl", boxShadow: "0 0 0 1px rgba(17,73,60,0.08)" }}>
      <div style={abs({ top: 0, right: 0, left: 0, height: 8 * s, background: G.line })} />
      <div style={abs({ top: 44 * s, right: 56 * s, fontFamily: font, fontWeight: 700, fontSize: 60 * s, color: C.greenDeep, lineHeight: 1.4 })}>{title}</div>
      <div style={abs({ top: 140 * s, right: 56 * s, fontFamily: font, fontSize: 28 * s, color: C.textMuted })}>الربع الثالث · مقارنة بالمستهدف</div>
      <div style={abs({ top: 214 * s, right: 56 * s, display: "flex", gap: 22 * s })}>
        {[
          ["18%", "نمو الإيرادات"],
          ["92%", "نسبة الإنجاز"],
          ["4.8", "رضا العملاء"],
        ].map(([n, l]) => (
          <div key={l} style={{ width: 230 * s, padding: `${18 * s}px ${22 * s}px`, borderRadius: 16 * s, background: "#f6f3ee", border: `${2 * s}px solid rgba(17,73,60,0.08)` }}>
            <div dir="ltr" style={{ textAlign: "right", fontFamily: font, fontWeight: 700, fontSize: 50 * s, color: C.greenMid, lineHeight: 1.2 }}>{n}</div>
            <div style={{ fontFamily: font, fontSize: 24 * s, color: C.textMuted }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={abs({ left: 56 * s, bottom: 50 * s, display: "flex", alignItems: "flex-end", gap: 16 * s, height: 300 * s })}>
        {H.map((h, i) => (
          <div key={i} style={{ width: 38 * s, height: `${h * 100 * bars[i]}%`, borderRadius: 8 * s, background: i === 4 ? "linear-gradient(180deg,#f6a33a,#c46b12)" : "linear-gradient(180deg,#4a927f,#11493c)" }} />
        ))}
      </div>
      <div style={abs({ right: 56 * s, bottom: 56 * s, width: 560 * s, fontFamily: font, fontSize: 26 * s, lineHeight: 1.8, color: C.textMuted })}>
        • ارتفاع ملحوظ في المبيعات خلال الربع
        <br />• تحسن مؤشرات الرضا في جميع الفروع
      </div>
    </div>
  );
};

const THUMB = { w: 300, h: 169, gap: 18, left: 1500, top: 230 };
const thumbTop = (i: number) => THUMB.top + i * (THUMB.h + THUMB.gap);
const SELECT_AT = [14.9, 15.3, 15.7, 16.1];
const THUMB_TITLES = ["ملخص الأداء الربعي", "مؤشرات الإنجاز", "خطة المرحلة القادمة", "توزيع الميزانية"];

const ReportSection: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const enter = prog(frame, 11.6, 1.2);
  const pan = prog(frame, 12.8, 1.7);
  const flat = prog(frame, 14.5, 0.7);
  const tiltY = 18 * (1 - flat);
  const tiltX = 8 * (1 - flat);
  // الكاميرا: من العنوان (يمين) إلى الأعمدة (يسار تحت) مع زوم 115%، ثم ترجع وتفسح مكان المصغرات
  const camX = mix(mix(-170, 250, pan), -230, flat);
  const camY = mix(mix(20, -90, pan), 0, flat);
  const camS = mix(mix(0.9, 0.9 * 1.15, pan), 0.8, flat);
  const bars = [0, 1, 2, 3, 4].map((i) => prog(frame, 13.1 + i * 0.15, 0.6));
  const mainFont = t >= SELECT_AT[0] ? FONT : FONT_OLD;
  return (
    <>
      <Exit at={16.2} style={abs({ top: 60, ...centerX })}>
        <CardIn at={12.0}>
          <Pill
            size={34}
            icon={
              <span style={{ width: 46, height: 46, borderRadius: "50%", display: "grid", placeItems: "center", background: G.orb }}>
                <Icon name="zap" size={24} color="#fff" />
              </span>
            }
          >
            خطوة وحدة
          </Pill>
        </CardIn>
      </Exit>
      <Exit at={16.2} style={abs({ inset: 0 })}>
        <div style={abs({ inset: 0, perspective: 2200, display: "flex", alignItems: "center", justifyContent: "center" })}>
          <div
            style={{
              opacity: enter,
              transform: `translate(${camX}px, ${camY + (1 - enter) * 520}px) scale(${camS}) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
              boxShadow: "0 40px 90px -30px rgba(17,73,60,0.35)",
              borderRadius: 14,
            }}
          >
            <ReportSlide font={mainFont} bars={bars} />
          </div>
        </div>
        {/* المصغرات على اليمين */}
        {THUMB_TITLES.map((title, i) => {
          const p = prog(frame, 14.55 + i * 0.1, 0.5);
          return (
            <div key={i} style={abs({ left: THUMB.left, top: thumbTop(i), opacity: p, transform: `translateX(${(1 - p) * 60}px)`, ...card, padding: 0, borderRadius: 12, overflow: "hidden" })}>
              <ReportSlide font={t >= SELECT_AT[i] ? FONT : FONT_OLD} scale={THUMB.w / 1040} title={title} />
            </div>
          );
        })}
      </Exit>
      <Exit at={16.2} style={abs({ top: 975, ...centerX })}>
        <CardIn at={15.2}>
          <Pill size={30} icon={<span style={{ width: 40, height: 40, borderRadius: "50%", display: "grid", placeItems: "center", background: G.orb }}><Icon name="check" size={22} color="#fff" /></span>}>
            تغيّر الخط في كل الشرائح
          </Pill>
        </CardIn>
      </Exit>
    </>
  );
};

/* ══════════════ ١٧–٢٤ السيستم ══════════════ */
const STAGES = [
  { n: "01", t: "افهم", d: "تحدد هدف العرض، والجمهور، والرسالة اللي لازم توصل." },
  { n: "02", t: "رتّب", d: "تحوّل المعلومات المتفرقة إلى تسلسل واضح للشرائح." },
  { n: "03", t: "صمّم", d: "تبني الشريحة: وين تحط كل عنصر، والمسافات، والخطوط، والألوان." },
  { n: "04", t: "طوّر", d: "ترفع المستوى بالإنفوجرافيك والبيانات و Morph و Zoom." },
  { n: "05", t: "أخرج", d: "تجمع كل شيء وتسلّم عرض كامل لأي ملف تقرر تصممه." },
];
const SC = { w: 318, gap: 24, top: 410, h: 300 };
const stageLeft = (i: number) => (W + (5 * SC.w + 4 * SC.gap)) / 2 - SC.w - i * (SC.w + SC.gap);

// الإطار البرتقالي: يمر على المصغرات ثم يتحول لكرت المرحلة 01
const OrangeFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < SELECT_AT[0] - 0.05 || t > 18.9) return null;
  let idx = 0;
  SELECT_AT.forEach((s, i) => {
    if (t >= s) idx = i;
  });
  const step = prog(frame, SELECT_AT[idx], 0.3);
  const fromTop = idx === 0 ? thumbTop(0) : mix(thumbTop(idx - 1), thumbTop(idx), step);
  const appear = prog(frame, SELECT_AT[0], 0.25);
  const m = prog(frame, 16.2, 0.8);
  const x = mix(THUMB.left - 6, stageLeft(0), m);
  const y = mix(fromTop - 6, SC.top, m);
  const w = mix(THUMB.w + 12, SC.w, m);
  const h = mix(THUMB.h + 12, SC.h, m);
  const fade = 1 - lin(frame, 18.4, 0.5);
  return <div style={abs({ left: x, top: y, width: w, height: h, borderRadius: mix(14, 20, m), border: `${mix(5, 3, m)}px solid ${D.orange}`, opacity: appear * fade, boxShadow: "0 0 0 6px rgba(246,134,22,0.12)" })} />;
};

const StageCard: React.FC<{ s: (typeof STAGES)[number]; i: number }> = ({ s, i }) => (
  <CardIn at={18.4 + i * 0.35} from={{ x: -36, y: 24 }} style={abs({ left: stageLeft(i), top: SC.top })}>
    <div style={{ ...card, width: SC.w, height: SC.h, padding: "26px 26px 22px", direction: "rtl", fontFamily: FONT, display: "flex", flexDirection: "column", gap: 6 }}>
      <div dir="ltr" style={{ textAlign: "right", fontWeight: 700, fontSize: 44, lineHeight: 1.1, background: G.text, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{s.n}</div>
      <div style={{ fontWeight: 700, fontSize: 44, color: D.ink, lineHeight: 1.4 }}>{s.t}</div>
      <div style={{ fontWeight: 400, fontSize: 23, color: C.textMuted, lineHeight: 1.65 }}>{s.d}</div>
    </div>
  </CardIn>
);

const SystemSection: React.FC = () => {
  const frame = useCurrentFrame();
  const line = prog(frame, 18.4, 2.0);
  const squeeze = prog(frame, 21.4, 0.7);
  const arrow = prog(frame, 22.6, 0.7);
  const rowW = 5 * SC.w + 4 * SC.gap;
  return (
    <>
      <Exit at={21.4} style={abs({ top: 70, ...centerX })}>
        <CardIn at={17.0}>
          <Pill size={28}>السيستم</Pill>
        </CardIn>
      </Exit>
      <Exit at={21.4} style={abs({ top: 150, ...centerX })}>
        <Words words={["من", "ملف", "قديم", "إلى", "عرض", "احترافي"]} at={17.15} size={74} />
      </Exit>
      <Exit at={21.4} style={abs({ top: 258, ...centerX })}>
        <Words words={["في", { w: "5", key: true, delay: 0.25 }, "مراحل"]} at={17.85} size={74} />
      </Exit>
      <Exit at={23.75} style={abs({ inset: 0 })}>
        <div style={abs({ inset: 0, transformOrigin: "50% 0%", transform: `translateY(${-squeeze * 290}px) scale(${mix(1, 0.78, squeeze)})` })}>
          {/* خط الربط يرسم نفسه من اليمين لليسار */}
          <div style={abs({ top: SC.top + SC.h / 2, right: (W - rowW) / 2 + 40, width: (rowW - 80) * line, height: 3, borderRadius: 2, background: G.line, opacity: 0.6 })} />
          {STAGES.map((s, i) => (
            <StageCard key={s.n} s={s} i={i} />
          ))}
        </div>
      </Exit>
      <Exit at={21.4} style={abs({ top: 760, ...centerX })}>
        <Words words={["النتيجة:", "عرض", "كامل", "+", { w: "شهادة", color: D.orange }, { w: "إتمام", key: true }]} at={20.6} size={44} />
      </Exit>
      {/* قبل وبعد */}
      <Exit at={23.75} style={abs({ top: 440, ...centerX })}>
        <CardIn at={21.8}>
          <div style={{ ...card, position: "relative", display: "flex", direction: "rtl", alignItems: "center", gap: 120, padding: 26 }}>
            {[
              { src: "img/before-hajj-960.webp", pill: "قبل", cap: "الملف القديم" },
              { src: "img/poster-hajj.webp", pill: "بعد", cap: "ملخص مالي" },
            ].map((s, i) => (
              <div key={s.src} style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: 640, height: 360, borderRadius: 14, overflow: "hidden", boxShadow: "0 0 0 1px rgba(17,73,60,0.08)" }}>
                  <Img src={img(s.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span style={abs({ top: 14, right: 14, padding: "2px 20px 6px", borderRadius: 999, fontFamily: FONT, fontWeight: 700, fontSize: 24, color: i ? "#fff" : D.ink, background: i ? G.brandStrong : "rgba(255,255,255,0.92)" })}>{s.pill}</span>
                </div>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: D.ink, marginTop: 12 }}>{s.cap}</div>
              </div>
            ))}
            {/* السهم ينتقل من «قبل» إلى «بعد» */}
            <div style={abs({ top: 26 + 180 - 36, right: mix(26 + 640 - 36, 26 + 640 + 120 - 36, arrow), width: 72, height: 72, borderRadius: "50%", display: "grid", placeItems: "center", background: G.orb, boxShadow: "0 0 0 8px rgba(255,255,255,0.9), 0 14px 28px -10px rgba(17,73,60,0.5)", opacity: prog(frame, 22.4, 0.3) })}>
              <Icon name="arrow-left" size={34} color="#fff" />
            </div>
          </div>
        </CardIn>
      </Exit>
    </>
  );
};

/* ══════════════ ٢٤–٢٧ بدون ══════════════ */
const Strike: React.FC<{ words: string[]; at: number; strikeAt: number; top: number }> = ({ words, at, strikeAt, top }) => {
  const frame = useCurrentFrame();
  const SIZE = 104;
  const w = words.reduce((a, x) => a + measure(x, SIZE), 0) + (words.length - 1) * SIZE * 0.28 + 40;
  const p = prog(frame, strikeAt, 0.5);
  return (
    <div style={abs({ top, ...centerX })}>
      <div style={{ position: "relative" }}>
        <Words words={words} at={at} size={SIZE} color={p > 0.6 ? D.muted : D.ink} />
        <div style={abs({ top: "54%", right: -20, width: w * p, height: 5, borderRadius: 3, background: D.red })} />
      </div>
    </div>
  );
};

const WithoutSection: React.FC = () => (
  <Exit at={26.5} style={abs({ inset: 0 })}>
    <Strike words={["بدون", "انتظار", "مصمم"]} at={24.0} strikeAt={24.8} top={330} />
    <Strike words={["بدون", "ساعات", "ضايعة"]} at={25.3} strikeAt={25.95} top={520} />
  </Exit>
);

/* ══════════════ ٢٧–٣٠.٥ الآراء ══════════════ */
const REVIEWS = [
  { name: "خالد الشمري", avatar: "avatar-m", text: "الدورة فتحت عيني على أخطاء كنت أسويها من زمان بدون ما أدري، خصوصًا في اختيار الألوان وترتيب النقاط." },
  { name: "الجوهرة", avatar: "avatar-hijab", text: "استفدت كثير في طريقة ترتيب الأفكار وتحويلها إلى عرض احترافي. أسلوبك في الشرح واضح وسهل." },
  { name: "لمى القحطاني", avatar: "avatar-headphones", text: "ما توقعت الفرق يكون بهالحجم. غيّرت شكل شغلي كامل، صارت عروضي احترافية بشكل ثاني." },
  { name: "هيا الدوسري", avatar: "avatar-f", text: "صرت أعرف كيف أحول الجدول الممل إلى رسم بياني يفهمه أي حد من أول نظرة." },
  { name: "عبدالرحمن", avatar: "avatar-glasses", text: "من شخص منبوذ بالشركة إلى موظف السنة الناجح. اشتراكي بالبرنامج كان أفضل شي سويته." },
];
const STACK = [
  { x: 280, y: -110, r: -4 },
  { x: -300, y: -90, r: 4 },
  { x: 230, y: 130, r: 3 },
  { x: -250, y: 150, r: -3 },
  { x: 0, y: 10, r: -1.5 },
];

const Avatars: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div style={{ display: "flex", direction: "rtl", alignItems: "center", gap: 16, fontFamily: FONT, fontWeight: 700, fontSize: size * 0.6, color: D.muted }}>
    <div style={{ display: "flex" }}>
      {["avatar-hijab", "avatar-beard", "avatar-f", "avatar-glasses"].map((a, i) => (
        <Img key={a} src={img(`img/${a}.webp`)} style={{ width: size, height: size, borderRadius: "50%", border: "3px solid #fff", marginRight: i ? -size * 0.3 : 0, background: "#fff", boxShadow: "0 3px 10px rgba(17,73,60,0.15)" }} />
      ))}
    </div>
    <span>+5,000 متدرب</span>
  </div>
);

const RatingCard: React.FC<{ at: number; scale?: number }> = ({ at, scale = 1 }) => {
  const frame = useCurrentFrame();
  const v = prog(frame, at + 0.35, 0.65) * 4.95;
  return (
    <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 * scale, padding: `${34 * scale}px ${80 * scale}px ${38 * scale}px`, transform: `scale(${scale})` }}>
      <div style={{ display: "flex", gap: 10 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const p = prog(frame, at + 0.1 + i * 0.08, 0.35);
          return (
            <div key={i} style={{ position: "relative", width: 64, height: 64 }}>
              <div style={abs({ inset: 0, opacity: 0.18 })}>
                <Stars size={64} count={1} />
              </div>
              <div style={abs({ inset: 0, opacity: p, transform: `scale(${mix(0.6, 1, p)})` })}>
                <Stars size={64} count={1} />
              </div>
            </div>
          );
        })}
      </div>
      <div dir="ltr" style={{ fontFamily: FONT, fontWeight: 700, fontSize: 170, lineHeight: 1.15, background: D.gradNum, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontVariantNumeric: "tabular-nums" }}>
        {v.toFixed(2)}
      </div>
      <Avatars />
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  const frame = useCurrentFrame();
  const back = prog(frame, 29.0, 0.5);
  return (
    <>
      <Exit at={30.0} style={abs({ top: 50, ...centerX })}>
        <CardIn at={27.0}>
          <Pill size={32}>لا تاخذ بكلامي</Pill>
        </CardIn>
      </Exit>
      <Exit at={30.0} style={abs({ inset: 0 })}>
        <div style={abs({ inset: 0, transform: `scale(${mix(1, 0.9, back)})`, filter: `blur(${6 * back}px)`, opacity: mix(1, 0.5, back) })}>
          {REVIEWS.map((r, i) => (
            <div key={r.name} style={abs({ left: 960 + STACK[i].x - 360, top: 560 + STACK[i].y - 150 })}>
              <CardIn at={27.0 + i * 0.3}>
                <div style={{ ...card, width: 720, padding: "28px 36px 26px", direction: "rtl", transform: `rotate(${STACK[i].r}deg)` }}>
                  <Stars size={30} />
                  <div style={{ fontFamily: FONT, fontSize: 30, lineHeight: 1.7, color: D.ink, margin: "10px 0 16px" }}>{r.text}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <Img src={img(`img/${r.avatar}.webp`)} style={{ width: 60, height: 60, borderRadius: "50%", border: "3px solid #fff", boxShadow: "0 0 0 2px rgba(74,146,127,0.35)" }} />
                    <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: D.ink }}>{r.name}</span>
                  </div>
                </div>
              </CardIn>
            </div>
          ))}
        </div>
      </Exit>
      <Exit at={30.1} style={abs({ top: 520, left: 0, right: 0, display: "flex", justifyContent: "center", transform: "translateY(-50%)" })}>
        <CardIn at={29.0}>
          <RatingCard at={29.0} />
        </CardIn>
      </Exit>
    </>
  );
};

/* ══════════════ ٣٠.٥–٣٣.٥ الدفعة 7 ══════════════ */
const BATCH = { size: 170, sevenSize: 210, gap: 40, y: 470 };
const batchLayout = () => {
  const wA = measure("الدفعة", BATCH.size);
  const w7 = measure("7", BATCH.sevenSize, 400);
  const total = wA + BATCH.gap + w7;
  return { wA, w7, total, rightOfWord: (W + total) / 2, sevenCenterX: (W - total) / 2 + w7 / 2 };
};
// موقع الـ 7 في سؤال «وش تاخذ معك بالدفعة 7؟»
const Q = { size: 64, right: 200, top: 150, words: ["وش", "تاخذ", "معك", "بالدفعة"] };
const questionSevenX = () => {
  const gap = Q.size * 0.28;
  const wq = Q.words.reduce((a, x) => a + measure(x, Q.size), 0) + gap * (Q.words.length - 1);
  const w7 = measure("7", Q.size, 400);
  return W - Q.right - wq - gap - w7 / 2;
};

const BatchSection: React.FC = () => {
  const frame = useCurrentFrame();
  const L = batchLayout();
  const pulse = 0.5 + 0.5 * Math.sin((frame / FPS) * Math.PI * 2 * 0.9);
  return (
    <>
      <Exit at={33.25} style={abs({ top: BATCH.y - (BATCH.size * 1.45) / 2, right: W - L.rightOfWord })}>
        <Words words={[{ w: "الدفعة", color: D.orange }]} at={30.6} size={BATCH.size} />
      </Exit>
      <Exit at={33.25} style={abs({ top: 660, ...centerX })}>
        <div style={{ display: "flex", direction: "rtl", alignItems: "center", gap: 18 }}>
          <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#3fae7f", boxShadow: `0 0 0 ${4 + pulse * 8}px rgba(63,174,127,${0.35 - pulse * 0.25})`, opacity: prog(frame, 31.3, 0.35) }} />
          <Words words={["برنامج", "نخبة", "البوربوينت", "·", "التسجيل", "مفتوح"]} at={31.3} size={40} weight={700} />
        </div>
      </Exit>
    </>
  );
};

// «7»: يدخل آخر شي برفيع متدرج مع Overshoot، ثم ينتقل لسؤال قسم المميزات
const Seven: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < 30.8 || t > 37.7) return null;
  const L = batchLayout();
  const enter = prog(frame, 30.9, 0.5);
  const over = interpolate(frame, [f(30.9), f(31.2), f(31.4)], [0.92, 1.06, 1], { ...CL, easing: Easing.out(Easing.cubic) });
  const m = prog(frame, 33.4, 0.5);
  const x = mix(L.sevenCenterX, questionSevenX(), m);
  const y = mix(BATCH.y, Q.top + (Q.size * 1.45) / 2, m);
  const s = mix(1, Q.size / BATCH.sevenSize, m);
  const exit = prog(frame, 37.25, 0.4);
  return (
    <div style={abs({ left: x, top: y, transform: `translate(-50%, -50%) translateY(${-40 * exit}px) scale(${s * over})`, opacity: enter * (1 - exit), filter: exit > 0 ? `blur(${10 * exit}px)` : `blur(${8 * (1 - enter)}px)` })}>
      <span style={{ display: "block", fontFamily: FONT, fontWeight: 400, fontSize: BATCH.sevenSize, lineHeight: 1.2, background: D.gradNum, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>7</span>
    </div>
  );
};

/* ══════════════ ٣٣.٥–٣٧.٥ وش تاخذ معك ══════════════ */
const FEATURES = [
  { w: ["ملفات", "تطبيقية"], at: 34.2 },
  { w: ["وصول", "لمدة", "سنة", "كاملة"], at: 34.8 },
  { w: ["شهادة", "إتمام", "باسمك"], at: 35.4 },
];

const DrawCheck: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 0.4);
  const o = prog(frame, at - 0.1, 0.25);
  return (
    <div style={{ width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", background: G.orb, opacity: o, transform: `scale(${mix(0.8, 1, o)})`, boxShadow: "0 0 0 8px rgba(74,146,127,0.1), 0 12px 24px -10px rgba(17,73,60,0.5)" }}>
      <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      </svg>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const frame = useCurrentFrame();
  const cert = prog(frame, 34.6, 0.8);
  const float = Math.sin((frame / FPS) * 1.6) * 10;
  const gap = Q.size * 0.28;
  return (
    <>
      <Exit at={37.25} style={abs({ top: Q.top, right: Q.right })}>
        <div style={{ display: "flex", direction: "rtl", alignItems: "baseline", gap }}>
          <Words words={Q.words} at={33.55} size={Q.size} gap={gap} />
          <span style={{ width: measure("7", Q.size, 400) }} />
          <Words words={["؟"]} at={33.95} size={Q.size} />
        </div>
      </Exit>
      <Exit at={37.25} style={abs({ top: 300, right: Q.right })}>
        <div style={{ display: "flex", flexDirection: "column", gap: 36, direction: "rtl" }}>
          {FEATURES.map((it) => (
            <div key={it.at} style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <DrawCheck at={it.at} />
              <Words words={it.w} at={it.at + 0.2} size={56} style={{ justifyContent: "flex-start" }} />
            </div>
          ))}
        </div>
      </Exit>
      <Exit at={37.25} style={abs({ top: 300, left: 170, perspective: 1800 })}>
        <div style={{ opacity: cert, transform: `translateY(${(1 - cert) * 60 + float}px) rotateY(${mix(34, 16, cert)}deg) rotateX(${mix(10, 5, cert)}deg) rotateZ(-3deg)` }}>
          <div style={{ ...card, padding: 16 }}>
            <Img src={img("img/certificate.webp")} style={{ width: 620, borderRadius: 12, display: "block" }} />
          </div>
        </div>
      </Exit>
    </>
  );
};

/* ══════════════ ٣٧.٥–٣٩.٥ مجانية (Ghosting) ══════════════ */
const FreeSection: React.FC = () => {
  const frame = useCurrentFrame();
  const p = prog(frame, 37.5, 0.5);
  const GHOSTS = [
    { x: 90, y: -40, s: 1.18 },
    { x: -110, y: 30, s: 1.28 },
    { x: 60, y: 55, s: 0.86 },
    { x: -70, y: -60, s: 0.8 },
  ];
  const txt: React.CSSProperties = { fontFamily: FONT, fontWeight: 700, fontSize: 280, lineHeight: 1.4, color: D.orange, whiteSpace: "nowrap" };
  return (
    <Exit at={39.25} style={abs({ inset: 0, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <div style={{ position: "relative" }}>
        {GHOSTS.map((g, i) => (
          <span key={i} style={abs({ inset: 0, ...txt, opacity: 0.28 * (1 - p), transform: `translate(${g.x * (1 - p)}px, ${g.y * (1 - p)}px) scale(${mix(g.s, 1, p)})` })}>
            مجانية
          </span>
        ))}
        <span style={{ ...txt, display: "block", opacity: p, filter: `blur(${6 * (1 - p)}px)` }}>مجانية</span>
      </div>
    </Exit>
  );
};

/* ══════════════ ٣٩.٥–٤٥ الدعوة ══════════════ */
const CLICK = 41.0;
const CtaSection: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const press = interpolate(frame, [f(CLICK), f(CLICK + 0.08), f(CLICK + 0.3)], [1, 0.96, 1], { ...CL, easing: EASE });
  const ripple = lin(frame, CLICK, 0.7);
  const shineT = t >= CLICK ? ((t - CLICK) % 1.5) / 0.7 : -1;
  const move = prog(frame, 40.2, 0.75);
  const cx = mix(1500, 1000, move);
  const cy = mix(1060, 455, move);
  const bob = t >= 42.5 ? Math.abs(Math.sin((t - 42.5) * Math.PI * 1.4)) * 18 : 0;
  return (
    <Exit at={44.75} style={abs({ inset: 0 })}>
      <div style={abs({ top: 360, ...centerX })}>
        <CardIn at={39.5}>
          <div style={{ position: "relative", transform: `scale(${press})` }}>
            {t >= CLICK && <div style={abs({ inset: -12, borderRadius: 48, border: `${6 * (1 - ripple)}px solid rgba(246,134,22,${1 - ripple})`, transform: `scale(${1 + ripple * 0.3})` })} />}
            <div style={{ position: "relative", overflow: "hidden", padding: "34px 110px 40px", borderRadius: 40, background: G.brand, color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 76, lineHeight: 1.3, boxShadow: "0 24px 50px -16px rgba(17,73,60,0.45), 0 14px 36px -12px rgba(196,107,18,0.45), inset 0 2px 0 rgba(255,255,255,0.28)" }}>
              {shineT >= 0 && shineT <= 1 && (
                <div style={abs({ inset: 0, background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)", transform: `translateX(${mix(120, -120, shineT)}%)` })} />
              )}
              <span style={{ position: "relative" }}>احجز مقعدك</span>
            </div>
          </div>
        </CardIn>
      </div>
      <div style={abs({ top: 570, ...centerX })}>
        <CardIn at={39.65}>
          <Avatars size={56} />
        </CardIn>
      </div>
      <div style={abs({ top: 690, ...centerX })}>
        <CardIn at={42.5}>
          <div style={{ display: "flex", direction: "rtl", alignItems: "center", gap: 18 }}>
            <Pill size={34}>الرابط في وصف الحلقة</Pill>
            <div style={{ width: 66, height: 66, borderRadius: "50%", display: "grid", placeItems: "center", background: G.orb, transform: `translateY(${bob}px)` }}>
              <Icon name="arrow-down" size={34} color="#fff" />
            </div>
          </div>
        </CardIn>
      </div>
      {t >= 40.15 && (
        <svg width={64} height={64} viewBox="0 0 24 24" style={abs({ left: cx, top: cy, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))", transform: `scale(${press < 1 ? 0.88 : 1})`, transformOrigin: "0 0", opacity: prog(frame, 40.15, 0.2) })}>
          <path d="M4 2.5 20 12l-7 1.6L9.4 21z" fill="#fff" stroke={D.ink} strokeWidth={1.6} strokeLinejoin="round" />
        </svg>
      )}
    </Exit>
  );
};

/* ══════════════ ٤٥–٤٨ الختام ══════════════ */
const OutroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const logo = prog(frame, 45.25, 0.8);
  const fl = (k: number) => Math.sin(t * 1.4 + k) * 12;
  const minis = [
    { at: 45.5, style: { left: 110, top: 110 }, r: -7, el: <ReportSlide font={FONT} scale={0.34} /> },
    { at: 45.65, style: { right: 120, top: 150 }, r: 6, el: <div style={{ ...card, padding: "18px 40px 22px", fontFamily: FONT, fontWeight: 700, fontSize: 64, color: D.orange, direction: "rtl" }}>الدفعة <span style={{ fontWeight: 400, background: D.gradNum, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>7</span></div> },
    { at: 45.8, style: { right: 170, bottom: 120 }, r: -5, el: <div style={{ transform: "scale(0.42)", transformOrigin: "100% 100%" }}><RatingCard at={-10} /></div> },
  ];
  return (
    <>
      <div style={abs({ left: 960, top: 500, transform: `translate(-50%, -50%) scale(${mix(0.6, 1, logo)})`, opacity: logo })}>
        <Img src={img("img/logo-180.png")} style={{ width: 180, height: 180, borderRadius: 44, boxShadow: "0 24px 50px -18px rgba(17,73,60,0.5)" }} />
      </div>
      {minis.map((m, i) => {
        const p = prog(frame, m.at, 0.5);
        return (
          <div key={i} style={abs({ ...m.style, opacity: p, transform: `translateY(${(1 - p) * 24 + fl(i * 2)}px) scale(${mix(0.92, 1, p)}) rotate(${m.r}deg)` })}>
            <div style={{ ...card, padding: i === 0 ? 10 : 0, borderRadius: 20, background: i === 0 ? "rgba(255,255,255,0.85)" : "transparent", border: i === 0 ? card.border : "none", boxShadow: i === 0 ? card.boxShadow : "none" }}>{m.el}</div>
          </div>
        );
      })}
    </>
  );
};

/* ══════════════ الأصوات ══════════════ */
const SFX = {
  scratch: { src: "record-scratch.mp3", lead: 36, vol: 0.55 },
  softPop: { src: "soft-pop.mp3", lead: 53, vol: 0.55 },
  tick: { src: "counter-tick.mp3", lead: 0, vol: 0.14 },
  ding: { src: "ding.mp3", lead: 47, vol: 0.4 },
  whoosh: { src: "whoosh.mp3", lead: 132, vol: 0.55 },
  click: { src: "soft-click.mp3", lead: 0, vol: 0.9 },
  strike: { src: "marker-strike.mp3", lead: 13, vol: 0.5 },
  sparkle: { src: "sparkle.mp3", lead: 1, vol: 0.9 },
  impact: { src: "soft-impact.mp3", lead: 61, vol: 0.75 },
  check: { src: "check.mp3", lead: 100, vol: 0.7 },
  popBright: { src: "pop-bright.mp3", lead: 46, vol: 0.85 },
  mouse: { src: "mouse-click.mp3", lead: 189, vol: 0.9 },
} as const;
type Cue = [keyof typeof SFX, number];
const every = (from: number, to: number, step: number) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
const CUES: Cue[] = [
  ["scratch", 0.3],
  ["softPop", 3.25],
  ...[0, 1, 2].map((i): Cue => ["softPop", 5.65 + i * 0.15]),
  ...every(8.2, 9.9, 0.1).map((s): Cue => ["tick", s]),
  ["ding", 10.0],
  ...every(10.4, 11.3, 0.1).map((s): Cue => ["tick", s]),
  ["ding", 11.4],
  ["whoosh", 11.75],
  ["whoosh", 14.85],
  ...[0, 1, 2, 3, 4].map((i): Cue => ["click", 18.45 + i * 0.35]),
  ["strike", 24.8],
  ["strike", 25.95],
  ...[0, 1, 2, 3, 4].map((i): Cue => ["softPop", 27.05 + i * 0.3]),
  ["sparkle", 29.1],
  ["impact", 31.0],
  ...FEATURES.map((it): Cue => ["check", it.at]),
  ["popBright", 37.55],
  ["mouse", CLICK],
  ["whoosh", 45.0],
];

const Sfx: React.FC = () => (
  <>
    {CUES.map(([k, sec], i) => {
      const s = SFX[k];
      const from = Math.max(0, f(sec) - Math.round((s.lead / 1000) * FPS));
      return (
        <Sequence key={i} from={from} durationInFrames={45} layout="none">
          <Html5Audio src={staticFile(`sfx/${s.src}`)} volume={s.vol} />
        </Sequence>
      );
    })}
  </>
);

/* ══════════════ التركيب ══════════════ */
export const Batch7: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT }}>
    <DubBg />
    <GlobalSpinner />
    <Section from={0} to={3.2}>
      <PauseSection />
    </Section>
    <Section from={3.2} to={8.0}>
      <CoachSection />
    </Section>
    <Year2022 />
    <Section from={8.0} to={12.0}>
      <NumbersSection />
    </Section>
    <Section from={11.6} to={17.0}>
      <ReportSection />
    </Section>
    <OrangeFrame />
    <Section from={17.0} to={24.0}>
      <SystemSection />
    </Section>
    <Section from={24.0} to={27.0}>
      <WithoutSection />
    </Section>
    <Section from={27.0} to={30.5}>
      <ReviewsSection />
    </Section>
    <Section from={30.5} to={33.5}>
      <BatchSection />
    </Section>
    <Seven />
    <Section from={33.5} to={37.5}>
      <FeaturesSection />
    </Section>
    <Section from={37.5} to={39.5}>
      <FreeSection />
    </Section>
    <Section from={39.5} to={45.0}>
      <CtaSection />
    </Section>
    <Section from={45.0} to={48.0}>
      <OutroSection />
    </Section>
    <Sfx />
  </AbsoluteFill>
);
