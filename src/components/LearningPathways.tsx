import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Layers
} from 'lucide-react';
import pathwaysData from '../data/pathways.json';

export default function LearningPathways() {
  const [selectedRole, setSelectedRole] = useState<string>(pathwaysData[0].role);

  const currentPathway = pathwaysData.find((p) => p.role === selectedRole) || pathwaysData[0];

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Role Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {pathwaysData.map((pathway) => {
          const isSelected = pathway.role === selectedRole;
          return (
            <button
              key={pathway.role}
              type="button"
              onClick={() => setSelectedRole(pathway.role)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 shadow-md ring-2 ring-blue-500/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{pathway.icon}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {pathway.keyFocus.length} Modul
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {pathway.role}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {pathway.title.split(':')[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Pathway Detail Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6 sm:space-y-8">
        {/* Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentPathway.icon}</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentPathway.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              {currentPathway.description}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-semibold shrink-0">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Peran:</div>
            <div className="font-bold">{currentPathway.role}</div>
          </div>
        </div>

        {/* RECOMMENDED STEP-BY-STEP MODULES */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-500" />
            Modul Terkurasi Rekomendasi untuk Anda:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentPathway.keyFocus.map((focus, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between space-y-3 hover:border-blue-500/50 transition-all group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {mod.name}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-750 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <a
                    href={mod.route}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Buka Modul Ini</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
