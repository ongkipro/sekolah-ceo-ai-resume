import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle, Copy, Check, Clock, Sparkles } from 'lucide-react';
import cheatsheetsData from '../data/cheatsheets.json';

export default function ExecutiveCheatsheet() {
  const [selectedId, setSelectedId] = useState<string>(cheatsheetsData[0].sessionId);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentSheet = cheatsheetsData.find((c) => c.sessionId === selectedId) || cheatsheetsData[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Session Selector Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
        {cheatsheetsData.map((sheet) => {
          const isActive = sheet.sessionId === selectedId;
          return (
            <button
              key={sheet.sessionId}
              onClick={() => setSelectedId(sheet.sessionId)}
              className={`flex-1 min-w-[170px] py-2.5 px-3.5 rounded-lg text-xs font-semibold transition-all text-left ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                <span>{sheet.readTime}</span>
                <span className="text-blue-500 font-bold">●</span>
              </div>
              <div className="truncate text-slate-900 dark:text-white font-bold">{sheet.sessionTitle.split('-')[0]}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{sheet.sessionTitle.split('-')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Main Cheatsheet Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Contekkan 3 Menit • {currentSheet.sessionTitle}
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {currentSheet.theme}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{currentSheet.readTime}</span>
          </div>
        </div>

        {/* 3 Key Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentSheet.threeKeyNumbers.map((num, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">{num.metric}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{num.meaning}</p>
            </div>
          ))}
        </div>

        {/* Action & Avoid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Must do */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              Lakukan Besok Pagi:
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {currentSheet.mustDoTomorrow}
            </p>
          </div>

          {/* Fatal mistake */}
          <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Kesalahan Fatal yang Harus Dihindari:
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {currentSheet.fatalMistakeToAvoid}
            </p>
          </div>
        </div>

        {/* Key Prompt */}
        <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              1 Master Prompt Terpenting Sesi Ini:
            </span>
            <button
              onClick={() => handleCopy(currentSheet.keyPrompt, currentSheet.sessionId)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              {copiedKey === currentSheet.sessionId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
            {currentSheet.keyPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
