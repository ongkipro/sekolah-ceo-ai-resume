import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookMarked, 
  Sparkles, 
  TrendingUp, 
  Lightbulb, 
  ShieldCheck, 
  Copy, 
  Check, 
  FileCode,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import glossaryData from '../data/glossary.json';

interface GlossaryItem {
  term: string;
  englishName: string;
  category: string;
  laymanAnalogy: string;
  technicalDefinition?: string;
  businessImpact: string;
  targetUrl?: string;
  actionLabel?: string;
  practicalPrompt?: string;
}

export default function LaymanGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    glossaryData.forEach((item) => set.add(item.category));
    return ['Semua', ...Array.from(set)];
  }, []);

  const filteredItems = useMemo(() => {
    return (glossaryData as GlossaryItem[]).filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.laymanAnalogy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessImpact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.practicalPrompt && item.practicalPrompt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyPrompt = (term: string, promptText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(promptText).catch(() => {});
    }
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

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
            Kamus Istilah AI & Prompt Eksekusi
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Semua istilah teknis dijelaskan dengan analogi sederhana dan dilengkapi <strong>Prompt Praktik Siap Salin</strong> ke AI.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari istilah, analogi, prompt..."
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredItems.map((item) => {
          const isCopied = copiedTerm === item.term;

          return (
            <div
              key={item.term}
              className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Card Top Header */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-900/80 shrink-0">
                    {item.category}
                  </span>
                  
                  {item.targetUrl ? (
                    <a
                      href={item.targetUrl}
                      className="text-xs font-mono text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate max-w-[160px] text-right font-medium hover:underline flex items-center gap-1 justify-end"
                      title={`Buka ${item.englishName}`}
                    >
                      <span className="truncate">{item.englishName}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-400 truncate max-w-[160px] text-right font-medium">
                      {item.englishName}
                    </span>
                  )}
                </div>

                {/* Term Title */}
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {item.term}
                </h4>

                {/* Layman Analogy Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                    <span>Analogi Bahasa Awam:</span>
                  </div>
                  <p className="leading-relaxed">
                    {item.laymanAnalogy}
                  </p>
                </div>

                {/* Business Impact */}
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Dampak Bisnis: </span>
                    <span>{item.businessImpact}</span>
                  </div>
                </div>

                {/* Actionable Practice Prompt */}
                {item.practicalPrompt && (
                  <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Prompt Praktik AI:</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(item.term, item.practicalPrompt!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 transition-colors cursor-pointer"
                        title="Salin Prompt Ini"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3 rounded-xl bg-slate-950 text-slate-100 text-[11px] font-mono border border-slate-800 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all max-h-40 no-scrollbar">
                      {item.practicalPrompt}
                    </pre>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action: Direct Link to Specific Module */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                {item.targetUrl ? (
                  <a
                    href={item.targetUrl}
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{item.actionLabel || 'Buka Modul'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                ) : (
                  <span>Sekolah CEO AI</span>
                )}

                <button
                  type="button"
                  onClick={() => handleCopyPrompt(item.term, item.practicalPrompt || item.term)}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{isCopied ? 'Tersalin!' : 'Copy Prompt'}</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
