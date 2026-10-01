// الجدول الإخراجي (٤٨ ثانية) — بالثواني، كما في السكريبت المعتمد
export const SCENES = [
  { id: "pause", from: 0, to: 2, text: "وقفة سريعة قبل ما نكمل.", overlay: true },
  { id: "intro", from: 2, to: 8, text: "أنا عواطف، من ٢٠٢٢ وأنا أصمم عروض وتقارير لجهات مثل وزارة الداخلية، ووزارة الطاقة، وتجمع جدة الصحي.", overlay: true },
  { id: "counter", from: 8, to: 12, text: "صممت أكثر من ٨٢٩ عرض وتقرير، ودربت أكثر من ٥ آلاف متدرب", overlay: false },
  { id: "font", from: 12, to: 18, text: "الحين تخيّل… أنت اليوم تعلمت كيف تغيّر الخط في العرض بالكامل بخطوة وحدة، ووفرت على نفسك وقت كبير.", overlay: false },
  { id: "system", from: 18, to: 23, text: "طيب تخيّل لو عندك سيستم كامل، من خمس مراحل، تستلم فيه أي ملف وتسلّمه عرض احترافي بكل ثقة،", overlay: false },
  { id: "strike", from: 23, to: 26, text: "بدون ما تنتظر مصمم، وبدون ما تضيّع ساعات على كل شريحة.", overlay: true },
  { id: "reviews", from: 26, to: 29, text: "ولا تاخذ بكلامي خذها من رأي 5 آلاف متدرب", overlay: false },
  { id: "batch", from: 29, to: 32, text: "وعشان كذا فتحت لك الدفعة الثامنة من برنامج نخبة البوربوينت", overlay: true },
  { id: "features", from: 32, to: 38, text: "مع ملفات تطبيقية، ووصول لمدة سنة كاملة، وشهادة إتمام باسمك. واستشارات مجااانية بالكامل", overlay: true },
  { id: "cta", from: 38, to: 43, text: "فإذا تبغى عرضك الجاي يكون أنت اللي بنيته بنفسك، اضغط على الرابط في وصف الحلقة واحجز مقعدك.", overlay: true },
  { id: "calm", from: 43, to: 45, text: "وأتمنى أشوفك معنا في الدفعة الثامنة.", overlay: true },
  { id: "outro", from: 45, to: 48, text: "والحين، خلنا نرجع للطريقة الأولى للميزة الثانية", overlay: false },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];
export const TOTAL_SECONDS = 48;
