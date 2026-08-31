import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Circle, Printer, RotateCcw, User } from 'lucide-react';
import roadmapData from '../data/roadmap.json';

export default function RoadmapTracker() {
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sekolah_ceo_roadmap_tasks');
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading roadmap progress', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sekolah_ceo_roadmap_tasks', JSON.stringify(completedTasks));
    }
  }, [completedTasks, isLoaded]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh progress roadmap?')) {
      setCompletedTasks({});
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate stats
  const phases = roadmapData.phases || [];
  const allTasks = phases.flatMap((phase) => phase.items || []);
  const totalTasksCount = allTasks.length;
  const completedCount = allTasks.filter((t) => completedTasks[t.id]).length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Top Controls & Overall Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <Target className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Action Plan Tracker
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              Progress Eksekusi 30-60-90 Hari Organisasi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tersimpan otomatis di memori browser perangkat Anda.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Cetak / PDF
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Reset Progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Progress Metric */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Tingkat Kesiapan Eksekusi AI</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{progressPercent}% ({completedCount}/{totalTasksCount} Aksi)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 3 Phases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {phases.map((phase) => {
          const items = phase.items || [];
          const phaseTasksCompleted = items.filter((t) => completedTasks[t.id]).length;
          const phasePercent = items.length > 0 ? Math.round((phaseTasksCompleted / items.length) * 100) : 0;

          return (
            <div
              key={phase.phase}
              className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono">
                    Fase {phase.phase}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {phasePercent}%
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {phase.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {phase.subtitle}
                </p>

                {/* Task Checklist */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  {items.map((task) => {
                    const isDone = Boolean(completedTasks[task.id]);
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isDone
                            ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className={`text-xs font-bold leading-snug ${isDone ? 'line-through opacity-70' : ''}`}>
                            {task.task}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                            {task.detail}
                          </p>
                          <div className="pt-1 text-[10px] font-mono text-slate-400">
                            <span className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                              Ref: {task.speaker}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
