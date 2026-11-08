import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PageId, Child, IEPPlan, TherapySession, ResearchPaper, HomeExercise } from './types';
import { INITIAL_HOME_EXERCISES } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { AISolutionsSection } from './components/AISolutionsSection';
import { SmartAssessmentSection } from './components/SmartAssessmentSection';
import { SmartIEPBuilder } from './components/SmartIEPBuilder';
import { TherapistDashboard } from './components/TherapistDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { ResearchHub } from './components/ResearchHub';
import { TherapyGamesSection } from './components/TherapyGamesSection';
import { AIFamilyChatModal } from './components/AIFamilyChatModal';
import { ContactSupportModal } from './components/ContactSupportModal';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
    })
  : null;

// Shared with the same-origin API fetch interceptor in src/main.tsx.
(window as any).__RM_SUPABASE__ = supabase;

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      setSignedIn(Boolean(data.session) && !error);
      setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setSignedIn(Boolean(session));
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setErrorMessage('تعذر تسجيل الدخول. تحقق من بيانات الحساب أو تأكيد البريد الإلكتروني.');
    else setPassword('');
  };

  if (!supabase) return <main dir="rtl" className="min-h-screen grid place-items-center bg-slate-950 p-6 text-white">
    <section className="max-w-lg rounded-2xl border border-amber-400/30 bg-slate-900 p-8">
      <h1 className="text-2xl font-bold">إعداد الاتصال غير مكتمل</h1>
      <p className="mt-3 text-sm leading-7 text-slate-300">أضف VITE_SUPABASE_URL وVITE_SUPABASE_PUBLISHABLE_KEY إلى إعدادات بيئة التطوير.</p>
      <p className="mt-3 text-xs text-slate-400">لا تضع service_role أو أي Secret Key في متغيرات VITE_.</p>
    </section>
  </main>;
  if (!ready) return <main className="min-h-screen grid place-items-center bg-slate-950 text-white">جارٍ التحقق من الجلسة…</main>;
  if (!signedIn) return <main dir="rtl" className="min-h-screen grid place-items-center bg-slate-950 p-6 text-white">
    <form onSubmit={signIn} className="w-full max-w-md space-y-5 rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
      <div><p className="text-xs font-semibold tracking-widest text-teal-300">RM NEUROAI · DEVELOPMENT</p>
        <h1 className="mt-3 text-2xl font-bold">تسجيل الدخول</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">الدخول متاح للحسابات التي ينشئها أو يدعوها مسؤول المنصة فقط. التسجيل العام مغلق.</p>
      </div>
      <label className="block space-y-2 text-sm"><span>البريد الإلكتروني</span>
        <input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400" />
      </label>
      <label className="block space-y-2 text-sm"><span>كلمة المرور</span>
        <input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400" />
      </label>
      {errorMessage && <p role="alert" className="rounded-lg bg-red-950/60 p-3 text-sm text-red-200">{errorMessage}</p>}
      <button disabled={busy} className="w-full rounded-xl bg-teal-600 px-4 py-3 font-bold text-white disabled:opacity-50">{busy ? 'جارٍ تسجيل الدخول…' : 'دخول آمن'}</button>
    </form>
  </main>;

  return <><div className="fixed left-4 top-4 z-50">
    <button onClick={() => supabase.auth.signOut()} className="rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs font-bold text-slate-700 shadow">تسجيل الخروج</button>
  </div>{children}</>;
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isFamilyChatOpen, setIsFamilyChatOpen] = useState(false);
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);

  // Application Data State
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [iepPlans, setIepPlans] = useState<IEPPlan[]>([]);
  const [therapySessions, setTherapySessions] = useState<TherapySession[]>([]);
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>([]);
  const [homeExercises, setHomeExercises] = useState<HomeExercise[]>(INITIAL_HOME_EXERCISES);

  // Fetch initial data from Express backend REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, iRes, sRes, rRes] = await Promise.all([
          fetch('/api/children').then(r => r.json()),
          fetch('/api/ieps').then(r => r.json()),
          fetch('/api/therapy-sessions').then(r => r.json()),
          fetch('/api/research-papers').then(r => r.json())
        ]);

        if (cRes.success && cRes.data?.length) setChildrenList(cRes.data);
        if (iRes.success && iRes.data?.length) setIepPlans(iRes.data);
        if (sRes.success && sRes.data?.length) setTherapySessions(sRes.data);
        if (rRes.success && rRes.data?.length) setResearchPapers(rRes.data);
      } catch (err) {
        console.error("Authorized data API is not available yet:", err);
      }
    };
    fetchData();
  }, []);

  const handleToggleLang = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSaveIEP = (_newPlan: IEPPlan) => {
    window.alert('حفظ الخطط الفردية متوقف مؤقتاً حتى اكتمال ربط جداول Supabase واختبارات الصلاحيات.');
  };

  const handleAddChild = (_newChildPartial: Partial<Child>) => {
    window.alert('إضافة ملفات الأطفال متوقفة حتى اكتمال واجهة البيانات متعددة المؤسسات واختبارات RLS.');
  };

  const handleAddSession = (_sessionPartial: Partial<TherapySession>) => {
    window.alert('تسجيل الجلسات متوقف مؤقتاً حتى اكتمال ربط قاعدة البيانات واختبارات صلاحيات الأخصائي.');
  };

  const handleToggleExercise = (exId: string) => {
    setHomeExercises(prev =>
      prev.map(ex => (ex.id === exId ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white"
    >
      {/* Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenFamilyChat={() => setIsFamilyChatOpen(true)}
        onOpenContactSupport={() => setIsContactSupportOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {currentPage === 'home' && (
          <HomeSection
            onNavigate={setCurrentPage}
            lang={lang}
          />
        )}

        {currentPage === 'solutions' && (
          <AISolutionsSection
            onNavigate={setCurrentPage}
            lang={lang}
            onOpenFamilyChat={() => setIsFamilyChatOpen(true)}
          />
        )}

        {currentPage === 'assessment' && (
          <SmartAssessmentSection
            childrenList={childrenList}
            lang={lang}
          />
        )}

        {currentPage === 'iep-builder' && (
          <SmartIEPBuilder
            childrenList={childrenList}
            onSaveIEP={handleSaveIEP}
            lang={lang}
          />
        )}

        {currentPage === 'therapist-dashboard' && (
          <TherapistDashboard
            childrenList={childrenList}
            therapySessions={therapySessions}
            iepPlans={iepPlans}
            onAddChild={handleAddChild}
            onAddSession={handleAddSession}
            lang={lang}
          />
        )}

        {currentPage === 'parent-dashboard' && (
          childrenList.length > 0 ? (
            <ParentDashboard
              child={childrenList[0]}
              exercises={homeExercises}
              onToggleExercise={handleToggleExercise}
              onOpenFamilyChat={() => setIsFamilyChatOpen(true)}
              lang={lang}
            />
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-white p-8 text-right">
              <h2 className="text-lg font-bold text-slate-900">لا توجد ملفات أطفال مرتبطة بحسابك</h2>
              <p className="mt-2 text-sm text-slate-600">ستظهر الملفات بعد اكتمال ربط قاعدة البيانات وتعيين صلاحيات المركز أو ولي الأمر.</p>
            </section>
          )
        )}

        {currentPage === 'research-hub' && (
          <ResearchHub
            papers={researchPapers}
            lang={lang}
          />
        )}

        {currentPage === 'therapy-games' && (
          <TherapyGamesSection
            lang={lang}
          />
        )}
      </main>

      {/* AI Family Assistant Chat Modal */}
      <AIFamilyChatModal
        isOpen={isFamilyChatOpen}
        onClose={() => setIsFamilyChatOpen(false)}
        lang={lang}
      />

      {/* Direct Contact & Support Modal */}
      <ContactSupportModal
        isOpen={isContactSupportOpen}
        onClose={() => setIsContactSupportOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        lang={lang}
      />
    </div>
  );
}


export default function App() {
  return <AuthGate><AppContent /></AuthGate>;
}
