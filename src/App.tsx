import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './hooks/useGame';
import { HomeScreen } from './pages/HomeScreen';
import { GameScreen } from './pages/GameScreen';
import { ResultScreen } from './pages/ResultScreen';
import './App.css';

function App() {
  const { game, startGame, answerQuestion, nextLevel, goHome } = useGame();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <AnimatePresence mode="wait">
        {game.screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomeScreen onStart={startGame} bestScore={game.bestScore} />
          </motion.div>
        )}

        {game.screen === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameScreen
              game={game}
              onAnswer={answerQuestion}
              onNextLevel={nextLevel}
            />
          </motion.div>
        )}

        {game.screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultScreen
              score={game.score}
              lives={game.lives}
              answers={game.answers}
              totalTime={game.totalTime}
              bestScore={game.bestScore}
              onRestart={startGame}
              onHome={goHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;