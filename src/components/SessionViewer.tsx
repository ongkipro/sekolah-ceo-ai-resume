import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Clock, 
  User, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  Quote, 
  MessageSquare, 
  Lightbulb,
  Video,
  ListOrdered
} from 'lucide-react';
import sessionsData from '../data/sessions.json';
import SessionResumeActionPlan from './SessionResumeActionPlan';

export default function SessionViewer() {
  const [activeSessionId, setActiveSessionId] = useState<string>('d1s1');
  const [currentTimestampSeconds, setCurrentTimestampSeconds] = useState<number>(0);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  const activeSession = sessionsData.find((s) => s.id === activeSessionId) || sessionsData[0];

  useEffect(() => {
    const handleJump = (e: any) => {
      const { sessionId, timestampSeconds } = e.detail;
      if (sessionId) setActiveSessionId(sessionId);
      if (typeof timestampSeconds === 'number') {
        setCurrentTimestampSeconds(timestampSeconds);
      }
      // Scroll to video smoothly on mobile
      if (videoPlayerRef.current && window.innerWidth < 1024) {
        videoPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('jumpToTimestamp', handleJump);
    return () => window.removeEventListener('jumpToTimestamp', handleJump);
  }, []);

  const handleTopicClick = (topic: any) => {
    setActiveTopicId(topic.id);
    setCurrentTimestampSeconds(topic.timestampSeconds);
    // Scroll to video on small screens
    if (videoPlayerRef.current && window.innerWidth < 1024) {
      videoPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getYoutubeEmbedUrl = (videoId: string, startSec: number) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startSec}&enablejsapi=1&rel=0`;
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Session Switcher Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
        {sessionsData.map((session) => {
          const isActive = session.id === activeSessionId;
          return (
            <button
              key={session.id}
              onClick={() => {
                setActiveSessionId(session.id);
                setCurrentTimestampSeconds(0);
                setActiveTopicId(null);
              }}
              className={`min-w-[220px] flex-1 py-3 px-4 rounded-xl text-left transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-800 shadow-md border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white ring-2 ring-blue-500/40'
                  : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
                <span>Day {session.day} • Sesi {session.sessionNum}</span>
                <span className="text-[11px] font-normal text-slate-400 font-mono">{session.duration}</span>
              </div>
              <div className="text-sm font-bold truncate text-slate-900 dark:text-white">{session.speaker.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {session.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. TOP HERO: Video Player Stage (Coursera / Masterclass Style) */}
      <div ref={videoPlayerRef} className="space-y-3">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          {/* Top Video Stage Bar */}
          <div className="p-3.5 sm:p-4 bg-slate-950 text-white flex items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Day {activeSession.day} Sesi {activeSession.sessionNum}</span>
                  <span>•</span>
                  <span className="text-blue-400 truncate">{activeSession.speaker.name}</span>
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-xl">
                  {activeSession.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono bg-slate-850 border border-slate-750 px-2.5 py-1 rounded-lg text-blue-400 font-bold text-xs">
                ▶ {formatTime(currentTimestampSeconds)}
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${activeSession.youtubeId}&t=${currentTimestampSeconds}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
              >
                YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 16:9 Cinematic Video Player */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              key={`${activeSession.youtubeId}-${currentTimestampSeconds}`}
              src={getYoutubeEmbedUrl(activeSession.youtubeId, currentTimestampSeconds)}
              title={activeSession.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Timestamp Quick-Jumps Bar Under Player */}
          <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Lompat Detik Topik:
              </span>
              <span className="text-[11px]">Pilih waktu di bawah untuk auto-play</span>
            </div>

            {/* Horizontal Scrollable Timestamp Buttons */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
              {activeSession.topics.map((t) => {
                const isSelected = currentTimestampSeconds === t.timestampSeconds;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTopicClick(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-sm scale-105'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>[{t.timestamp}]</span>
                    <span className="font-sans text-[11px] truncate max-w-[120px] hidden sm:inline opacity-80">
                      {t.title.split(':')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BELOW VIDEO: Speaker Profile, Takeaways & Topic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Speaker & Pillar Overview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
                  <User className="w-3.5 h-3.5" />
                  {activeSession.speaker.role}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeSession.speaker.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {activeSession.speaker.company}
                </p>
              </div>
              <div className="text-3xl p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                {activeSession.speaker.avatar}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeSession.summary}
            </p>

            {/* Golden Quote */}
            {activeSession.quote && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-500 text-xs text-slate-700 dark:text-slate-200 italic flex items-start gap-2.5">
                <Quote className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>&quot;{activeSession.quote}&quot;</span>
              </div>
            )}

            {/* Core Pillars */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                4 Pilar Utama Sesi Ini
              </h4>
              <div className="space-y-1.5">
                {activeSession.corePillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/50"
                  >
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Topic Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-blue-500" />
              Detail Modul Materi ({activeSession.topics.length} Topik)
            </h4>
            <span className="text-xs text-slate-400 font-mono">Klik topik untuk play</span>
          </div>

          <div className="space-y-3">
            {activeSession.topics.map((topic) => {
              const isSelected = activeTopicId === topic.id || currentTimestampSeconds === topic.timestampSeconds;
              return (
                <div
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3.5 ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-transform active:scale-95"
                          title="Lompat ke video di atas"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          [{topic.timestamp}]
                        </button>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {topic.category}
                        </span>
                      </div>
                      <h5 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {topic.title}
                      </h5>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${
                        isSelected ? 'rotate-90 text-blue-600' : ''
                      }`}
                    />
                  </div>

                  {/* Layman Analogy Gold Box */}
                  {(topic as any).laymanExplanation && (
                    <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Bahasa Sederhananya (Analogi Awam):
                      </div>
                      <p className="leading-relaxed font-medium">{(topic as any).laymanExplanation}</p>
                    </div>
                  )}

                  {/* Bullet Key Takeaways */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Poin Kunci:</div>
                    {topic.keyTakeaways.map((takeaway, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verbatim Quote Highlight */}
                  {(topic as any).verbatimHighlight && (
                    <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 italic flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>&quot;{(topic as any).verbatimHighlight}&quot;</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SECTION: Dynamic Session Executive Resume & Action Plan To-Do List */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <SessionResumeActionPlan
          sessionId={activeSession.id}
          sessionTitle={activeSession.title}
          speakerName={activeSession.speaker.name}
          day={activeSession.day}
          sessionNum={activeSession.sessionNum}
          executiveResume={(activeSession as any).executiveResume}
          actionPlan={(activeSession as any).actionPlan}
        />
      </div>
    </div>
  );
}
