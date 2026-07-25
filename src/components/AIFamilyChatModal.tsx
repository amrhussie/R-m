import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, HeartHandshake } from 'lucide-react';

interface AIFamilyChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AIFamilyChatModal: React.FC<AIFamilyChatModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const isAr = lang === 'ar';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'أهلاً بك! أنا مساعد منصة RM NeuroAI للأسرة. كيف يمكنني مساعدتك اليوم في توجيه طفلك بالتمارين المنزلية، التغذية، أو الإجابة عن استفسارات الخطط العلاجية والتربوية؟',
      time: 'الآن'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentPrompt = inputText;
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/family-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentPrompt })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: Message = {
          id: `a-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[600px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-teal-900 text-white p-4 flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-emerald-300 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-sans">
                {isAr ? 'مساعد الأسرة الذكي (AI Family Assistant)' : 'AI Family Assistant'}
              </h3>
              <p className="text-[11px] text-teal-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>متصل للرد الفوري الموثوق</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                m.sender === 'user' ? 'bg-blue-950 text-white' : 'bg-teal-600 text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3.5 space-y-1 shadow-xs ${
                m.sender === 'user'
                  ? 'bg-blue-950 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                <span className="text-[9px] block text-slate-400 text-left font-mono">{m.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center text-slate-500 text-xs">
              <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-200" />
                <span>جاري صياغة إجابة داعمة...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isAr ? 'اكتب سؤالك أو استفسارك هنا...' : 'Type your question here...'}
            className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">إرسال</span>
          </button>
        </form>

      </div>
    </div>
  );
};
