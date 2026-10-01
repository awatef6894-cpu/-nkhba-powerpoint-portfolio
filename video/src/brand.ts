// هوية صفحة الهبوط course.powerpoint-ksa.store — منقولة حرفيًا من styles.css
import { continueRender, delayRender, staticFile } from "remotion";
import "@fontsource/amiri/arabic-700.css"; // خط «قبل» في لقطة تغيير الخط فقط

export const C = {
  ivory: "#f0e5d4",
  sand: "#e4bd86",
  greenLight: "#4a927f",
  greenMid: "#2e6e5e",
  greenDeep: "#11493c",
  orange: "#f68616",
  orangeDeep: "#864a0e",
  bgIvory: "#f8f3ec",
  textMuted: "#4d5a55",
  red: "#b42318",
  videoDark: "#0e2b24",
};

// التدرجات — اليمين (بداية القراءة) أخضر، اليسار برتقالي
export const G = {
  brand: "linear-gradient(to left, #11493c 0%, #2e6e5e 38%, #c46b12 100%)",
  brandStrong: "linear-gradient(to left, #11493c 0%, #2e6e5e 38%, #a95b0f 100%)",
  text: "linear-gradient(to left, #11493c 0%, #2e6e5e 40%, #be6812 100%)",
  orb: "linear-gradient(145deg, #4a927f 0%, #11493c 52%, #e07a15 100%)",
  line: "linear-gradient(to left, #4a927f, #11493c 45%, #f68616)",
  border: "linear-gradient(135deg, rgba(74,146,127,0.9), rgba(255,255,255,0.6) 45%, rgba(246,134,22,0.85))",
  // تدرج النجوم في الموقع — نستخدمه حين يطلب السكريبت «برتقالي»
  orangeText: "linear-gradient(180deg, #f6a33a 0%, #e07a15 55%, #c46b12 100%)",
  glass: "linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,255,255,0.56))",
  glassStrong: "linear-gradient(145deg, rgba(255,255,255,1), rgba(255,255,255,0.97))",
};

// الظلال ×2 لأن الفيديو 1920 مقابل صفحة بعرض ~960
export const SH = {
  glass: "inset 0 2px 0 rgba(255,255,255,0.95), 0 0 0 2px rgba(17,73,60,0.06), 0 28px 68px -32px rgba(17,73,60,0.22)",
  glassStrong:
    "inset 0 2px 0 #fff, 0 0 0 2px rgba(17,73,60,0.07), 0 60px 140px -60px rgba(17,73,60,0.35), 0 20px 48px -28px rgba(246,134,22,0.18)",
  cta: "0 20px 48px -16px rgba(17,73,60,0.45), 0 12px 36px -12px rgba(196,107,18,0.45), inset 0 2px 0 rgba(255,255,255,0.28)",
  orb: "0 0 0 12px rgba(74,146,127,0.1), 0 0 0 24px rgba(246,134,22,0.06), 0 24px 44px -16px rgba(17,73,60,0.55), inset 0 4px 8px rgba(255,255,255,0.35)",
};

export const FONT = "'Janna LT', 'Segoe UI', Tahoma, sans-serif";
export const FONT_OLD = "'Amiri', serif";

export const VIDEO = { width: 1920, height: 1080, fps: 30 };

export const img = (p: string) => staticFile(`brand/${p}`);

// تحميل Janna LT قبل أول إطار
if (typeof document !== "undefined") {
  const handle = delayRender("Janna LT");
  Promise.all(
    (["400", "700"] as const).map((w) =>
      new FontFace("Janna LT", `url(${staticFile(`brand/fonts/janna-lt-${w}.woff2`)}) format("woff2")`, { weight: w }).load()
    )
  )
    .then((faces) => {
      faces.forEach((f) => document.fonts.add(f));
      return document.fonts.load("700 40px 'Amiri'");
    })
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
}
