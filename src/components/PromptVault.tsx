import React, { useState } from 'react';
import { FileText, Copy, Check, Sliders, Sparkles, User, ArrowRight } from 'lucide-react';
import promptsData from '../data/prompts.json';

export default function PromptVault() {
  const [selectedPromptId, setSelectedPromptId] = useState(promptsData[0].id);
  const [variableValues, setVariableValues] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const selectedPrompt = promptsData.find((p) => p.id === selectedPromptId) || promptsData[0];

  const handleVarChange = (promptId: string, varKey: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [varKey]: value,
      },
    }));
  };

  const getVarValue = (promptId: string, varKey: string, defaultValue: string) => {
    return variableValues[promptId]?.[varKey] ?? defaultValue;
  };

  const getCompiledPrompt = (prompt: typeof promptsData[0]) => {
    let result = prompt.template;
    prompt.variables.forEach((v) => {
      const val = getVarValue(prompt.id, v.key, v.defaultValue);
      result = result.replaceAll(`{${v.key}}`, val);
    });
    return result;
  };

  const handleCopy = (prompt: typeof promptsData[0]) => {
    const text = getCompiledPrompt(prompt);
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <FileText className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
            Master Prompt Vault
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
          Koleksi 8 Master Prompt Siap Eksekusi
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          Kustomisasi variabel sesuai bisnis Anda secara instan lalu salin langsung ke Claude / ChatGPT / Gemini.
        </p>
      </div>

      {/* Main Grid: Selector on Left, Editor/Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Prompt List */}
        <div className="space-y-2 lg:col-span-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Daftar Template Prompt:
          </div>
          <div className="space-y-1.5">
            {promptsData.map((prompt) => {
              const isSelected = prompt.id === selectedPromptId;
              return (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => setSelectedPromptId(prompt.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold border border-slate-200 dark:border-slate-700">
                      {prompt.framework}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {prompt.category}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                    {prompt.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                    {prompt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Prompt View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            {/* Header of Active Prompt */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-mono">
                    {selectedPrompt.framework}
                  </span>
                  <span className="text-xs text-slate-400">• Diajarkan oleh: {selectedPrompt.speaker}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedPrompt.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(selectedPrompt)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
              >
                {copiedPromptId === selectedPrompt.id ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Prompt</span>
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
                        className="w-full px-3 py-2 text-base sm:text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-2xs"
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
                <span className="font-mono text-[10px] text-slate-400">Siap Paste ke AI</span>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 text-xs font-mono border border-slate-800 overflow-x-auto leading-relaxed max-h-96 whitespace-pre-wrap select-all no-scrollbar">
                {getCompiledPrompt(selectedPrompt)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
