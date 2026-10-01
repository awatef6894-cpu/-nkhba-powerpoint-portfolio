import React from "react";
import {
  AbsoluteFill,
  Freeze,
  Html5Audio,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, FONT_DISPLAY } from "./brand";

export type QuickPauseProps = {
  /** true = خلفية شفافة (للتركيب فوق الوجه) */
  transparent: boolean;
  /** فيديو اختياري داخل public/ يُجمَّد عند freezeAtFrame (لنسخة MP4) */
  backgroundVideo?: string;
  freezeAtFrame?: number;
  withSound?: boolean;
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// اهتزاز متناقص يتزامن مع صوت الخدش
const shake = (frame: number, strength: number, decay: number) => {
  const k = Math.max(0, 1 - frame / decay);
  return {
    x: Math.sin(frame * 2.7) * strength * k,
    y: Math.cos(frame * 3.3) * strength * 0.6 * k,
  };
};

const PauseIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="4" y="4" width="92" height="92" rx="26" fill={BRAND.orange} />
    <rect x="31" y="27" width="13" height="46" rx="4" fill="#fff" />
    <rect x="56" y="27" width="13" height="46" rx="4" fill="#fff" />
  </svg>
);

// زوايا إطار «الكاميرا» توحي بأن اللقطة متوقفة
const FreezeCorners: React.FC<{ progress: number; opacity: number }> = ({ progress, opacity }) => {
  const inset = interpolate(progress, [0, 1], [10, 48]);
  const len = 110;
  const common: React.CSSProperties = {
    position: "absolute",
    width: len,
    height: len,
    borderColor: BRAND.orange,
    borderStyle: "solid",
    borderWidth: 0,
    opacity,
    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
  };
  return (
    <>
      <div style={{ ...common, top: inset, left: inset, borderTopWidth: 10, borderLeftWidth: 10, borderTopLeftRadius: 18 }} />
      <div style={{ ...common, top: inset, right: inset, borderTopWidth: 10, borderRightWidth: 10, borderTopRightRadius: 18 }} />
      <div style={{ ...common, bottom: inset, left: inset, borderBottomWidth: 10, borderLeftWidth: 10, borderBottomLeftRadius: 18 }} />
      <div style={{ ...common, bottom: inset, right: inset, borderBottomWidth: 10, borderRightWidth: 10, borderBottomRightRadius: 18 }} />
    </>
  );
};

export const QuickPause: React.FC<QuickPauseProps> = ({
  transparent,
  backgroundVideo,
  freezeAtFrame = 0,
  withSound = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ١) ومضة التجميد
  const flash = interpolate(frame, [0, 1, 6], [0, 0.85, 0], clamp);

  // ٢) دخول النص بقفزة (overshoot)
  const pop = spring({ frame: frame - 2, fps, config: { damping: 9, stiffness: 220, mass: 0.7 } });
  const textScale = interpolate(pop, [0, 1], [0.4, 1]);
  const textRotate = interpolate(pop, [0, 1], [-6, 0]);
  const s = shake(frame, 14, 14);

  // ٣) الخروج
  const outStart = durationInFrames - 9;
  const exit = spring({ frame: frame - outStart, fps, config: { damping: 200 }, durationInFrames: 9 });
  const exitScale = interpolate(exit, [0, 1], [1, 0.85]);
  const exitOpacity = 1 - exit;

  // ٤) أيقونة الإيقاف تدخل بعد النص بلحظة
  const iconPop = spring({ frame: frame - 6, fps, config: { damping: 8, stiffness: 260 } });

  // ٥) خط سفلي يمتد
  const underline = interpolate(frame, [8, 18], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });

  // ٦) زوايا الإطار + تعتيم الأطراف
  const cornersIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });

  // تكبير خفيف على اللقطة المجمّدة (نسخة MP4)
  const punch = interpolate(frame, [0, 4, durationInFrames], [1, 1.06, 1.08], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: transparent ? "transparent" : BRAND.inkDeep }}>
      {!transparent && (
        <AbsoluteFill style={{ transform: `scale(${punch})` }}>
          {backgroundVideo ? (
            <Freeze frame={freezeAtFrame}>
              <OffthreadVideo
                src={staticFile(backgroundVideo)}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.55) contrast(1.05)" }}
              />
            </Freeze>
          ) : (
            <AbsoluteFill
              style={{
                background: `radial-gradient(circle at 50% 35%, ${BRAND.ink} 0%, ${BRAND.inkDeep} 70%)`,
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* تعتيم أطراف يركّز النظر على النص */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 45%, rgba(13,30,25,0.55) 100%)",
          opacity: interpolate(frame, [0, 4], [0, 1], clamp) * exitOpacity,
        }}
      />

      <FreezeCorners progress={cornersIn} opacity={exitOpacity} />

      {/* النص الكبير — المنتصف العلوي */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 120 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            direction: "rtl",
            opacity: Math.min(1, pop * 3) * exitOpacity,
            transform: `translate(${s.x}px, ${s.y}px) scale(${textScale * exitScale}) rotate(${textRotate}deg)`,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: 168,
                lineHeight: 1.25,
                color: BRAND.orange,
                WebkitTextStroke: `14px ${BRAND.inkDeep}`,
                paintOrder: "stroke fill",
                textShadow: "0 14px 40px rgba(0,0,0,0.45)",
                whiteSpace: "nowrap",
              }}
            >
              وقفة سريعة
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 6,
                height: 14,
                width: `${underline * 100}%`,
                borderRadius: 7,
                background: `linear-gradient(270deg, ${BRAND.orangeLight}, ${BRAND.orange})`,
                boxShadow: `0 0 0 5px ${BRAND.inkDeep}`,
              }}
            />
          </div>
          <div style={{ transform: `scale(${iconPop}) rotate(${interpolate(iconPop, [0, 1], [-25, 0])}deg)` }}>
            <PauseIcon size={150} />
          </div>
        </div>
      </AbsoluteFill>

      {/* ومضة التجميد */}
      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />

      {withSound && <Html5Audio src={staticFile("sfx/record-scratch.wav")} volume={0.9} />}
    </AbsoluteFill>
  );
};
