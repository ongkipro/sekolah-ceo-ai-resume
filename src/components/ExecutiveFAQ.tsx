import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import faqData from '../data/faq.json';

export default function ExecutiveFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
          <HelpCircle className="w-4 h-4" />
        </span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Executive FAQ
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Pertanyaan Paling Sering Ditanyakan Pemilik Bisnis
          </h3>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqData.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className={`w-full p-4 text-left flex items-center justify-between gap-4 transition-colors ${
                  isOpen
                    ? 'bg-blue-50/60 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="text-sm font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
