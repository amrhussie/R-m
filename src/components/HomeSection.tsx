import React from 'react';
import { PageId } from '../types';
import { 
  Sparkles, 
  Brain, 
  Activity, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Users, 
  Award, 
  CheckCircle2, 
  Video, 
  HeartHandshake, 
  BookOpen, 
  Gamepad2,
  Stethoscope,
  TrendingUp,
  Bot
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (page: PageId) => void;
  lang: 'ar' | 'en';
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, lang }) => {
  const isAr = lang === 'ar';

  const stats = [
    { labelAr: 'خطة تربوية وعلاجية فردية (IEP) مُنتجة', labelEn: 'Generated SMART IEP Plans', value: '+5,200' },
    { labelAr: 'دقة تتبع الحركة بالكمبيوتر (MoveVision)', labelEn: 'Computer Vision Pose Accuracy', value: '94.8%' },
    { labelAr: 'معالج ومعلم تربية خاصة ينشطون يومياً', labelEn: 'Active Therapists & Educators', value: '+1,450' },
    { labelAr: 'نسبة تحسن الالتزام بالتمارين المنزلية', labelEn: 'Home Therapy Adherence Rate', value: '88%' },
  ];

  const aiModules = [
    {
      id: 'iep-copilot',
      page: 'iep-builder' as PageId,
      titleAr: 'مساعد التربية الخاصة AI IEP Copilot',
      titleEn: 'AI Special Education Copilot',
      descAr: 'توليد أهداف SMART محددة نمائيًا وتصميم خطط علاجية وتربوية مخصصة للطفل في ثوانٍ معدودة.',
      descEn: 'Instant SMART goal generation, customized educational plans, and automated clinical reports.',
      icon: Brain,
      badgeAr: 'توليد ذكي',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'movevision-ai',
      page: 'assessment' as PageId,
      titleAr: 'تتبع الحركة بالذكاء الاصطناعي MoveVision AI',
      titleEn: 'MoveVision AI',
      descAr: 'تحليل البيوميكانيكا، زوايا المفاصل، اتزان الوقوف وتناظر المشي عبر الكاميرا دون مستشعرات مادية.',
      descEn: 'Real-time biomechanical camera pose detection, gait symmetry analysis, and joint angle tracking.',
      icon: Activity,
      badgeAr: 'رؤية الكمبيوتر',
      color: 'from-teal-600 to-emerald-700'
    },
    {
      id: 'rehab-home-ai',
      page: 'parent-dashboard' as PageId,
      titleAr: 'التمارين المنزلية الذكية Rehab Home AI',
      titleEn: 'Rehab Home AI',
      descAr: 'تمارين علاجية منزلية موجهة مع أرشادات بصرية وتنبيهات فورية لمتابعة إنجاز الأسرة.',
      descEn: 'Guided home exercises with video instructions, compliance tracking, and therapist sync.',
      icon: HeartHandshake,
      badgeAr: 'متابعة منزلية',
      color: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'ai-family-assistant',
      page: 'solutions' as PageId,
      titleAr: 'مساعد الأسرة الذكي AI Family Assistant',
      titleEn: 'AI Family Assistant',
      descAr: 'إجابة استفسارات الوالدين المتعاطفة وتوفير توجيهات يومية تدعم طفلهم وتمنحهم الثقة.',
      descEn: 'Empathetic 24/7 AI chatbot answering parent concerns with evidence-based guidance.',
      icon: Bot,
      badgeAr: 'مساعد 24/7',
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: 'therapy-games',
      page: 'therapy-games' as PageId,
      titleAr: 'ألعاب التأهيل الحركي التفاعلية',
      titleEn: 'Interactive Therapy Games',
      descAr: 'تحويل الأهداف العلاجية المجهدة إلى ألعاب ممتعة تزيد التناسق الحركي البصري وتركيز الانتباه.',
      descEn: 'Gamified rehabilitation challenges enhancing motor accuracy, posture stability, and focus.',
      icon: Gamepad2,
      badgeAr: 'تأهيل لعبي',
      color: 'from-purple-600 to-indigo-800'
    }
  ];

  const stakeholders = [
    {
      titleAr: 'معلمو التربية الخاصة',
      titleEn: 'Special Education Teachers',
      descAr: 'توفير ساعات العمل المكتبية وتوثيق التطور بتقرير شامل مُعد بالذكاء الاصطناعي.',
      descEn: 'Save office hours and document child progress with comprehensive AI generated reports.',
      icon: Users,
    },
    {
      titleAr: 'أخصائيو العلاج الطبيعي',
      titleEn: 'Physical Therapists',
      descAr: 'قياس دقيق لزوايا المفاصل (ROM) وتناظر المشي ببيانات سريرية قابلة للمقارنة.',
      descEn: 'Precise joint angle (ROM) and gait symmetry tracking with clinical insights.',
      icon: Stethoscope,
    },
    {
      titleAr: 'أخصائيو العلاج الوظيفي',
      titleEn: 'Occupational Therapists',
      descAr: 'تقييم وتطوير المهارات الحركية الدقيقة والتناسق البصري عبر ألعاب وأنشطة موجهة.',
      descEn: 'Assess and develop fine motor skills and visual coordination with targeted games.',
      icon: Activity,
    },
    {
      titleAr: 'أولياء الأمور والأسر',
      titleEn: 'Parents & Families',
      descAr: 'تطبيق التمارين المنزلية بثقة، متابعة أثر العلاج يومياً، واستشارة مساعد الذكاء الاصطناعي.',
      descEn: 'Execute home exercises with confidence, track daily impact, and consult AI assistant.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 rounded-b-3xl shadow-xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{isAr ? 'المنصة الذكية الأولى المتكاملة في العالم العربي' : 'First Complete AI Neuro Platform in the Arab World'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-sans">
                {isAr ? (
                  <>
                    منصة الذكاء الاصطناعي للتعليم الخاص و<span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-emerald-300 bg-clip-text text-transparent">التأهيل الحركي</span>
                  </>
                ) : (
                  <>
                    AI Platform for Special Education & <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Pediatric Motor Rehab</span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                {isAr
                  ? 'نظام ذكي يساعد الأخصائيين والمعلمين والأسر على تصميم خطط فردية، متابعة التطور، وتحسين جودة التدخلات العلاجية.'
                  : 'An intelligent ecosystem helping specialists, educators, and families design personalized IEP plans, track progress, and improve therapeutic outcomes.'}
              </p>

              {/* Call-to-action buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('iep-builder')}
                  className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isAr ? 'ابدأ التجربة' : 'Start Trial'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onNavigate('solutions')}
                  className="px-8 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-teal-500/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-5 h-5 text-teal-400" />
                  <span>{isAr ? 'اكتشف المنصة' : 'Explore Platform'}</span>
                </button>
              </div>

              {/* Feature check list */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isAr ? 'خطط IEP بـ SMART Goals' : 'SMART IEP Plans'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isAr ? 'تتبع الحركة MoveVision' : 'MoveVision Camera Tracking'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isAr ? 'ألعاب علاجية تفاعلية' : 'Gamified Rehabilitation'}</span>
                </div>
              </div>

            </div>

            {/* Hero Visual Card / Generated Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/60 bg-slate-900 shadow-2xl group">
                <img
                  src="/src/assets/images/rm_hero_illustration_1785020264452.jpg"
                  alt="RM NeuroAI Hero Visual"
                  className="w-full h-[380px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to high quality medical visual if image fails
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80";
                  }}
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      MoveVision AI Live Feed
                    </span>
                    <span className="text-slate-300 font-mono text-[11px]">30 FPS Biomechanical Track</span>
                  </div>
                  <p className="text-white text-xs font-bold">
                    {isAr ? 'تحليل الحركة الآلي بالذكاء الاصطناعي - بدون أجهزة ملحقة' : 'Camera Biomechanical AI Motion Detection'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-2">
              <div className="text-3xl sm:text-4xl font-black text-blue-950 font-sans tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-600">
                {isAr ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI MODULES CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
            <Brain className="w-4 h-4 text-teal-600" />
            <span>{isAr ? 'منظومة الذكاء الاصطناعي المتكاملة' : 'AI Ecosystem Modules'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-sans">
            {isAr ? 'حلول ذكية مصممة خصيصاً لاحتياجات الطفل التأهيلية' : 'Smart Solutions Tailored for Pediatric Rehabilitation'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isAr
              ? 'تدمج المنصة بين النماذج التوليدية اللغوية، تقنيات رؤية الكمبيوتر، والتحليلات الحركية لتغطية كافة جوانب العملية التعليمية والتأهيلية.'
              : 'Combining LLM copilots, vision tracking, and motion analytics to support all phases of therapy and special education.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.page)}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {isAr ? mod.badgeAr : 'AI Module'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {isAr ? mod.descAr : mod.descEn}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800">
                  <span>{isAr ? 'تجربة المحاكي الآن' : 'Launch Module'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STAKEHOLDERS & ECOSYSTEM */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              {isAr ? 'منظومة العمل المترابطة' : 'Connected Care Network'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isAr ? 'كيف تخدم منصة RM NeuroAI مجتمع التربية والتأهيل؟' : 'Empowering Every Stakeholder in the Care Circle'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholders.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/10 text-blue-900 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-blue-900" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isAr ? s.titleAr : s.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isAr ? s.descAr : s.descEn}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'جاهز لتجربة الخطة الفردية لذكية؟' : 'Ready to Create Smart IEPs?'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans">
              {isAr ? 'ابدأ الآن بتصميم خطة طفلك بلمسة زر واحدة' : 'Generate Comprehensive Pediatric IEPs in Seconds'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              {isAr 
                ? 'استخدم المساعد الذكي لتوليد الأهداف التعليمية والحركية الدقيقة، وتصدير التقارير الرسمية المعتمدة.'
                : 'Utilize AI Copilot to generate precise SMART goals and export professional clinical IEP reports.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('iep-builder')}
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg whitespace-nowrap cursor-pointer transition-transform hover:scale-105"
          >
            {isAr ? 'افتح منشئ IEP الذكي' : 'Open IEP Builder'}
          </button>
        </div>
      </section>

    </div>
  );
};
