import React, { useState } from 'react';
import { ResearchPaper } from '../types';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Filter, 
  Share2, 
  Bookmark,
  ExternalLink
} from 'lucide-react';

interface ResearchHubProps {
  papers: ResearchPaper[];
  lang: 'ar' | 'en';
}

export const ResearchHub: React.FC<ResearchHubProps> = ({ papers, lang }) => {
  const isAr = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('الكل');

  // AI Research Assistant Query State
  const [researchTopicInput, setResearchTopicInput] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResearchResult, setAiResearchResult] = useState<any>(null);

  const topics = ['الكل', 'التربية الخاصة', 'التأهيل الحركي', 'الذكاء الاصطناعي الطبي', 'التقنيات المساعدة'];

  const filteredPapers = papers.filter(p => {
    const matchesSearch = p.titleAr.includes(searchQuery) || p.summaryAr.includes(searchQuery) || p.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'الكل' || p.category === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const handleAskAIResearch = async () => {
    if (!researchTopicInput) return;
    setLoadingAI(true);
    try {
      const res = await fetch('/api/gemini/research-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: researchTopicInput, topic: researchTopicInput })
      });
      const data = await res.json();
      if (data.success) {
        setAiResearchResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-teal-900 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'مركز الأبحاث والمعرفة السريرية' : 'Evidence Research & Knowledge Base'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans">
          {isAr ? 'مركز الأبحاث ومساعد البحث الأكاديمي بـ Gemini' : 'Research Hub & AI Research Assistant'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
          {isAr
            ? 'مكتبة أبحاث رصينة ومُحدثة في مجال التربية الخاصة والتأهيل الحركي والأجهزة المساعدة مع تلخيص ذكي بالأكاديمية العربية.'
            : 'Explore evidence-based clinical literature, research trends, and AI summarization in special education & motor rehabilitation.'}
        </p>
      </div>

      {/* AI Research Assistant Input Box */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-700" />
          <h3 className="text-base font-bold text-slate-900">
            {isAr ? 'مساعد البحث الأكاديمي الذكي (Gemini Academic Assistant):' : 'Gemini AI Research Assistant:'}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={researchTopicInput}
            onChange={(e) => setResearchTopicInput(e.target.value)}
            placeholder="مثال: أثر رؤية الكمبيوتر على زوايا المشي لشلل الدماغ، أو أحدث طرق IEP للتوحد..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleAskAIResearch}
            disabled={loadingAI}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{loadingAI ? 'جاري البحث والتلخيص...' : 'بحث وتلخيص علمي'}</span>
          </button>
        </div>

        {/* AI Research Summary Output */}
        {aiResearchResult && (
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 text-xs animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                ملخص البحث والتطبيق السريري
              </span>
              <span className="text-[10px] text-slate-400">Gemini Academic Digest</span>
            </div>

            <p className="text-slate-200 leading-relaxed font-normal">
              {aiResearchResult.summary}
            </p>

            {aiResearchResult.keyTakeaways && (
              <div className="space-y-1.5 pt-2">
                <span className="text-teal-300 font-bold block">أبرز الاستنتاجات العلمية:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {aiResearchResult.keyTakeaways.map((k: string, i: number) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Topics */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTopic === t
                ? 'bg-blue-950 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Scientific Evidence Papers List */}
      <div className="space-y-6">
        {filteredPapers.map((paper) => (
          <div key={paper.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-teal-500 transition-all shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 w-fit">
                {paper.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  قراءة {paper.readTime}
                </span>
                <span>• {paper.journal} ({paper.year})</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {paper.titleAr}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {paper.titleEn} — <span className="font-bold text-slate-700">{paper.author}</span>
              </p>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {paper.summaryAr}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">أبرز النتائج السريرية الموثقة:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {paper.keyFindings.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
