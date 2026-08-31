import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Clock,
  Video
} from 'lucide-react';
import cheatsheetsData from '../data/cheatsheets.json';
import { sessionSlugs } from '../lib/slugs';

interface Props {
  sessionId: string;
}

export default function SingleCheatsheetView({ sessionId }: Props) {
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const activeData = cheatsheetsData.find((c) => c.sessionId === sessionId) || cheatsheetsData[0];
  const currentIndex = sessionSlugs.findIndex((s) => s.id === activeData.sessionId);
  const prevSlug = currentIndex > 0 ? sessionSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < sessionSlugs.length - 1 ? sessionSlugs[currentIndex + 1] : null;
  const currentSlugObj = sessionSlugs.find((s) => s.id === activeData.sessionId);

  const handleCopyPrompt = (promptText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(promptText).catch(() => {});
    }
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="w-full space-y-8 max-w-full">
      {/* Main Cheatsheet Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-7">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-mono">
                3-Min Executive Cheatsheet
              </span>
              <span className="text-xs text-slate-400">• {activeData.sessionTitle}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeData.theme}
            </h1>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 font-semibold text-xs shrink-0">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Waktu Baca: {activeData.readTime}</span>
          </div>
        </div>

        {/* 1. DO TOMORROW & FATAL MISTAKES (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Do Tomorrow Card */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Lakukan Besok Pagi (Top Priority):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {activeData.mustDoTomorrow}
            </p>
          </div>

          {/* Fatal Mistakes Card */}
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>1 Kesalahan Fatal yang Harus Dihindari:</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {activeData.fatalMistakeToAvoid}
            </div>
          </div>
        </div>

        {/* 2. 3 KEY NUMBERS & METRICS */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>3 Angka Kunci Dampak Bisnis (Executive Metrics):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeData.threeKeyNumbers.map((num, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {num.metric}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {num.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 1 MASTER PROMPT TERPENTING */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>1 Master Prompt Terpenting Sesi Ini</span>
            </div>

            <button
              type="button"
              onClick={() => handleCopyPrompt(activeData.keyPrompt)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-4 h-4" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Salin Master Prompt Ini
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all no-scrollbar max-h-60">
            {activeData.keyPrompt}
          </pre>
        </div>

        {/* Bottom Link to Full Video Curriculum */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          <span>Ingin menonton rekaman lengkap video sesi ini?</span>
          <a
            href={`/curriculum/${currentSlugObj?.slug || activeData.sessionId}`}
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Tonton Video & Detik Sinkronisasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation to Previous / Next Cheatsheet */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {prevSlug ? (
          <a
            href={`/cheatsheet/${prevSlug.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Contekkan Sebelumnya ({prevSlug.slug.toUpperCase()})</span>
          </a>
        ) : <div />}

        {nextSlug ? (
          <a
            href={`/cheatsheet/${nextSlug.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-sm w-full sm:w-auto justify-center cursor-pointer"
          >
            <span>Contekkan Berikutnya ({nextSlug.slug.toUpperCase()})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : <div />}
      </div>
    </div>
  );
}
