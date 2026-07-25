import React, { useState } from 'react';
import { Child, IEPPlan } from '../types';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Download, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Brain, 
  User, 
  Activity, 
  Target, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface SmartIEPBuilderProps {
  childrenList: Child[];
  onSaveIEP: (iep: IEPPlan) => void;
  lang: 'ar' | 'en';
}

export const SmartIEPBuilder: React.FC<SmartIEPBuilderProps> = ({
  childrenList,
  onSaveIEP,
  lang
}) => {
  const isAr = lang === 'ar';

  // Form Inputs
  const [selectedChildId, setSelectedChildId] = useState<string>(childrenList[0]?.id || '');
  const [childName, setChildName] = useState<string>(childrenList[0]?.name || 'يوسف أحمد العتيبي');
  const [age, setAge] = useState<number>(7);
  const [gender, setGender] = useState<string>('ذكر');
  const [diagnosis, setDiagnosis] = useState<string>('شلل دماغي حركي خفيف (Spastic Diplegia)');
  const [currentSkills, setCurrentSkills] = useState<string>('المشي بمساعدة المشاية التدريبية، التجاوب مع التعليمات البسيطة، استخدام اليدين في إمساك الأغراض الكبيرة');
  const [challenges, setChallenges] = useState<string>('صعوبة التوازن عند الوقوف الفردي، ضعف قوة عضلات الحوض والظهر، قصر الوتر العرقوبي');
  const [targetGoals, setTargetGoals] = useState<string>('المشي المستقل داخل الفصل، تحسين الثبات الجذعي، زيادة ثقة الطفل ونسبة الاعتماد على النفس');
  const [therapyFocus, setTherapyFocus] = useState<string>('تأهيل حركي شامل + علاج وظيفي + تربية خاصة');

  // AI Generation State
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [generatedIEP, setGeneratedIEP] = useState<any>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // When selected child changes, populate fields
  const handleChildSelect = (id: string) => {
    setSelectedChildId(id);
    const child = childrenList.find(c => c.id === id);
    if (child) {
      setChildName(child.name);
      setAge(child.age);
      setGender(child.gender);
      setDiagnosis(child.diagnosis);
      setCurrentSkills(child.medicalHistory || '');
      setTargetGoals(child.goals.join('، '));
    }
  };

  // Call API to generate IEP via Gemini
  const handleGenerateIEP = async () => {
    setLoadingAI(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/gemini/generate-iep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName,
          age,
          gender,
          diagnosis,
          currentSkills,
          challenges,
          goals: targetGoals,
          therapyFocus
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedIEP(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  // Save generated IEP to Database
  const handleSaveToDB = () => {
    if (!generatedIEP) return;

    const newPlan: IEPPlan = {
      id: `iep-${Date.now()}`,
      childId: selectedChildId || 'c1',
      childName: childName,
      diagnosis: diagnosis,
      shortTermGoals: generatedIEP.shortTermGoals || [],
      longTermGoals: generatedIEP.longTermGoals || [],
      activities: generatedIEP.activities || [],
      therapyTypes: generatedIEP.therapyPlan || ["علاج طبيعي", "تربية خاصة"],
      evaluationCriteria: generatedIEP.evaluationCriteria || "تقييم أسبوعي",
      accommodations: generatedIEP.accommodations || [],
      createdDate: new Date().toISOString().split('T')[0],
      status: 'نشط'
    };

    onSaveIEP(newPlan);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  // Print Report Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'منظومة توليد الخطة التربوية الفردية' : 'Smart IEP Generator Engine'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans">
          {isAr ? 'منشئ الخطة التربوية الفردية الذكي (Smart IEP Builder)' : 'Smart IEP Builder'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
          {isAr
            ? 'قم بإدخال بيانات الطفل وتشخيصه، ودع الذكاء الاصطناعي يصيغ أهداف SMART المحددة، الأنشطة التأهيلية، والتكييفات البيئية وتصدير تقرير رسمي مطبوع.'
            : 'Enter child details and diagnosis to auto-generate evidence-based SMART goals, activities, and printable clinical IEP reports.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT FORM (7 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-700" />
              <span>{isAr ? 'بيانات الطفل والتشخيص السريري' : 'Child Clinical Profile Inputs'}</span>
            </h3>

            {/* Quick Profile Selector */}
            <select
              value={selectedChildId}
              onChange={(e) => handleChildSelect(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold px-3 py-1.5 text-slate-800"
            >
              <option value="">{isAr ? '-- اختر طفل مسجل --' : '-- Select Existing Child --'}</option>
              {childrenList.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">اسم الطفل الثلاثي:</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="أدخل اسم الطفل"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">العمر (سنوات):</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 text-center"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">الجنس:</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2.5 text-xs font-bold text-slate-900"
                >
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">التشخيص الطبي أو الحالة:</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="مثال: شلل دماغي، طيف توحد، متلازمة داون"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">المهارات الحالية والقدرات القائمة:</label>
            <textarea
              rows={2}
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="صف مهارات الطفل الحالية في المشي، التواصل، الاستجابة..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">التحديات الرئيسية والصعوبات:</label>
            <textarea
              rows={2}
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="التحديات الحركية أو السلوكية أو التواصلية"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">الأهداف المرجوة من الأسرة والمعالج:</label>
            <textarea
              rows={2}
              value={targetGoals}
              onChange={(e) => setTargetGoals(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="النتائج المراد تحقيقها"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">مسار ونوع التدخل العلاجي:</label>
            <select
              value={therapyFocus}
              onChange={(e) => setTherapyFocus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900"
            >
              <option value="تأهيل حركي شامل + علاج وظيفي + تربية خاصة">تأهيل حركي شامل + علاج وظيفي + تربية خاصة</option>
              <option value="تأهيل حركي وتوازن بالذكاء الاصطناعي MoveVision">تأهيل حركي وتوازن بالذكاء الاصطناعي MoveVision</option>
              <option value="علاج وظيفي وتنمية المهارات الحركية الدقيقة">علاج وظيفي وتنمية المهارات الحركية الدقيقة</option>
              <option value="تأهيل سلوكي وتواصل لطيف التوحد">تأهيل سلوكي وتواصل لطيف التوحد</option>
            </select>
          </div>

          <button
            onClick={handleGenerateIEP}
            disabled={loadingAI}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>{loadingAI ? (isAr ? 'جاري توليد الخطة الفردية بالذكاء الاصطناعي...' : 'Generating IEP via Gemini AI...') : (isAr ? 'توليد الخطة الفردية (IEP) بالذكاء الاصطناعي' : 'Generate Smart IEP Plan')}</span>
          </button>

        </div>

        {/* GENERATED IEP OUTPUT / PRINT PREVIEW (5 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-900" />
                <h3 className="text-lg font-black text-slate-900">
                  {isAr ? 'الخطة التربوية الفردية المولدّة (IEP)' : 'Generated IEP Plan Output'}
                </h3>
              </div>

              {generatedIEP && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                    title="طباعة الخطة"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="hidden sm:inline">طباعة</span>
                  </button>
                  <button
                    onClick={handleSaveToDB}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>حفظ الخطة</span>
                  </button>
                </div>
              )}
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم حفظ الخطة الفردية للطفل بنجاح في قاعدة البيانات!</span>
              </div>
            )}

            {!generatedIEP && !loadingAI && (
              <div className="py-20 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-sm font-bold text-slate-700">
                  {isAr ? 'لم يتم توليد خطة بعد' : 'No IEP Generated Yet'}
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {isAr ? 'قم بملء بيانات الطفل بالجهة اليمنى واضغط على "توليد الخطة الفردية" لعرض النتائج هنا.' : 'Fill child inputs on the left and click Generate to see AI SMART goals.'}
                </p>
              </div>
            )}

            {loadingAI && (
              <div className="py-24 text-center space-y-4">
                <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-800">جاري صياغة خطة IEP الفردية بواسطة Gemini AI...</p>
                <p className="text-xs text-slate-500">يتم قياس الأهداف التعليمية، التمارين الحركية، وتوصيات التكييف المعتمدة.</p>
              </div>
            )}

            {/* Generated IEP Printable Content Block */}
            {generatedIEP && !loadingAI && (
              <div id="printable-iep" className="space-y-6 text-xs text-slate-800 bg-slate-50/70 p-6 rounded-2xl border border-slate-200">
                
                {/* Header */}
                <div className="border-b border-slate-300 pb-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-blue-950 text-sm block">منصة RM NeuroAI - التقرير السريري الرسمي</span>
                    <span className="text-[11px] text-slate-500">الخطة التربوية والتأهيلية الفردية (IEP)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-bold">حالة: نشط</span>
                </div>

                {/* Child Meta */}
                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-200 font-bold">
                  <div>الاسم: <span className="text-slate-900">{childName}</span></div>
                  <div>العمر: <span className="text-slate-900">{age} سنوات ({gender})</span></div>
                  <div className="col-span-2">التشخيص: <span className="text-teal-700">{diagnosis}</span></div>
                </div>

                {/* Short term goals */}
                <div className="space-y-2">
                  <h4 className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>الأهداف قصيرة المدى (Short-Term SMART Goals):</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    {generatedIEP.shortTermGoals?.map((g: string, i: number) => (
                      <li key={i} className="leading-relaxed">{g}</li>
                    ))}
                  </ul>
                </div>

                {/* Long term goals */}
                <div className="space-y-2">
                  <h4 className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>الأهداف طويلة المدى (Long-Term SMART Goals):</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    {generatedIEP.longTermGoals?.map((g: string, i: number) => (
                      <li key={i} className="leading-relaxed">{g}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Activities */}
                <div className="space-y-2">
                  <h4 className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>الأنشطة والتدريبات الموصى بها:</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    {generatedIEP.activities?.map((a: string, i: number) => (
                      <li key={i} className="leading-relaxed">{a}</li>
                    ))}
                  </ul>
                </div>

                {/* Evaluation Criteria & Accommodations */}
                <div className="space-y-2">
                  <h4 className="font-black text-blue-950 text-xs">معايير التقييم والتعديلات البيئية:</h4>
                  <p className="bg-white p-3 rounded-xl border border-slate-200 leading-relaxed font-bold text-slate-700">
                    {generatedIEP.evaluationCriteria}
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
