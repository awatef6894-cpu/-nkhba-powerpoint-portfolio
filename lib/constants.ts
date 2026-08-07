export const WHATSAPP_LINK = "https://wa.me/message/ACJNQVYEG5PXB1";

export const HERO_CONTENT = {
  title: "لكل فكرة، حضور يليق بها.",
  subtitle:
    "منذ أول شريحة إلى آخر تفصيل، نصمم العروض التي تُروى بها القرارات الكبرى — لا لتُعرض فحسب، بل لتُصدَّق وتُذكر.",
  tagline: "هنا لا نصمم شرائح. نصمم الانطباع الأول عن مؤسستكم.",
};

export const HERO_LAYER_IMAGES = [
  { src: "/images/portfolio/haramain-1.jpg", alt: "نموذج عرض تقديمي حقيقي من أعمالنا" },
  { src: "/images/portfolio/riyadbank-1.jpg", alt: "نموذج عرض تقديمي حقيقي من أعمالنا" },
  { src: "/images/portfolio/energy-1.jpg", alt: "نموذج عرض تقديمي حقيقي من أعمالنا" },
  { src: "/images/portfolio/ehsan-2.jpg", alt: "نموذج عرض تقديمي حقيقي من أعمالنا" },
  { src: "/images/portfolio/studio-intro.jpg", alt: "نخبة البوربوينت" },
];

export const INTRO_CONTENT = {
  title: "أعمالٌ لا تُعرض، بل تُروى",
  text: "كل مشروع هنا خرج من طاولة عمل حقيقية، لعميل حقيقي، وقرار كان لا بد أن يُتخذ. لسنا هنا لنُريكم قوالب جاهزة، بل لنُريكم كيف تتحول فكرة مؤسسة إلى لغة بصرية تستحق الوقوف أمامها.",
};

export type ClientSection = {
  id: string;
  name: string;
  title: string;
  text: string;
  images: { src: string; alt: string }[];
};

export const CLIENT_SECTIONS: ClientSection[] = [
  {
    id: "haramain",
    name: "الهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي",
    title: "حين يكون المقام أكبر من أي تصميم عادي",
    text: "بعض المشاريع لا تحتمل خطأً واحدًا في الذوق أو التوقيت. هنا، صُمم كل عرض بوعي كامل لثقل المقام الذي يمثله — دقة في التفاصيل، واحترام في كل خط ولون، لأن بعض العروض لا تخاطب جمهورًا فحسب، بل تخاطب مكانة.",
    images: [
      { src: "/images/portfolio/haramain-1.jpg", alt: "نموذج عرض تقديمي للهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي" },
      { src: "/images/portfolio/haramain-2.jpg", alt: "نموذج عرض تقديمي للهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي" },
      { src: "/images/portfolio/haramain-3.jpg", alt: "نموذج عرض تقديمي للهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي" },
      { src: "/images/portfolio/haramain-4.jpg", alt: "نموذج عرض تقديمي للهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي" },
    ],
  },
  {
    id: "riyadbank",
    name: "بنك الرياض",
    title: "حين تتحدث الثقة المالية بلغة بصرية واحدة",
    text: "في القطاع المصرفي، كل شريحة هي انعكاس لهوية تدير ثقة الملايين. صممنا عروضًا توازن بين الصرامة المؤسسية والحداثة البصرية، بحيث يشعر من يراها أنه أمام جهة تعرف بالضبط من هي.",
    images: [
      { src: "/images/portfolio/riyadbank-1.jpg", alt: "نموذج عرض تقديمي لبنك الرياض" },
      { src: "/images/portfolio/riyadbank-2.jpg", alt: "نموذج عرض تقديمي لبنك الرياض" },
    ],
  },
  {
    id: "energy",
    name: "السعودية للطاقة",
    title: "تعقيد المشاريع الكبرى، بوضوح بصري لا يُشتت",
    text: "مشاريع الطاقة تحمل أرقامًا ومراحل وتفاصيل تقنية دقيقة. مهمتنا كانت تحويل هذا التعقيد إلى لوحات معلومات وتقارير تنفيذية تُقرأ في ثوانٍ، وتُتخذ على أساسها قرارات في دقائق.",
    images: [
      { src: "/images/portfolio/energy-1.jpg", alt: "نموذج عرض تقديمي للسعودية للطاقة" },
      { src: "/images/portfolio/energy-2.jpg", alt: "نموذج عرض تقديمي للسعودية للطاقة" },
    ],
  },
  {
    id: "ehsan",
    name: "منصة إحسان",
    title: "حين يستحق العمل الإنساني حضورًا بصريًا يليق به",
    text: "الأثر الحقيقي لا يحتاج ضجيجًا بصريًا، بل صدقًا في التصميم. صممنا لمنصة إحسان محتوى بصريًا ينقل الرسالة بنفس النقاء الذي تحمله المبادرة نفسها — بلا مبالغة، وبكل الاحترام الذي يستحقه العمل الخيري.",
    images: [
      { src: "/images/portfolio/ehsan-1.jpg", alt: "نموذج عرض تقديمي لمنصة إحسان" },
      { src: "/images/portfolio/ehsan-2.jpg", alt: "نموذج عرض تقديمي لمنصة إحسان" },
      { src: "/images/portfolio/ehsan-3.jpg", alt: "نموذج عرض تقديمي لمنصة إحسان" },
    ],
  },
];

export const FLOATING_CARDS = [
  { src: "/images/portfolio/haramain-2.jpg", alt: "نموذج عرض تقديمي للهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي" },
  { src: "/images/portfolio/riyadbank-2.jpg", alt: "نموذج عرض تقديمي لبنك الرياض" },
  { src: "/images/portfolio/energy-2.jpg", alt: "نموذج عرض تقديمي للسعودية للطاقة" },
  { src: "/images/portfolio/ehsan-3.jpg", alt: "نموذج عرض تقديمي لمنصة إحسان" },
  { src: "/images/portfolio/haramain-4.jpg", alt: "نموذج عرض تقديمي للهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي" },
  { src: "/images/portfolio/riyadbank-1.jpg", alt: "نموذج عرض تقديمي لبنك الرياض" },
];

export const CLOSING_CONTENT = {
  title: "مشروعكم القادم يستحق نفس هذا المستوى",
  text: "لسنا هنا لنُقنعكم بالكلام. الأعمال التي رأيتموها للتو هي حجتنا الوحيدة. إن كان مشروعكم القادم يستحق حضورًا بصريًا بهذا المستوى، فالخطوة التالية بسيطة.",
  cta: "لنبدأ حديثًا عن مشروعكم",
};
