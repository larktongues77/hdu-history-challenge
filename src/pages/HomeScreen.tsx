import { motion } from 'framer-motion';
import { BookOpen, Clock, Heart, Trophy } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
  bestScore: number;
}

export function HomeScreen({ onStart, bestScore }: HomeScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/bg-game.jpg)' }}
      />
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-2xl w-full">
        {/* Emblem */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-6"
        >
          <img
            src="/emblem.png"
            alt="杭电竞标"
            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-amber-400 text-center mb-2 tracking-wider"
          style={{ fontFamily: '"Noto Serif SC", serif' }}
        >
          杭电校史大闯关
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-slate-400 text-center mb-8 text-sm md:text-base"
        >
          穿越70年校史长河，挑战19道经典题目
        </motion.p>

        {/* Best Score */}
        {bestScore > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="flex items-center gap-2 mb-6 bg-slate-800/80 px-4 py-2 rounded-full border border-amber-500/30"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm">历史最高分: {bestScore}</span>
          </motion.div>
        )}

        {/* Rules */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-8 w-full max-w-md"
        >
          <div className="bg-slate-800/80 rounded-lg p-3 text-center border border-slate-700/50">
            <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">每题限时</p>
            <p className="text-sm font-bold text-white">15秒</p>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-3 text-center border border-slate-700/50">
            <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">初始生命</p>
            <p className="text-sm font-bold text-white">3颗心</p>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-3 text-center border border-slate-700/50">
            <BookOpen className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">题目总数</p>
            <p className="text-sm font-bold text-white">19关</p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="relative px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900 font-bold text-lg rounded-xl 
                     shadow-lg shadow-amber-500/20 border-2 border-amber-400/50
                     hover:shadow-amber-500/40 transition-shadow duration-300"
        >
          <span className="relative z-10">开始挑战</span>
          <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-slate-500 text-xs text-center"
        >
          杭州电子科技大学 · 1956-2026
        </motion.p>
      </div>
    </div>
  );
}
