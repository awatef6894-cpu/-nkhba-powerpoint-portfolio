// يبني صفحة «الجدول الإخراجي» بأسلوب صفحة الهبوط (ملف HTML واحد، الصور والخط مضمّنة)
import { readFileSync, writeFileSync } from "node:fs";

const b64 = (p) => readFileSync(p).toString("base64");
const shot = (n) => `data:image/webp;base64,${b64(`storyboard/shots/${n}.webp`)}`;
const font = (w) => `data:font/woff2;base64,${b64(`public/brand/fonts/janna-lt-${w}.woff2`)}`;
const mark = `data:image/png;base64,${b64("public/brand/img/mark-ivory-96.png")}`;

const ROWS = [
  { t: "٠–٢", shots: ["01-pause"], layer: "فوق الوجه", text: "وقفة سريعة قبل ما نكمل.", visual: "تجميد اللقطة (Freeze) + ومضة بيضاء. بطاقة زجاجية في المنتصف العلوي: «وقفة سريعة ⏸» بالبرتقالي.", sfx: ["Record scratch"] },
  { t: "٢–٨", shots: ["02-intro"], layer: "فوق الوجه", text: "أنا عواطف، من ٢٠٢٢ وأنا أصمم عروض وتقارير لجهات مثل وزارة الداخلية، ووزارة الطاقة، وتجمع جدة الصحي.", visual: "Punch-in ١١٠٪. Lower third باسمك مع «منذ 2022». الشعارات تطلع وحدة وحدة مع نطق كل اسم.", sfx: ["نقرة × ٣"] },
  { t: "٨–١٢", shots: ["03-counter"], layer: "شاشة كاملة", text: "صممت أكثر من ٨٢٩ عرض وتقرير، ودربت أكثر من ٥ آلاف متدرب", visual: "عدّاد من ٠ إلى +829 ثم +5,000 بلون عاجي على خلفية خضراء.", sfx: ["Ticking", "Ding"] },
  { t: "١٢–١٨", shots: ["04-font-before", "04-font-after"], layer: "شاشة كاملة", text: "الحين تخيّل… أنت اليوم تعلمت كيف تغيّر الخط في العرض بالكامل بخطوة وحدة، ووفرت على نفسك وقت كبير.", visual: "نافذة بوربوينت: الخط يتغيّر في كل الشرائح مرة وحدة. نص فوق: «خطوة وحدة ⚡».", sfx: ["Whoosh"] },
  { t: "١٨–٢٣", shots: ["05-system"], layer: "شاشة كاملة", text: "طيب تخيّل لو عندك سيستم كامل، من خمس مراحل، تستلم فيه أي ملف وتسلّمه عرض احترافي بكل ثقة،", visual: "خط زمني: افهم ← رتّب ← صمّم ← طوّر ← أخرج، كل مرحلة تتلوّن بالبرتقالي. مع «أي ملف» تظهر لقطة قبل وبعد من صفحة البرنامج.", sfx: ["نقرة × ٥"] },
  { t: "٢٣–٢٦", shots: ["06-strike"], layer: "فوق الوجه", text: "بدون ما تنتظر مصمم، وبدون ما تضيّع ساعات على كل شريحة.", visual: "«بدون انتظار مصمم» و«بدون ساعات ضايعة» تنشطب بخط أحمر. Jump cut على وجهك.", sfx: ["Swipe × ٢"] },
  { t: "٢٦–٢٩", shots: ["07-reviews", "07-reviews-rating"], layer: "شاشة كاملة", text: "ولا تاخذ بكلامي، خذها من رأي ٥ آلاف متدرب", visual: "بطاقات آراء حقيقية من صفحة الهبوط تتراكم كل نص ثانية، ثم ★★★★★ و 4.95.", sfx: ["Pop × ٦"] },
  { t: "٢٩–٣٢", shots: ["08-batch"], layer: "فوق الوجه", text: "وعشان كذا فتحت لك الدفعة الثامنة من برنامج نخبة البوربوينت", visual: "«الدفعة 8» بالبرتقالي + شعار البرنامج صغير في الزاوية العلوية.", sfx: ["Impact"] },
  { t: "٣٢–٣٨", shots: ["09-features", "09-features-free"], layer: "فوق الوجه", text: "مع ملفات تطبيقية، ووصول لمدة سنة كاملة، وشهادة إتمام باسمك. واستشارات مجااانية بالكامل", visual: "قائمة بعلامات ✓، وصورة الشهادة مع كلمة «شهادة». مع «مجااانية» تقريب على الوجه و«مجانية» تكبر بالبرتقالي.", sfx: ["نقرة × ٤"] },
  { t: "٣٨–٤٣", shots: ["10-cta"], layer: "فوق الوجه", text: "فإذا تبغى عرضك الجاي يكون أنت اللي بنيته بنفسك، اضغط على الرابط في وصف الحلقة واحجز مقعدك.", visual: "زر «احجز مقعدك» بنفس زر صفحة الهبوط، ومؤشر ماوس يضغط عليه، وسهم يتحرك لتحت.", sfx: ["Click"] },
  { t: "٤٣–٤٥", shots: ["11-calm"], layer: "وجه فقط", text: "وأتمنى أشوفك معنا في الدفعة الثامنة.", visual: "لقطة وجه بدون أي عناصر — لحظة هدوء.", sfx: [] },
  { t: "٤٥–٤٨", shots: ["12-outro"], layer: "انتقال", text: "والحين، خلنا نرجع للطريقة الأولى للميزة الثانية", visual: "Whip pan سريع يرجع لشاشة البوربوينت، والموسيقى ترجع لموسيقى الشرح.", sfx: ["Whoosh"] },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الجدول الإخراجي · الدفعة 8</title>
<style>
@font-face { font-family: "Janna LT"; src: url(${font(400)}) format("woff2"); font-weight: 400; }
@font-face { font-family: "Janna LT"; src: url(${font(700)}) format("woff2"); font-weight: 700; }
:root {
  --ivory:#f0e5d4; --sand:#e4bd86; --green-light:#4a927f; --green-mid:#2e6e5e; --green-deep:#11493c; --orange:#f68616;
  --bg-ivory:#f8f3ec; --text-muted:#4d5a55;
  --grad-brand:linear-gradient(to left,#11493c 0%,#2e6e5e 38%,#c46b12 100%);
  --grad-brand-strong:linear-gradient(to left,#11493c 0%,#2e6e5e 38%,#a95b0f 100%);
  --grad-text:linear-gradient(to left,#11493c 0%,#2e6e5e 40%,#be6812 100%);
  --grad-orb:linear-gradient(145deg,#4a927f 0%,#11493c 52%,#e07a15 100%);
  --grad-line:linear-gradient(to left,#4a927f,#11493c 45%,#f68616);
  --grad-border:linear-gradient(135deg,rgba(74,146,127,.9),rgba(255,255,255,.6) 45%,rgba(246,134,22,.85));
  --glass-bg:linear-gradient(145deg,rgba(255,255,255,.82),rgba(255,255,255,.56));
  --glass-bg-strong:linear-gradient(145deg,rgba(255,255,255,.95),rgba(255,255,255,.74));
  --shadow-glass:inset 0 1px 0 rgba(255,255,255,.95),0 0 0 1px rgba(17,73,60,.06),0 14px 34px -16px rgba(17,73,60,.22);
  --shadow-glass-strong:inset 0 1px 0 #fff,0 0 0 1px rgba(17,73,60,.07),0 30px 70px -30px rgba(17,73,60,.35),0 10px 24px -14px rgba(246,134,22,.18);
  --shadow-cta:0 10px 24px -8px rgba(17,73,60,.45),0 6px 18px -6px rgba(196,107,18,.45),inset 0 1px 0 rgba(255,255,255,.28);
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:#fff;color:var(--text-muted);font-family:"Janna LT","Segoe UI",Tahoma,sans-serif;font-size:16px;line-height:1.85;-webkit-font-smoothing:antialiased;overflow-x:hidden}
h1,h2,h3,p{margin:0}
img{display:block;max-width:100%}
.page-bg{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;background:radial-gradient(ellipse 130% 70% at 50% 0%,var(--bg-ivory) 0%,#fff 62%)}
.blob{position:absolute;border-radius:50%}
.b1{width:900px;height:900px;top:-380px;right:-420px;background:radial-gradient(circle,rgba(74,146,127,.2) 0%,rgba(74,146,127,0) 65%)}
.b2{width:820px;height:820px;top:30vh;left:-420px;background:radial-gradient(circle,rgba(246,134,22,.14) 0%,rgba(246,134,22,0) 65%)}
.grid{position:absolute;inset:0;opacity:.035;background-image:linear-gradient(var(--green-deep) 1px,transparent 1px),linear-gradient(90deg,var(--green-deep) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse 90% 60% at 50% 0%,#000 20%,transparent 80%);mask-image:radial-gradient(ellipse 90% 60% at 50% 0%,#000 20%,transparent 80%)}
.container{width:100%;max-width:1152px;margin-inline:auto;padding-inline:16px}
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.66);-webkit-backdrop-filter:blur(16px) saturate(1.4);backdrop-filter:blur(16px) saturate(1.4);border-bottom:1px solid rgba(17,73,60,.07)}
.header-inner{height:64px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.brand{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:18px;color:var(--green-deep)}
.brand img{width:40px;height:40px;border-radius:11px;box-shadow:0 4px 12px -4px rgba(17,73,60,.3)}
.btn-sm{display:inline-flex;align-items:center;min-height:44px;padding:8px 18px;border-radius:12px;background:var(--grad-brand-strong);color:#fff;font-weight:700;font-size:15px;box-shadow:var(--shadow-cta);white-space:nowrap}
.hero{padding-block:44px 24px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:var(--glass-bg);border:1px solid rgba(255,255,255,.9);box-shadow:var(--shadow-glass);font-size:13.5px;font-weight:700;color:var(--green-deep)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--grad-orb);box-shadow:0 0 0 4px rgba(246,134,22,.16)}
.hero h1{color:var(--green-deep);font-weight:700;font-size:clamp(32px,8.6vw,56px);line-height:1.4;margin-block:16px 8px;text-wrap:balance}
.grad-text{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{font-size:16.5px;max-width:640px;margin-inline:auto}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:560px;margin:22px auto 0}
.stats div{padding:10px 6px;border-radius:14px;background:var(--glass-bg);border:1px solid rgba(255,255,255,.9);box-shadow:var(--shadow-glass);font-size:13px;font-weight:700;color:var(--green-deep)}
.stats b{display:block;font-size:22px;line-height:1.3;background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent}
.legend{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:18px}
.pill{display:inline-flex;align-items:center;gap:6px;padding:3px 12px;border-radius:999px;font-size:12.5px;font-weight:700;line-height:1.6}
.pill-over{color:#fff;background:var(--grad-brand-strong)}
.pill-full{color:var(--green-deep);background:rgba(17,73,60,.07);box-shadow:inset 0 0 0 1px rgba(17,73,60,.12)}
.track{position:relative;display:grid;gap:18px;padding-block:20px 72px}
.shot{position:relative;display:grid;gap:16px;padding:16px;border-radius:22px;background:var(--glass-bg-strong);border:1px solid rgba(255,255,255,.9);box-shadow:var(--shadow-glass-strong);isolation:isolate}
.shot::after{content:"";position:absolute;inset:-1px;border-radius:inherit;padding:1.5px;pointer-events:none;background:var(--grad-border);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.shot-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.time{display:inline-flex;align-items:baseline;gap:6px;padding:2px 14px 4px;border-radius:12px;color:#fff;background:var(--grad-brand-strong);font-weight:700;font-size:18px;box-shadow:0 8px 18px -8px rgba(17,73,60,.55);transform:rotate(-2deg)}
.time small{font-size:12px;opacity:.85}
.num{font-size:26px;font-weight:700;line-height:1;background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent}
.quote{font-size:19px;font-weight:700;line-height:1.75;color:var(--green-deep)}
.visual{font-size:15px;line-height:1.85}
.sfx{display:flex;gap:6px;flex-wrap:wrap}
.sfx span{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--green-deep);background:var(--glass-bg);box-shadow:var(--shadow-glass)}
.sfx span::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--grad-orb)}
.frames{display:grid;gap:10px}
.frames.two{grid-template-columns:1fr 1fr}
.frame{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:14px;background:#0e2b24;box-shadow:0 0 0 1px rgba(17,73,60,.08),0 10px 24px -14px rgba(17,73,60,.4)}
.frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.frame .tag{position:absolute;top:8px;inset-inline-start:8px;padding:2px 10px;border-radius:999px;font-size:11.5px;font-weight:700;color:#fff;background:rgba(8,30,25,.6);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.note{margin-top:4px;padding:18px;border-radius:22px;background:var(--glass-bg);box-shadow:var(--shadow-glass);font-size:14.5px}
.note b{color:var(--green-deep)}
@media (min-width:860px){
  .shot{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);align-items:center;padding:20px 22px}
  .shot .frames{order:2}
}
</style>
</head>
<body>
<div class="page-bg" aria-hidden="true"><div class="blob b1"></div><div class="blob b2"></div><div class="grid"></div></div>
<header><div class="container header-inner">
  <span class="brand"><img src="${mark}" alt="">نخبة البوربوينت</span>
  <span class="btn-sm">الجدول الإخراجي</span>
</div></header>
<main class="container">
  <section class="hero">
    <span class="badge"><span class="dot"></span>فيديو الإعلان · الدفعة 8</span>
    <h1>أساس المونتاج<br><span class="grad-text">لقطة لقطة.</span></h1>
    <p class="lead">كل لقطة مبنية بنفس هوية صفحة الهبوط: الخط والألوان والبطاقات الزجاجية والأزرار. راجعي الصور، وبعد الموافقة أصدّر MP4.</p>
    <div class="stats"><div><b>48 ث</b>المدة</div><div><b>12</b>لقطة</div><div><b dir="ltr" style="font-size:18px">1920×1080</b>الدقة</div></div>
    <div class="legend"><span class="pill pill-over">فوق الوجه · ProRes 4444 شفاف</span><span class="pill pill-full">شاشة كاملة · تغطي الوجه</span></div>
  </section>
  <ol class="track" role="list" style="list-style:none;padding-inline:0;margin:0">
${ROWS.map(
  (r, i) => `    <li class="shot">
      <div class="frames${r.shots.length > 1 ? " two" : ""}">
        ${r.shots.map((s, j) => `<div class="frame"><img src="${shot(s)}" alt="لقطة ${r.t}" loading="lazy">${r.shots.length > 1 ? `<span class="tag">${j === 0 ? "قبل" : "بعد"}</span>` : ""}</div>`).join("\n        ")}
      </div>
      <div style="display:grid;gap:10px">
        <div class="shot-head"><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="time">${r.t} <small>ث</small></span><span class="pill ${r.layer === "فوق الوجه" ? "pill-over" : "pill-full"}">${r.layer}</span></div>
        <p class="quote">«${esc(r.text)}»</p>
        <p class="visual">${esc(r.visual)}</p>
        ${r.sfx.length ? `<div class="sfx">${r.sfx.map((s) => `<span>${s}</span>`).join("")}</div>` : ""}
      </div>
    </li>`
).join("\n")}
  </ol>
  <p class="note" style="margin-bottom:56px"><b>ملاحظة:</b> واجهة البوربوينت تظهر مكان تسجيل الوجه. عند التصدير يحلّ تسجيلك مكانها، أو تُصدَّر الطبقات شفافة لتركّبها فوق تسجيلك في برنامج المونتاج.</p>
</main>
</body>
</html>`;

writeFileSync("storyboard/index.html", html);
console.log("storyboard/index.html", (html.length / 1024).toFixed(0) + "KB");
