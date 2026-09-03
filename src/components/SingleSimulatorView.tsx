import React, { useState } from 'react';
import { Play, Copy, CheckCircle2, AlertTriangle, ArrowRight, BrainCircuit } from 'lucide-react';
import simulatorData from '../data/simulator.json';

interface Props {
  simulatorId: string;
}

export default function SingleSimulatorView({ simulatorId }: Props) {
  const [copied, setCopied] = useState(false);

  const sim = simulatorData.find((s) => s.id === simulatorId) || simulatorData[0];

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sim.initialPrompt).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-full">
      {/* Main Role Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 inline-block">
              {sim.role}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {sim.title}
            </h1>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-200 dark:border-amber-800/50 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
              Level: {sim.difficulty}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Skenario:</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{sim.scenario}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Konteks Eksekutif:</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{sim.context}</p>
          </div>
        </div>

        {/* Variables Info */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-500" />
            Variabel Keputusan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sim.variables.map((v, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div className="text-[10px] font-mono text-slate-400 mb-1">[{v.key}]</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action / Prompt Block */}
      <div className="bg-slate-900 dark:bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl text-white space-y-5 border border-slate-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Play className="w-5 h-5 text-emerald-400" />
              Jalankan Simulasi
            </h3>
            <p className="text-xs text-slate-400 mt-1">Salin prompt ini ke ChatGPT/Claude untuk memulai simulasi interaktif peran ini.</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold cursor-pointer shrink-0"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Salin Prompt'}</span>
          </button>
        </div>
        <div className="p-4 sm:p-5 bg-black/50 rounded-xl border border-white/10 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {sim.initialPrompt}
        </div>
      </div>
    </div>
  );
}
