import React from 'react';
import { Calculator, ArrowRight, ArrowLeft, Cpu, User, Sparkles, TrendingUp } from 'lucide-react';
import simulatorData from '../data/simulator.json';
import { simulatorSlugs } from '../lib/slugs';

interface Props {
  simulatorId: string;
}

export default function SingleSimulatorView({ simulatorId }: Props) {
  const sim = simulatorData.find((s) => s.id === simulatorId) || simulatorData[0];
  const currentIndex = simulatorSlugs.findIndex((s) => s.id === sim.id);
  const prevSim = currentIndex > 0 ? simulatorSlugs[currentIndex - 1] : null;
  const nextSim = currentIndex < simulatorSlugs.length - 1 ? simulatorSlugs[currentIndex + 1] : null;

  const totalHours = sim.tasks.reduce((sum, t) => sum + t.hoursPerWeek, 0);
  const aiHours = sim.tasks.filter((t) => t.type === 'ai').reduce((sum, t) => sum + t.hoursPerWeek, 0);
  const hybridHours = sim.tasks.filter((t) => t.type === 'hybrid').reduce((sum, t) => sum + t.hoursPerWeek, 0);
  const humanHours = sim.tasks.filter((t) => t.type === 'human').reduce((sum, t) => sum + t.hoursPerWeek, 0);

  const automatedHours = aiHours + hybridHours * 0.5;
  const efficiencyPercent = Math.round((automatedHours / totalHours) * 100);
  const monthlyCostSaved = Math.round(sim.baseSalary * (efficiencyPercent / 100));

  return (
    <div className="space-y-8 max-w-full">
      {/* Main Role Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Calculator className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                {sim.department}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
              {sim.roleName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Dekonstruksi {sim.tasks.length} micro-tasks pada posisi ini memangkas {aiHours} jam kerja repetitif dan menghemat anggaran bulanan sebesar Rp {(monthlyCostSaved / 1000000).toFixed(1)} Juta ({efficiencyPercent}% efisiensi).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
            <div>Gaji Acuan:</div>
            <div className="font-bold text-slate-900 dark:text-white">Rp {(sim.baseSalary / 1000000).toFixed(0)} Juta/bln</div>
          </div>
        </div>

        {/* 3 Metrics KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">Jam Repetitif Terpangkas</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-400 font-mono">
              {aiHours} Jam / Mgg
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Dialihkan 100% ke Agen AI
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Tingkat Efisiensi Output</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              +{efficiencyPercent}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Beban kognitif staf berkurang drastis
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">Estimasi Efisiensi Biaya</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              Rp {(monthlyCostSaved / 1000000).toFixed(1)} Jt/bln
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Penghematan kas operasional
            </div>
          </div>
        </div>

        {/* Micro-Tasks Breakdown List */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Rincian Alokasi {sim.tasks.length} Micro-Tasks:</span>
            <span className="font-mono text-slate-400 font-normal">Total {totalHours} Jam / Minggu</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            {sim.tasks.map((task, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{task.name}</span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 shrink-0">({task.hoursPerWeek} jam/mgg)</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{task.description}</p>
                  <div className="text-[11px] text-slate-400 font-mono pt-0.5">
                    Rekomendasi Tool: <span className="text-blue-600 dark:text-blue-400 font-bold">{task.toolRecommended}</span>
                  </div>
                </div>

                <div className="shrink-0 pt-1 sm:pt-0">
                  {task.type === 'ai' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <Cpu className="w-3.5 h-3.5" />
                      100% AI Automated
                    </span>
                  )}
                  {task.type === 'hybrid' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      <Sparkles className="w-3.5 h-3.5" />
                      Hybrid (AI + Human)
                    </span>
                  )}
                  {task.type === 'human' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <User className="w-3.5 h-3.5" />
                      100% Human Strategic
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation to Previous / Next Simulator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {prevSim ? (
          <a
            href={`/simulator/${prevSim.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Simulasi Sebelumnya ({prevSim.name})</span>
          </a>
        ) : <div />}

        {nextSim ? (
          <a
            href={`/simulator/${nextSim.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm w-full sm:w-auto justify-center"
          >
            <span>Simulasi Berikutnya ({nextSim.name})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : <div />}
      </div>
    </div>
  );
}
