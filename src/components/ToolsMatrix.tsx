import React, { useState, useMemo } from 'react';
import { Wrench, Star, ExternalLink, Search } from 'lucide-react';
import toolsData from '../data/tools.json';

export default function ToolsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set(toolsData.map((t) => t.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCases.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" />
            AI Tools Comparison Matrix & Directory
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Daftar software & platform AI rekomendasi dari para instruktur beserta use case bisnis dan rating dampaknya.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tool atau use case..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50">
                  {tool.category}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold" title={`Impact Score: ${tool.impactScore}/5`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{tool.impactScore}.0</span>
                </div>
              </div>

              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {tool.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 mb-2 font-mono">
                <span>{tool.pricing}</span>
                <span>•</span>
                <span className="text-slate-500">{tool.difficulty}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                {tool.summary}
              </p>

              {/* Use Cases */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Use Case Kunci:
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {tool.useCases.slice(0, 3).map((uc, i) => (
                    <li key={i} className="truncate">• {uc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Ref: {tool.speaker}</span>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Kunjungi <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
