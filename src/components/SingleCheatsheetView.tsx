import React, { useState } from 'react';
import { FileText, ArrowLeft, ArrowRight, Zap, Copy, CheckCircle2, ChevronRight } from 'lucide-react';
import cheatsheetsData from '../data/cheatsheets.json';
import { marked } from 'marked';

interface Props {
  id: string;
}

export default function SingleCheatsheetView({ id }: Props) {
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const activeData = cheatsheetsData.find((c) => c.id === id) || cheatsheetsData[0];
  const currentIndex = cheatsheetsData.findIndex((c) => c.id === id);
  const prevSlug = currentIndex > 0 ? cheatsheetsData[currentIndex - 1] : null;
  const nextSlug = currentIndex < cheatsheetsData.length - 1 ? cheatsheetsData[currentIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Main Cheatsheet Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-7">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 shrink-0">
              {activeData.category}
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
              {activeData.format}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {activeData.title}
          </h1>
          
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Oleh: {activeData.speaker}</span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: marked.parse(activeData.content || '') as string }} />
          </div>
        </div>
      </div>

      {/* Prev/Next Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevSlug ? (
          <a
            href={`/cheatsheet/${prevSlug.id}`}
            className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Sebelumnya</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white line-clamp-1">{prevSlug.title}</div>
              </div>
            </div>
          </a>
        ) : <div />}

        {nextSlug && (
          <a
            href={`/cheatsheet/${nextSlug.id}`}
            className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-between group text-right shadow-sm"
          >
            <div className="flex items-center justify-end gap-3 w-full">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Selanjutnya</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white line-clamp-1">{nextSlug.title}</div>
              </div>
              <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
