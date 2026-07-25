import { Child, IEPPlan, Assessment, TherapySession, ResearchPaper, HomeExercise } from '../types';

export const INITIAL_CHILDREN: Child[] = [
  {
    id: "c1",
    name: "يوسف أحمد العتيبي",
    age: 7,
    gender: "ذكر",
    diagnosis: "شلل دماغي حركي خفيف (Spastic Diplegia)",
    disabilityType: "إعاقة حركية ونموية",
    medicalHistory: "صعوبات في الاتزان أثناء المشي، قصر في الوتر العرقوبي، تحسن ملحوظ بالتمارين",
    goals: ["تحسين نمط المشي والتوازن", "زيادة مدى حركة المفاصل السفلى", "تعزيز الاعتماد على النفس في ارتداء الملابس"],
    motorScore: 78,
    cognitiveScore: 85,
    engagementLevel: 92,
    improvementPrediction: 88,
    assignedTherapist: "د. خالد السعيد (علاج طبيعي)",
    assignedTeacher: "أ. أمل الحربي (تربية خاصة)",
    parentName: "أحمد العتيبي",
    parentPhone: "+966 50 123 4567",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "c2",
    name: "سارة محمد الشمري",
    age: 6,
    gender: "أنثى",
    diagnosis: "طيف التوحد (درجة متوسطة) + تأخر حركي دقيق",
    disabilityType: "اضطراب النماء العصبي",
    medicalHistory: "صعوبة التواصل اللفظي المباشر، فرط حساسية لمسية، إنجاز ممتاز مع الألعاب التفاعلية Visuals",
    goals: ["التواصل البصري والتفاعل اللفظي", "تحسين المهارات الحركية الدقيقة (مسك القلم)", "تقليل الحركات التكرارية"],
    motorScore: 65,
    cognitiveScore: 72,
    engagementLevel: 80,
    improvementPrediction: 82,
    assignedTherapist: "د. مريم الشريف (علاج وظيفي)",
    assignedTeacher: "أ. نورة الغامدي (تربية خاصة)",
    parentName: "أم سارة",
    parentPhone: "+966 55 987 6543",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "c3",
    name: "عمر فيصل القحطاني",
    age: 9,
    gender: "ذكر",
    diagnosis: "متلازمة داون + ضعف العضلات العام (Hypotonia)",
    disabilityType: "متلازمة جينية وتأخر نماء شامل",
    medicalHistory: "مرونة عالية في المفاصل، قلة الثبات الجذعي، استجابة عالية للتعزيز الصوتي واللعب",
    goals: ["تقوية عضلات الجذع والظهر", "تحسين ثبات الجلوس والوقوف", "تطوير النطق واللغة استقبالاً وتعبيرًا"],
    motorScore: 70,
    cognitiveScore: 75,
    engagementLevel: 95,
    improvementPrediction: 85,
    assignedTherapist: "د. طارق الزهراني (تأهيل حركي)",
    assignedTeacher: "أ. حسام الدوسري (تربية خاصة)",
    parentName: "فيصل القحطاني",
    parentPhone: "+966 54 321 0987",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "c4",
    name: "ليان فهد المطيري",
    age: 5,
    gender: "أنثى",
    diagnosis: "تأخر نمائي حركي شامل (Developmental Delay)",
    disabilityType: "تأخر نمائي",
    medicalHistory: "تأخر الوقوف والمشي بدون مساعدة، تحسن استجابة التوازن بواسطة MoveVision AI",
    goals: ["المشي المستقل لمسافة 10 أمتار", "تحسين التنسيق الحركي بين العين واليد"],
    motorScore: 62,
    cognitiveScore: 88,
    engagementLevel: 89,
    improvementPrediction: 90,
    assignedTherapist: "د. سارة الراشد (تأهيل أطفال)",
    assignedTeacher: "أ. هند المالكي (تربية خاصة)",
    parentName: "فهد المطيري",
    parentPhone: "+966 56 654 3210",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  }
];

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
