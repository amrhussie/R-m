import React, { useState } from 'react';
import { Child, TherapySession, IEPPlan } from '../types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  Stethoscope, 
  TrendingUp, 
  Activity, 
  UserPlus,
  BarChart2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TherapistDashboardProps {
  childrenList: Child[];
  therapySessions: TherapySession[];
  iepPlans: IEPPlan[];
  onAddChild: (child: Partial<Child>) => void;
  onAddSession: (session: Partial<TherapySession>) => void;
  lang: 'ar' | 'en';
}

export const TherapistDashboard: React.FC<TherapistDashboardProps> = ({
  childrenList,
  therapySessions,
  iepPlans,
  onAddChild,
  onAddSession,
  lang
}) => {
  const isAr = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDiagnosis, setFilterDiagnosis] = useState('الكل');
  const [activeTab, setActiveTab] = useState<'children' | 'sessions' | 'appointments' | 'analytics'>('children');

  // New Child Modal State
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(7);
  const [newChildDiagnosis, setNewChildDiagnosis] = useState('شلل دماغي خفيف');

  // New Session Modal State
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [sessionChildId, setSessionChildId] = useState(childrenList[0]?.id || '');
  const [sessionExercise, setSessionExercise] = useState('تمرين توازن الجذع مع تقوية الرباعية');
  const [sessionDuration, setSessionDuration] = useState(45);
  const [sessionProgress, setSessionProgress] = useState(85);

  const filteredChildren = childrenList.filter(c => {
    const matchesSearch = c.name.includes(searchQuery) || c.diagnosis.includes(searchQuery);
    const matchesDiag = filterDiagnosis === 'الكل' || c.diagnosis.includes(filterDiagnosis);
    return matchesSearch && matchesDiag;
  });

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName) return;
    onAddChild({
      name: newChildName,
      age: newChildAge,
      diagnosis: newChildDiagnosis,
      disabilityType: 'إعاقة نمائية حركية',
      medicalHistory: 'سجل جديد',
      goals: ['تحسين التوازن والأداء السلوكي'],
    });
    setShowAddChildModal(false);
    setNewChildName('');
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const child = childrenList.find(c => c.id === sessionChildId) || childrenList[0];
    onAddSession({
      childId: child.id,
      childName: child.name,
      therapistName: 'د. معالج المعالجات',
      exercise: sessionExercise,
      category: 'تأهيل حركي',
      durationMinutes: sessionDuration,
      progressPercent: sessionProgress,
      notes: 'تم تنفيذ التمرين بنجاح'
    });
    setShowAddSessionModal(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
          <Stethoscope className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'لوحة تحكم الأخصائي والمعلم' : 'Therapist & Educator Portal'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans">
          {isAr ? 'لوحة متابعة المعالج وأخصائي التربية الخاصة' : 'Therapist & Special Ed Portal'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
          {isAr
            ? 'إدارة ملفات الأطفال، جدول الجلسات التأهيلية، متابعة أهداف IEP الفردية، وتوثيق التطور بالذكاء الاصطناعي.'
            : 'Manage child profiles, session schedules, IEP goal completion rates, and AI clinical summaries.'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('children')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'children' ? 'bg-blue-950 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>قائمة الأطفال ({childrenList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'sessions' ? 'bg-blue-950 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>سجل الجلسات ({therapySessions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'appointments' ? 'bg-blue-950 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>جدول المواعيد والجلسات</span>
        </button>
      </div>

      {/* TAB 1: CHILDREN DIRECTORY */}
      {activeTab === 'children' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالاسم أو التشخيص..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pr-9 pl-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowAddChildModal(true)}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>إضافة ملف طفل جديد</span>
              </button>
            </div>
          </div>

          {/* Children Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChildren.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-500 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <h3 className="text-base font-black text-slate-900">{c.name}</h3>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      {c.diagnosis}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-bold">النتيجة الحركية</span>
                    <span className="text-sm font-black text-blue-900">{c.motorScore}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-bold">توقع التحسن</span>
                    <span className="text-sm font-black text-emerald-600">{c.improvementPrediction}%</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block">الأهداف الحالية:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                    {c.goals.slice(0, 2).map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>المعالج: {c.assignedTherapist}</span>
                  <span className="text-teal-700 font-bold">نشط</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: SESSIONS LOG */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">سجل الجلسات التأهيلية المكتملة</h3>
              <p className="text-xs text-slate-500">توثيق التمارين المنفذة ومعدل الإنجاز السريري</p>
            </div>
            <button
              onClick={() => setShowAddSessionModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>تسجيل جلسة جديدة</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="p-3">اسم الطفل</th>
                  <th className="p-3">التمرين / النشاط</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">المدة</th>
                  <th className="p-3">نسبة الإنجاز</th>
                  <th className="p-3">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {therapySessions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{s.childName}</td>
                    <td className="p-3 text-slate-700">{s.exercise}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-bold">
                        {s.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{s.durationMinutes} دقيقة</td>
                    <td className="p-3">
                      <span className="text-emerald-700 font-black">{s.progressPercent}%</span>
                    </td>
                    <td className="p-3 text-slate-500">{s.sessionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: APPOINTMENTS CALENDAR */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">جدول المواعيد والجلسات الأسبوعي</h3>
            <span className="text-xs text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              الأسبوع الحالي
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-blue-950">
                <span>09:00 صباحاً - يوسف العتيبي</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">مكتمل</span>
              </div>
              <p className="text-xs text-slate-600">جلسة MoveVision AI لتوازن القامة وتقوية الرباعية</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-blue-950">
                <span>11:30 صباحاً - سارة الشمري</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">قادمة</span>
              </div>
              <p className="text-xs text-slate-600">جلسة علاج وظيفي وتنسيق المسكة القلمية بالصلصال</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-blue-950">
                <span>02:00 مساءً - عمر القحطاني</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">قادمة</span>
              </div>
              <p className="text-xs text-slate-600">تمارين تقوية عضلات الجذع والظهر بمركز المهارات</p>
            </div>
          </div>
        </div>
      )}

      {/* ADD CHILD MODAL */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">إضافة ملف طفل جديد</h3>
            <form onSubmit={handleCreateChild} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم الطفل:</label>
                <input
                  type="text"
                  required
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">العمر:</label>
                <input
                  type="number"
                  value={newChildAge}
                  onChange={(e) => setNewChildAge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">التشخيص:</label>
                <input
                  type="text"
                  value={newChildDiagnosis}
                  onChange={(e) => setNewChildDiagnosis(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddChildModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SESSION MODAL */}
      {showAddSessionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">تسجيل جلسة جديدة</h3>
            <form onSubmit={handleCreateSession} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">الطفل:</label>
                <select
                  value={sessionChildId}
                  onChange={(e) => setSessionChildId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                >
                  {childrenList.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">التمرين المنفذ:</label>
                <input
                  type="text"
                  value={sessionExercise}
                  onChange={(e) => setSessionExercise(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المدة (دقيقة):</label>
                  <input
                    type="number"
                    value={sessionDuration}
                    onChange={(e) => setSessionDuration(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الإنجاز (%):</label>
                  <input
                    type="number"
                    value={sessionProgress}
                    onChange={(e) => setSessionProgress(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSessionModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold"
                >
                  تسجيل الجلسة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
