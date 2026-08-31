import React, { useState } from 'react';
import { Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import pathwaysData from '../data/pathways.json';

export default function LearningPathways() {
  const [selectedRole, setSelectedRole] = useState<string>(pathwaysData[0].role);

  const currentPathway = pathwaysData.find((p) => p.role === selectedRole) || pathwaysData[0];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Personalized Learning Pathways
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Pilih Jalur Belajar Berdasarkan Peran Anda
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dapatkan kurikulum yang disaring khusus agar sesuai dengan prioritas pekerjaan harian Anda.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {pathwaysData.map((p) => (
            <button
              key={p.role}
              onClick={() => setSelectedRole(p.role)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === p.role
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>{p.icon}</span>
              <span>{p.role.split('&')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pathway Overview */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentPathway.icon}</span>
          <div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">{currentPathway.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{currentPathway.summary}</p>
          </div>
        </div>
      </div>

      {/* Recommended Modules List */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Urutan Modul Prioritas untuk {currentPathway.role}:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPathway.recommendedModules.map((mod, idx) => (
            <a
              key={idx}
              href={mod.route}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all shadow-sm flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                    Langkah {idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{mod.route}</span>
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {mod.name}
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Pelajari Modul Ini</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
