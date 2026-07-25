import React, { useState, useEffect } from 'react';
import { PageId, Child, IEPPlan, TherapySession, ResearchPaper, HomeExercise } from './types';
import { INITIAL_CHILDREN, INITIAL_HOME_EXERCISES } from './data/mockData';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isFamilyChatOpen, setIsFamilyChatOpen] = useState(false);
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);

  // Application Data State
  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
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
        console.warn("Using offline mock state for REST API:", err);
      }
    };
    fetchData();
  }, []);

  const handleToggleLang = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSaveIEP = (newPlan: IEPPlan) => {
    setIepPlans(prev => [newPlan, ...prev]);
    // Also send to backend
    fetch('/api/ieps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlan)
    }).catch(console.error);
  };

  const handleAddChild = (newChildPartial: Partial<Child>) => {
    const newChild: Child = {
      id: `c${Date.now()}`,
      name: newChildPartial.name || 'طفل جديد',
      age: newChildPartial.age || 6,
      gender: newChildPartial.gender || 'ذكر',
      diagnosis: newChildPartial.diagnosis || 'تأخر حركي ونمائي',
      disabilityType: newChildPartial.disabilityType || 'إعاقة نمائية',
      medicalHistory: newChildPartial.medicalHistory || 'سجل متتابع',
      goals: newChildPartial.goals || ['تحسين التوازن والأداء السلوكي'],
      motorScore: 72,
      cognitiveScore: 78,
      engagementLevel: 85,
      improvementPrediction: 82,
      assignedTherapist: 'د. معالج متناوب',
      assignedTeacher: 'أ. معلم تربية خاصة',
      parentName: 'ولي الأمر',
      parentPhone: '+966 50 000 0000',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
    };

    setChildrenList(prev => [newChild, ...prev]);
    fetch('/api/children', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newChild)
    }).catch(console.error);
  };

  const handleAddSession = (sessionPartial: Partial<TherapySession>) => {
    const newSession: TherapySession = {
      id: `sess-${Date.now()}`,
      childId: sessionPartial.childId || 'c1',
      childName: sessionPartial.childName || 'يوسف أحمد',
      therapistName: sessionPartial.therapistName || 'د. المعالج',
      exercise: sessionPartial.exercise || 'تمرين حركي شامل',
      category: sessionPartial.category || 'تأهيل حركي',
      durationMinutes: sessionPartial.durationMinutes || 40,
      progressPercent: sessionPartial.progressPercent || 80,
      sessionDate: new Date().toISOString().split('T')[0],
      notes: sessionPartial.notes || 'جلسة متقدمة'
    };

    setTherapySessions(prev => [newSession, ...prev]);
    fetch('/api/therapy-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession)
    }).catch(console.error);
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
          <ParentDashboard
            child={childrenList[0] || INITIAL_CHILDREN[0]}
            exercises={homeExercises}
            onToggleExercise={handleToggleExercise}
            onOpenFamilyChat={() => setIsFamilyChatOpen(true)}
            lang={lang}
          />
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
