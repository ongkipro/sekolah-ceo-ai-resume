import { marked } from 'marked';
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Target, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  User 
} from 'lucide-react';

interface ActionItem {
  id: string;
  task: string;
  pic: string;
  timeframe: string;
  output: string;
}

interface ExecutiveResume {
  title: string;
  overview: string;
  keyPillarsExploration: Array<{
    title: string;
    content: string;
  }>;
  strategicTakeaway: string;
}

interface Props {
  sessionId: string;
  sessionTitle: string;
  speakerName: string;
  day: number;
  sessionNum: number;
  executiveResume?: ExecutiveResume;
  actionPlan: ActionItem[];
}

export default function SessionResumeActionPlan({
  sessionId,
  sessionTitle,
  speakerName,
  day,
  sessionNum,
  executiveResume,
  actionPlan = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<'resume' | 'actionPlan' | 'transcript'>('resume');
  const [checkedMap, setCheckedMap] = useState<{ [id: string]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const storageKey = `sekolah_ceo_session_todo_${sessionId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedMap(JSON.parse(saved));
      } else {
        setCheckedMap({});
      }
    } catch (e) {
      console.error('Error loading session action plan', e);
    }
    setIsLoaded(true);
  }, [sessionId]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(checkedMap));
    }
  }, [checkedMap, isLoaded, storageKey]);

  const toggleCheck = (id: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReset = () => {
    if (confirm('Reset to-do list untuk sesi ini?')) {
      setCheckedMap({});
    }
  };

  const totalCount = actionPlan.length;
  const completedCount = actionPlan.filter((item) => checkedMap[item.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-7 shadow-sm space-y-6 max-w-full overflow-hidden">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              Day {day} • Sesi {sessionNum}
            </span>
            <span className="text-xs text-slate-400 font-medium truncate">• {speakerName}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Rangkuman Mendalam & Action Plan
          </h3>
        </div>

        {/* Tab Buttons (Responsive Grid on Mobile) */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 shrink-0 max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab('resume')}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">Rangkuman</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('actionPlan')}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'actionPlan'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span className="truncate">To-Do ({completedCount}/{totalCount})</span></button>

          <button
            type="button"
            onClick={() => setActiveTab('transcript')}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'transcript'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">Transkrip Lengkap</span>
          </button>
        </div>

      </div>

      {/* Tab 1: Executive Resume */}
      {activeTab === 'resume' && executiveResume && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {executiveResume.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {executiveResume.overview}
            </p>
          </div>

          {/* Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {executiveResume.keyPillarsExploration.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2"
              >
                <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  {p.title}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.content}
                </p>
              </div>
            ))}
          </div>

          {/* Strategic Takeaway Box */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-slate-800 dark:text-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              Strategic Takeaway untuk C-Level:
            </div>
            <p className="leading-relaxed font-medium">
              {executiveResume.strategicTakeaway}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive To-Do List Action Plan */}
      {activeTab === 'actionPlan' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Progress Bar Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-blue-100">
                Progres Eksekusi Sesi Ini
              </div>
              <div className="text-lg sm:text-xl font-black mt-0.5">
                {progressPercent}% Selesai ({completedCount}/{totalCount} Action Items)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-32 bg-blue-950/40 rounded-full h-3 p-0.5 border border-blue-400/30">
                <div
                  className="bg-white h-full rounded-full transition-all duration-300 shadow"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="p-1 rounded-lg text-blue-200 hover:text-white cursor-pointer"
                title="Reset to-do"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Items List */}
          <div className="space-y-3">
            {actionPlan.map((item) => {
              const isChecked = Boolean(checkedMap[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 text-slate-900 dark:text-white'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                        {item.task}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono shrink-0">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                          PIC: {item.pic}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {item.timeframe}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-300 font-semibold">Output:</strong> {item.output}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Full Transcript */}
      {activeTab === 'transcript' && (activeSession as any).fullTranscript && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 sm:p-7 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-h2:text-blue-600 dark:prose-h2:text-blue-400 prose-h3:text-slate-700 dark:prose-h3:text-slate-300">
            <div dangerouslySetInnerHTML={{ __html: marked.parse((activeSession as any).fullTranscript) }} />
          </div>
        </div>
      )}
    </div>

  );
}
