import React, { useState } from 'react';
import { Child, HomeExercise } from '../types';
import { 
  HeartHandshake, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  Bot, 
  Video, 
  Bell, 
  Play, 
  MessageSquare, 
  Sparkles,
  TrendingUp,
  Star
} from 'lucide-react';

interface ParentDashboardProps {
  child: Child;
  exercises: HomeExercise[];
  onToggleExercise: (id: string) => void;
  onOpenFamilyChat: () => void;
  lang: 'ar' | 'en';
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  child,
  exercises,
  onToggleExercise,
  onOpenFamilyChat,
  lang
}) => {
  const isAr = lang === 'ar';

  const completedCount = exercises.filter(e => e.completed).length;
  const progressPercent = Math.round((completedCount / (exercises.length || 1)) * 100);

  const notifications = [
    {
      id: 1,
      title: "ملاحظة جديدة من د. خالد السعيد (معالج طبيعي)",
      message: "أداء يوسف ممتاز في تمرين المشي بالموانع اليوم! يرجى الاستمرار بتمرين الإطالة الخلفية 10 دقائق مساءً.",
      date: "اليوم 10:30 صباحاً"
    },
    {
      id: 2,
      title: "تحديث خطة IEP الفردية",
      message: "تم تحديث أهداف التوازن للأسبوع الحالي بنجاح. يمكنك الاطلاع على الخطة المحدثة من بوابتك.",
      date: "أمس"
    }
  ];

  const badges = [
    { title: "بطل التوازن الحركي", desc: "إكمال 5 أيام متتالية من تمارين التوازن", icon: "🏆", active: true },
    { title: "صادق النجوم", desc: "الحصول على 100 نقطة في ألعاب التأهيل", icon: "⭐", active: true },
    { title: "المواظب الذهبي", desc: "إنجاز جميع التمارين المنزلية الأسبوعية", icon: "🥇", active: false },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'تطبيق ولي الأمر والمتابعة اليومية' : 'Parent & Family Portal'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans">
          {isAr ? `تطبيق ولي الأمر - متابعة طفلك (${child.name})` : `Parent Portal - ${child.name}`}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
          {isAr
            ? 'متابعة التمارين المنزلية اليومية، التواصل مع المعالج، مشاهدة تقدم طفلك، واستشارة مساعد الأسرة الذكي على مدار الساعة.'
            : 'Track daily home exercises, communicate with therapists, and consult AI Family Assistant 24/7.'}
        </p>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">
              {isAr ? 'معدل إنجاز تمارين اليوم' : 'Today\'s Exercise Completion'}
            </h3>
            <p className="text-xs text-slate-500">
              {completedCount} من أصل {exercises.length} تمارين تم إنجازها بنجاح اليوم
            </p>
          </div>

          <button
            onClick={onOpenFamilyChat}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Bot className="w-4 h-4 text-emerald-300" />
            <span>{isAr ? 'استشارة مساعد الأسرة الذكي' : 'Ask Family AI Assistant'}</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>نسبة إكمال التمارين:</span>
            <span className="text-teal-700 font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
            <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DAILY EXERCISES LIST (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <span>{isAr ? 'التمارين المنزلية المقررة لليوم:' : 'Scheduled Today\'s Home Exercises:'}</span>
          </h3>

          <div className="space-y-4">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  ex.completed ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-teal-400'
                } shadow-xs space-y-3`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleExercise(ex.id)}
                      className="mt-1 cursor-pointer"
                    >
                      {ex.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 hover:text-teal-600" />
                      )}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${ex.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {ex.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">{ex.category}</span>
                        <span>•المدة: {ex.duration}</span>
                        <span>•التكرار: {ex.reps}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    ex.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ex.completed ? 'مكتمل' : 'مستهدف'}
                  </span>
                </div>

                {/* Instructions */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 block">خطوات التنفيذ:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                    {ex.instructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                  {ex.tips && (
                    <p className="text-[11px] text-teal-700 font-bold pt-1">
                      💡 نصيحة المودل: {ex.tips}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NOTIFICATIONS & BADGES SIDEBAR (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Badges Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>{isAr ? 'أوسمة وإنجازات الطفل' : 'Child Achievement Badges'}</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {badges.map((b, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex items-center gap-3 ${
                  b.active ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                    <p className="text-[11px] text-slate-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialist Feedbacks & Notes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal-700" />
              <span>{isAr ? 'ملاحظات المعالج والإشعارات' : 'Specialist Feedback Notes'}</span>
            </h3>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1 text-xs">
                  <div className="flex justify-between items-center font-bold text-blue-950">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{n.date}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
