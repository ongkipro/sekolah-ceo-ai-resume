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
  Clock 
} from 'lucide-react';
import Fuse from 'fuse.js';
import sessionsData from '../data/sessions.json';
import glossaryData from '../data/glossary.json';
import promptsData from '../data/prompts.json';
import toolsData from '../data/tools.json';

interface SearchItem {
  id: string;
  type: 'session' | 'topic' | 'glossary' | 'prompt' | 'tool';
  title: string;
  subtitle: string;
  badge: string;
  targetUrl: string;
  actionPayload?: any;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build searchable index
  const items = useMemo<SearchItem[]>(() => {
    const list: SearchItem[] = [];

    // 1. Sessions & Topics
    sessionsData.forEach((s) => {
      list.push({
        id: s.id,
        type: 'session',
        title: `${s.title} (${s.speaker.name})`,
        subtitle: s.summary,
        badge: `Day ${s.day} Sesi ${s.sessionNum}`,
        targetUrl: '/curriculum',
      });

      s.topics.forEach((t) => {
        list.push({
          id: t.id,
          type: 'topic',
          title: t.title,
          subtitle: `${t.laymanExplanation || ''} • ${t.keyTakeaways.join(' • ')}`,
          badge: `${s.speaker.name} @ ${t.timestamp}`,
          targetUrl: '/curriculum',
          actionPayload: { sessionId: s.id, timestampSeconds: t.timestampSeconds },
        });
      });
    });

    // 2. Glossary
    glossaryData.forEach((g) => {
      list.push({
        id: g.term,
        type: 'glossary',
        title: `${g.term} (${g.englishName})`,
        subtitle: `${g.laymanAnalogy} • Dampak: ${g.businessImpact}`,
        badge: `Kamus • ${g.category}`,
        targetUrl: '/glossary',
      });
    });

    // 3. Prompts
    promptsData.forEach((p) => {
      list.push({
        id: p.id,
        type: 'prompt',
        title: p.title,
        subtitle: p.description,
        badge: `Prompt • ${p.speaker}`,
        targetUrl: '/prompts',
      });
    });

    // 4. Tools
    toolsData.forEach((t) => {
      list.push({
        id: t.name,
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
    if (item.type === 'topic' && item.actionPayload) {
      window.dispatchEvent(
        new CustomEvent('jumpToTimestamp', {
          detail: item.actionPayload,
        })
      );
    }
    window.location.href = item.targetUrl;
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'session':
      case 'topic':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'glossary':
        return <BookMarked className="w-4 h-4 text-emerald-500" />;
      case 'prompt':
        return <FileText className="w-4 h-4 text-amber-500" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
        aria-label="Cari materi"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Cari materi...</span>
        <kbd className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
              } else if (e.key === 'Enter' && results[selectedIndex]) {
                e.preventDefault();
                handleSelect(results[selectedIndex]);
              }
            }}
            placeholder="Cari topik, kamus awam, prompt, atau tools..."
            className="w-full text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shrink-0"
            aria-label="Tutup pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/50">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs sm:text-sm text-slate-400">
              Tidak ada hasil yang cocok dengan &quot;{query}&quot;
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  idx === selectedIndex
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                  {getItemIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm truncate">{item.title}</span>
                    <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 whitespace-nowrap shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                {idx === selectedIndex && (
                  <CornerDownLeft className="w-4 h-4 text-blue-500 self-center shrink-0 hidden sm:inline" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] text-slate-400">
          <div className="flex gap-2 sm:gap-3">
            <span>↑↓ Pilih</span>
            <span>↵ Buka</span>
            <span>ESC Tutup</span>
          </div>
          <span className="truncate">Sekolah CEO AI Masterclass Hub</span>
        </div>
      </div>
    </div>
  );
}
