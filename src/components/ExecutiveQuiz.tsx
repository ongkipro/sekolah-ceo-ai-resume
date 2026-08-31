import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import quizData from '../data/quiz.json';

export default function ExecutiveQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [qIdx: number]: number }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = quizData[currentIdx];

  const handleSelect = (optIdx: number) => {
    if (selectedOptionIdx !== null) return; // Prevent changing after selection
    setSelectedOptionIdx(optIdx);
    setAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < quizData.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionIdx(answers[currentIdx + 1] ?? null);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setAnswers({});
    setIsFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(answers).filter(([qIdx, optIdx]) => {
    return quizData[Number(qIdx)].options[optIdx]?.isCorrect;
  }).length;

  const scorePercent = Math.round((correctCount / quizData.length) * 100);

  const getMaturityBadge = (score: number) => {
    if (score === 100) return { title: 'AI-Native Chief Executive (Level 5)', desc: 'Pemikiran Anda 100% selaras dengan visi efisiensi 90% dan orkestrasi AI modern.' };
    if (score >= 80) return { title: 'Agile AI Orchestrator (Level 4)', desc: 'Pemahaman eksekutif Anda sangat matang dan siap memimpin transformasi digital.' };
    if (score >= 60) return { title: 'AI Adopter in Transition (Level 3)', desc: 'Dasar pemikiran sudah baik, perlu memperdalam otomasi alur kerja dan mitigasi halusinasi.' };
    return { title: 'Traditional Executive (Level 2)', desc: 'Disarankan mempelajari modul Kamus Awam dan Contekkan 5 Menit untuk mempercepat adopsi.' };
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Executive AI Decision Assessment
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Uji Keputusan Eksekutif: Seberapa Siap Anda Memimpin AI?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            5 Skenario kasus bisnis nyata untuk menguji insting keputusan dan strategi adopsi AI Anda.
          </p>
        </div>

        {!isFinished && (
          <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Pertanyaan {currentIdx + 1} / {quizData.length}
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Scenario Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Skenario Kasus Bisnis #{currentIdx + 1}:
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedOptionIdx === oIdx;
              const hasAnswered = selectedOptionIdx !== null;

              let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500';
              if (hasAnswered) {
                if (opt.isCorrect) {
                  cardStyle = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100';
                } else if (isSelected && !opt.isCorrect) {
                  cardStyle = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                }
              }

              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelect(oIdx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${cardStyle}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-xs font-semibold leading-relaxed">
                        {opt.text}
                      </span>
                    </div>

                    {hasAnswered && (
                      <div className="shrink-0">
                        {opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        ) : null}
                      </div>
                    )}
                  </div>

                  {hasAnswered && (opt.isCorrect || isSelected) && (
                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>Penjelasan:</strong> {opt.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400">
              {selectedOptionIdx === null ? 'Pilih salah satu jawaban di atas' : 'Jawaban tersimpan!'}
            </span>

            {selectedOptionIdx !== null && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
              >
                <span>{currentIdx < quizData.length - 1 ? 'Lanjut Pertanyaan' : 'Lihat Skor & Hasil'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Hasil Evaluasi Kematangan AI</div>
            <h4 className="text-3xl font-black text-slate-900 dark:text-white">
              Skor: {scorePercent}% ({correctCount}/{quizData.length} Benar)
            </h4>
          </div>

          {/* Maturity Badge */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{getMaturityBadge(scorePercent).title}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {getMaturityBadge(scorePercent).desc}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulangi Asesmen
            </button>
            <a
              href="/roadmap"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Buka 30-60-90 Roadmap <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
