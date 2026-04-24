import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameState } from '../types/game';
import { Heart, Clock, Trophy, ChevronRight, Star, Sparkles } from 'lucide-react';
import { questions } from '../data/questions';

interface GameScreenProps {
  game: GameState;
  onAnswer: (selectedIndex: number, correctIndex: number) => void;
  onNextLevel: () => void;
}

const optionLabels = ['A', 'B', 'C', 'D'];
const optionColors = [
  'from-blue-600/80 to-blue-700/80',
  'from-emerald-600/80 to-emerald-700/80',
  'from-amber-600/80 to-amber-700/80',
  'from-rose-600/80 to-rose-700/80',
];

export function GameScreen({ game, onAnswer, onNextLevel }: GameScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const currentQuestion = questions[game.currentLevel];
  const progress = ((game.currentLevel) / questions.length) * 100;

  const handleSelect = useCallback((index: number) => {
    if (showResult || selectedOption !== null) return;
    setSelectedOption(index);
    const correct = index === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(index, currentQuestion.correctIndex);
  }, [showResult, selectedOption, currentQuestion, onAnswer]);

  useEffect(() => {
    if (showResult) {
      if (!isCorrect) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      const timer = setTimeout(() => {
        setSelectedOption(null);
        setShowResult(false);
        onNextLevel();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect, onNextLevel]);

  // Reset when level changes
  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setShake(false);
  }, [game.currentLevel]);

  if (!currentQuestion) return null;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/bg-game.jpg)' }}
      />
      <div className="absolute inset-0 bg-slate-900/80" />

      {/* Top Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="relative z-10 flex items-center justify-between px-4 py-3 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <div className="bg-slate-700/80 px-3 py-1 rounded-lg">
            <span className="text-amber-400 font-bold text-sm">
              第 {game.currentLevel + 1}/{questions.length} 关
            </span>
          </div>
          <div className="bg-slate-700/80 px-3 py-1 rounded-lg flex items-center gap-1">
            <span className="text-slate-300 text-xs">时代:</span>
            <span className="text-amber-300 text-xs font-medium">{currentQuestion.era}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Score */}
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-bold text-sm">{game.score}</span>
          </div>

          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={
                  i >= game.lives && game.lives > 0
                    ? { scale: [1, 1.5, 0], opacity: [1, 0.5, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                <Heart
                  className={`w-5 h-5 ${
                    i < game.lives ? 'text-red-500 fill-red-500' : 'text-slate-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="relative z-10 w-full h-1 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Timeline */}
      <div className="relative z-10 px-4 py-3 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between overflow-x-auto gap-1">
          {questions.map((q, idx) => (
            <div key={q.id} className="flex flex-col items-center min-w-[36px]">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx < game.currentLevel
                    ? 'bg-emerald-500'
                    : idx === game.currentLevel
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-slate-600'
                }`}
              />
              <span
                className={`text-[10px] mt-1 transition-colors ${
                  idx <= game.currentLevel ? 'text-amber-300' : 'text-slate-600'
                }`}
              >
                {q.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* Timer */}
        <div className="w-full max-w-lg mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-xs">倒计时</span>
            </div>
            <motion.span
              key={game.timeLeft}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`font-mono font-bold text-lg ${
                game.timeLeft <= 5 ? 'text-red-400' : 'text-amber-400'
              }`}
            >
              {game.timeLeft}s
            </motion.span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                game.timeLeft <= 5
                  ? 'bg-red-500'
                  : game.timeLeft <= 10
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              animate={{ width: `${(game.timeLeft / 15) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={game.currentLevel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-lg ${shake ? 'animate-shake' : ''}`}
          >
            {/* Year Badge */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-amber-500/20 border border-amber-500/40 px-4 py-1 rounded-full">
                <span className="text-amber-300 font-bold text-sm">
                  {currentQuestion.year}年
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-xl">
              <h2 className="text-white text-lg md:text-xl font-medium text-center leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQuestion.correctIndex;
                let buttonClass = `bg-gradient-to-r ${optionColors[idx]} text-white`;

                if (showResult) {
                  if (isCorrectOption) {
                    buttonClass = 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-gradient-to-r from-red-500 to-red-600 text-white';
                  } else {
                    buttonClass = 'bg-slate-700/50 text-slate-500';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(idx)}
                    disabled={showResult}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left
                      transition-all duration-200 border border-white/10
                      ${buttonClass}
                      ${!showResult ? 'hover:border-amber-400/50 hover:shadow-lg cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                        ${showResult && isCorrectOption ? 'bg-emerald-400/30' : ''}
                        ${showResult && isSelected && !isCorrect ? 'bg-red-400/30' : ''}
                        ${!showResult ? 'bg-white/20' : ''}
                        ${showResult && !isSelected && !isCorrectOption ? 'bg-slate-600/30' : ''}
                      `}
                    >
                      {optionLabels[idx]}
                    </span>
                    <span className="flex-1 text-sm md:text-base">{option}</span>
                    {showResult && isCorrectOption && (
                      <Sparkles className="w-5 h-5 text-emerald-300" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="text-red-300 text-xs">错误</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 p-4 rounded-xl text-center ${
                    isCorrect
                      ? 'bg-emerald-500/20 border border-emerald-500/30'
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <Star className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">回答正确！</span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-400 font-bold">回答错误</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm">{currentQuestion.fact}</p>
                  {isCorrect && game.combo >= 2 && (
                    <p className="text-amber-400 text-xs mt-1">
                      {game.combo >= 3 ? `🔥 ${game.combo}连击！+50分奖励` : ''}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-1 mt-2 text-slate-500 text-xs">
                    <span>自动进入下一关</span>
                    <ChevronRight className="w-3 h-3 animate-bounce" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 px-4 py-2 bg-slate-800/50 backdrop-blur-sm text-center">
        <p className="text-slate-500 text-xs">
          杭州电子科技大学校史知识问答 · 笃学力行 守正求新
        </p>
      </div>
    </div>
  );
}
