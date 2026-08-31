import React, { useState } from 'react';
import { Copy, Check, FileText, Sliders, Sparkles } from 'lucide-react';
import promptsData from '../data/prompts.json';

export default function PromptVault() {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(promptsData[0].id);
  const [variableValues, setVariableValues] = useState<{ [promptId: string]: { [key: string]: string } }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedPrompt = promptsData.find((p) => p.id === selectedPromptId) || promptsData[0];

  const getVarValue = (promptId: string, key: string, defaultVal: string) => {
    return variableValues[promptId]?.[key] ?? defaultVal;
  };

  const handleVarChange = (promptId: string, key: string, val: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [key]: val,
      },
    }));
  };

  const getCompiledPrompt = (prompt: typeof selectedPrompt) => {
    let result = prompt.template;
    prompt.variables.forEach((v) => {
      const currentVal = getVarValue(prompt.id, v.key, v.defaultValue);
      result = result.replaceAll(`{${v.key}}`, currentVal);
    });
    return result;
  };

  const handleCopy = (prompt: typeof selectedPrompt) => {
    const textToCopy = getCompiledPrompt(prompt);
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Executive Prompt Vault
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Koleksi Master Prompt Eksekutif & Variabel Kustom
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Prompt siap pakai standar B.R.I.E.F. untuk internal audit .docx, sales objection cloning, dan visual prompt.
          </p>
        </div>
      </div>

      {/* Grid: Left Prompt List, Right Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Prompt Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          {promptsData.map((prompt) => {
            const isSelected = prompt.id === selectedPromptId;
            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() => setSelectedPromptId(prompt.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-blue-500 dark:border-blue-500 shadow-md ring-2 ring-blue-500/40'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
                    {prompt.category}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                    {prompt.framework}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {prompt.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {prompt.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Instruktur:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{prompt.speaker}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Interactive Prompt Customizer & Copy Panel (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
          {/* Active Prompt Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono">
                  {selectedPrompt.framework}
                </span>
                <span className="text-xs text-slate-400">• {selectedPrompt.category}</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedPrompt.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedPrompt.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(selectedPrompt)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
            >
              {copiedId === selectedPrompt.id ? (
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

          {/* Inline Variable Editor */}
          {selectedPrompt.variables.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-blue-500" />
                <span>Kustomisasi Variabel Prompt Anda:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPrompt.variables.map((v) => (
                  <div key={v.key} className="space-y-1">
                    <label className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 block truncate">
                      {`{${v.key}}`} - {v.label}
                    </label>
                    <input
                      type="text"
                      value={getVarValue(selectedPrompt.id, v.key, v.defaultValue)}
                      onChange={(e) => handleVarChange(selectedPrompt.id, v.key, e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compiled Prompt Display */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Hasil Prompt Terkompilasi:</span>
              <span className="font-mono text-[10px] text-slate-400">Siap Paste ke Claude / ChatGPT / Gemini</span>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 text-xs font-mono border border-slate-800 overflow-x-auto leading-relaxed max-h-96 whitespace-pre-wrap select-all no-scrollbar">
              {getCompiledPrompt(selectedPrompt)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
