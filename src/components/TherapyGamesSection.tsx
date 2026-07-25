import React, { useState, useEffect } from 'react';
import { Gamepad2, Award, RotateCcw, Sparkles, CheckCircle2, Play, Trophy } from 'lucide-react';

interface TherapyGamesSectionProps {
  lang: 'ar' | 'en';
}

export const TherapyGamesSection: React.FC<TherapyGamesSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeGame, setActiveGame] = useState<'stars' | 'balance' | 'pattern'>('stars');

  // Catch the Star State
  const [starScore, setStarScore] = useState(0);
  const [starPos, setStarPos] = useState({ x: 50, y: 50 });
  const [gameTimeLeft, setGameTimeLeft] = useState(20);
  const [isStarGameRunning, setIsStarGameRunning] = useState(false);

  // Balance Master State
  const [balanceVal, setBalanceVal] = useState(0); // -100 to 100
  const [balanceScore, setBalanceScore] = useState(100);
  const [isBalanceRunning, setIsBalanceRunning] = useState(false);

  // Catch Star Game Timer
  useEffect(() => {
    let timer: any;
    if (isStarGameRunning && gameTimeLeft > 0) {
      timer = setInterval(() => setGameTimeLeft(t => t - 1), 1000);
    } else if (gameTimeLeft === 0) {
      setIsStarGameRunning(false);
    }
    return () => clearInterval(timer);
  }, [isStarGameRunning, gameTimeLeft]);

  // Balance Game Physics
  useEffect(() => {
    let interval: any;
    if (isBalanceRunning) {
      interval = setInterval(() => {
        setBalanceVal(prev => {
          const drift = (Math.random() - 0.5) * 12;
          const newVal = Math.max(-100, Math.min(100, prev + drift));
          if (Math.abs(newVal) > 40) {
            setBalanceScore(s => Math.max(0, s - 2));
          }
          return newVal;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isBalanceRunning]);

  const startStarGame = () => {
    setStarScore(0);
    setGameTimeLeft(20);
    setIsStarGameRunning(true);
    moveStar();
  };

  const moveStar = () => {
    const x = Math.floor(Math.random() * 80) + 10;
    const y = Math.floor(Math.random() * 70) + 15;
    setStarPos({ x, y });
  };

  const handleStarClick = () => {
    if (!isStarGameRunning) return;
    setStarScore(s => s + 10);
    moveStar();
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
          <Gamepad2 className="w-4 h-4 text-purple-300 animate-bounce" />
          <span>{isAr ? 'منصة الألعاب العلاجية التفاعلية' : 'Interactive Rehabilitation Games'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans">
          {isAr ? 'الألعاب العلاجية لتنمية المهارات الحركية والانتباه' : 'Therapy Games for Motor & Cognitive Skills'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
          {isAr
            ? 'ألعاب تفاعلية ممتعة ومصممة خصيصاً لزيادة التناسق الحركي البصري، ثبات التوازن، وتركيز الانتباه مع توثيق النقاط تلقائياً.'
            : 'Gamified rehabilitation challenges designed to improve hand-eye coordination, balance stability, and attention.'}
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveGame('stars')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeGame === 'stars' ? 'bg-purple-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>🌟 صيد النجوم (Catch the Star)</span>
        </button>

        <button
          onClick={() => setActiveGame('balance')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeGame === 'balance' ? 'bg-purple-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4 text-emerald-400" />
          <span>⚖️ سيد التوازن (Balance Master)</span>
        </button>
      </div>

      {/* GAME 1: CATCH THE STAR */}
      {activeGame === 'stars' && (
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold font-sans">لعبة صيد النجوم الرقمية</h3>
              <p className="text-xs text-slate-400">انقر أو المس النجوم المتحركة لتنمية التناسق بين العين واليد وزيادة زمن الانتباه.</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-emerald-400">
                الوقت المتبقي: {gameTimeLeft} ثانية
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg font-black text-sm">
                النقاط: {starScore}
              </span>
              <button
                onClick={startStarGame}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>{isStarGameRunning ? 'إعادة اللعب' : 'ابدأ اللعبة'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Play Arena */}
          <div className="relative w-full h-80 bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden flex items-center justify-center">
            
            {!isStarGameRunning && gameTimeLeft === 20 && (
              <div className="text-center space-y-3 z-10 p-6">
                <p className="text-sm font-bold text-slate-300">اضغط على "ابدأ اللعبة" للبدء بالصيد!</p>
              </div>
            )}

            {!isStarGameRunning && gameTimeLeft === 0 && (
              <div className="text-center space-y-3 z-10 p-6 bg-slate-900/90 rounded-2xl border border-slate-700">
                <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-white">ممتاز يا بطل! انتهت الجولة</h4>
                <p className="text-xs text-emerald-400 font-bold">حققت {starScore} نقطة وتم حفظ النتيجة بملف الطفل!</p>
              </div>
            )}

            {/* Target Star */}
            {isStarGameRunning && (
              <button
                onClick={handleStarClick}
                style={{ top: `${starPos.y}%`, left: `${starPos.x}%` }}
                className="absolute w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-400/50 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 animate-pulse"
              >
                ⭐
              </button>
            )}

          </div>
        </div>
      )}

      {/* GAME 2: BALANCE MASTER */}
      {activeGame === 'balance' && (
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold font-sans">لعبة سيد التوازن (Balance Master)</h3>
              <p className="text-xs text-slate-400">حافظ على استقرار المؤشر بمنتصف الخط لمنع الانحراف وزيادة ثبات القامة.</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-sm font-black">
                درجة التوازن: {balanceScore}%
              </span>
              <button
                onClick={() => {
                  setBalanceScore(100);
                  setBalanceVal(0);
                  setIsBalanceRunning(!isBalanceRunning);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>{isBalanceRunning ? 'إيقاف التوازن' : 'ابدأ اختبار التوازن'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-8">
            <div className="relative w-full h-8 bg-slate-800 rounded-full border border-slate-700 overflow-hidden flex items-center">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 bg-emerald-500/30 border-x-2 border-emerald-400" />
              <div
                style={{ left: `${50 + balanceVal * 0.4}%` }}
                className="absolute w-8 h-8 rounded-full bg-teal-400 border-2 border-white shadow-lg transition-all duration-100 transform -translate-x-1/2"
              />
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setBalanceVal(v => Math.max(-100, v - 20))}
                className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm border border-slate-700 cursor-pointer"
              >
                ◀ تعديل لليمين
              </button>
              <button
                onClick={() => setBalanceVal(v => Math.min(100, v + 20))}
                className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm border border-slate-700 cursor-pointer"
              >
                تعديل لليسار ▶
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
