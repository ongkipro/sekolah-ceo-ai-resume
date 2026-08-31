import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Circle, Printer, Sparkles, RefreshCw } from 'lucide-react';
import roadmapData from '../data/roadmap.json';

const STORAGE_KEY = 'sekolah_ceo_ai_roadmap_progress';

export default function RoadmapTracker() {
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate total items
  const allItems = roadmapData.phases.flatMap((p) => p.items);
  const totalCount = allItems.length;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoaded(true);
  }, []);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (confirm('Reset semua progres checklist roadmap?')) {
      setCheckedItems({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            30-60-90 Days Action Plan & Implementation Tracker
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Panduan eksekusi bertahap untuk CEO & Founder. Progres otomatis tersimpan di browser Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Cetak / Export PDF
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Reset Checklist"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-wider font-bold text-blue-100">Status Adopsi AI Organisasi</span>
          </div>
          <div className="text-2xl font-black mt-1">
            {progressPercent}% Selesai ({completedCount}/{totalCount} Action Items)
          </div>
          <p className="text-xs text-blue-100 mt-0.5">
            {progressPercent === 100
              ? '🎉 Selamat! Organisasi Anda telah sepenuhnya bertransformasi dengan arsitektur AI.'
              : progressPercent >= 50
              ? '⚡ Progres luar biasa! Anda sudah mengotomasi operasi kunci dan intelligence digest.'
              : '🚀 Memulai transformasi personal intelligence & hotkeys C-Level.'}
          </p>
        </div>

        <div className="w-full sm:w-48 bg-blue-950/40 rounded-full h-3.5 p-0.5 border border-blue-400/30">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 shadow"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Phases Accordion / List */}
      <div className="space-y-6">
        {roadmapData.phases.map((phase) => (
          <div
            key={phase.phase}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Fase {phase.phase}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {phase.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {phase.subtitle}
                </p>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              {phase.items.map((item) => {
                const isChecked = Boolean(checkedItems[item.id]);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200'
                        : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 text-slate-900 dark:text-white'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-semibold ${isChecked ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                          {item.task}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {item.speaker}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
