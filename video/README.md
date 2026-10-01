# مونتاج إعلان الدفعة 8 — Remotion

كل اللقطات مبنية بهوية صفحة الهبوط [course.powerpoint-ksa.store](https://course.powerpoint-ksa.store/):
خط Janna LT، والتدرج من الأخضر إلى البرتقالي، والبطاقات الزجاجية، والأزرار، والخلفية العاجية بالشبكة.
الشعارات وصورة الكوتش والشهادة وآراء المتدربين مأخوذة من الصفحة نفسها (`public/brand/`).

## الملفات

| الملف | الوظيفة |
|---|---|
| `src/timeline.ts` | الجدول الإخراجي (٤٨ ث، ١٢ لقطة) |
| `src/scenes.tsx` | اللقطات |
| `src/ui.tsx` · `src/brand.ts` | نظام التصميم المنقول من `styles.css` في صفحة الهبوط |
| `src/Face.tsx` | طبقة الوجه: Freeze وPunch-in وJump cut وWhip |
| `storyboard/index.html` | صفحة «الجدول الإخراجي» لمراجعة كل لقطة |

## الأوامر

```bash
npm install
npm run studio          # معاينة حيّة
npm run storyboard      # صور PNG لكل لقطة + صفحة المراجعة
npm run render:mp4      # MP4 كامل (out/montage.mp4)
npm run render:overlay  # طبقة شفافة ProRes 4444 فوق تسجيل الوجه
```

لتركيب تسجيلك داخل الـ MP4، ضعه في `public/face.mp4` ثم:

```bash
npx remotion render Montage out/montage.mp4 --props='{"mode":"full","faceVideo":"face.mp4"}'
```

> الخط Janna LT مرخّص من Linotype، وقد زوّد به العميل لصفحة الهبوط.

## الدفعة 7 بأسلوب Dub (`Batch7`)

إعادة إنتاج حسب «بريف إعادة إنتاج فيديو الدفعة 7 بأسلوب Dub» (`src/dub/`):
خلفية واحدة ثابتة مبنية بالكود، وبناء الكلمات كلمة كلمة، ودخول الكروت وخروج العناصر بنفس القيم،
ودفع كاميرا 100→103٪ لكل قسم، وجسور Morph بين الأقسام، والدائرة الدوارة تفتح الفيديو وتقفله.

```bash
npm run stills:batch7   # صور مراجعة في out/dub
npm run render:batch7   # out/batch7-dub.mp4
```
