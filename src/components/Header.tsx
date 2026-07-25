import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Brain, 
  Activity, 
  Sparkles, 
  FileText, 
  UserCheck, 
  HeartHandshake, 
  BookOpen, 
  Gamepad2, 
  Menu, 
  X, 
  Languages, 
  Bot,
  Stethoscope,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  onOpenFamilyChat: () => void;
  onOpenContactSupport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
  onOpenFamilyChat,
  onOpenContactSupport
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as PageId, labelAr: 'الرئيسية', labelEn: 'Home', icon: Brain },
    { id: 'solutions' as PageId, labelAr: 'حلول الذكاء الاصطناعي', labelEn: 'AI Solutions', icon: Sparkles },
    { id: 'assessment' as PageId, labelAr: 'التقييم الذكي', labelEn: 'Smart Assessment', icon: Activity },
    { id: 'iep-builder' as PageId, labelAr: 'منشئ IEP الذكي', labelEn: 'Smart IEP Builder', icon: FileText },
    { id: 'therapist-dashboard' as PageId, labelAr: 'لوحة المعالج', labelEn: 'Therapist Portal', icon: Stethoscope },
    { id: 'parent-dashboard' as PageId, labelAr: 'تطبيق الأسرة', labelEn: 'Parent App', icon: HeartHandshake },
    { id: 'research-hub' as PageId, labelAr: 'مركز الأبحاث', labelEn: 'Research Hub', icon: BookOpen },
    { id: 'therapy-games' as PageId, labelAr: 'الألعاب العلاجية', labelEn: 'Therapy Games', icon: Gamepad2 },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-blue-900 via-teal-800 to-emerald-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
        <span>
          {lang === 'ar' 
            ? 'منصة RM NeuroAI: الذكاء الاصطناعي التفاعلي للتربية الخاصة والتأهيل الحركي الأطفالي' 
            : 'RM NeuroAI Platform: Smart Special Education & Pediatric Motor Rehabilitation Ecosystem'}
        </span>
        <span className="hidden sm:inline bg-emerald-500/20 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30">
          v2.5 Release
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-teal-800 to-emerald-600 text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200">
              <Brain className="w-6 h-6 text-emerald-300" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-blue-950 font-sans">RM</span>
                <span className="text-xl font-black tracking-tight text-teal-700 font-sans">NeuroAI</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5 hidden sm:block">
                {lang === 'ar' ? 'ذكاء اصطناعي يساند الطفل، المعلم، والأسرة' : 'AI for Child, Educator & Family'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-xs'
                      : 'text-slate-700 hover:text-blue-950 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Contact & Support Quick Button */}
            {onOpenContactSupport && (
              <button
                onClick={onOpenContactSupport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all shadow-xs"
                title="الدعم والتواصل"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">{lang === 'ar' ? 'الدعم والتواصل' : 'Contact Support'}</span>
              </button>
            )}

            {/* AI Assistant Quick Modal Trigger */}
            <button
              onClick={onOpenFamilyChat}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 text-xs font-bold transition-all shadow-xs"
              title="مساعد الأسرة الذكي"
            >
              <Bot className="w-4 h-4 text-teal-600 animate-bounce" />
              <span className="hidden md:inline">{lang === 'ar' ? 'مساعد الأسرة' : 'Family AI'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
              title="تبديل اللغة"
            >
              <Languages className="w-4 h-4 text-slate-600" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Main Action Button */}
            <button
              onClick={() => handleNavClick('iep-builder')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'ar' ? 'منشئ IEP الذكي' : 'IEP Generator'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fadeIn">
          <p className="text-xs font-bold text-slate-400 px-3 py-1">
            {lang === 'ar' ? 'أقسام المنصة' : 'Platform Navigation'}
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-950 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {onOpenContactSupport && (
              <button
                onClick={() => {
                  onOpenContactSupport();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-xs"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'بيانات الدعم والتواصل المباشر' : 'Direct Contact & Support'}</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('iep-builder')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تجربة منشئ IEP الذكي' : 'Try IEP Builder'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
