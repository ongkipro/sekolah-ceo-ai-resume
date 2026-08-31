import React, { useState } from 'react';
import { Copy, Check, FileText, Sliders, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import promptsData from '../data/prompts.json';
import { promptSlugs } from '../lib/slugs';

interface Props {
  promptId: string;
}

export default function SinglePromptView({ promptId }: Props) {
  const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const prompt = promptsData.find((p) => p.id === promptId) || promptsData[0];
  const currentIndex = promptSlugs.findIndex((p) => p.id === prompt.id);
  const prevSlug = currentIndex > 0 ? promptSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < promptSlugs.length - 1 ? promptSlugs[currentIndex + 1] : null;

  const handleVarChange = (key: string, val: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const getCompiledPrompt = () => {
    let result = prompt.template;
    prompt.variables.forEach((v) => {
      const currentVal = variableValues[v.key] ?? v.defaultValue;
      result = result.replaceAll(`{${v.key}}`, currentVal);
    });
    return result;
  };

  const handleCopy = () => {
    const text = getCompiledPrompt();
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8 max-w-full">
      {/* Main Prompt Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono">
                {prompt.framework}
              </span>
              <span className="text-xs text-slate-400">• {prompt.category} • Diajarkan oleh: {prompt.speaker}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {prompt.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {prompt.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Prompt Ini</span>
              </>
            )}
          </button>
        </div>

        {/* Variable Customizer */}
        {prompt.variables.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>Kustomisasi Variabel Prompt:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prompt.variables.map((v) => (
                <div key={v.key} className="space-y-1">
                  <label className="text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 block truncate">
                    {`{${v.key}}`} - {v.label}
                  </label>
                  <input
                    type="text"
                    value={variableValues[v.key] ?? v.defaultValue}
                    onChange={(e) => handleVarChange(v.key, e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compiled Output Preview */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Hasil Prompt Terkompilasi:</span>
            <span className="font-mono text-[10px] text-slate-400">Siap Paste ke Claude / ChatGPT / Gemini</span>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 text-slate-100 text-xs font-mono border border-slate-800 overflow-x-auto leading-relaxed max-h-[500px] whitespace-pre-wrap select-all no-scrollbar">
            {getCompiledPrompt()}
          </pre>
        </div>
      </div>

      {/* Navigation to Previous / Next Prompt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {prevSlug ? (
          <a
            href={`/prompts/${prevSlug.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prompt Sebelumnya</span>
          </a>
        ) : <div />}

        {nextSlug ? (
          <a
            href={`/prompts/${nextSlug.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm w-full sm:w-auto justify-center cursor-pointer"
          >
            <span>Prompt Berikutnya</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : <div />}
      </div>
    </div>
  );
}
