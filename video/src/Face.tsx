// طبقة الوجه — في نسخة MP4 فقط. ضع تسجيلك في public/ ومرّر faceVideo، وإلا تظهر صورة الكوتش مكانه.
import React from "react";
import { AbsoluteFill, Freeze, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, img } from "./brand";
import { clamp, easeOut } from "./ui";
import { CLICK_AT, FREE_AT } from "./scenes";

const s = (sec: number) => Math.round(sec * 30);

// التقريبات من السكريبت: Punch-in ١١٠٪ عند ٢ث، Jump cut داخل ٢٣–٢٦، تقريب «مجااانية»
const zoomAt = (f: number) => {
  if (f < s(2)) return interpolate(f, [0, 4], [1, 1.03], clamp);
  if (f < s(8)) return 1 + 0.1 * easeOut(interpolate(f, [s(2), s(2) + 5], [0, 1], clamp));
  if (f >= s(23) && f < s(26)) return f < s(24.5) ? 1 : 1.16;
  if (f >= s(32) && f < s(38)) return f < s(32) + FREE_AT ? 1 : 1 + 0.18 * easeOut(interpolate(f, [s(32) + FREE_AT, s(32) + FREE_AT + 5], [0, 1], clamp));
  if (f >= s(38) && f < s(43)) return f < s(38) + CLICK_AT ? 1 : 1.04;
  if (f >= s(45)) return 1 + 0.3 * interpolate(f, [s(45), s(45) + 10], [0, 1], clamp);
  return 1;
};

// خلفية مكان الوجه — صورة لابتوب مغسولة بالعاجي مثل الشريحة المرجعية.
// لاستبدالها: ضع صورتك باسم public/brand/img/face-bg.jpg
const Placeholder: React.FC = () => (
  <AbsoluteFill style={{ background: C.bgIvory, overflow: "hidden" }}>
    <Img src={img("img/face-bg.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.3) brightness(1.6) contrast(0.75)" }} />
    {/* غسلة عاجية — أكثف في الأطراف ليبقى الوسط واضحًا */}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 75% 75% at 50% 55%, rgba(248,243,236,0.5) 0%, rgba(248,243,236,0.7) 70%, rgba(248,243,236,0.85) 100%)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 35%)" }} />
    {/* لمسة الهوية: أخضر يمين، برتقالي يسار */}
    <div style={{ position: "absolute", width: 1300, height: 1300, top: -600, right: -560, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,146,127,0.22) 0%, rgba(74,146,127,0) 65%)" }} />
    <div style={{ position: "absolute", width: 1200, height: 1200, bottom: -620, left: -520, borderRadius: "50%", background: "radial-gradient(circle, rgba(246,134,22,0.16) 0%, rgba(246,134,22,0) 65%)" }} />
    <AbsoluteFill
      style={{
        opacity: 0.05,
        backgroundImage: `linear-gradient(${C.greenDeep} 2px, transparent 2px), linear-gradient(90deg, ${C.greenDeep} 2px, transparent 2px)`,
        backgroundSize: "96px 96px",
      }}
    />
  </AbsoluteFill>
);

export const Face: React.FC<{ faceVideo?: string }> = ({ faceVideo }) => {
  const frame = useCurrentFrame();
  const z = zoomAt(frame);
  const whip = frame >= s(45) ? interpolate(frame, [s(45), s(45) + 10], [0, 1], clamp) : 0;
  const frozen = frame < s(2);
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${-whip * 60}%) scale(${z})`,
        filter: `${frozen ? "saturate(0.6) contrast(1.05)" : ""} ${whip > 0 ? `blur(${whip * 30}px)` : ""}`.trim() || undefined,
      }}
    >
      {faceVideo ? (
        <>
          <Sequence durationInFrames={s(2)}>
            <Freeze frame={0}>
              <OffthreadVideo src={staticFile(faceVideo)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Freeze>
          </Sequence>
          <Sequence from={s(2)}>
            <OffthreadVideo src={staticFile(faceVideo)} startFrom={s(2)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        </>
      ) : (
        <Placeholder />
      )}
    </AbsoluteFill>
  );
};
