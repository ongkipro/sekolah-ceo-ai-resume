import React, { useState, useEffect } from 'react';
import { Play, Clock, User, CheckCircle2, ExternalLink, ChevronRight, Sparkles, Quote, MessageSquare, Lightbulb } from 'lucide-react';
import sessionsData from '../data/sessions.json';
import SessionResumeActionPlan from './SessionResumeActionPlan';

export default function SessionViewer() {
  const [activeSessionId, setActiveSessionId] = useState<string>('d1s1');
  const [currentTimestampSeconds, setCurrentTimestampSeconds] = useState<number>(0);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const activeSession = sessionsData.find((s) => s.id === activeSessionId) || sessionsData[0];

  useEffect(() => {
    const handleJump = (e: any) => {
      const { sessionId, timestampSeconds } = e.detail;
      if (sessionId) setActiveSessionId(sessionId);
      if (typeof timestampSeconds === 'number') {
        setCurrentTimestampSeconds(timestampSeconds);
      }
    };
    window.addEventListener('jumpToTimestamp', handleJump);
    return () => window.removeEventListener('jumpToTimestamp', handleJump);
  }, []);

  const handleTopicClick = (topic: any) => {
    setActiveTopicId(topic.id);
    setCurrentTimestampSeconds(topic.timestampSeconds);
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
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Session Navigation Tabs (Mobile Horizontal Scroll) */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 pb-2 sm:pb-1.5">
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
              className={`min-w-[200px] sm:flex-1 py-3 px-4 rounded-xl text-left transition-all shrink-0 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white ring-1 ring-blue-500/30'
                  : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
                <span>Day {session.day} • Sesi {session.sessionNum}</span>
                <span className="text-[11px] font-normal text-slate-400 font-mono">{session.duration}</span>
              </div>
              <div className="text-sm font-semibold truncate">{session.speaker.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {session.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Split-View Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Session Breakdown & Interactive Topics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Speaker & Summary Card */}
          <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
                  <User className="w-3.5 h-3.5" />
                  {activeSession.speaker.role}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeSession.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Instruktur: <span className="text-slate-900 dark:text-slate-200 font-semibold">{activeSession.speaker.name}</span> ({activeSession.speaker.company})
                </p>
              </div>
              <div className="text-3xl p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hidden sm:block">
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
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                4 Pilar Utama Sesi Ini
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeSession.corePillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/50"
                  >
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Topics List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Daftar Topik & Timestamp Video
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {activeSession.topics.length} Modul
              </span>
            </div>

            {activeSession.topics.map((topic) => {
              const isSelected = activeTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <button
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
                          title="Lompat ke video"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          [{topic.timestamp}]
                        </button>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {topic.category}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        {topic.title}
                      </h5>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${
                        isSelected ? 'rotate-90 text-blue-600' : ''
                      }`}
                    />
                  </div>

                  {/* Layman Explanation Box */}
                  {(topic as any).laymanExplanation && (
                    <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Bahasa Sederhananya (Analogi Awam):
                      </div>
                      <p className="leading-relaxed font-medium">{(topic as any).laymanExplanation}</p>
                    </div>
                  )}

                  {/* Bullet Takeaways */}
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

        {/* Right Column: Sticky Video Player (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            {/* Player Header */}
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="truncate max-w-[200px] sm:max-w-none">Day {activeSession.day} Sesi {activeSession.sessionNum}</span>
              </div>
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-blue-400 text-[11px]">
                {formatTime(currentTimestampSeconds)}
              </span>
            </div>

            {/* Video Iframe Container (16:9 ratio) */}
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

            {/* Quick Actions & Mobile Scrollable Pills */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>💡 Klik waktu untuk loncat detik video</span>
                <a
                  href={`https://www.youtube.com/watch?v=${activeSession.youtubeId}&t=${currentTimestampSeconds}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Quick Jump Buttons (Mobile Scrollable) */}
              <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1">
                {activeSession.topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTopicClick(t)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors shrink-0 ${
                      currentTimestampSeconds === t.timestampSeconds
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {t.timestamp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Session Executive Resume & Action Plan Section */}
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
