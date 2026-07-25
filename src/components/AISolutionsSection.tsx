import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Brain, 
  Activity, 
  HeartHandshake, 
  Bot, 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Video,
  FileCheck,
  Zap,
  Play
} from 'lucide-react';

interface AISolutionsSectionProps {
  onNavigate: (page: PageId) => void;
  lang: 'ar' | 'en';
  onOpenFamilyChat: () => void;
}

export const AISolutionsSection: React.FC<AISolutionsSectionProps> = ({
  onNavigate,
  lang,
  onOpenFamilyChat
}) => {
  const isAr = lang === 'ar';
  const [selectedModule, setSelectedModule] = useState<string>('copilot');

  const modules = [
    {
      id: 'copilot',
      page: 'iep-builder' as PageId,
      titleAr: 'AI Special Education Copilot',
      titleEn: 'AI Special Education Copilot',
      badgeAr: 'مساعد الخطة التربوية',
      icon: Brain,
      color: 'bg-blue-600',
      descriptionAr: 'نظام توليدي متقدم يعتمد على نماذج Gemini الذكية لصياغة الخطط الفردية، اقتراح أهداف SMART، وكتابة التقارير السريرية الشاملة.',
      featuresAr: [
        'إنشاء IEP ذكي بنقرة واحدة متطابق مع حالة الطفل المعرفية والحركية',
        'اقتراح أهداف تعليمية وقصيرة وطويلة المدى بدقة نماء عالية',
        'كتابة وتقييم التقارير الموجهة لأولياء الأمور والإدارة المدرسة',
        'تحليل مستمر لتقدم الطفل واقتراح تعديل الأنشطة الموائمة'
      ]
    },
    {
      id: 'movevision',
      page: 'assessment' as PageId,
      titleAr: 'MoveVision AI',
      titleEn: 'MoveVision AI',
      badgeAr: 'رؤية الكمبيوتر البيوميكانيكية',
      icon: Activity,
      color: 'bg-teal-600',
      descriptionAr: 'منظومة تحليل الحركة عبر كاميرات الأجهزة العادية، بدون أية مستشعرات سلكية أو قابلة للارتداء مجهدة للطفل.',
      featuresAr: [
        'تحليل الحركة والتوازن المباشر للكاميرا بمعدل 30 إطاراً في الثانية',
        'تقييم تناظر المشي (Gait Symmetry) وزوايا الحوض والركبة',
        'تحليل ثبات القامة والتوازنات الجذعية الديناميكية',
        'متابعة ومقارنة التطور الحركي عبر خط زمني رسومي دقيق'
      ]
    },
    {
      id: 'rehabhome',
      page: 'parent-dashboard' as PageId,
      titleAr: 'Rehab Home AI',
      titleEn: 'Rehab Home AI',
      badgeAr: 'التمارين المنزلية التفاعلية',
      icon: HeartHandshake,
      color: 'bg-emerald-600',
      descriptionAr: 'منصة التدريبات العلاجية المنزلية الذكية التي تحافظ على استمرارية التمارين بين الأسرة والمعالج بدقة وثبات.',
      featuresAr: [
        'جدولة تمارين منزلية تفاعلية مصحوبة بفيديوهات توضيحية خطوة بخطوة',
        'متابعة نسبة التزام وتنفيذ الأسرة اليومي للأنشطة الموصى بها',
        'توليد تقارير أسبوعية آلية تُرسل للأخصائي لتقييم النتائج',
        'نظام تشجيع وبادجات رقمية تحفز الطفل على الإنجاز'
      ]
    },
    {
      id: 'familychat',
      page: 'home' as PageId,
      titleAr: 'AI Family Assistant',
      titleEn: 'AI Family Assistant',
      badgeAr: 'المساعد العائلي 24/7',
      icon: Bot,
      color: 'bg-amber-600',
      descriptionAr: 'مساعد ذكاء اصطناعي تفاعلي موجه لأولياء الأمور للإجابة عن التساؤلات اليومية وتقديم الدعم النفسي والتعليمي.',
      featuresAr: [
        'مساعد عائلي متخصص يجيب باللغة العربية الفصحى المبسطة',
        'الإجابة الفورية عن أسئلة السلوك، التغذية، والتمارين المنزلية',
        'إرشادات يومية مخصصة للتعامل مع نوبات الغضب أو الإجهاد الحركي',
        'ربط مستمر مع أهداف IEP الطفل لتعزيز التكامل'
      ]
    },
    {
      id: 'games',
      page: 'therapy-games' as PageId,
      titleAr: 'Therapy Games',
      titleEn: 'Therapy Games',
      badgeAr: 'الألعاب التأهيلية الرقمية',
      icon: Gamepad2,
      color: 'bg-purple-600',
      descriptionAr: 'مجموعة ألعاب علاجية تفاعلية مصممة خصيصاً لزيادة دقة المهارات الحركية، ثبات التوازن، وتركيز الانتباه.',
      featuresAr: [
        'ألعاب تفاعلية ممتعة (صيد النجوم، سيد التوازن، مطابقة الأنماط)',
        'تحسين الانتباه والتركيز الذهني أثناء أداء التمرين الحركي',
        'تنمية المهارات الحركية الدقيقة والتنسيق بين العين واليد',
        'تسجيل أداء ودرجات الطفل تلقائياً ضمن ملف التقييم'
      ]
    }
  ];

  const currentMod = modules.find(m => m.id === selectedModule) || modules[0];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'حلول الذكاء الاصطناعي المتقدمة' : 'Advanced AI Modules'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-sans">
          {isAr ? 'حزمة حلول RM NeuroAI للتربية الخاصة والتأهيل' : 'RM NeuroAI Suite of Special Education & Rehabilitation'}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
          {isAr
            ? 'اكتشف الوحدات الذكية الخمس التي تميز منصتنا وتوفر تجربة متكاملة للأخصائي والمعلم والأسرة والطفل.'
            : 'Explore the five powerful AI modules powering our special education and motor rehabilitation ecosystem.'}
        </p>
      </div>

      {/* Module selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {modules.map((m) => {
          const Icon = m.icon;
          const active = m.id === selectedModule;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isAr ? m.titleAr : m.titleEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Selected Module Detailed View */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Module Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${currentMod.color} text-white flex items-center justify-center shadow-md`}>
              <currentMod.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {isAr ? currentMod.badgeAr : 'AI Solution'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-sans">
                {isAr ? currentMod.titleAr : currentMod.titleEn}
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {currentMod.descriptionAr}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'أبرز مميزات الوحدة:' : 'Key Capabilities:'}
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {currentMod.featuresAr.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            {currentMod.id === 'familychat' ? (
              <button
                onClick={onOpenFamilyChat}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>{isAr ? 'تحدث مع مساعد الأسرة الآن' : 'Launch Family AI Chat'}</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate(currentMod.page)}
                className="px-6 py-3.5 rounded-xl bg-blue-950 hover:bg-slate-900 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تشغيل وتجربة وحدة الخدمة' : 'Launch Interactive Module'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Visual Interactive Preview Box */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white space-y-4 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 font-mono">
                {currentMod.titleEn} Engine Active
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              v2.5 AI
            </span>
          </div>

          {currentMod.id === 'copilot' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl space-y-1">
                <span className="text-teal-400 font-bold">هدف قصير المدى مقترح (SMART Goal):</span>
                <p className="text-slate-200">"المشي بخطوات متوازنة لمسافة 15 متراً باستخدام المشاية المساعدة خلال 4 أسابيع."</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl space-y-1">
                <span className="text-emerald-400 font-bold">النشاط التأهيلي الموصى به:</span>
                <p className="text-slate-200">"جلسات تتبع زوايا مفصل الركبة عبر MoveVision AI مرتين أسبوعياً."</p>
              </div>
            </div>
          )}

          {currentMod.id === 'movevision' && (
            <div className="space-y-3 text-xs">
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 h-44 flex flex-col justify-between p-3">
                <div className="flex justify-between text-[11px] text-emerald-400 font-mono">
                  <span>Gait Symmetry: 84%</span>
                  <span>Joint Angle: 85°</span>
                </div>
                <div className="text-center text-slate-400 text-[11px]">
                  [محاكي كاميرا الرؤية الحركية للتعرف على نقاط الهيكل العظمي]
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Status: Normal Tracking</span>
                  <span>FPS: 30</span>
                </div>
              </div>
            </div>
          )}

          {currentMod.id === 'rehabhome' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">تمرين توازن الجذع اليومي</p>
                  <p className="text-slate-400 text-[11px]">المدة: 10 دقائق • 10 تكرارات</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-[10px] font-bold">مكتمل</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">تمرين تقوية أصابع اليد</p>
                  <p className="text-slate-400 text-[11px]">المدة: 15 دقيقة</p>
                </div>
                <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-[10px] font-bold">مستهدف اليوم</span>
              </div>
            </div>
          )}

          {currentMod.id === 'familychat' && (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-blue-900/40 rounded-lg text-blue-200">
                <span className="font-bold block text-[10px] text-teal-300">ولي الأمر:</span>
                "كيف أساعد طفلي على الالتزام بالتمارين المنزلية بدون توتر؟"
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg text-slate-200">
                <span className="font-bold block text-[10px] text-emerald-400">مساعد الأسرة الذكي:</span>
                "يُفضل دمج التمارين في ألعاب قصيرة (10 دقائق) مع إعطاء مكافآت تشجيعية رقمية بالمنصة."
              </div>
            </div>
          )}

          {currentMod.id === 'games' && (
            <div className="space-y-3 text-xs text-center">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <Gamepad2 className="w-8 h-8 text-purple-400 mx-auto" />
                <p className="font-bold text-white">لعبة صيد النجوم التفاعلية</p>
                <p className="text-slate-400 text-[11px]">تنمية التناسق بين العين واليد وزيادة زمن الانتباه</p>
                <button
                  onClick={() => onNavigate('therapy-games')}
                  className="mt-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                >
                  العب اللعبة الآن
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Grid of all 5 modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={() => onNavigate(m.page)}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-500 transition-all shadow-xs hover:shadow-md cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg ${m.color} text-white flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {isAr ? m.badgeAr : 'Module'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{isAr ? m.titleAr : m.titleEn}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{m.descriptionAr}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
