import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will fallback to smart mock responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// --- IN-MEMORY DATABASE & SEED DATA (Arabic Primary) ---
interface Child {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  disabilityType: string;
  medicalHistory: string;
  goals: string[];
  motorScore: number;
  cognitiveScore: number;
  engagementLevel: number;
  improvementPrediction: number;
  assignedTherapist: string;
  assignedTeacher: string;
  parentName: string;
  parentPhone: string;
  avatar: string;
}

interface IEPPlan {
  id: string;
  childId: string;
  childName: string;
  diagnosis: string;
  shortTermGoals: string[];
  longTermGoals: string[];
  activities: string[];
  therapyTypes: string[];
  evaluationCriteria: string;
  accommodations: string[];
  createdDate: string;
  status: 'نشط' | 'مكتمل' | 'قيد المراجعة';
}

interface Assessment {
  id: string;
  childId: string;
  childName: string;
  assessmentType: string;
  date: string;
  gaitSymmetryScore: number;
  postureBalanceScore: number;
  romScore: number;
  cognitiveFocusScore: number;
  overallScore: number;
  notes: string;
  aiRecommendations: string[];
}

interface TherapySession {
  id: string;
  childId: string;
  childName: string;
  therapistName: string;
  exercise: string;
  category: 'تأهيل حركي' | 'تربية خاصة' | 'علاج وظيفي' | 'تخاطب';
  durationMinutes: number;
  progressPercent: number;
  sessionDate: string;
  notes: string;
}

interface ResearchPaper {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'التربية الخاصة' | 'التأهيل الحركي' | 'الذكاء الاصطناعي الطبي' | 'التقنيات المساعدة';
  author: string;
  year: number;
  journal: string;
  summaryAr: string;
  keyFindings: string[];
  readTime: string;
}

// Initial Database State
let childrenDB: Child[] = [
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

let iepDB: IEPPlan[] = [
  {
    id: "iep-101",
    childId: "c1",
    childName: "يوسف أحمد العتيبي",
    diagnosis: "شلل دماغي حركي خفيف (Spastic Diplegia)",
    shortTermGoals: [
      "المشي بخطوات متوازنة لمسافة 15 متراً باستخدام المشاية التدريبية في غضون 4 أسابيع.",
      "أداء تمرين إطالة الوتر العرقوبي لمدة 30 ثانية لكل رجل يومياً بمعونة الأسرة.",
      "الوقوف على قدم واحدة بدعم بسيط لمدة 5 ثوانٍ."
    ],
    longTermGoals: [
      "المشي المستقل بدعم طفيف جداً داخل الفصل الدراسي والمدرسة بنهاية الفصل الحالي.",
      "الصعود والهبوط على الدرج المساعد بمهارة وأمان."
    ],
    activities: [
      "جلسات تحليل التوازن الحركي باستخدام كاميرا MoveVision AI مرتين أسبوعياً.",
      "لعبة التوازن الرقمية (Balance Master) لتحفيز الثبات الجذعي.",
      "تمارين المقاومة الخفيفة وتقوية العضلة الرباعية."
    ],
    therapyTypes: ["علاج طبيعي حركي", "تربية خاصة وتعديل سلوك", "ألعاب علاجية ذكية"],
    evaluationCriteria: "تقييم أسبوعي عبر كاميرا التحليل الحركي + مراجعة نسبة تحقيق الهدف الحركي 85%.",
    accommodations: ["توفير كرسي مخصص بزاوية إسناد 90 درجة", "وقت إضافي للتنقل بين الفصول"],
    createdDate: "2026-07-20",
    status: "نشط"
  },
  {
    id: "iep-102",
    childId: "c2",
    childName: "سارة محمد الشمري",
    diagnosis: "طيف التوحد + تأخر حركي دقيق",
    shortTermGoals: [
      "الإمساك الصحيح بالمرسام أو الألوان لمدة 5 دقائق متواصلة أثناء أداء النشاط.",
      "الاستجابة لنداء الاسم والتواصل البصري لمدة 4 ثوانٍ مع المعالج."
    ],
    longTermGoals: [
      "كتابة اسمها وبعض الحرف البسيطة باستخدام الوسائل البصرية المساعدة.",
      "المشاركة في ألعاب جماعية تفاعلية مع أقرانها دقيقة بحد أدنى 10 دقائق."
    ],
    activities: [
      "تطبيق تمارين الأصابع بالصلصال الطبي والرسم باللمس.",
      "لعبة صيد النجوم الرقمية لتنمية التنسيق بين العين واليد.",
      "استخدام جداول الصور البصرية للأنشطة اليومية."
    ],
    therapyTypes: ["علاج وظيفي", "تأهيل نماء عصبي", "مساعد الأسرة الذكي"],
    evaluationCriteria: "ملاحظة السلوك اليومي + مقياس التفاعل البصري الحركي المدمج بالمنصة.",
    accommodations: ["تقليل المشتتات الصوتية بالبيئة الصفية", "استخدام بطاقات التواصل PECS الرقمية"],
    createdDate: "2026-07-18",
    status: "نشط"
  }
];

let assessmentsDB: Assessment[] = [
  {
    id: "ass-201",
    childId: "c1",
    childName: "يوسف أحمد العتيبي",
    assessmentType: "تقييم الحركة والتوازن بالذكاء الاصطناعي (MoveVision AI)",
    date: "2026-07-24",
    gaitSymmetryScore: 82,
    postureBalanceScore: 76,
    romScore: 75,
    cognitiveFocusScore: 88,
    overallScore: 80,
    notes: "يظهر يوسف تحسناً كبيراً في استقامة الركبة أثناء ثني المفصل، مع تقليل ميلان الحوض الأيسر بنسبة 12%.",
    aiRecommendations: [
      "الاستمرار في تمارين الإطالة اليومية للوتر العرقوبي خلف الركبة.",
      "زيادة تكرار لعبة Balance Master بمعدل 10 دقائق يومياً.",
      "استخدام الحذاء الطبي المدعم أثناء التمارين المنزلية."
    ]
  },
  {
    id: "ass-202",
    childId: "c2",
    childName: "سارة محمد الشمري",
    assessmentType: "تقييم المهارات الحركية الدقيقة والتواصل البصري",
    date: "2026-07-22",
    gaitSymmetryScore: 70,
    postureBalanceScore: 68,
    romScore: 72,
    cognitiveFocusScore: 82,
    overallScore: 73,
    notes: "تحسن في تركيز انتباه سارة أثناء الألعاب العلاجية التفاعلية مع زيادة دقة اللمس الشاشات 20%.",
    aiRecommendations: [
      "تطبيق نظام المكافآت التفاعلي المصمم عبر Copilot.",
      "تدرج تمارين القبضة الدقيقة من الحجم الكبير إلى الأصغر."
    ]
  }
];

let therapySessionsDB: TherapySession[] = [
  {
    id: "sess-301",
    childId: "c1",
    childName: "يوسف أحمد العتيبي",
    therapistName: "د. خالد السعيد",
    exercise: "تمرين توازن الجذع وتقوية الرباعية + مشي الموانع",
    category: "تأهيل حركي",
    durationMinutes: 45,
    progressPercent: 85,
    sessionDate: "2026-07-25",
    notes: "أداء ممتاز وتفاعل عالي بدون إجهاد. استطاع إكمال 4 جولات مشي موانع."
  },
  {
    id: "sess-302",
    childId: "c2",
    childName: "سارة محمد الشمري",
    therapistName: "د. مريم الشريف",
    exercise: "تنسيق اليد والعين + ألعاب تحفيز لمسي",
    category: "علاج وظيفي",
    durationMinutes: 30,
    progressPercent: 78,
    sessionDate: "2026-07-24",
    notes: "استجابة ممتازة للأصوات التفاعلية بالمنصة وزيادة وقت التركيز إلى 12 دقيقة متواصلة."
  }
];

let researchPapersDB: ResearchPaper[] = [
  {
    id: "res-1",
    titleAr: "تأثير تقنيات التتبع الحركي بالذكاء الاصطناعي على إعادة تأهيل الأطفال المصابين بالشلل الدماغي",
    titleEn: "Impact of AI Computer Vision Pose Estimation on Pediatric Cerebral Palsy Rehabilitation",
    category: "التأهيل الحركي",
    author: "د. عبد الله الغامدي، د. إيميلي روبرتس",
    year: 2025,
    journal: "الصحيفة الدولية لطب الأعصاب والتقنيات التأهيلية",
    summaryAr: "تبين هذه الدراسة أن استخدام رؤية الكمبيوتر (Computer Vision) لقياس زوايا المفاصل والتناظر الحركي يزيد من سرعة تحقيق أهداف التوازن بنسبة 34% مقارنة بالقياس المباشر التقليدي.",
    keyFindings: [
      "دقة تتجاوز 94% في قياس زوايا مفصل الركبة والحوض بدون مستشعرات قابلة للارتداء.",
      "زيادة التزام الأطفال بالتمارين المنزلية بنسبة 45% عند استخدام الألعاب العلاجية التفاعلية.",
      "تقليل الوقت اللازم لإعداد خطط IEP المخصصة بنسبة 60% بفضل مساعدات AI Copilot."
    ],
    readTime: "5 دقائق"
  },
  {
    id: "res-2",
    titleAr: "الذكاء الاصطناعي التوليدي في تصميم الخطة التربوية الفردية (IEP) لذوي اضطراب طيف التوحد",
    titleEn: "Generative AI Copilots in IEP Goal Generation for Children with Autism Spectrum Disorder",
    category: "التربية الخاصة",
    author: "د. سارة الراشد، د. محمد الخالد",
    year: 2026,
    journal: "مجلة أبحاث التربية الخاصة والتكنولوجيا",
    summaryAr: "تناقش الورقة كيفية الاستفادة من النماذج اللغوية الكبيرة (LLMs) لإنشاء أهداف SMART محددة ومدروسة نمائيًا وتطوير الأنشطة الموائمة لاحتياجات الطفل الفردية.",
    keyFindings: [
      "الأهداف المقترحة بواسطة الذكاء الاصطناعي تلائم معايير SMART بدقة 91%.",
      "المعلمون أقروا بتوفير 4-6 ساعات أسبوعياً في توثيق الخطط وتوليد التقارير.",
      "زيادة رضا أولياء الأمور عن التقارير الدورية الشاملة المترجمة للغة العربية."
    ],
    readTime: "7 دقائق"
  },
  {
    id: "res-3",
    titleAr: "تأثير التمارين العلاجية المنزلية الموجهة ذكائياً على القوة العضلية لدى أطفال متلازمة داون",
    titleEn: "AI-Guided Home Telerehabilitation for Muscle Tone Improvement in Down Syndrome",
    category: "التقنيات المساعدة",
    author: "د. ياسمين الشريف، د. جون سميث",
    year: 2025,
    journal: "مجلة التأهيل الطبي والتمريض الأطفالي",
    summaryAr: "تقيم الدراسة أثر المتابعة اليومية التفاعلية عبر تطبيقات الهاتف الذكي على استمرار الأسرة في تطبيق التمارين الموصى بها وتحسين المقوية العضلية للجذع.",
    keyFindings: [
      "تحسن بنسبة 28% في ثبات القامة ومقوية الجذع بعد 8 أسابيع من التمارين المنزلية الذكية.",
      "ارتفاع نسبة إكمال التدريبات المنزلية من 40% إلى 82% بفضل المساعد التفاعلي العائلي."
    ],
    readTime: "4 دقائق"
  }
];

// --- REST API ENDPOINTS ---

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", platform: "RM NeuroAI Platform", time: new Date().toISOString() });
});

// Children Endpoints
app.get("/api/children", (req, res) => {
  res.json({ success: true, data: childrenDB });
});

app.get("/api/children/:id", (req, res) => {
  const child = childrenDB.find(c => c.id === req.params.id);
  if (!child) {
    return res.status(404).json({ success: false, error: "Child not found" });
  }
  res.json({ success: true, data: child });
});

app.post("/api/children", (req, res) => {
  const newChild: Child = {
    id: `c${Date.now()}`,
    name: req.body.name || "طفل جديد",
    age: Number(req.body.age) || 6,
    gender: req.body.gender || "ذكر",
    diagnosis: req.body.diagnosis || "غير محدد",
    disabilityType: req.body.disabilityType || "تأخر نمائي",
    medicalHistory: req.body.medicalHistory || "لا يوجد ملاحظات سابقة",
    goals: req.body.goals || ["تحسين المهارات الحركية"],
    motorScore: 70,
    cognitiveScore: 75,
    engagementLevel: 85,
    improvementPrediction: 80,
    assignedTherapist: req.body.assignedTherapist || "د. معالج متناوب",
    assignedTeacher: req.body.assignedTeacher || "أ. معلم خاص",
    parentName: req.body.parentName || "ولي الأمر",
    parentPhone: req.body.parentPhone || "+966 50 000 0000",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80"
  };
  childrenDB.unshift(newChild);
  res.json({ success: true, data: newChild });
});

// IEP Endpoints
app.get("/api/ieps", (req, res) => {
  res.json({ success: true, data: iepDB });
});

app.post("/api/ieps", (req, res) => {
  const newIEP: IEPPlan = {
    id: `iep-${Date.now()}`,
    childId: req.body.childId || "c1",
    childName: req.body.childName || "طفل بدون اسم",
    diagnosis: req.body.diagnosis || "تشخيص عام",
    shortTermGoals: req.body.shortTermGoals || [],
    longTermGoals: req.body.longTermGoals || [],
    activities: req.body.activities || [],
    therapyTypes: req.body.therapyTypes || ["علاج طبيعي", "تربية خاصة"],
    evaluationCriteria: req.body.evaluationCriteria || "ملاحظة أسبوعية",
    accommodations: req.body.accommodations || ["تكييف بيئي بسيط"],
    createdDate: new Date().toISOString().split("T")[0],
    status: "نشط"
  };
  iepDB.unshift(newIEP);
  res.json({ success: true, data: newIEP });
});

// Assessments
app.get("/api/assessments", (req, res) => {
  res.json({ success: true, data: assessmentsDB });
});

app.post("/api/assessments", (req, res) => {
  const newAss: Assessment = {
    id: `ass-${Date.now()}`,
    childId: req.body.childId || "c1",
    childName: req.body.childName || "طفل",
    assessmentType: req.body.assessmentType || "تقييم حركي عام",
    date: new Date().toISOString().split("T")[0],
    gaitSymmetryScore: Number(req.body.gaitSymmetryScore) || 75,
    postureBalanceScore: Number(req.body.postureBalanceScore) || 75,
    romScore: Number(req.body.romScore) || 75,
    cognitiveFocusScore: Number(req.body.cognitiveFocusScore) || 80,
    overallScore: Number(req.body.overallScore) || 76,
    notes: req.body.notes || "تم إجراء التقييم بنجاح.",
    aiRecommendations: req.body.aiRecommendations || ["مواصلة التدريب التفاعلي"]
  };
  assessmentsDB.unshift(newAss);
  res.json({ success: true, data: newAss });
});

// Therapy Sessions
app.get("/api/therapy-sessions", (req, res) => {
  res.json({ success: true, data: therapySessionsDB });
});

app.post("/api/therapy-sessions", (req, res) => {
  const newSession: TherapySession = {
    id: `sess-${Date.now()}`,
    childId: req.body.childId || "c1",
    childName: req.body.childName || "يوسف أحمد",
    therapistName: req.body.therapistName || "د. المعالج",
    exercise: req.body.exercise || "تمارين حركية شاملة",
    category: req.body.category || "تأهيل حركي",
    durationMinutes: Number(req.body.durationMinutes) || 40,
    progressPercent: Number(req.body.progressPercent) || 80,
    sessionDate: new Date().toISOString().split("T")[0],
    notes: req.body.notes || "جلسة ممتازة"
  };
  therapySessionsDB.unshift(newSession);
  res.json({ success: true, data: newSession });
});

// Research papers
app.get("/api/research-papers", (req, res) => {
  res.json({ success: true, data: researchPapersDB });
});

// --- GEMINI AI POWERED ENDPOINTS ---

// 1. IEP Generation Endpoint
app.post("/api/gemini/generate-iep", async (req, res) => {
  const { childName, age, gender, diagnosis, currentSkills, challenges, goals, therapyFocus } = req.body;

  const ai = getGeminiClient();

  if (!ai) {
    // Fallback response if GEMINI_API_KEY is not configured
    const fallbackIEP = {
      shortTermGoals: [
        `تحسين الثبات الجذعي والتوازن أثناء الوقوف لمدة 10 ثوانٍ خلال 4 أسابيع.`,
        `أداء أنشطة التنسيق بين اليد والعين بنجاح بنسبة 80% في 3 جلسات متتالية.`,
        `اتباع التعليمات البسيطة المكونة من خطوتين داخل الفصل الدراسي.`
      ],
      longTermGoals: [
        `المشي المستقل أو التنقل بآمان وبدون تعثر داخل الفصل والمحيط المدرسي خلال الفصل الدراسي.`,
        `التواصل الفعال والتفاعل مع الأقران في أنشطة التربية الخاصة الجماعية.`
      ],
      activities: [
        `جلسات التتبع الحركي اليومية عبر تطبيق MoveVision AI لمتابعة زوايا الركبة والاتزان.`,
        `لعبة صيد النجوم التفاعلية (Catch the Star) لمدة 15 دقيقة يومياً.`,
        `تمارين إطالة وتقوية المفاصل السفلية مع بطاقات التوجيه البصري.`
      ],
      therapyPlan: [
        `جلسات علاج طبيعي 3 مرات أسبوعياً للتركيز على المدى الحركي والتوازن.`,
        `جلسات علاج وظيفي مرتين أسبوعياً لتقوية المهارات الحركية الدقيقة.`,
        `دعم سلوكي وتوجيه إرشادي للأسرة بشكل أسبوعي.`
      ],
      evaluationCriteria: `تقييم أسبوعي مبني على تحليلات كاميرا MoveVision الرقمية + ملاحظات المعلم اليومية بنسبة إنجاز لا تقل عن 80%`,
      accommodations: [
        `توفير مقعد مريح ومسند للظهر والرجليْن بزاوية قائمة.`,
        `تقسيم المهام الحركية والأكاديمية إلى خطوات قصيرة مع معزز بصرية.`,
        `إتاحة وقت إضافي للانتقال بين القاعات والتنفيذ.`
      ]
    };
    return res.json({ success: true, data: fallbackIEP, isFallback: true });
  }

  try {
    const prompt = `
أنت خبير أرشد واستشاري في التربية الخاصة والتأهيل الحركي للأطفال والذكاء الاصطناعي الطبي.
قم بإنشاء خطة تربوية فردية (IEP) متكاملة ومحترفة بلغة عربية نصية واضحة ومحددة وفق معايير SMART للطفل التالي:
- اسم الطفل: ${childName || 'غير مسمى'}
- العمر: ${age || 7} سنوات (${gender || 'ذكر'})
- التشخيص الطبي: ${diagnosis || 'تأخر حركي ونمائي'}
- المهارات الحالية: ${currentSkills || 'قدرة على الاستجابة البصرية المباشرة وبعض الحركة البسيطة'}
- التحديات الرئيسية: ${challenges || 'ضعف الاتزان والمهارات الحركية الدقيقة'}
- الأهداف المرجوة من الأسرة والمعالج: ${goals || 'تحسين التوازن والاعتماد على النفس'}
- التركيز العلاجي: ${therapyFocus || 'تأهيل حركي وتربية خاصة'}

يرجى إرجاع النتيجة كـ JSON حصرًا بالهيكل التالي (بدون أية علامات markdown إضافية خارج الـ JSON):
{
  "shortTermGoals": ["هدف قصير المدى 1", "هدف قصير المدى 2", "هدف قصير المدى 3"],
  "longTermGoals": ["هدف طويل المدى 1", "هدف طويل المدى 2"],
  "activities": ["نشاط تدريبي 1", "نشاط تدريبي 2", "نشاط تدريبي 3"],
  "therapyPlan": ["خطة علاجية 1", "خطة علاجية 2", "خطة علاجية 3"],
  "evaluationCriteria": "معايير التقييم والمتابعة الدورية",
  "accommodations": ["تكييف وتعديل 1", "تكييف وتعديل 2", "تكييف وتعديل 3"]
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text || "{}";
    const parsedData = JSON.parse(resultText);

    res.json({ success: true, data: parsedData });
  } catch (err: any) {
    console.error("Gemini IEP generation error:", err);
    res.status(500).json({ success: false, error: err.message || "فشل في إنشاء الخطة الفردية عبر الذكاء الاصطناعي" });
  }
});

// 2. Family AI Assistant Chat Endpoint
app.post("/api/gemini/family-chat", async (req, res) => {
  const { message, history } = req.body;

  const ai = getGeminiClient();

  if (!ai) {
    const fallbackAnswers: Record<string, string> = {
      default: "مرحباً بك! أنا مساعد منصة RM NeuroAI للأسرة. يسعدني إجابة أسئلتك حول تمارين طفلك المنزلية، التغذية الداعمة، وتسهيل خطوات الخطة العلاجية والتربوية الفردية."
    };
    return res.json({
      success: true,
      reply: "أهلاً بك! يسعدني جداً مساعدتك بصفتي المساعد الذكي لأسرة منصة RM NeuroAI. بالنسبة لتطوير المهارات الحركية والتكيف اليومي في المنزل، يُنصح دائماً بالاستمرار في التمارين القصيرة الممتعة (10-15 دقيقة مرتين يومياً) مع استخدام التعزيز الايجابي البصري والصوتي. هل تحب أن أستعرض مع قائمة تمارين منزلية مخصصة للطفل؟",
      isFallback: true
    });
  }

  try {
    const systemInstruction = `
أنت المساعد الذكي لأسرة منصة RM NeuroAI ("AI Family Assistant").
وظيفتك دعم وتوجيه أولياء أمور الأطفال ذوي الإعاقة الحركية، طيف التوحد، الشلل الدماغي، متلازمة داون، والتأخر النمائي.
أسلوبك: متعاطف، داعم، علمي موثوق، سهل الفهم، باللغة العربية الفصحى المبسطة المشجعة.
قواعدك:
1. قدم نصائح منزلية تطبيقية وآمنة.
2. شجع الأسرة وشدد على دور الشراكة مع المعالج والمعلم.
3. لا تقدم تشخيصات طبية قاطعة، بل وضح إرشادات داعمة للممارسة اليومية.
4. اذكر دائماً كيف تخدم المنصة (مثل MoveVision AI، ألعاب التأهيل، ومتابعة الأهداف) مسيرة طفلهم.
    `;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: systemInstruction,
      },
    });

    // Send the user message
    const response = await chat.sendMessage({ message: message || "كيف أساعد طفلي على أداء التمارين المنزلية دون ملل؟" });

    res.json({ success: true, reply: response.text });
  } catch (err: any) {
    console.error("Gemini Family Chat error:", err);
    res.status(500).json({ success: false, error: err.message || "حدث خطأ في المساعد الذكي" });
  }
});

// 3. Research Assistant Endpoint
app.post("/api/gemini/research-assistant", async (req, res) => {
  const { query, topic } = req.body;

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      success: true,
      summary: `تظهر الأبحاث العلمية الحديثة حول "${topic || query || 'التربية الخاصة والتأهيل الحركي'}" أن المدمج بين التتبع البصري الذكي والألعاب العلاجية يزيد من المعدل التراكمي لاستجابة العضلات بنسبة تصل إلى 30% مع رفع دقة قياسات المدى الحركي (ROM).`,
      keyTakeaways: [
        "الدمج بين الذكاء الاصطناعي والتفاعل اللعبي يقلل من مقاومة الطفل للتمارين.",
        "التوثيق الرقمي للأهداف يوفر بيانات دقيقة للمشرف المعالج لاتخاذ قرارات أسرع.",
        "مشاركة أولياء الأمور عبر التطبيقات الذكية تعزز الاستمرارية والتطور المستدام."
      ],
      isFallback: true
    });
  }

  try {
    const prompt = `
أنت باحث خبير ومساعد أبحاث أكاديمي في منصة RM NeuroAI متخصص في التربية الخاصة، إعادة التأهيل الحركي للأطفال، الذكاء الاصطناعي الطبي، والتقنيات المساعدة.
قم بتحليل وتقديم ملخص أبحاث علمي رصين ومحدث باللغة العربية للموضوع أو الاستفسار التالي:
"${query || topic || 'التقنيات الحديثة في تأهيل المشي لدى أطفال الشلل الدماغي'}"

أرجع النتيجة بتنسيق JSON حصرًا:
{
  "summary": "ملخص شامل للأدبيات والدراسات الحديثة في 3-4 فقرات محكمة",
  "keyTakeaways": ["فائدة علمية 1", "فائدة علمية 2", "فائدة علمية 3", "فائدة علمية 4"],
  "clinicalRelevance": "كيفية تطبيق هذه النتائج في الممارسة العملية للمعالجين والمعلمين"
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (err: any) {
    console.error("Research assistant error:", err);
    res.status(500).json({ success: false, error: err.message || "فشل في توليد ملخص البحث" });
  }
});

// 4. MoveVision AI Motion Analysis Endpoint
app.post("/api/gemini/analyze-pose", async (req, res) => {
  const { gaitSymmetry, postureBalance, romAngle, exerciseType, childDiagnosis } = req.body;

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      success: true,
      analysis: `تحليل الحركة والتوازن الآلي لتمرين (${exerciseType || 'تقييم الحركة العام'}): أظهر التتبع استقرار مفصل الحوض بنسبة ${gaitSymmetry || 80}% مع زاوية انثناء المفاصل ${romAngle || 75} درجة.`,
      clinicalStatus: "تحسن إيجابي ملحوظ",
      recommendations: [
        "التركيز على تمارين تدعيم الحوض والعضلة الأليوية الوسطى.",
        "زيادة زمن التوازن على قدم واحدة بمقدار 3 ثوانٍ إضافية.",
        "إدراج لعبة Balance Master لترسيخ القوة الجذعية."
      ],
      isFallback: true
    });
  }

  try {
    const prompt = `
أنت نظام MoveVision AI المتخصص في تحليل الحركة البيوميكانيكية وتقييم الوضعية الجسدية لدى أطفال التأهيل الحركي.
قم بتقديم تحليل حركي سريري مفصل بناءً على القياسات التالية:
- نوع التمرين/التقييم: ${exerciseType || 'ثبات الوقوف والمشي'}
- درجة تناظر المشي (Gait Symmetry): ${gaitSymmetry || 78}%
- ثبات القامة والتوازن (Posture Balance): ${postureBalance || 75}%
- مدى حركة المفصل (ROM Angle): ${romAngle || 80} درجة
- تشخيص الطفل: ${childDiagnosis || 'شلل دماغي حركي خفيف'}

قدم النتيجة بتنسيق JSON حصرًا:
{
  "analysis": "تحليل سريري بيوميكانيكي دقيق باللغة العربية",
  "clinicalStatus": "حالة المريض الحركية (ممتاز / تحسن ملحوظ / يحتاج تعديل / مستقر)",
  "recommendations": ["توصية حركية 1", "توصية حركية 2", "توصية حركية 3"]
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (err: any) {
    console.error("MoveVision analysis error:", err);
    res.status(500).json({ success: false, error: err.message || "فشل في تحليل البيانات الحركية" });
  }
});

// Setup Vite Development Middleware or Static Production File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RM NeuroAI Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
