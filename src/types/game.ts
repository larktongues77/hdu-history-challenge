export type GameScreen = 'home' | 'playing' | 'result';

export interface GameState {
  screen: GameScreen;
  currentLevel: number;
  score: number;
  lives: number;
  timeLeft: number;
  combo: number;
  totalTime: number;
  answers: boolean[];
  bestScore: number;
}

export const INITIAL_STATE: GameState = {
  screen: 'home',
  currentLevel: 0,
  score: 0,
  lives: 3,
  timeLeft: 15,
  combo: 0,
  totalTime: 0,
  answers: [],
  bestScore: 0,
};

export const TIME_PER_QUESTION = 15;
export const TOTAL_LEVELS = 19;
