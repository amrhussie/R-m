import React from 'react';
import { PageId } from '../types';
import { Brain, ShieldCheck, Heart, Award, Sparkles, Mail, Phone, MapPin, User, Instagram, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-teal-700 text-white shadow-inner">
                <Brain className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-2xl font-black text-white font-sans tracking-tight">
                RM <span className="text-teal-400">NeuroAI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {lang === 'ar'
                ? 'المنصة الذكية الأولى المتخصصة في حلول التربية الخاصة والتأهيل الحركي الأطفالي المعتمدة على الذكاء الاصطناعي التوليدي، رؤية الكمبيوتر، وتحليلات البيانات السريرية المتقدمة.'
                : 'The premier AI-powered ecosystem for pediatric special education and motor rehabilitation powered by generative AI, computer vision, and clinical analytics.'}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                {lang === 'ar' ? 'أمان حماية بيانات الطفل' : 'Encrypted Child Data Security'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300 font-medium">
                <Award className="w-4 h-4" />
                {lang === 'ar' ? 'معايير جودة المعالجة' : 'Clinical Protocol Standards'}
              </span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              {lang === 'ar' ? 'حلول الذكاء الاصطناعي' : 'AI Modules'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-emerald-400 transition-colors">
                  {lang === 'ar' ? 'مساعد التربية الخاصة IEP Copilot' : 'IEP Copilot'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-emerald-400 transition-colors">
                  {lang === 'ar' ? 'تتبع الحركة بال كاميرا MoveVision AI' : 'MoveVision AI Tracking'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-emerald-400 transition-colors">
                  {lang === 'ar' ? 'التمارين المنزلية الذكية Rehab Home AI' : 'Rehab Home AI'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-emerald-400 transition-colors">
                  {lang === 'ar' ? 'مساعد الأسرة الذكي AI Family' : 'AI Family Assistant'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('therapy-games')} className="hover:text-emerald-400 transition-colors">
                  {lang === 'ar' ? 'ألعاب التأهيل العلاجية' : 'Therapy Games'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              {lang === 'ar' ? 'بوابات النظام' : 'Portals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('therapist-dashboard')} className="hover:text-teal-400 transition-colors">
                  {lang === 'ar' ? 'بوابة معالجي العلاج الطبيعي والوظيفي' : 'Therapists Portal'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('therapist-dashboard')} className="hover:text-teal-400 transition-colors">
                  {lang === 'ar' ? 'لوحة معلمي التربية الخاصة' : 'Teachers Dashboard'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('parent-dashboard')} className="hover:text-teal-400 transition-colors">
                  {lang === 'ar' ? 'تطبيق ولي الأمر والمتابعة اليومية' : 'Parent Portal'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assessment')} className="hover:text-teal-400 transition-colors">
                  {lang === 'ar' ? 'منظومة التقييم السريري' : 'Smart Assessment Engine'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research-hub')} className="hover:text-teal-400 transition-colors">
                  {lang === 'ar' ? 'قاعدة الأبحاث والدراسات الموثقة' : 'Research Knowledge Base'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              {lang === 'ar' ? 'الدعم والتواصل المباشر' : 'Contact & Direct Support'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-teal-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <User className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? 'أ. ريم كمال (Reem Kamal)' : 'Reem Kamal'}</span>
              </div>
              <a 
                href="tel:+201117666011" 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span dir="ltr" className="font-mono text-xs">+20 111 766 6011</span>
              </a>
              <a 
                href="mailto:reemfarag147@gmail.com" 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors group break-all"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px]">reemfarag147@gmail.com</span>
              </a>
              <a 
                href="mailto:reem60302418@gmail.com" 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors group break-all"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px]">reem60302418@gmail.com</span>
              </a>
              <a 
                href="https://www.instagram.com/remo_farag20?igsh=a3Z6Mnk3YnM2YzV4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors group font-semibold"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Instagram: @remo_farag20</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 RM NeuroAI Platform. {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{lang === 'ar' ? 'سياسة الخصوصية وحماية الطفل' : 'Privacy & Child Protection'}</span>
            <span>•</span>
            <span>{lang === 'ar' ? 'شروط الاستخدام السريري' : 'Clinical Terms of Service'}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Heart className="w-3.5 h-3.5 fill-current text-emerald-500" />
              {lang === 'ar' ? 'صُنع لرعاية الأطفال' : 'Crafted for Pediatric Care'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
