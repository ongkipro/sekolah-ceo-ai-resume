import React, { useState, useMemo } from 'react';
import { Search, BookMarked, Sparkles, TrendingUp, Lightbulb, ShieldCheck } from 'lucide-react';
import glossaryData from '../data/glossary.json';

interface GlossaryItem {
  term: string;
  englishName: string;
  category: string;
  laymanAnalogy: string;
  technicalDefinition: string;
  businessImpact: string;
  actionableStep: string;
}

export default function LaymanGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = useMemo(() => {
    const set = new Set<string>();
    glossaryData.forEach((item) => set.add(item.category));
    return ['Semua', ...Array.from(set)];
  }, []);

  const filteredItems = useMemo(() => {
    return glossaryData.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.laymanAnalogy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technicalDefinition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <BookMarked className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
              Layman&apos;s AI Glossary
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Kamus Istilah AI Bahasa Orang Awam
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Semua istilah teknis (LLM, Prompt, Auto-PO, ManyChat, Halusinasi) dijelaskan dengan analogi sederhana yang mudah dipahami siapa saja.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari istilah atau analogi..."
            className="w-full pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Category Pills (Mobile Horizontal Scroll) */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm font-bold'
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
            className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-900/80">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400 truncate">
                  {item.englishName}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {item.term}
              </h4>

              {/* Layman Analogy */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                  <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                  <span>Analogi Bahasa Awam:</span>
                </div>
                <p className="leading-relaxed">
                  {item.laymanAnalogy}
                </p>
              </div>

              {/* Technical Definition */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Definisi Teknis: </span>
                {item.technicalDefinition}
              </p>
            </div>

            {/* Business Impact & Action */}
            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Dampak: </span>
                  <span>{item.businessImpact}</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Langkah: </span>
                  <span>{item.actionableStep}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
