import React, { useState, useMemo } from 'react';
import { Search, Wrench, Copy, Check, FileCode, ExternalLink } from 'lucide-react';
import toolsData from '../data/tools.json';

interface ToolItem {
  name: string;
  category: string;
  pricing: string;
  difficulty: string;
  impactScore: number;
  url: string;
  speaker: string;
  useCases: string[];
  summary: string;
  starterPrompt?: string;
}

export default function ToolsMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [copiedTool, setCopiedTool] = useState<string | null>(null);

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
        tool.useCases.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tool.starterPrompt && tool.starterPrompt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyPrompt = (toolName: string, promptText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(promptText).catch(() => {});
    }
    setCopiedTool(toolName);
    setTimeout(() => setCopiedTool(null), 2000);
  };

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
            Direktori Software AI & Starter Prompts
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Daftar platform AI rekomendasi instruktur lengkap dengan <strong>Starter Prompt Siap Pakai</strong>.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tool, use case, prompt..."
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredTools.map((tool) => {
          const isCopied = copiedTool === tool.name;

          return (
            <div
              key={tool.name}
              className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {tool.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 shrink-0">
                    {tool.pricing}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tool.summary}
                </p>

                {/* Use Cases */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Use Cases Utama:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tool.useCases.map((uc, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Starter Prompt Box */}
                {tool.starterPrompt && (
                  <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Starter Prompt:</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(tool.name, tool.starterPrompt!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 hover:bg-blue-200 transition-colors cursor-pointer"
                        title="Salin Prompt Ini"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-blue-600" />
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

                    <pre className="p-3 rounded-xl bg-slate-950 text-slate-100 text-[11px] font-mono border border-slate-800 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all max-h-36 no-scrollbar">
                      {tool.starterPrompt}
                    </pre>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Rekomendasi: {tool.speaker.split('&')[0].trim()}</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Kunjungi Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
