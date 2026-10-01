# لقطات الفيديو — Remotion

مشروع Remotion مستقل لبناء لقطات المونتاج بهوية «نخبة البوربوينت»
(الألوان والخط El Messiri مأخوذة من صفحة الهبوط: `tailwind.config.ts` و `app/layout.tsx`).

## اللقطات

| الوقت | التكوين (Composition) | المخرج |
|---|---|---|
| ٠–٢ ث | `QuickPauseOverlay`: «وقفة سريعة» بخلفية شفافة فوق الوجه | `out/01-quick-pause-overlay.mov` (ProRes 4444 + Alpha) |
| ٠–٢ ث | `QuickPause`: نفس اللقطة بصيغة MP4 | `out/01-quick-pause.mp4` (H.264) |

الحركة: ومضة تجميد بيضاء، ثم صوت «Record scratch»، ثم يقفز نص «وقفة سريعة» بالبرتقالي `#E67D15`
في المنتصف العلوي مع اهتزاز يخفت تدريجيًا، ثم أيقونة ⏸ وخط سفلي يمتد وزوايا إطار، ثم خروج ناعم.

## التشغيل

```bash
cd video
npm install
npm run studio      # معاينة وتعديل
npm run render      # يخرج MOV الشفاف و MP4 في out/
```

## تجميد لقطتك الحقيقية (نسخة MP4)

ضع ملف الفيديو في `video/public/` ثم:

```bash
npx remotion render QuickPause out/01-quick-pause.mp4 \
  --props='{"transparent":false,"backgroundVideo":"talking-head.mp4","freezeAtFrame":0}'
```

## الصوت

`public/sfx/record-scratch.wav` مؤثر مولَّد بـ `npm run sfx`. استبدله بملف «Record scratch» تفضّله بنفس الاسم.

> ملف MOV حجمه نحو ١٧٠ ميغابايت، ولذلك لا يُرفع إلى git (GitHub يرفض الملفات فوق ١٠٠ ميغابايت). أعد توليده بـ `npm run render:pause:mov`.
