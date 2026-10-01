// مكوّنات «النظام الزجاجي» لصفحة الهبوط، بمقاس الفيديو
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, G, SH, img } from "./brand";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** spring جاهز يبدأ عند إطار معيّن */
export const usePop = (start: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 170, mass: 0.8, ...cfg } });
};

/** الخلفية: عاجي → أبيض + شبكة خفيفة + بقع خضراء وبرتقالية متحركة */
export const PageBg: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 30;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 130% 70% at 50% 0%, ${C.bgIvory} 0%, #fff 62%)`, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 1500, height: 1500, top: -640, right: -640, borderRadius: "50%", transform: `translate(${-drift}px, ${drift}px)`, background: "radial-gradient(circle, rgba(74,146,127,0.22) 0%, rgba(74,146,127,0) 65%)" }} />
      <div style={{ position: "absolute", width: 1400, height: 1400, bottom: -700, left: -620, borderRadius: "50%", transform: `translate(${drift}px, ${-drift}px)`, background: "radial-gradient(circle, rgba(246,134,22,0.16) 0%, rgba(246,134,22,0) 65%)" }} />
      <div style={{ position: "absolute", width: 1100, height: 1100, bottom: -560, right: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(17,73,60,0.1) 0%, rgba(17,73,60,0) 65%)" }} />
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage: `linear-gradient(${C.greenDeep} 2px, transparent 2px), linear-gradient(90deg, ${C.greenDeep} 2px, transparent 2px)`,
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, #000 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, #000 20%, transparent 85%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** الخلفية الخضراء الداكنة (مثل بطاقة الفيديو في الموقع) */
export const DarkBg: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 110% 80% at 50% 0%, ${C.greenMid} 0%, ${C.greenDeep} 45%, ${C.videoDark} 100%)`, overflow: "hidden" }}>
    <div style={{ position: "absolute", width: 1300, height: 1300, bottom: -700, left: -500, borderRadius: "50%", background: "radial-gradient(circle, rgba(246,134,22,0.22) 0%, rgba(246,134,22,0) 65%)" }} />
    <AbsoluteFill
      style={{
        opacity: 0.07,
        backgroundImage: `linear-gradient(${C.ivory} 2px, transparent 2px), linear-gradient(90deg, ${C.ivory} 2px, transparent 2px)`,
        backgroundSize: "96px 96px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 85%)",
      }}
    />
  </AbsoluteFill>
);

/** بطاقة زجاجية (.glass / .glass-strong) مع حد متدرّج اختياري (.grad-border) */
export const Glass: React.FC<{ strong?: boolean; gradBorder?: boolean; radius?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  strong,
  gradBorder,
  radius = 44,
  style,
  children,
}) => (
  <div
    style={{
      position: "relative",
      background: strong ? G.glassStrong : G.glass,
      border: "2px solid rgba(255,255,255,0.9)",
      borderRadius: radius,
      boxShadow: strong ? SH.glassStrong : SH.glass,
      backdropFilter: "blur(24px) saturate(1.3)",
      WebkitBackdropFilter: "blur(24px) saturate(1.3)",
      ...style,
    }}
  >
    {gradBorder && (
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: radius,
          padding: 3,
          background: G.border,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
    )}
    {children}
  </div>
);

/** نص متدرّج (.grad-text) */
export const GradText: React.FC<{ gradient?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ gradient = G.text, style, children }) => (
  <span
    style={{
      background: gradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      WebkitBoxDecorationBreak: "clone",
      ...style,
    }}
  >
    {children}
  </span>
);

/** كرة الأيقونة (.orb) */
export const Orb: React.FC<{ size?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ size = 104, children, style }) => (
  <div style={{ flex: "none", display: "grid", placeItems: "center", width: size, height: size, borderRadius: "50%", color: "#fff", background: G.orb, boxShadow: SH.orb, ...style }}>
    {children}
  </div>
);

/** الشارة (.section-label / .badge) */
export const Label: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 30, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 16,
      padding: `${size * 0.36}px ${size * 0.95}px`,
      borderRadius: 999,
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
      color: C.greenDeep,
      background: G.glassStrong,
      border: "2px solid rgba(255,255,255,0.9)",
      boxShadow: SH.glass,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <span style={{ width: size * 0.5, height: size * 0.5, borderRadius: "50%", background: G.orb, boxShadow: "0 0 0 8px rgba(246,134,22,0.16)" }} />
    {children}
  </div>
);

/** الزر الأساسي (.btn-primary) مع لمعة تمر عليه */
export const Button: React.FC<{ children: React.ReactNode; size?: number; shine?: number; style?: React.CSSProperties }> = ({ children, size = 40, shine = -1, style }) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: `${size * 0.55}px ${size * 1.6}px`,
      borderRadius: size * 0.7,
      background: G.brand,
      color: "#fff",
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.3,
      boxShadow: SH.cta,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
        transform: `translateX(${interpolate(shine, [0, 1], [120, -120], clamp)}%)`,
        opacity: shine < 0 ? 0 : 1,
      }}
    />
    <span style={{ position: "relative" }}>{children}</span>
  </div>
);

/** صفّ صور المتدربين + الدليل الاجتماعي (.proof) */
export const Proof: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = C.textMuted }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: FONT, fontWeight: 700, fontSize: size, color, direction: "rtl" }}>
    <div style={{ display: "flex" }}>
      {["avatar-hijab", "avatar-beard", "avatar-f", "avatar-glasses"].map((a, i) => (
        <Img
          key={a}
          src={img(`img/${a}.webp`)}
          style={{ width: size * 2.3, height: size * 2.3, borderRadius: "50%", border: "4px solid #fff", marginRight: i === 0 ? 0 : -size * 0.7, boxShadow: "0 4px 12px rgba(17,73,60,0.18)", background: "#fff" }}
        />
      ))}
    </div>
    <span>+5,000 متدرب · تقييم 4.95 من 5</span>
  </div>
);

/** أيقونات Lucide (نفس المستخدمة في الموقع) */
export const Icon: React.FC<{ name: "check" | "pause" | "zap" | "arrow-left" | "arrow-down" | "star" | "file" | "calendar" | "award" | "message"; size?: number; color?: string }> = ({
  name,
  size = 40,
  color = "currentColor",
}) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "check":
      return <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>;
    case "pause":
      return <svg {...p} fill={color} stroke="none"><rect x="6" y="4" width="4" height="16" rx="1.2" /><rect x="14" y="4" width="4" height="16" rx="1.2" /></svg>;
    case "zap":
      return <svg {...p} fill={color}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>;
    case "arrow-left":
      return <svg {...p}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
    case "arrow-down":
      return <svg {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>;
    case "star":
      return <svg {...p} fill={color} stroke="none"><path d="M11.5 2.3a.5.5 0 0 1 .9 0l2.6 5.3 5.8.9a.5.5 0 0 1 .3.9l-4.2 4.1 1 5.8a.5.5 0 0 1-.8.5L12 17l-5.2 2.7a.5.5 0 0 1-.7-.5l1-5.8-4.3-4.1a.5.5 0 0 1 .3-.9l5.8-.9z" /></svg>;
    case "file":
      return <svg {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 13H8" /><path d="M16 17H8" /></svg>;
    case "calendar":
      return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "award":
      return <svg {...p}><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></svg>;
    case "message":
      return <svg {...p}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>;
  }
};

export const Stars: React.FC<{ size?: number; count?: number }> = ({ size = 30, count = 5 }) => (
  <div style={{ display: "flex", gap: size * 0.15 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <linearGradient id={`st${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6a33a" />
            <stop offset="1" stopColor="#c46b12" />
          </linearGradient>
        </defs>
        <path fill={`url(#st${i})`} d="M11.5 2.3a.5.5 0 0 1 .9 0l2.6 5.3 5.8.9a.5.5 0 0 1 .3.9l-4.2 4.1 1 5.8a.5.5 0 0 1-.8.5L12 17l-5.2 2.7a.5.5 0 0 1-.7-.5l1-5.8-4.3-4.1a.5.5 0 0 1 .3-.9l5.8-.9z" />
      </svg>
    ))}
  </div>
);

/** شعار البرنامج (.brand) */
export const BrandMark: React.FC<{ size?: number }> = ({ size = 72 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.28, direction: "rtl", fontFamily: FONT, fontWeight: 700, fontSize: size * 0.45, color: C.greenDeep }}>
    <Img src={img("img/mark-ivory-96.png")} style={{ width: size, height: size, borderRadius: size * 0.27, boxShadow: "0 8px 24px -8px rgba(17,73,60,0.3)" }} />
    نخبة البوربوينت
  </div>
);
