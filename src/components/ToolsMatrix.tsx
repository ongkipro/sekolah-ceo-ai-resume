import React, { useState, useMemo } from 'react';
import { Search, Wrench, ExternalLink, Star, DollarSign, CheckCircle, Sparkles } from 'lucide-react';
import toolsData from '../data/tools.json';

export default function ToolsMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = useMemo(() => {
    const set = new Set<string>();
    toolsData.forEach((t) => set.add(t.category));
    return ['Semua', ...Array.from(set)];
  }, []);

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchCat = selectedCategory === 'Semua' || tool.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCases.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Wrench className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              AI Tools Comparison Matrix
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Direktori Software AI Rekomendasi Instruktur
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Daftar platform AI dengan use case bisnis nyata, estimasi biaya langganan, dan skor dampak operasional.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tool atau use case..."
            className="w-full pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
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
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs">
                    {tool.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {tool.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {tool.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                    {tool.pricing}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.summary}
              </p>

              {/* Best For Box */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Paling Ideal Untuk:
                </div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {tool.bestFor}
                </div>
              </div>

              {/* Use Cases */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Use Cases Utama:
                </div>
                <div className="flex flex-wrap gap-1">
                  {tool.useCases.map((uc, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Kurasi: Sekolah CEO AI</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">Terverifikasi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
