import React, { FormEvent, useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [sessionReady, setSessionReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!supabase) {
      setSessionReady(true);
      return;
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      setSignedIn(Boolean(data.session) && !error);
      setSessionReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setSignedIn(Boolean(session));
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;

    setSubmitting(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);

    if (error) {
      setErrorMessage('تعذر تسجيل الدخول. تحقق من بيانات الحساب أو حالة تأكيد البريد.');
      return;
    }
    setPassword('');
  };

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  if (!supabaseConfigured || !supabase) {
    return (
      <main dir="rtl" className="min-h-screen grid place-items-center bg-slate-950 p-6 text-white">
        <section className="w-full max-w-lg rounded-2xl border border-amber-400/30 bg-slate-900 p-8">
          <h1 className="text-2xl font-bold">إعداد الاتصال غير مكتمل</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            لم يتم ضبط متغيرات Supabase العامة لبيئة التطوير. أضف VITE_SUPABASE_URL وVITE_SUPABASE_PUBLISHABLE_KEY قبل تشغيل التطبيق.
          </p>
          <p className="mt-3 text-xs text-slate-400">لا تضع service_role أو أي Secret Key في متغيرات VITE_.</p>
        </section>
      </main>
    );
  }

  if (!sessionReady) {
    return <main className="min-h-screen grid place-items-center bg-slate-950 text-white">جارٍ التحقق من الجلسة…</main>;
  }

  if (!signedIn) {
    return (
      <main dir="rtl" className="min-h-screen grid place-items-center bg-slate-950 p-6 text-white">
        <form onSubmit={handleSignIn} className="w-full max-w-md space-y-5 rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
          <div>
            <p className="text-xs font-semibold tracking-widest text-teal-300">RM NEUROAI · DEVELOPMENT</p>
            <h1 className="mt-3 text-2xl font-bold">تسجيل الدخول</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">الوصول مخصص للحسابات التي ينشئها أو يدعوها مسؤول المنصة. التسجيل العام مغلق.</p>
          </div>
          <label className="block space-y-2 text-sm">
            <span>البريد الإلكتروني</span>
            <input required type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400" />
          </label>
          <label className="block space-y-2 text-sm">
            <span>كلمة المرور</span>
            <input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400" />
          </label>
          {errorMessage && <p role="alert" className="rounded-lg bg-red-950/60 p-3 text-sm text-red-200">{errorMessage}</p>}
          <button disabled={submitting} className="w-full rounded-xl bg-teal-600 px-4 py-3 font-bold text-white disabled:opacity-50">
            {submitting ? 'جارٍ تسجيل الدخول…' : 'دخول آمن'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      <div className="fixed left-4 top-4 z-50">
        <button onClick={handleSignOut} className="rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs font-bold text-slate-700 shadow">
          تسجيل الخروج
        </button>
      </div>
      {children}
    </>
  );
};
