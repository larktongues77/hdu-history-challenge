import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  Home,
  Heart,
  Clock,
  Target,
  Award,
  Star,
  Crown,
  Medal,
  Share2,
} from 'lucide-react';
import { questions } from '../data/questions';

interface ResultScreenProps {
  score: number;
  lives: number;
  answers: boolean[];
  totalTime: number;
  bestScore: number;
  onRestart: () => void;
  onHome: () => void;
}

function getTitle(score: number): { title: string; icon: React.ReactNode; color: string } {
  if (score >= 4500) return { title: '杭电校史达人', icon: <Crown className="w-8 h-8" />, color: 'text-amber-400' };
  if (score >= 3500) return { title: '杭电精英', icon: <Medal className="w-8 h-8" />, color: 'text-purple-400' };
  if (score >= 2000) return { title: '杭电骨干', icon: <Award className="w-8 h-8" />, color: 'text-blue-400' };
  if (score >= 1000) return { title: '杭电学子', icon: <Star className="w-8 h-8" />, color: 'text-emerald-400' };
  return { title: '杭电萌新', icon: <Target className="w-8 h-8" />, color: 'text-slate-400' };
}

export function ResultScreen({
  score,
  lives,
  answers,
  totalTime,
  bestScore,
  onRestart,
  onHome,
}: ResultScreenProps) {
  const isVictory = answers.filter(Boolean).length === questions.length;
  const correctCount = answers.filter(Boolean).length;
  const wrongCount = answers.length - correctCount;
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
  const titleInfo = getTitle(score);
  const isNewBest = score > bestScore && score > 0;
  const hasPlayed = answers.length > 0;

  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVictory) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#c9a227', '#f8fafc', '#38a169', '#1a365d'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#c9a227', '#f8fafc', '#38a169', '#1a365d'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isVictory]);

  const handleShare = () => {
    const text = `我在"杭电校史大闯关"中获得了${score}分，解锁称号"${titleInfo.title}"！快来挑战吧！`;
    if (navigator.share) {
      navigator.share({
        title: '杭电校史大闯关',
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('分享文案已复制到剪贴板！');
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/bg-game.jpg)' }}
      />
      <div className="absolute inset-0 bg-slate-900/85" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex flex-col items-center"
        >
          {/* Result Icon */}
          {isVictory ? (
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-4"
            >
              <Trophy className="w-16 h-16 text-amber-400" />
            </motion.div>
          ) : hasPlayed ? (
            <div className="mb-4">
              <Heart className="w-16 h-16 text-red-400" />
            </div>
          ) : (
            <div className="mb-4">
              <Target className="w-16 h-16 text-slate-400" />
            </div>
          )}

          {/* Title */}
          <h1 className={`text-3xl font-bold mb-2 ${isVictory ? 'text-amber-400' : 'text-slate-200'}`}>
            {isVictory ? '恭喜通关！' : hasPlayed ? '挑战结束' : '准备就绪'}
          </h1>

          {/* Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 w-full mb-4 border border-slate-700/50"
          >
            <div className="text-center mb-4">
              <p className="text-slate-400 text-sm mb-1">最终得分</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-bold text-amber-400"
              >
                {score}
              </motion.p>
              {isNewBest && (
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="text-emerald-400 text-sm mt-1 flex items-center justify-center gap-1"
                >
                  <Star className="w-4 h-4" />
                  新纪录！
                </motion.p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{correctCount}</p>
                <p className="text-xs text-slate-400">答对</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{wrongCount}</p>
                <p className="text-xs text-slate-400">答错</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{accuracy}%</p>
                <p className="text-xs text-slate-400">正确率</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-4 h-4" />
                <span>用时 {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span>剩余 {lives} 颗心</span>
              </div>
            </div>
          </motion.div>

          {/* Title Badge */}
          {hasPlayed && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 
                         rounded-xl px-6 py-3 mb-4 flex items-center gap-3"
            >
              <div className={titleInfo.color}>{titleInfo.icon}</div>
              <div>
                <p className="text-xs text-amber-300/70">获得称号</p>
                <p className={`text-lg font-bold ${titleInfo.color}`}>{titleInfo.title}</p>
              </div>
            </motion.div>
          )}

          {/* Certificate for victory */}
          {isVictory && (
            <motion.div
              ref={certificateRef}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative w-full mb-6"
            >
              <div
                className="relative bg-cover bg-center rounded-xl overflow-hidden border-2 border-amber-500/30"
                style={{ backgroundImage: 'url(/certificate-bg.jpg)' }}
              >
                <div className="absolute inset-0 bg-slate-900/40" />
                <div className="relative p-6 text-center">
                  <p className="text-amber-300 text-sm tracking-widest mb-1">杭电校史大闯关</p>
                  <h2 className="text-2xl font-bold text-amber-400 mb-2">荣誉证书</h2>
                  <p className="text-slate-300 text-sm mb-4">
                    兹证明您成功通关全部19关校史问答
                  </p>
                  <div className="border-t border-amber-500/30 pt-3">
                    <p className="text-amber-300 text-lg font-bold">
                      「 杭电校史达人 」
                    </p>
                  </div>
                  <p className="text-slate-400 text-xs mt-3">
                    杭州电子科技大学 · 1956-2026
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex flex-col w-full gap-3">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900 font-bold 
                         rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <RotateCcw className="w-5 h-5" />
              再玩一次
            </motion.button>

            {hasPlayed && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full py-3 bg-slate-700/80 text-white font-medium 
                           rounded-xl flex items-center justify-center gap-2 border border-slate-600/50"
              >
                <Share2 className="w-5 h-5" />
                分享成绩
              </motion.button>
            )}

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onHome}
              className="w-full py-3 bg-slate-800/50 text-slate-400 font-medium 
                         rounded-xl flex items-center justify-center gap-2 border border-slate-700/30"
            >
              <Home className="w-5 h-5" />
              返回首页
            </motion.button>
          </div>

          {/* Best Score */}
          {bestScore > 0 && (
            <p className="text-slate-500 text-xs mt-4">
              历史最高分: {Math.max(score, bestScore)}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
