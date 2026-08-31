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
  Clock
} from 'lucide-react';
import cheatsheetsData from '../data/cheatsheets.json';

export default function ExecutiveCheatsheet() {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(cheatsheetsData[0].sessionId);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const activeData = cheatsheetsData.find((c) => c.sessionId === selectedSessionId) || cheatsheetsData[0];

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Session Switcher Grid (2x2 on Mobile, 4 Cols on Desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
        {cheatsheetsData.map((sheet) => {
          const isActive = sheet.sessionId === selectedSessionId;
          return (
            <button
              key={sheet.sessionId}
              type="button"
              onClick={() => setSelectedSessionId(sheet.sessionId)}
              className={`p-2.5 sm:p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white dark:bg-slate-800 shadow-md border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white ring-2 ring-amber-500/40'
                  : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-850/40 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <span className="truncate">{sheet.sessionTitle.split('-')[0].trim()}</span>
                <span className="text-[9px] sm:text-[10px] font-mono font-normal text-slate-400 shrink-0 ml-1">{sheet.readTime}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold truncate text-slate-900 dark:text-white">
                {sheet.sessionTitle.split('-')[1]?.trim() || sheet.sessionTitle}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 hidden xs:block">
                {sheet.theme}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Cheatsheet Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6 sm:space-y-8">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                3-Min Executive Cheatsheet
              </span>
              <span className="text-xs text-slate-400">• {sheetTitle(activeData.sessionTitle)}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeData.theme}
            </h3>
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
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Lakukan Besok Pagi (Top Priority):
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {activeData.mustDoTomorrow}
            </p>
          </div>

          {/* Fatal Mistakes Card */}
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              1 Kesalahan Fatal yang Harus Dihindari:
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
            3 Angka Kunci Dampak Bisnis (Executive Metrics):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeData.threeKeyNumbers.map((num, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1"
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
        <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3.5">
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

        {/* Bottom Link to Full Curriculum */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          <span>Ingin menonton rekaman lengkap sesi ini?</span>
          <a
            href="/curriculum"
            className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Buka Kurikulum & Video Synchronizer <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function sheetTitle(title: string) {
  return title || 'Sesi Masterclass';
}
