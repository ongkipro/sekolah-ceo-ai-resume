import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, DollarSign, Lock, AlertCircle } from 'lucide-react';
import faqData from '../data/faq.json';

export default function ExecutiveFAQ() {
  const [openIds, setOpenIds] = useState<string[]>([faqData[0].id]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Data Privacy', 'Finansial & Biaya', 'People & Change', 'Eksekusi Teknis'];

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Data Privacy':
        return <Lock className="w-3.5 h-3.5 text-rose-500" />;
      case 'Finansial & Biaya':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-500" />;
      case 'People & Change':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Executive Governance & Risk FAQ
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Tanya Jawab Kritis Pemilik Bisnis & C-Level
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Jawaban lugas seputar privasi data rahasia, kalkulasi biaya AI vs gaji karyawan, dan mitigasi risiko operasional.
          </p>
        </div>
      </div>

      {/* Category Pills (Mobile Scrollable) */}
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

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFAQs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-700 shadow-sm'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleOpen(faq.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                      {getCategoryIcon(faq.category)}
                      {faq.category}
                    </span>
                    <span className="text-[11px] text-slate-400">• Dijawab oleh: {faq.speaker}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </h4>
                </div>

                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 space-y-3 animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                  
                  {faq.practicalTip && (
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Tips Praktis Eksekutif: </span>
                        <span>{faq.practicalTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
