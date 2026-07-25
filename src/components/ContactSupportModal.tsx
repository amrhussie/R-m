import React, { useState } from 'react';
import { Mail, Phone, Instagram, User, X, Copy, Check, ExternalLink, MessageCircle, HeartHandshake } from 'lucide-react';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const isAr = lang === 'ar';
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const contactData = {
    name: 'Reem Kamal (ريم كمال)',
    phone: '+201117666011',
    phoneFormatted: '+20 111 766 6011',
    email1: 'reemfarag147@gmail.com',
    email2: 'reem60302418@gmail.com',
    instagram: 'https://www.instagram.com/remo_farag20?igsh=a3Z6Mnk3YnM2YzV4',
    instagramHandle: '@remo_farag20'
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 text-white p-5 flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/90 text-white flex items-center justify-center shadow-md">
              <HeartHandshake className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sans">
                {isAr ? 'بيانات الدعم والتواصل المباشر' : 'Direct Support & Contact Info'}
              </h3>
              <p className="text-[11px] text-teal-200">
                {isAr ? 'تواصل معنا في أي وقت للخدمة والاستفسار' : 'Reach out anytime for assistance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Profile Name Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center text-lg font-black shadow-sm shrink-0">
              RK
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">
                {isAr ? 'مسؤول الدعم والتواصل' : 'Support Coordinator'}
              </div>
              <div className="text-base font-black text-slate-900 font-sans">
                ريم كمال | Reem Kamal
              </div>
            </div>
          </div>

          {/* Interactive Contact Cards Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            
            {/* 1. Phone & WhatsApp Card */}
            <div className="bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-teal-50/50 rounded-2xl p-4 border border-emerald-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-0.5">
                      {isAr ? 'اتصال مباشر + واتساب' : 'Direct Call + WhatsApp'}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 font-sans">
                      {isAr ? 'الهاتف المحمول' : 'Mobile Phone'}
                    </h4>
                    <a
                      href={`tel:${contactData.phone}`}
                      className="text-base font-mono font-black text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 mt-0.5"
                      dir="ltr"
                    >
                      {contactData.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* Quick Copy */}
                <button
                  onClick={() => handleCopy(contactData.phone, 'phone')}
                  className="p-2 rounded-xl bg-white/80 border border-slate-200/80 hover:bg-white text-slate-600 transition-colors shadow-2xs"
                  title={isAr ? 'نسخ الرقم' : 'Copy Number'}
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-3.5 pt-3 border-t border-emerald-200/60 flex items-center gap-2">
                <a
                  href={`tel:${contactData.phone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'ضغط للاتصال الآني' : 'Click to Call'}</span>
                </a>
                <a
                  href={`https://wa.me/${contactData.phone.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{isAr ? 'مراسلة واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>

            {/* 2. Primary Email Card */}
            <div className="bg-gradient-to-br from-blue-50/90 via-slate-50/50 to-indigo-50/40 rounded-2xl p-4 border border-blue-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold mb-0.5">
                      {isAr ? 'البريد الإلكتروني الأساسي' : 'Primary Email'}
                    </span>
                    <h4 className="text-xs font-bold text-slate-600 font-sans">
                      Reem Kamal Support
                    </h4>
                    <a
                      href={`mailto:${contactData.email1}`}
                      className="text-xs font-mono font-bold text-blue-950 hover:text-blue-700 hover:underline truncate block mt-0.5"
                    >
                      {contactData.email1}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(contactData.email1, 'email1')}
                  className="p-2 rounded-xl bg-white/80 border border-slate-200/80 hover:bg-white text-slate-600 transition-colors shrink-0 shadow-2xs"
                  title={isAr ? 'نسخ البريد' : 'Copy Email'}
                >
                  {copiedField === 'email1' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-3.5 pt-3 border-t border-blue-200/60 flex items-center gap-2">
                <a
                  href={`mailto:${contactData.email1}`}
                  className="w-full py-2 px-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال بريد إلكتروني مباشر' : 'Click to Send Email'}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* 3. Secondary Email Card */}
            <div className="bg-gradient-to-br from-teal-50/80 via-slate-50/40 to-cyan-50/30 rounded-2xl p-4 border border-teal-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-800/20 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-bold mb-0.5">
                      {isAr ? 'بريد الطوارئ والاستفسارات' : 'Inquiries & Alternate Mail'}
                    </span>
                    <h4 className="text-xs font-bold text-slate-600 font-sans">
                      Secondary Contact
                    </h4>
                    <a
                      href={`mailto:${contactData.email2}`}
                      className="text-xs font-mono font-bold text-teal-950 hover:text-teal-700 hover:underline truncate block mt-0.5"
                    >
                      {contactData.email2}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(contactData.email2, 'email2')}
                  className="p-2 rounded-xl bg-white/80 border border-slate-200/80 hover:bg-white text-slate-600 transition-colors shrink-0 shadow-2xs"
                  title={isAr ? 'نسخ البريد' : 'Copy Email'}
                >
                  {copiedField === 'email2' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-3.5 pt-3 border-t border-teal-200/60 flex items-center gap-2">
                <a
                  href={`mailto:${contactData.email2}`}
                  className="w-full py-2 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال بريد للبريد الإضافي' : 'Send to Alternate Email'}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* 4. Instagram Profile Card */}
            <div className="bg-gradient-to-br from-pink-50/90 via-rose-50/40 to-purple-50/50 rounded-2xl p-4 border border-pink-200/80 shadow-xs hover:shadow-md hover:border-pink-300 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[10px] font-bold mb-0.5">
                      {isAr ? 'حساب الانستغرام الرسمى' : 'Official Instagram'}
                    </span>
                    <h4 className="text-xs font-bold text-slate-600 font-sans">
                      Reem Farag Profile
                    </h4>
                    <span className="text-xs font-mono font-bold text-pink-950 block mt-0.5">
                      {contactData.instagramHandle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(contactData.instagramHandle, 'instagram')}
                  className="p-2 rounded-xl bg-white/80 border border-slate-200/80 hover:bg-white text-slate-600 transition-colors shrink-0 shadow-2xs"
                  title={isAr ? 'نسخ اسم المستخدم' : 'Copy Handle'}
                >
                  {copiedField === 'instagram' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-3.5 pt-3 border-t border-pink-200/60 flex items-center gap-2">
                <a
                  href={contactData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{isAr ? 'زيارة حساب الإنستغرام' : 'Visit Instagram Profile'}</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Close Button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              {isAr ? 'إغلاق النافذة' : 'Close'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
