import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

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

// --- REST API ENDPOINTS ---

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", platform: "RM NeuroAI Platform", time: new Date().toISOString() });
});

type AuthenticatedRequest = express.Request & { supabase?: SupabaseClient; authUser?: User };

// Verify every API access token with Supabase Auth. The scoped client forwards the same
// user JWT to PostgREST so PostgreSQL RLS, not a service-role key, controls data access.
app.use("/api", async (req, res, next) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  const match = (req.header("authorization") || "").match(/^Bearer\s+(.+)$/i);

  if (!url || !key) {
    return res.status(503).json({ success: false, error: "Supabase server configuration is missing." });
  }
  if (!match) return res.status(401).json({ success: false, error: "Authentication required." });

  const token = match[1];
  try {
    const authClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data, error } = await authClient.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ success: false, error: "Invalid or expired session." });
    }

    const requestClient = createClient(url, key, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const authenticatedRequest = req as AuthenticatedRequest;
    authenticatedRequest.authUser = data.user;
    authenticatedRequest.supabase = requestClient;
    return next();
  } catch (error) {
    console.error("Supabase token verification failed:", error);
    return res.status(503).json({ success: false, error: "Authentication service is temporarily unavailable." });
  }
});

// Legacy in-memory data endpoints are disabled until tenant-scoped Supabase queries are implemented.
// This prevents prototype child profiles and non-persistent writes from being exposed as application data.
const dataMigrationPending = (_req: express.Request, res: express.Response) => {
  res.status(503).json({
    success: false,
    code: "DATA_LAYER_MIGRATION_PENDING",
    error: "This endpoint is temporarily disabled while its tenant-scoped Supabase implementation is completed.",
  });
};

app.all("/api/children", dataMigrationPending);
app.all("/api/children/:id", dataMigrationPending);
app.all("/api/ieps", dataMigrationPending);
app.all("/api/assessments", dataMigrationPending);
app.all("/api/therapy-sessions", dataMigrationPending);
app.all("/api/research-papers", dataMigrationPending);

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
