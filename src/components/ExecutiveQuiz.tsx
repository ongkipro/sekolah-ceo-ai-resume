import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Lightbulb
} from 'lucide-react';
import quizQuestions from '../data/quiz.json';

const maturityLevels = [
  {
    minScore: 80,
    maxScore: 100,
    levelTitle: '👑 Level 5: AI-Native Chief Executive',
    recommendation: 'Insting arsitektur AI Anda sangat tajam! Anda siap menerapkan efisiensi 90% dan memimpin Solo Enterprise / AI-Driven Company.',
  },
  {
    minScore: 60,
    maxScore: 79,
    levelTitle: '⚡ Level 4: Agile AI Orchestrator',
    recommendation: 'Pemahaman Anda solid. Mulai jalankan Roadmap 30 Hari dan pasang sistem Koran Perusahaan serta Auto-PO di operasional Anda.',
  },
  {
    minScore: 40,
    maxScore: 59,
    levelTitle: '🌱 Level 3: Emerging AI Practitioner',
    recommendation: 'Anda memahami potensi AI, tetapi masih perlu membiasakan diri dengan framework prompt B.R.I.E.F. dan otomatisasi workflow N8N.',
  },
  {
    minScore: 0,
    maxScore: 39,
    levelTitle: '🔍 Level 2: Exploratory Leader',
    recommendation: 'Pelajari kembali ringkasan modul di Contekkan 3 Menit dan tonton video rekaman Day 1 untuk memperkuat fondasi logika AI.',
  },
];

export default function ExecutiveQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQ = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    if (showExplanation) return;
    setSelectedOptionIndex(optIndex);
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optIndex }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOptionIndex(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setShowExplanation(false);
    setIsQuizCompleted(false);
  };

  // Calculate score
  const calculateResult = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      const chosenIdx = userAnswers[idx];
      if (chosenIdx !== undefined && q.options[chosenIdx]?.isCorrect) {
        score += 20; // 5 questions * 20 = 100 max
      }
    });

    const level = maturityLevels.find(
      (m) => score >= m.minScore && score <= m.maxScore
    ) || maturityLevels[maturityLevels.length - 1];

    return { score, level };
  };

  const chosenOption = selectedOptionIndex !== null ? currentQ.options[selectedOptionIndex] : null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {!isQuizCompleted ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-6">
          {/* Progress Bar & Header */}
          <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Skenario Bisnis {currentQuestionIndex + 1} dari {quizQuestions.length}
              </span>
              <span className="font-mono font-bold">
                {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario Case Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                Kasus Nyata Eksekutif
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.scenario}
            </h4>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedOptionIndex === oIdx;
              const isCorrect = opt.isCorrect;
              const optionLetters = ['A', 'B', 'C'];
              
              let optionStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600';
              if (showExplanation) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
                } else {
                  optionStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={showExplanation}
                  className={`w-full p-4 sm:p-4.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${optionStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {optionLetters[oIdx] || oIdx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {showExplanation && chosenOption && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                <Lightbulb className="w-4 h-4" />
                <span>Analisis Keputusan Eksekutif:</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                {chosenOption.explanation}
              </p>
            </div>
          )}

          {/* Bottom Next Button */}
          {showExplanation && (
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>{currentQuestionIndex < quizQuestions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Asesmen'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        (() => {
          const { score, level } = calculateResult();
          return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg text-center space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-300">
              <div className="space-y-3">
                <div className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
                  <Sparkles className="w-10 h-10 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Hasil Asesmen Kematangan AI Anda:
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                    {level.levelTitle}
                  </h3>
                </div>
              </div>

              {/* Score Display */}
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 font-mono font-black text-xl">
                <span>Skor Eksekutif: {score} / 100</span>
              </div>

              {/* Level Description */}
              <div className="max-w-xl mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-left space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Rekomendasi Langkah Berikutnya:
                </div>
                <p>{level.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ulangi Asesmen
                </button>
                <a
                  href="/curriculum"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  Pelajari Kembali Kurikulum
                </a>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
