// اللقطات الاثنتا عشرة — كل لقطة تبدأ من إطارها المحلي ٠
import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, FONT_OLD, G, SH, img } from "./brand";
import { BrandMark, Button, DarkBg, Glass, GradText, Icon, Label, Orb, PageBg, Proof, Stars, clamp, easeOut, usePop } from "./ui";

const rtl: React.CSSProperties = { direction: "rtl", fontFamily: FONT };

// اهتزاز متناقص
const shake = (frame: number, start: number, strength: number, decay = 12) => {
  const t = frame - start;
  if (t < 0) return { x: 0, y: 0 };
  const k = Math.max(0, 1 - t / decay);
  return { x: Math.sin(t * 2.7) * strength * k, y: Math.cos(t * 3.3) * strength * 0.6 * k };
};

/* ───────────── ٠–٢ وقفة سريعة ───────────── */
export const PauseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pop = usePop(2, { damping: 9, stiffness: 220, mass: 0.7 });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  const s = shake(frame, 2, 16, 14);
  const flash = interpolate(frame, [0, 1, 7], [0, 0.85, 0], clamp);
  return (
    <AbsoluteFill style={{ ...rtl, alignItems: "center", paddingTop: 96 }}>
      <div style={{ opacity: Math.min(1, pop * 3) * out, transform: `translate(${s.x}px, ${s.y}px) scale(${interpolate(pop, [0, 1], [0.5, 1]) * interpolate(out, [0, 1], [0.9, 1])}) rotate(${interpolate(pop, [0, 1], [-5, 0])}deg)` }}>
        <Glass strong gradBorder radius={60} style={{ display: "flex", alignItems: "center", gap: 44, padding: "26px 64px 26px 40px" }}>
          <GradText gradient={G.orangeText} style={{ fontWeight: 700, fontSize: 150, lineHeight: 1.35 }}>
            وقفة سريعة
          </GradText>
          <Orb size={140} style={{ transform: `scale(${usePop(8, { damping: 8, stiffness: 260 })})` }}>
            <Icon name="pause" size={64} color="#fff" />
          </Orb>
        </Glass>
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};

/* ───────────── ٢–٨ التعريف + شعارات الجهات ───────────── */
const LOGOS = [
  { src: "logos/moi.webp", name: "وزارة الداخلية", at: 40 },
  { src: "logos/energy.webp", name: "وزارة الطاقة", at: 85 },
  { src: "logos/jeddah-health.webp", name: "تجمع جدة الصحي", at: 130 },
];

const LogoTile: React.FC<{ src: string; name: string; at: number }> = ({ src, name, at }) => {
  const p = usePop(at, { damping: 10, stiffness: 240, mass: 0.7 });
  return (
    <div style={{ opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 40}px) scale(${interpolate(p, [0, 1], [0.4, 1])})` }}>
      <Glass strong gradBorder radius={36} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "26px 34px 18px", minWidth: 270 }}>
        <div style={{ height: 130, display: "grid", placeItems: "center" }}>
          <Img src={img(src)} style={{ maxHeight: 130, maxWidth: 300, objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 28, color: C.greenDeep }}>{name}</div>
      </Glass>
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const lt = usePop(8, { damping: 15, stiffness: 140 });
  const chip = usePop(26, { damping: 9, stiffness: 240 });
  const out = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ ...rtl, opacity: out }}>
      {/* الشعارات — أعلى المنتصف، تظهر واحدًا واحدًا */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 32 }}>
        {LOGOS.map((l) => (
          <LogoTile key={l.src} {...l} />
        ))}
      </div>

      {/* Lower third */}
      <div style={{ position: "absolute", right: 90, bottom: 90, transform: `translateX(${(1 - lt) * 700}px)`, opacity: lt }}>
        <Glass strong gradBorder radius={48} style={{ display: "flex", alignItems: "center", gap: 32, padding: "26px 30px 26px 56px" }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", overflow: "hidden", border: "5px solid #fff", boxShadow: "0 0 0 4px rgba(74,146,127,0.35), 0 18px 34px -14px rgba(17,73,60,0.5)" }}>
            <Img src={img("img/coach.webp")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <span style={{ fontWeight: 700, fontSize: 76, lineHeight: 1.3, color: C.greenDeep }}>الكوتش عواطف</span>
              <span
                style={{
                  transform: `scale(${chip}) rotate(-3deg)`,
                  display: "inline-block",
                  padding: "6px 22px 10px",
                  borderRadius: 18,
                  background: G.brandStrong,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 34,
                  boxShadow: "0 18px 34px -14px rgba(17,73,60,0.55), inset 0 2px 0 rgba(255,255,255,0.3)",
                }}
              >
                منذ 2022
              </span>
            </div>
            <div style={{ fontSize: 32, color: C.textMuted, marginTop: 2 }}>شريك مؤسس لنخبة البوربوينت</div>
            <div style={{ height: 5, width: `${easeOut(interpolate(frame, [20, 44], [0, 1], clamp)) * 100}%`, borderRadius: 4, background: G.line, marginTop: 14 }} />
          </div>
        </Glass>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── ٨–١٢ عدّاد الأرقام ───────────── */
const Counter: React.FC<{ to: number; start: number; dur: number; label: string }> = ({ to, start, dur, label }) => {
  const frame = useCurrentFrame();
  const appear = usePop(start - 6, { damping: 14 });
  const t = interpolate(frame, [start, start + dur], [0, 1], clamp);
  const value = Math.round(to * (1 - Math.pow(1 - t, 2.4)));
  const done = frame >= start + dur;
  const ding = usePop(start + dur, { damping: 7, stiffness: 300 });
  const glow = done ? interpolate(frame, [start + dur, start + dur + 18], [1, 0.25], clamp) : 0;
  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${(1 - appear) * 60}px) scale(${done ? interpolate(ding, [0, 1], [1.08, 1]) : 1})`,
        width: 700,
        padding: "56px 40px 46px",
        borderRadius: 56,
        textAlign: "center",
        background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
        border: "2px solid rgba(240,229,212,0.22)",
        boxShadow: `inset 0 2px 0 rgba(255,255,255,0.12), 0 40px 90px -40px rgba(0,0,0,0.6), 0 0 ${120 * glow}px ${20 * glow}px rgba(246,134,22,${0.35 * glow})`,
      }}
    >
      <div dir="ltr" style={{ fontFamily: FONT, fontWeight: 700, fontSize: 168, lineHeight: 1.15, color: C.ivory, fontVariantNumeric: "tabular-nums", textShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
        +{value.toLocaleString("en-US")}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color: C.sand, marginTop: 12 }}>{label}</div>
    </div>
  );
};

export const CounterScene: React.FC = () => {
  const head = usePop(0, { damping: 16 });
  return (
    <AbsoluteFill style={rtl}>
      <DarkBg />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 70 }}>
        <div style={{ opacity: head, display: "flex", alignItems: "center", gap: 18, fontWeight: 700, fontSize: 34, color: C.ivory, padding: "12px 34px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(240,229,212,0.2)" }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: G.orb, boxShadow: "0 0 0 8px rgba(246,134,22,0.2)" }} />
          بالأرقام
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          <Counter to={829} start={8} dur={42} label="عرض وتقرير مصمّم" />
          <Counter to={5000} start={62} dur={40} label="متدرب" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ───────────── ١٢–١٨ تغيير الخط بخطوة وحدة ───────────── */
const SlideMock: React.FC<{ font: string; scale?: number; variant?: number }> = ({ font, scale = 1, variant = 0 }) => {
  const titles = ["ملخص الأداء الربعي", "مؤشرات الإنجاز", "خطة المرحلة القادمة", "توزيع الميزانية"];
  const W = 1040 * scale;
  return (
    <div style={{ width: W, height: W * 0.5625, background: "#fff", borderRadius: 10 * scale, overflow: "hidden", position: "relative", direction: "rtl", boxShadow: "0 0 0 2px rgba(17,73,60,0.08)" }}>
      <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 8 * scale, background: G.line }} />
      <div style={{ position: "absolute", top: 44 * scale, right: 56 * scale, fontFamily: font, fontWeight: 700, fontSize: 60 * scale, color: C.greenDeep, lineHeight: 1.4 }}>{titles[variant % 4]}</div>
      <div style={{ position: "absolute", top: 140 * scale, right: 56 * scale, fontFamily: font, fontSize: 28 * scale, color: C.textMuted }}>الربع الثالث · مقارنة بالمستهدف</div>
      <div style={{ position: "absolute", top: 214 * scale, right: 56 * scale, display: "flex", gap: 22 * scale }}>
        {[
          ["18%", "نمو الإيرادات"],
          ["92%", "نسبة الإنجاز"],
          ["4.8", "رضا العملاء"],
        ].map(([n, l]) => (
          <div key={l} style={{ width: 230 * scale, padding: `${18 * scale}px ${22 * scale}px`, borderRadius: 16 * scale, background: "#f6f3ee", border: `${2 * scale}px solid rgba(17,73,60,0.08)` }}>
            <div dir="ltr" style={{ textAlign: "right", fontFamily: font, fontWeight: 700, fontSize: 50 * scale, color: C.greenMid, lineHeight: 1.2 }}>{n}</div>
            <div style={{ fontFamily: font, fontSize: 24 * scale, color: C.textMuted }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 56 * scale, bottom: 50 * scale, display: "flex", alignItems: "flex-end", gap: 16 * scale, height: 300 * scale }}>
        {[0.45, 0.6, 0.52, 0.78, 0.95].map((h, i) => (
          <div key={i} style={{ width: 38 * scale, height: `${h * 100}%`, borderRadius: 8 * scale, background: i === 4 ? "linear-gradient(180deg,#f6a33a,#c46b12)" : "linear-gradient(180deg,#4a927f,#11493c)" }} />
        ))}
      </div>
      <div style={{ position: "absolute", right: 56 * scale, bottom: 56 * scale, width: 560 * scale, fontFamily: font, fontSize: 26 * scale, lineHeight: 1.8, color: C.textMuted }}>
        • ارتفاع ملحوظ في المبيعات خلال الربع
        <br />• تحسن مؤشرات الرضا في جميع الفروع
      </div>
    </div>
  );
};

export const PptWindow: React.FC<{ font: string; glare?: number }> = ({ font, glare = -1 }) => (
  <Glass strong gradBorder radius={40} style={{ padding: 22, width: 1560 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 12px 18px", direction: "ltr" }}>
      {["#f26b5b", "#f6bd3b", "#4fc26b"].map((c) => (
        <span key={c} style={{ width: 18, height: 18, borderRadius: "50%", background: c }} />
      ))}
      <span style={{ marginLeft: 22, fontFamily: FONT, fontWeight: 700, fontSize: 24, color: C.textMuted }}>تقرير-الأداء.pptx</span>
    </div>
    <div style={{ display: "flex", gap: 22, direction: "rtl", position: "relative", overflow: "hidden", borderRadius: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 14, borderRadius: 18, background: "rgba(17,73,60,0.05)" }}>
        {[0, 1, 2, 3].map((v) => (
          <div key={v} style={{ borderRadius: 8, boxShadow: v === 0 ? `0 0 0 4px ${C.orange}` : "none" }}>
            <SlideMock font={font} scale={0.3} variant={v} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", placeItems: "center", flex: 1, background: "rgba(17,73,60,0.05)", borderRadius: 18 }}>
        <SlideMock font={font} scale={1.1} />
      </div>
      {glare >= 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.95) 48%, rgba(246,134,22,0.25) 52%, transparent 70%)",
            transform: `translateX(${interpolate(glare, [0, 1], [110, -110])}%)`,
          }}
        />
      )}
    </div>
  </Glass>
);

export const FontScene: React.FC = () => {
  const frame = useCurrentFrame();
  const SWITCH = 84; // لحظة «بخطوة وحدة»
  const label = usePop(4, { damping: 11 });
  const win = usePop(0, { damping: 16, stiffness: 120 });
  const glare = interpolate(frame, [SWITCH - 8, SWITCH + 8], [0, 1], clamp);
  const toast = usePop(SWITCH + 10, { damping: 11 });
  const font = frame < SWITCH ? FONT_OLD : FONT;
  return (
    <AbsoluteFill style={rtl}>
      <PageBg />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: `scale(${interpolate(win, [0, 1], [0.92, 0.94])}) translateY(${(1 - win) * 60 + 40}px)`, opacity: win }}>
          <PptWindow font={font} glare={frame >= SWITCH - 8 && frame <= SWITCH + 8 ? glare : -1} />
        </div>
      </AbsoluteFill>
      {/* «خطوة وحدة ⚡» */}
      <div style={{ position: "absolute", top: 34, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `translateY(${(1 - label) * -40}px)`, opacity: label }}>
        <Glass strong gradBorder radius={999} style={{ display: "flex", alignItems: "center", gap: 18, padding: "10px 16px 10px 40px" }}>
          <Orb size={64}>
            <Icon name="zap" size={30} color="#fff" />
          </Orb>
          <GradText style={{ fontWeight: 700, fontSize: 46, lineHeight: 1.4 }}>خطوة وحدة</GradText>
        </Glass>
      </div>
      {/* تأكيد بعد التغيير */}
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: toast, transform: `translateY(${(1 - toast) * 40}px)` }}>
        <Glass strong radius={999} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 34px 12px 16px", fontWeight: 700, fontSize: 32, color: C.greenDeep }}>
          <Orb size={50}>
            <Icon name="check" size={26} color="#fff" />
          </Orb>
          تغيّر الخط في كل الشرائح
        </Glass>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── ١٨–٢٣ السيستم: ٥ مراحل + قبل/بعد ───────────── */
const STAGES = ["افهم", "رتّب", "صمّم", "طوّر", "أخرج"];
const STAGE_AT = [8, 22, 36, 50, 64];
const ANY_FILE = 84; // «أي ملف»

const StageNode: React.FC<{ i: number; name: string }> = ({ i, name }) => {
  const frame = useCurrentFrame();
  const on = usePop(STAGE_AT[i], { damping: 9, stiffness: 260 });
  const active = frame >= STAGE_AT[i];
  return (
    <div style={{ transform: `scale(${active ? interpolate(on, [0, 1], [0.85, 1]) : 0.92})`, position: "relative", zIndex: 1 }}>
      <div
        style={{
          width: 230,
          padding: "20px 0 22px",
          borderRadius: 34,
          textAlign: "center",
          background: active ? "linear-gradient(145deg, #f6a33a 0%, #e07a15 55%, #c46b12 100%)" : G.glassStrong,
          border: "2px solid rgba(255,255,255,0.9)",
          boxShadow: active ? "0 24px 48px -18px rgba(196,107,18,0.65), inset 0 2px 0 rgba(255,255,255,0.35)" : SH.glass,
        }}
      >
        <div dir="ltr" style={{ fontWeight: 700, fontSize: 36, lineHeight: 1.2, color: active ? "rgba(255,255,255,0.85)" : C.greenLight }}>0{i + 1}</div>
        <div style={{ fontWeight: 700, fontSize: 56, lineHeight: 1.35, color: active ? "#fff" : C.greenDeep }}>{name}</div>
      </div>
    </div>
  );
};

export const SystemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const title = usePop(0, { damping: 14 });
  const fill = interpolate(frame, [STAGE_AT[0], STAGE_AT[4]], [0, 1], clamp);
  const ba = usePop(ANY_FILE, { damping: 14, stiffness: 140 });
  const lift = interpolate(ba, [0, 1], [170, 0]);
  return (
    <AbsoluteFill style={rtl}>
      <PageBg />
      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center", opacity: title, transform: `translateY(${(1 - title) * 30 + lift * 0.5}px)` }}>
        <span style={{ fontWeight: 700, fontSize: 84, color: C.greenDeep, lineHeight: 1.4 }}>سيستم كامل من </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 14,
            padding: "0 34px 8px",
            borderRadius: 34,
            background: G.brandStrong,
            color: "#fff",
            fontWeight: 700,
            fontSize: 84,
            transform: "rotate(-2deg)",
            boxShadow: "0 28px 60px -24px rgba(17,73,60,0.55), 0 16px 40px -20px rgba(196,107,18,0.5), inset 0 2px 0 rgba(255,255,255,0.3)",
          }}
        >
          <b style={{ fontSize: 110, lineHeight: 1.1 }}>5</b> مراحل
        </span>
      </div>

      {/* الخط الزمني الأفقي — يبدأ من اليمين */}
      <div style={{ position: "absolute", top: 260 + lift, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ position: "absolute", top: "50%", right: 115, left: 115, height: 8, marginTop: -4, borderRadius: 4, background: "linear-gradient(to left, rgba(74,146,127,0.28), rgba(246,134,22,0.28))" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: `${fill * 100}%`, borderRadius: 4, background: G.line }} />
          </div>
          {STAGES.map((s, i) => (
            <React.Fragment key={s}>
              <StageNode i={i} name={s} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* قبل وبعد — مع «أي ملف» */}
      <div style={{ position: "absolute", top: 500, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: ba, transform: `translateY(${(1 - ba) * 200}px)` }}>
        <Glass strong gradBorder radius={44} style={{ display: "flex", alignItems: "center", gap: 30, padding: 26 }}>
          {[
            { src: "img/before-hajj-960.webp", pill: "قبل", w: 600, before: true },
            { src: "img/poster-hajj.webp", pill: "بعد", w: 820, before: false },
          ].map((s, i) => (
            <React.Fragment key={s.src}>
              {i === 1 && (
                <Orb size={86} style={{ boxShadow: "0 0 0 10px rgba(255,255,255,0.85), 0 16px 32px -12px rgba(17,73,60,0.5)" }}>
                  <Icon name="arrow-left" size={40} color="#fff" />
                </Orb>
              )}
              <div style={{ position: "relative", width: s.w, aspectRatio: "16 / 9", borderRadius: 26, overflow: "hidden", boxShadow: "0 0 0 2px rgba(17,73,60,0.08), 0 20px 48px -28px rgba(17,73,60,0.4)" }}>
                <Img src={img(s.src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: s.before ? "saturate(0.85)" : "none" }} />
                <span
                  style={{
                    position: "absolute",
                    top: 18,
                    ...(s.before ? { right: 18 } : { left: 18 }),
                    padding: "4px 24px 8px",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 28,
                    color: s.before ? C.greenDeep : "#fff",
                    background: s.before ? "rgba(255,255,255,0.92)" : G.brandStrong,
                    boxShadow: "0 12px 28px -12px rgba(0,0,0,0.4)",
                  }}
                >
                  {s.pill}
                </span>
              </div>
            </React.Fragment>
          ))}
        </Glass>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── ٢٣–٢٦ بدون انتظار / بدون ساعات — شطب أحمر ───────────── */
const Struck: React.FC<{ text: string; at: number; strikeAt: number }> = ({ text, at, strikeAt }) => {
  const frame = useCurrentFrame();
  const p = usePop(at, { damping: 11, stiffness: 220 });
  const strike = easeOut(interpolate(frame, [strikeAt, strikeAt + 8], [0, 1], clamp));
  const s = shake(frame, strikeAt + 6, 8, 10);
  return (
    <div style={{ opacity: Math.min(1, p * 2), transform: `translate(${s.x}px, ${s.y + (1 - p) * -40}px) scale(${interpolate(p, [0, 1], [0.6, 1])})` }}>
      <Glass strong radius={999} style={{ display: "flex", alignItems: "center", gap: 22, padding: "14px 50px 18px 24px" }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(180,35,24,0.07)", boxShadow: "inset 0 0 0 3px rgba(180,35,24,0.2)" }}>
          <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth={2.6} strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </div>
        <div style={{ position: "relative", fontWeight: 700, fontSize: 72, lineHeight: 1.45, color: strike > 0.5 ? "#7d8a85" : C.greenDeep }}>
          {text}
          <div style={{ position: "absolute", top: "54%", right: -10, height: 10, borderRadius: 6, width: `calc(${strike * 100}% + 20px)`, background: C.red, transform: "rotate(-2deg)", boxShadow: "0 4px 10px rgba(180,35,24,0.35)" }} />
        </div>
      </Glass>
    </div>
  );
};

export const StrikeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ ...rtl, alignItems: "center", paddingTop: 80, gap: 30, opacity: out }}>
      <Struck text="بدون انتظار مصمم" at={2} strikeAt={18} />
      <Struck text="بدون ساعات ضايعة" at={40} strikeAt={56} />
    </AbsoluteFill>
  );
};

/* ───────────── ٢٦–٢٩ آراء المتدربين ───────────── */
const REVIEWS = [
  { name: "خالد الشمري", avatar: "avatar-m", text: "الدورة فتحت عيني على أخطاء كنت أسويها من زمان بدون ما أدري، خصوصًا في اختيار الألوان وترتيب النقاط." },
  { name: "الجوهرة", avatar: "avatar-hijab", text: "استفدت منك كثير، خصوصًا في طريقة ترتيب الأفكار وتحويلها إلى عرض احترافي. أسلوبك في الشرح واضح وسهل." },
  { name: "لمى القحطاني", role: "Content Creator", avatar: "avatar-headphones", text: "ما توقعت الفرق يكون بهالحجم. غيّرت شكل شغلي كامل، صارت عروضي احترافية بشكل ثاني." },
  { name: "أدهم", avatar: "avatar-cap", text: "أكثر شيء أعجبني إن كل معلومة كانت مرتبطة بتطبيق فعلي، وهذا ساعدني كثير في تطوير مستوى عروضي." },
  { name: "هيا الدوسري", avatar: "avatar-f", text: "صرت أعرف كيف أحول الجدول الممل إلى رسم بياني يفهمه أي حد من أول نظرة." },
  { name: "عبدالرحمن", role: "إداري", avatar: "avatar-glasses", text: "من شخص منبوذ بالشركة إلى موظف السنة الناجح. اشتراكي بالبرنامج كان أفضل شي سويته بحق نفسي." },
];
const CARD_EVERY = 11;
const LAYOUT = [
  { x: 330, y: -150, r: -5 },
  { x: -340, y: -120, r: 4 },
  { x: 260, y: 140, r: 3 },
  { x: -300, y: 150, r: -4 },
  { x: 40, y: -20, r: -2 },
  { x: -30, y: 40, r: 2 },
];

const ReviewCard: React.FC<{ r: (typeof REVIEWS)[number]; i: number }> = ({ r, i }) => {
  const p = usePop(i * CARD_EVERY, { damping: 13, stiffness: 260 });
  const L = LAYOUT[i];
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", opacity: Math.min(1, p * 3), transform: `translate(-50%, -50%) translate(${L.x}px, ${L.y}px) rotate(${L.r}deg) scale(${interpolate(p, [0, 1], [1.35, 1])})` }}>
      <Glass strong gradBorder radius={40} style={{ width: 760, padding: "34px 44px 30px" }}>
        <Stars size={36} />
        <div style={{ fontSize: 34, lineHeight: 1.75, color: C.greenDeep, margin: "14px 0 22px" }}>{r.text}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Img src={img(`img/${r.avatar}.webp`)} style={{ width: 76, height: 76, borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 0 3px rgba(74,146,127,0.35)" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 30, color: C.greenDeep }}>{r.name}</div>
            <div style={{ fontSize: 24, color: C.textMuted }}>{"role" in r ? r.role : "متدرب"}</div>
          </div>
        </div>
      </Glass>
    </div>
  );
};

export const ReviewsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const RATE = REVIEWS.length * CARD_EVERY + 4;
  const rate = usePop(RATE, { damping: 10, stiffness: 220 });
  const label = usePop(0, { damping: 14 });
  return (
    <AbsoluteFill style={rtl}>
      <PageBg />
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: label, zIndex: 3 }}>
        <Label size={34}>لا تاخذ بكلامي</Label>
      </div>
      <AbsoluteFill style={{ filter: frame >= RATE ? `blur(${rate * 6}px)` : "none", opacity: frame >= RATE ? interpolate(rate, [0, 1], [1, 0.55]) : 1 }}>
        {REVIEWS.map((r, i) => (
          <ReviewCard key={r.name} r={r} i={i} />
        ))}
      </AbsoluteFill>
      {frame >= RATE && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${interpolate(rate, [0, 1], [0.5, 1])})`, opacity: Math.min(1, rate * 2) }}>
            <Glass strong gradBorder radius={56} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "40px 90px 46px" }}>
              <Stars size={78} />
              <GradText style={{ fontWeight: 700, fontSize: 210, lineHeight: 1.15 }}>4.95</GradText>
              <Proof size={32} />
            </Glass>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ───────────── ٢٩–٣٢ الدفعة ٨ ───────────── */
export const BatchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const slam = usePop(3, { damping: 11, stiffness: 320, mass: 0.9 });
  const logo = usePop(10, { damping: 14 });
  const sub = usePop(18, { damping: 14 });
  const s = shake(frame, 7, 18, 12);
  const ring = interpolate(frame, [7, 30], [0, 1], clamp);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ ...rtl, opacity: out }}>
      {/* شعار البرنامج صغير في الزاوية العلوية */}
      <div style={{ position: "absolute", top: 50, right: 60, opacity: logo, transform: `translateY(${(1 - logo) * -30}px)` }}>
        <Glass strong radius={30} style={{ padding: "14px 32px 14px 16px" }}>
          <BrandMark size={74} />
        </Glass>
      </div>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 150 }}>
        <div style={{ position: "relative", transform: `translate(${s.x}px, ${s.y}px) scale(${interpolate(slam, [0, 1], [2.4, 1])})`, opacity: Math.min(1, slam * 4) }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 900, height: 900, marginLeft: -450, marginTop: -450, borderRadius: "50%", border: `${10 * (1 - ring)}px solid rgba(246,134,22,${0.6 * (1 - ring)})`, transform: `scale(${0.3 + ring})` }} />
          <Glass strong gradBorder radius={64} style={{ display: "flex", alignItems: "center", gap: 36, padding: "20px 40px 26px 70px" }}>
            <GradText gradient={G.orangeText} style={{ fontWeight: 700, fontSize: 170, lineHeight: 1.3 }}>
              الدفعة
            </GradText>
            <span
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: 200,
                height: 200,
                borderRadius: 48,
                background: G.brandStrong,
                color: "#fff",
                fontWeight: 700,
                fontSize: 170,
                lineHeight: 1,
                paddingBottom: 14,
                transform: "rotate(-4deg)",
                boxShadow: "0 30px 60px -24px rgba(17,73,60,0.6), 0 18px 40px -20px rgba(196,107,18,0.55), inset 0 3px 0 rgba(255,255,255,0.3)",
              }}
            >
              8
            </span>
          </Glass>
        </div>
        <div style={{ marginTop: 36, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)` }}>
          <Label size={38}>برنامج نخبة البوربوينت · التسجيل مفتوح</Label>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ───────────── ٣٢–٣٨ المميزات ✓ + الشهادة + «مجانية» ───────────── */
const FEATURES = [
  { text: "ملفات تطبيقية", at: 6 },
  { text: "وصول لمدة سنة كاملة", at: 36 },
  { text: "شهادة إتمام باسمك", at: 70 },
  { text: "استشارات مجانية بالكامل", at: 112 },
];
const CERT_AT = 78;
export const FREE_AT = 128; // «مجااانية»

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const card = usePop(0, { damping: 15, stiffness: 140 });
  const cert = usePop(CERT_AT, { damping: 11, stiffness: 200 });
  const free = usePop(FREE_AT, { damping: 8, stiffness: 200, mass: 0.8 });
  const beforeFree = interpolate(frame, [FREE_AT - 4, FREE_AT + 6], [1, 0], clamp);
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ ...rtl, opacity: out }}>
      {/* القائمة — يسار الكادر */}
      <div style={{ position: "absolute", left: 80, top: 150, opacity: card * beforeFree, transform: `translateX(${(1 - card) * -600}px)` }}>
        <Glass strong gradBorder radius={48} style={{ width: 760, padding: "40px 48px 44px" }}>
          <div style={{ fontWeight: 700, fontSize: 44, color: C.greenDeep, marginBottom: 20 }}>
            وش تاخذ معك <GradText>بالدفعة 8؟</GradText>
          </div>
          {FEATURES.map((f) => (
            <FeatureRow key={f.text} {...f} />
          ))}
        </Glass>
      </div>

      {/* صورة الشهادة — يمين الكادر */}
      <div style={{ position: "absolute", right: 90, top: 190, opacity: Math.min(1, cert * 2) * beforeFree, transform: `rotate(${interpolate(cert, [0, 1], [12, 4])}deg) scale(${interpolate(cert, [0, 1], [0.4, 1])})` }}>
        <Glass strong gradBorder radius={40} style={{ padding: 18 }}>
          <Img src={img("img/certificate.webp")} style={{ width: 600, borderRadius: 26, display: "block" }} />
          <div style={{ position: "absolute", top: -30, left: 40, padding: "8px 28px 12px", borderRadius: 999, background: G.brandStrong, color: "#fff", fontWeight: 700, fontSize: 34, boxShadow: SH.cta }}>شهادة</div>
        </Glass>
      </div>

      {/* «مجانية» تكبر بالبرتقالي */}
      {frame >= FREE_AT && (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 110 }}>
          <div style={{ transform: `scale(${interpolate(free, [0, 1], [0.3, 1]) * interpolate(frame, [FREE_AT, durationInFrames], [1, 1.12], clamp)}) rotate(${interpolate(free, [0, 1], [-8, -2])}deg)` }}>
            <Glass strong gradBorder radius={70} style={{ padding: "6px 90px 30px" }}>
              <GradText gradient={G.orangeText} style={{ fontWeight: 700, fontSize: 260, lineHeight: 1.35 }}>
                مجانية
              </GradText>
            </Glass>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const FeatureRow: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const p = usePop(at, { damping: 12, stiffness: 240 });
  const check = usePop(at + 4, { damping: 8, stiffness: 300 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 0", opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * -30}px)` }}>
      <Orb size={72} style={{ transform: `scale(${check})`, boxShadow: "0 0 0 8px rgba(74,146,127,0.1), 0 14px 26px -10px rgba(17,73,60,0.55), inset 0 3px 6px rgba(255,255,255,0.35)" }}>
        <Icon name="check" size={38} color="#fff" />
      </Orb>
      <span style={{ fontWeight: 700, fontSize: 48, color: C.greenDeep, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
};

/* ───────────── ٣٨–٤٣ زر «احجز مقعدك» + مؤشر الماوس ───────────── */
export const CLICK_AT = 66;
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const btn = usePop(6, { damping: 11, stiffness: 200 });
  const move = easeOut(interpolate(frame, [22, CLICK_AT - 4], [0, 1], clamp));
  const press = frame >= CLICK_AT && frame < CLICK_AT + 6 ? 0.94 : 1;
  const ripple = interpolate(frame, [CLICK_AT, CLICK_AT + 20], [0, 1], clamp);
  const arrow = usePop(CLICK_AT + 14, { damping: 12 });
  const bob = Math.sin((frame - CLICK_AT) / 4) * 16;
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  // موضع الزر: منتصف الكادر أسفل الوجه
  const BX = 960;
  const BY = 690;
  const cx = interpolate(move, [0, 1], [1560, BX + 40]);
  const cy = interpolate(move, [0, 1], [1080, BY + 28]);
  return (
    <AbsoluteFill style={{ ...rtl, opacity: out }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: BY - 70, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ position: "relative", transform: `scale(${interpolate(btn, [0, 1], [0.4, 1]) * press})`, opacity: Math.min(1, btn * 2) }}>
          {frame >= CLICK_AT && (
            <div style={{ position: "absolute", inset: -10, borderRadius: 50, border: `${6 * (1 - ripple)}px solid rgba(246,134,22,${1 - ripple})`, transform: `scale(${1 + ripple * 0.35})` }} />
          )}
          <Button size={66} shine={interpolate(frame, [CLICK_AT, CLICK_AT + 18], [0, 1], clamp)}>
            احجز مقعدك
          </Button>
        </div>
        <div style={{ opacity: btn }}>
          <Glass strong radius={999} style={{ padding: "8px 30px 8px 12px" }}>
            <Proof size={28} />
          </Glass>
        </div>
        {/* سهم لتحت — للوصف */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: arrow, transform: `translateY(${frame >= CLICK_AT ? bob : 0}px)` }}>
          <Orb size={78}>
            <Icon name="arrow-down" size={40} color="#fff" />
          </Orb>
          <span style={{ fontWeight: 700, fontSize: 36, color: C.greenDeep, padding: "6px 26px 10px", borderRadius: 999, background: G.glassStrong, boxShadow: SH.glass }}>الرابط في وصف الحلقة</span>
        </div>
      </div>
      {/* مؤشر الماوس */}
      <svg
        width={70}
        height={70}
        viewBox="0 0 24 24"
        style={{ position: "absolute", left: cx, top: cy, transform: `scale(${press < 1 ? 0.85 : 1})`, transformOrigin: "0 0", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))", opacity: interpolate(frame, [18, 24], [0, 1], clamp) }}
      >
        <path d="M4 2.5 20 12l-7 1.6L9.4 21z" fill="#fff" stroke={C.greenDeep} strokeWidth={1.6} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

/* ───────────── ٤٣–٤٥ لحظة هدوء — بدون عناصر ───────────── */
export const CalmScene: React.FC = () => null;

/* ───────────── ٤٥–٤٨ انتقال سريع للبوربوينت ───────────── */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  // لوحة تدخل بسرعة من اليمين (Whip pan) مع ضبابية حركة
  const wipe = interpolate(frame, [0, 10], [1, 0], { ...clamp, easing: (t) => t * t * (3 - 2 * t) });
  const blur = interpolate(frame, [0, 6, 14], [40, 24, 0], clamp);
  const zoom = interpolate(frame, [6, 30], [1.18, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ ...rtl, transform: `translateX(${wipe * 105}%)` }}>
      <PageBg />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", filter: `blur(${blur}px)` }}>
        <div style={{ transform: `scale(${zoom * 0.94})` }}>
          <PptWindow font={FONT} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
