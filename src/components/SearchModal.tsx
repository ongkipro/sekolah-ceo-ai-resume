import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  CornerDownLeft, 
  Video, 
  FileText, 
  BookMarked, 
  Wrench, 
  Sparkles, 
  Clock,
  Compass,
  Layers,
  Calculator,
  Target,
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import Fuse from 'fuse.js';
import sessionsData from '../data/sessions.json';
import glossaryData from '../data/glossary.json';
import promptsData from '../data/prompts.json';
import toolsData from '../data/tools.json';
import { 
  sessionSlugs, 
  pathwaySlugs, 
  architectureSlugs, 
  simulatorSlugs, 
  promptSlugs 
} from '../lib/slugs';

interface SearchItem {
  id: string;
  type: 'session' | 'topic' | 'glossary' | 'prompt' | 'tool' | 'pathway' | 'architecture' | 'simulator' | 'cheatsheet';
  title: string;
  subtitle: string;
  badge: string;
  targetUrl: string;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build searchable index
  const items = useMemo<SearchItem[]>(() => {
    const list: SearchItem[] = [];

    // 1. Sessions & Topics (Direct Slugs)
    sessionsData.forEach((s) => {
      const slugObj = sessionSlugs.find(sl => sl.id === s.id);
      const sessionUrl = `/curriculum/${slugObj?.slug || s.id}`;

      list.push({
        id: `session-${s.id}`,
        type: 'session',
        title: `${s.title} (${s.speaker.name})`,
        subtitle: s.summary,
        badge: `Day ${s.day} Sesi ${s.sessionNum}`,
        targetUrl: sessionUrl,
      });

      // Cheatsheet Slug
      list.push({
        id: `cheatsheet-${s.id}`,
        type: 'cheatsheet',
        title: `Contekkan 3 Menit: ${s.title}`,
        subtitle: `Ringkasan eksekutif, do tomorrow, dan master prompt sesi ${s.speaker.name}`,
        badge: `Contekkan • Day ${s.day}`,
        targetUrl: `/cheatsheet/${slugObj?.slug || s.id}`,
      });

      s.topics.forEach((t) => {
        list.push({
          id: `topic-${t.id}`,
          type: 'topic',
          title: t.title,
          subtitle: `${t.laymanExplanation || ''} • ${t.keyTakeaways.join(' • ')}`,
          badge: `${s.speaker.name} @ ${t.timestamp}`,
          targetUrl: sessionUrl,
        });
      });
    });

    // 2. Pathways
    pathwaySlugs.forEach((p) => {
      list.push({
        id: `pathway-${p.slug}`,
        type: 'pathway',
        title: `Jalur Belajar: ${p.role}`,
        subtitle: `Kurikulum terarah dan panduan implementasi khusus ${p.name}`,
        badge: `Peran • ${p.role.split('&')[0].trim()}`,
        targetUrl: `/pathways/${p.slug}`,
      });
    });

    // 3. Architecture Blueprints
    architectureSlugs.forEach((a) => {
      list.push({
        id: `arch-${a.slug}`,
        type: 'architecture',
        title: `Blueprint: ${a.name}`,
        subtitle: `Peta alur arsitektur sistem otomatisasi bisnis AI`,
        badge: `Arsitektur`,
        targetUrl: `/architecture/${a.slug}`,
      });
    });

    // 4. Prompts (Direct Slugs)
    promptsData.forEach((p) => {
      const pSlug = promptSlugs.find(ps => ps.id === p.id);
      list.push({
        id: `prompt-${p.id}`,
        type: 'prompt',
        title: p.title,
        subtitle: p.description,
        badge: `Prompt • ${p.speaker}`,
        targetUrl: `/prompts/${pSlug?.slug || p.id}`,
      });
    });

    // 5. Simulators
    simulatorSlugs.forEach((sim) => {
      list.push({
        id: `sim-${sim.slug}`,
        type: 'simulator',
        title: `Simulasi AI: ${sim.name}`,
        subtitle: `Dekonstruksi tugas dan hitung penghematan anggaran gaji`,
        badge: `Simulator ROI`,
        targetUrl: `/simulator/${sim.slug}`,
      });
    });

    // 6. Glossary
    glossaryData.forEach((g) => {
      list.push({
        id: `glossary-${g.term}`,
        type: 'glossary',
        title: `${g.term} (${g.englishName})`,
        subtitle: `${g.laymanAnalogy} • Dampak: ${g.businessImpact}`,
        badge: `Kamus • ${g.category}`,
        targetUrl: '/glossary',
      });
    });

    // 7. Tools
    toolsData.forEach((t) => {
      list.push({
        id: `tool-${t.name}`,
        type: 'tool',
        title: `${t.name} (${t.pricing})`,
        subtitle: `${t.summary} • Use cases: ${t.useCases.join(', ')}`,
        badge: `Tool • ${t.category}`,
        targetUrl: '/tools',
      });
    });

    return list;
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ['title', 'subtitle', 'badge'],
        threshold: 0.35,
      }),
    [items]
  );

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8);
    return fuse.search(query).slice(0, 10).map((r) => r.item);
  }, [query, fuse, items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    window.location.href = item.targetUrl;
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'session':
      case 'topic':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'cheatsheet':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'prompt':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'pathway':
        return <Compass className="w-4 h-4 text-indigo-500" />;
      case 'architecture':
        return <Layers className="w-4 h-4 text-cyan-500" />;
      case 'simulator':
        return <Calculator className="w-4 h-4 text-emerald-500" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-rose-500" />;
      case 'glossary':
      default:
        return <BookMarked className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <>
      {/* Trigger Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs cursor-pointer"
        aria-label="Cari Materi Masterclass"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Cari materi...</span>
        <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl bg-white dark:bg-[#090d16] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik kata kunci (contoh: N8N, Auto-PO, Audit, Satya, Prompt, CEO)..."
                className="flex-1 bg-transparent text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-500 hover:bg-slate-200 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40">
              {results.length === 0 ? (
                <div className="p-8 text-center space-y-2 text-slate-400">
                  <p className="text-sm font-semibold">Tidak ditemukan hasil untuk &quot;{query}&quot;</p>
                  <p className="text-xs">Coba kata kunci lain seperti: Suno, HeyGen, Pricing, SOP, B.R.I.E.F., Natali, Anjas.</p>
                </div>
              ) : (
                results.map((item, idx) => {
                  const isSel = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                        isSel
                          ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0 mt-0.5">
                          {getItemIcon(item.type)}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold truncate">
                              {item.title}
                            </h4>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 shrink-0">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono shrink-0 pt-1">
                        <span className="hidden sm:inline">Pilih</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{results.length} hasil ditemukan</span>
              <span>Tekan Enter untuk membuka halaman</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
