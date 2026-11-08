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
import { AuthGate } from './components/AuthGate';
import { apiFetch } from './lib/api';

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
          apiFetch('/api/children').then(r => r.json()),
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
