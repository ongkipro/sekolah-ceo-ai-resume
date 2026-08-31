import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Quote, 
  Lightbulb, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import sessionsData from '../data/sessions.json';
import { sessionSlugs } from '../lib/slugs';
import SessionResumeActionPlan from './SessionResumeActionPlan';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Props {
  sessionId: string;
}

export default function SingleSessionView({ sessionId }: Props) {
  const [currentTimestampSeconds, setCurrentTimestampSeconds] = useState<number>(0);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [apiReady, setApiReady] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const videoPlayerContainerRef = useRef<HTMLDivElement>(null);

  const activeSession = sessionsData.find((s) => s.id === sessionId) || sessionsData[0];
  const currentIndex = sessionSlugs.findIndex((s) => s.id === activeSession.id);
  const prevSession = currentIndex > 0 ? sessionSlugs[currentIndex - 1] : null;
  const nextSession = currentIndex < sessionSlugs.length - 1 ? sessionSlugs[currentIndex + 1] : null;

  // Initialize YouTube Iframe API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, []);

  // Create YouTube player instance
  useEffect(() => {
    if (!apiReady || !window.YT) return;

    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      try {
        playerRef.current.destroy();
      } catch (e) {}
    }

    try {
      playerRef.current = new window.YT.Player('yt-embedded-player', {
        videoId: activeSession.youtubeId,
        playerVars: {
          autoplay: 1,
          start: currentTimestampSeconds,
          enablejsapi: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setPlaybackRate(playbackRate);
            event.target.playVideo();
            setIsPlaying(true);
          },
          onStateChange: (event: any) => {
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2) setIsPlaying(false);
          },
          onPlaybackRateChange: (event: any) => {
            setPlaybackRate(event.data);
          }
        },
      });
    } catch (err) {
      console.warn('YT Player init error:', err);
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [apiReady, activeSession.id]);

  const jumpToTime = (secs: number) => {
    setCurrentTimestampSeconds(secs);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(secs, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleTopicClick = (topic: any) => {
    setActiveTopicId(activeTopicId === topic.id ? null : topic.id);
    jumpToTime(topic.timestampSeconds);
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
      playerRef.current.setPlaybackRate(speed);
    }
  };

  const seekRelative = (deltaSeconds: number) => {
    if (!playerRef.current) return;
    const currentTime = playerRef.current.getCurrentTime ? playerRef.current.getCurrentTime() : currentTimestampSeconds;
    const targetTime = Math.max(0, currentTime + deltaSeconds);
    jumpToTime(Math.floor(targetTime));
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const speedOptions = [1.0, 1.25, 1.5, 1.75, 2.0];

  return (
    <div className="w-full space-y-8 max-w-full">
      {/* 1. TOP HERO: Video Player Stage with Touch Controls & Speed Controller */}
      <div ref={videoPlayerContainerRef} className="space-y-3">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg relative group">
          {/* Top Video Stage Bar */}
          <div className="p-3.5 sm:p-4 bg-slate-950 text-white flex items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></span>
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
              <span className="font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-blue-400 font-bold text-xs">
                ▶ {formatTime(currentTimestampSeconds)}
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${activeSession.youtubeId}&t=${currentTimestampSeconds}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors px-2 py-1 bg-slate-900 rounded-lg border border-slate-800"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* YouTube Embed Player (16:9) */}
          <div className="relative aspect-video w-full bg-black">
            <div id="yt-embedded-player" className="absolute inset-0 w-full h-full"></div>
          </div>

          {/* Touch-Friendly Video Controller Strip */}
          <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 text-white flex flex-wrap items-center justify-between gap-3">
            {/* Play/Pause & Skip Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer ${
                  isPlaying 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm animate-pulse'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Jeda (Off)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Putar (Play)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => seekRelative(-10)}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Mundur 10 Detik"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">-10s</span>
              </button>

              <button
                type="button"
                onClick={() => seekRelative(10)}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Maju 10 Detik"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">+10s</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 sm:px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Speed Selector (1.0x - 2.0x) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 px-1 hidden sm:inline">Speed:</span>
              {speedOptions.map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    playbackRate === spd
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Jump Timestamp Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            Lompat ke Topik Sesi Ini:
          </span>
          <span className="font-mono text-[11px] font-normal">{activeSession.topics.length} Topik Tersedia</span>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
          {activeSession.topics.map((t) => {
            const isSelected = activeTopicId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTopicClick(t)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{t.timestamp}</span>
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Speaker Card & Golden Quote */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{activeSession.speaker.avatar}</span>
            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {activeSession.speaker.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {activeSession.speaker.role} • <span className="text-blue-600 dark:text-blue-400 font-semibold">{activeSession.speaker.company}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>Durasi: {activeSession.duration}</span>
          </div>
        </div>

        {/* Golden Quote */}
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-3">
          <Quote className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="italic leading-relaxed font-medium">
            &quot;{activeSession.quote}&quot;
          </div>
        </div>
      </div>

      {/* 4. Deep Topic Accordion Breakdown */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          Bedah Topik & Analogi Bahasa Awam:
        </div>

        <div className="space-y-3">
          {activeSession.topics.map((topic, idx) => {
            const isOpen = activeTopicId === topic.id || (activeTopicId === null && idx === 0);
            return (
              <div
                key={topic.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-700 shadow-sm'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleTopicClick(topic)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                        {topic.timestamp}
                      </span>
                      <span className="text-slate-400">• Topik #{idx + 1}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {topic.title}
                    </h4>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90 text-blue-600' : ''}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 space-y-4 animate-in fade-in duration-200">
                    {/* Layman Explanation */}
                    {topic.laymanExplanation && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-slate-800 dark:text-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Analogi Bahasa Awam:</span>
                        </div>
                        <p className="leading-relaxed font-medium">
                          {topic.laymanExplanation}
                        </p>
                      </div>
                    )}

                    {/* Key Takeaways */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Poin Kunci Eksekutif:
                      </div>
                      <ul className="space-y-1.5 text-slate-700 dark:text-slate-200">
                        {topic.keyTakeaways.map((point: string, pIdx: number) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Verbatim Quote */}
                    {topic.verbatimQuote && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 italic">
                        &quot;{topic.verbatimQuote}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Executive Resume & Interactive Action Plan */}
      <SessionResumeActionPlan
        sessionId={activeSession.id}
        sessionTitle={activeSession.title}
        speakerName={activeSession.speaker.name}
        day={activeSession.day}
        sessionNum={activeSession.sessionNum}
        executiveResume={(activeSession as any).executiveResume}
        actionPlan={(activeSession as any).actionPlan || []}
      />

      {/* 6. Previous / Next Session Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        {prevSession ? (
          <a
            href={`/curriculum/${prevSession.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sesi Sebelumnya ({prevSession.slug.toUpperCase()})</span>
          </a>
        ) : <div />}

        {nextSession ? (
          <a
            href={`/curriculum/${nextSession.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm w-full sm:w-auto justify-center"
          >
            <span>Sesi Berikutnya ({nextSession.slug.toUpperCase()})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : <div />}
      </div>
    </div>
  );
}
