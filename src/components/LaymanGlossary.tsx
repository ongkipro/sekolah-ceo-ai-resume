import React, { useState, useMemo } from 'react';
import { BookMarked, Search, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import glossaryData from '../data/glossary.json';

export default function LaymanGlossary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set(glossaryData.map((g) => g.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredItems = useMemo(() => {
    return glossaryData.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQ =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.laymanAnalogy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessImpact.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQ;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
              <BookMarked className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Layman&apos;s AI Glossary
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Kamus Istilah AI Bahasa Orang Awam
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Semua istilah teknis (LLM, Prompt, Auto-PO, ManyChat, Hallucination) dijelaskan dengan analogi sederhana yang mudah dipahami siapa saja.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari istilah atau analogi..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.term}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-slate-400 truncate max-w-[140px] text-right">
                  {item.englishName}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {item.term}
              </h4>

              {/* Layman Analogy Box */}
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Analogi Sederhana:
                </div>
                <p className="leading-relaxed">{item.laymanAnalogy}</p>
              </div>
            </div>

            {/* Business Impact Box */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                Dampak untuk Bisnis:
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.businessImpact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
