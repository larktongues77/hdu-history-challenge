import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState } from '../types/game';
import { INITIAL_STATE, TIME_PER_QUESTION, TOTAL_LEVELS } from '../types/game';

export function useGame() {
  const [game, setGame] = useState<GameState>(() => {
    const saved = localStorage.getItem('hdu_history_best_score');
    return {
      ...INITIAL_STATE,
      bestScore: saved ? parseInt(saved, 10) : 0,
    };
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    isPausedRef.current = false;
    timerRef.current = setInterval(() => {
      setGame((prev) => {
        if (isPausedRef.current || prev.screen !== 'playing') {
          return prev;
        }
        if (prev.timeLeft <= 1) {
          // Time out - lose a life
          const newLives = prev.lives - 1;
          const newAnswers = [...prev.answers, false];
          if (newLives <= 0) {
            return {
              ...prev,
              lives: 0,
              timeLeft: 0,
              answers: newAnswers,
              screen: 'result',
            };
          }
          return {
            ...prev,
            lives: newLives,
            timeLeft: TIME_PER_QUESTION,
            combo: 0,
            answers: newAnswers,
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
          totalTime: prev.totalTime + 1,
        };
      });
    }, 1000);
  }, [clearTimer]);

  const startGame = useCallback(() => {
    clearTimer();
    setGame({
      ...INITIAL_STATE,
      screen: 'playing',
      bestScore: game.bestScore,
    });
  }, [clearTimer, game.bestScore]);

  const answerQuestion = useCallback((selectedIndex: number, correctIndex: number) => {
    isPausedRef.current = true;
    clearTimer();

    const isCorrect = selectedIndex === correctIndex;

    setGame((prev) => {
      if (isCorrect) {
        const timeBonus = prev.timeLeft * 10;
        const comboBonus = prev.combo >= 2 ? 50 : 0;
        const newScore = prev.score + 100 + timeBonus + comboBonus;
        const newAnswers = [...prev.answers, true];
        const nextLevel = prev.currentLevel + 1;

        if (nextLevel >= TOTAL_LEVELS) {
          // Victory!
          const finalBestScore = Math.max(newScore, prev.bestScore);
          localStorage.setItem('hdu_history_best_score', finalBestScore.toString());
          return {
            ...prev,
            score: newScore,
            answers: newAnswers,
            combo: prev.combo + 1,
            screen: 'result',
            bestScore: finalBestScore,
          };
        }

        return {
          ...prev,
          currentLevel: nextLevel,
          score: newScore,
          lives: prev.lives,
          timeLeft: TIME_PER_QUESTION,
          combo: prev.combo + 1,
          answers: newAnswers,
        };
      } else {
        const newLives = prev.lives - 1;
        const newAnswers = [...prev.answers, false];

        if (newLives <= 0) {
          const finalBestScore = Math.max(prev.score, prev.bestScore);
          localStorage.setItem('hdu_history_best_score', finalBestScore.toString());
          return {
            ...prev,
            lives: 0,
            combo: 0,
            answers: newAnswers,
            screen: 'result',
            bestScore: finalBestScore,
          };
        }

        return {
          ...prev,
          lives: newLives,
          timeLeft: TIME_PER_QUESTION,
          combo: 0,
          answers: newAnswers,
        };
      }
    });
  }, [clearTimer]);

  const nextLevel = useCallback(() => {
    setGame((prev) => {
      if (prev.screen === 'playing') {
        return {
          ...prev,
          timeLeft: TIME_PER_QUESTION,
        };
      }
      return prev;
    });
    startTimer();
  }, [startTimer]);

  const goHome = useCallback(() => {
    clearTimer();
    setGame((prev) => ({
      ...INITIAL_STATE,
      screen: 'home',
      bestScore: prev.bestScore,
    }));
  }, [clearTimer]);

  useEffect(() => {
    if (game.screen === 'playing' && !timerRef.current) {
      startTimer();
    }
    return () => clearTimer();
  }, [game.screen, startTimer, clearTimer]);

  return {
    game,
    startGame,
    answerQuestion,
    nextLevel,
    goHome,
  };
}
