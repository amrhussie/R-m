import { Child, IEPPlan, Assessment, TherapySession, ResearchPaper, HomeExercise } from '../types';

export const INITIAL_CHILDREN: Child[] = [];

export const INITIAL_HOME_EXERCISES: HomeExercise[] = [
  {
    id: "ex-1",
    title: "تمرين توازن الجذع مع رفع القدم البديلة",
    category: "تأهيل حركي - توازن",
    duration: "10 دقائق",
    reps: "10 تكرارات لكل قدم",
    completed: true,
    videoThumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=80",
    instructions: [
      "ضع الطفل في وضعية الوقوف على المفرش التدريبي مع وضع يديه على الجذع.",
      "اطلب منه رفع القدم اليمنى ببطء لمستوى الكاحل لمدة 3 ثوانٍ.",
      "كرر مع القدم اليسرى مع إعطاء تشجيع صوتي بصوت مبتهج."
    ],
    tips: "استخدم كاميرا MoveVision للتحقق من زاوية ميلان الحوض ومستوى الثبات."
  },
  {
    id: "ex-2",
    title: "تمرين تقوية الأصابع والمسكة القلمية بالصلصال",
    category: "علاج وظيفي - دقيق",
    duration: "15 دقيقة",
    reps: "جولتان متتاليتان",
    completed: false,
    videoThumb: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&auto=format&fit=crop&q=80",
    instructions: [
      "تجهيز الصلصال الطبي متوسط المرونة بألوان مبهجة.",
      "طلب ضغط الصلصال بالإبهام والسبابة لعمل كرات صغيرة.",
      "ضع النجوم البلاستيكية داخل الصلصال ليقوم الطفل باستخراجها بأصابعه."
    ],
    tips: "يساعد هذا التمرين على إعداد اليد للكتابة وزيادة القوة العضلية الدقيقة."
  },
  {
    id: "ex-3",
    title: "لعبة صيد النجوم الرقمية (Catch the Star)",
    category: "ألعاب علاجية ذكية",
    duration: "10 دقائق",
    reps: "3 جولات تفاعلية",
    completed: false,
    videoThumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80",
    instructions: [
      "افتح قسم الألعاب العلاجية بالمنصة واختر لعبة Catch the Star.",
      "اجعل الطفل يلمس الشاشة أو يحرك مؤشر الماوس للقبض على النجوم المتحركة.",
      "سجل النتيجة المحدثة تلقائياً في ملف الطفل."
    ],
    tips: "تزيد هذه اللعبة من زمن الانتباه والتنسيق بين العين واليد."
  }
];
