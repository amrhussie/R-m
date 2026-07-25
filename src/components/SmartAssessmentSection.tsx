import React, { useState, useRef, useEffect } from 'react';
import { Child, Assessment } from '../types';
import { 
  Activity, 
  Brain, 
  Camera, 
  Play, 
  Square, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  BarChart2,
  Sliders,
  Award,
  Video
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';

interface SmartAssessmentSectionProps {
  childrenList: Child[];
  lang: 'ar' | 'en';
}

export const SmartAssessmentSection: React.FC<SmartAssessmentSectionProps> = ({ childrenList, lang }) => {
  const isAr = lang === 'ar';

  const [selectedChildId, setSelectedChildId] = useState<string>(childrenList[0]?.id || 'c1');
  const selectedChild = childrenList.find(c => c.id === selectedChildId) || childrenList[0];

  // Camera & MoveVision AI Simulation state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [jointAngle, setJointAngle] = useState<number>(85);
  const [gaitSymmetry, setGaitSymmetry] = useState<number>(82);
  const [postureScore, setPostureScore] = useState<number>(78);
  const [repCount, setRepCount] = useState<number>(12);
  const [aiAnalyzing, setAiAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated pose animation loop on Canvas
  useEffect(() => {
    let animationFrameId: number;
    let angleStep = 0.05;
    let currentAngle = 85;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderPose = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark medical video/vision background grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw simulated stick figure skeleton
      const centerX = canvas.width / 2;
      const headY = 70;

      // Animate joints slightly to simulate gait/squat
      currentAngle += angleStep;
      if (currentAngle > 110 || currentAngle < 65) {
        angleStep = -angleStep;
      }
      const kneeOffset = Math.sin(currentAngle * 0.05) * 20;

      // Joints coordinates
      const head = { x: centerX, y: headY };
      const neck = { x: centerX, y: headY + 30 };
      const rShoulder = { x: centerX + 35, y: headY + 45 };
      const lShoulder = { x: centerX - 35, y: headY + 45 };
      const rElbow = { x: centerX + 55, y: headY + 80 };
      const lElbow = { x: centerX - 55, y: headY + 80 };
      const hip = { x: centerX, y: headY + 120 };
      const rHip = { x: centerX + 25, y: headY + 120 };
      const lHip = { x: centerX - 25, y: headY + 120 };
      const rKnee = { x: centerX + 30 + kneeOffset, y: headY + 180 };
      const lKnee = { x: centerX - 30 - kneeOffset, y: headY + 180 };
      const rAnkle = { x: centerX + 35 + kneeOffset * 0.5, y: headY + 240 };
      const lAnkle = { x: centerX - 35 - kneeOffset * 0.5, y: headY + 240 };

      // Draw skeleton bone connections
      const bones = [
        [head, neck], [neck, rShoulder], [neck, lShoulder],
        [rShoulder, rElbow], [lShoulder, lElbow],
        [neck, hip], [hip, rHip], [hip, lHip],
        [rHip, rKnee], [rKnee, rAnkle],
        [lHip, lKnee], [lKnee, lAnkle]
      ];

      ctx.strokeStyle = '#06b6d4'; // Cyan neon
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      bones.forEach(([from, to]) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });

      // Draw Joint Landmark Nodes
      const joints = [head, neck, rShoulder, lShoulder, rElbow, lElbow, hip, rHip, lHip, rKnee, lKnee, rAnkle, lAnkle];
      joints.forEach((joint, idx) => {
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, idx === 0 ? 12 : 6, 0, Math.PI * 2);
        ctx.fillStyle = idx === 9 || idx === 10 ? '#22c55e' : '#38bdf8'; // Highlight knees in green
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Angle indicator label at Right Knee
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Knee Angle: ${Math.round(currentAngle)}°`, rKnee.x + 15, rKnee.y);

      // AI MoveVision Overlay Box
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(centerX - 80, headY - 20, 160, 280);
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`MoveVision AI Tracking • 30 FPS`, 15, 25);

      if (isCameraActive) {
        animationFrameId = requestAnimationFrame(renderPose);
      }
    };

    if (isCameraActive) {
      renderPose();
    } else {
      // Static initial render
      renderPose();
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isCameraActive]);

  // Real-time API Analysis caller
  const handleRunAIAnalysis = async () => {
    setAiAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-pose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gaitSymmetry,
          postureBalance: postureScore,
          romAngle: jointAngle,
          exerciseType: 'تقييم الحركة والاتزان العام',
          childDiagnosis: selectedChild.diagnosis
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiAnalyzing(false);
    }
  };

  // Recharts Data for Progress Timeline & Skill Breakdown
  const progressTimelineData = [
    { week: 'الأسبوع 1', motor: 55, cognitive: 60, balance: 50 },
    { week: 'الأسبوع 2', motor: 60, cognitive: 65, balance: 58 },
    { week: 'الأسبوع 3', motor: 68, cognitive: 70, balance: 65 },
    { week: 'الأسبوع 4', motor: 72, cognitive: 78, balance: 70 },
    { week: 'الأسبوع 5', motor: 78, cognitive: 85, balance: 76 },
  ];

  const skillRadarData = [
    { skill: 'الاتزان الحركي', score: selectedChild.motorScore },
    { skill: 'التركيز الذهني', score: selectedChild.cognitiveScore },
    { skill: 'تفاعلية الأداء', score: selectedChild.engagementLevel },
    { skill: 'المدى الحركي ROM', score: 78 },
    { skill: 'تناظر المشي Gait', score: 82 },
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{isAr ? 'لوحة التقييم السريري والتحليل الحركي' : 'Smart Assessment & Motion Tracking'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans">
          {isAr ? 'التقييم الذكي وتتبع الحركة MoveVision AI' : 'Smart Assessment & MoveVision AI Tracking'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
          {isAr
            ? 'نظام تحليل حركة الطفل والبيوميكانيكا آلياً عبر كاميرا الجوال أو الكمبيوتر، مع حساب التناظر والمدى الحركي وتنبؤات التحسن السريري.'
            : 'Real-time biomechanical vision analysis tracking joint angles, gait symmetry, and clinical improvement predictions.'}
        </p>
      </div>

      {/* Child Profile Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'اختر ملف الطفل للتقييم:' : 'Select Child Profile:'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr ? 'عرض المؤشرات السريرية الحالية وتحليلات الحركة المحدثة' : 'View current clinical indicators and updated motion analytics'}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {childrenList.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChildId(c.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  c.id === selectedChildId
                    ? 'bg-blue-950 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Child Header Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 flex items-center gap-4">
            <img src={selectedChild.avatar} alt={selectedChild.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-white" />
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900">{selectedChild.name}</h2>
              <div className="text-xs font-bold text-teal-700 bg-teal-100/60 px-2.5 py-0.5 rounded-full inline-block">
                {selectedChild.diagnosis}
              </div>
              <p className="text-[11px] text-slate-500">العمر: {selectedChild.age} سنوات • {selectedChild.disabilityType}</p>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[11px] font-bold text-slate-500">الدرجة الحركية</span>
              <p className="text-2xl font-black text-blue-900">{selectedChild.motorScore}%</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[11px] font-bold text-slate-500">الدرجة المعرفية</span>
              <p className="text-2xl font-black text-teal-700">{selectedChild.cognitiveScore}%</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[11px] font-bold text-slate-500">مستوى التفاعل</span>
              <p className="text-2xl font-black text-emerald-600">{selectedChild.engagementLevel}%</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[11px] font-bold text-slate-500">توقع التحسن السريري</span>
              <p className="text-2xl font-black text-purple-700">{selectedChild.improvementPrediction}%</p>
            </div>
          </div>

        </div>
      </div>

      {/* MoveVision AI Live Motion Camera Tracker Canvas Section */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h3 className="text-xl font-bold font-sans">
                {isAr ? 'تتبع الحركة المباشر MoveVision AI' : 'MoveVision AI Camera Biomechanics Tracker'}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {isAr ? 'تقييم زوايا المفاصل وتناظر المشي والوقوف آلياً بالذكاء الاصطناعي' : 'Real-time skeleton joint angle detection & posture analysis'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCameraActive(!isCameraActive)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isCameraActive 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-md'
              }`}
            >
              {isCameraActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isCameraActive ? (isAr ? 'إيقاف التتبع' : 'Stop Motion Tracking') : (isAr ? 'تشغيل الكاميرا والتتبع' : 'Start Camera Motion AI')}</span>
            </button>

            <button
              onClick={handleRunAIAnalysis}
              disabled={aiAnalyzing}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{aiAnalyzing ? (isAr ? 'جاري التحليل...' : 'Analyzing...') : (isAr ? 'تحليل النتائج بـ Gemini' : 'Run Gemini Analysis')}</span>
            </button>
          </div>
        </div>

        {/* Live Canvas & Real-time Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Canvas Box */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-2 relative flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={520}
              height={320}
              className="w-full h-auto rounded-xl max-w-full bg-slate-950"
            />
            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 px-3 py-2 bg-slate-900/90 rounded-b-xl border-t border-slate-800">
              <span className="flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}`} />
                {isCameraActive ? 'كاشف نقاط المفاصل نشط' : 'وضع المعاينة والتقييم'}
              </span>
              <span>معدل الالتقاط: 30 fps • MediaPipe Pose Engine</span>
            </div>
          </div>

          {/* Realtime Measurement Gauges */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-4">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>قياسات البيوميكانيكا الفورية</span>
              </h4>

              {/* Metric 1: Gait Symmetry */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">تناظر المشي والتوازن (Gait Symmetry)</span>
                  <span className="text-teal-400 font-mono">{gaitSymmetry}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-teal-400 h-2.5 rounded-full transition-all duration-300" style={{ width: `${gaitSymmetry}%` }} />
                </div>
              </div>

              {/* Metric 2: Posture Balance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">استقامة الجذع والقامة (Posture Score)</span>
                  <span className="text-emerald-400 font-mono">{postureScore}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-400 h-2.5 rounded-full transition-all duration-300" style={{ width: `${postureScore}%` }} />
                </div>
              </div>

              {/* Metric 3: Range of Motion Angle */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">زاوية انثناء الركبة (Joint ROM Angle)</span>
                  <span className="text-amber-400 font-mono">{jointAngle}°</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-400 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(jointAngle / 180) * 100}%` }} />
                </div>
              </div>

              {/* Counter Box */}
              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">عدد تكرارات التمرين اليومي:</span>
                <span className="bg-blue-900/60 border border-blue-500/40 px-3 py-1 rounded-lg text-emerald-300 font-black text-sm">
                  {repCount} تكرارات مكتملة
                </span>
              </div>
            </div>

            {/* AI Generated Clinical Analysis Feedback */}
            {aiResult && (
              <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-5 space-y-2 animate-fadeIn text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>نتائج تحليل الذكاء الاصطناعي السريري (Gemini):</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {aiResult.analysis}
                </p>
                <div className="pt-2 space-y-1">
                  <span className="text-teal-300 font-bold block">التوصيات التأهيلية:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {aiResult.recommendations?.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* CHARTS SECTION: Progress Timeline & Skill Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Progress Line Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isAr ? 'مخطط التطور الحركي والمعرفي الزمني' : 'Progress Timeline Chart'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'متابعة أسبوعية لمعدلات التطور الحركي والتركيز التراكمي' : 'Weekly tracking of cumulative motor & cognitive scores'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="w-3 h-3 rounded-full bg-blue-900" />
              <span>الحركي</span>
              <span className="w-3 h-3 rounded-full bg-teal-600" />
              <span>المعرفي</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} 
                />
                <Line type="monotone" dataKey="motor" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="cognitive" stroke="#0f766e" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'توزيع المهارات التأهيلية للطفل' : 'Skill Radar Breakdown'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr ? 'مقياس المهارات الخمس الأساسية المحسوبة رقمياً' : 'Five core skill areas score radar'}
            </p>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillRadarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#334155' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="الطفل" dataKey="score" stroke="#0f766e" fill="#0f766e" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
