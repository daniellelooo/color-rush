import { createContext, useContext, useState, useCallback } from 'react';
import { LEVELS } from '../config/gameConfig';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LEVELS[0].lives);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isUltraInstinct, setIsUltraInstinct] = useState(false);

  const startGame = useCallback(() => {
    const config = LEVELS[0];
    setScore(0);
    setLives(config.lives);
    setLevel(1);
    setIsGameOver(false);
    setIsWinner(false);
  }, []);

  const addScore = useCallback((points) => {
    setScore(prev => prev + points);
  }, []);

  const loseLife = useCallback(() => {
    setLives(prev => {
      const next = prev - 1;
      if (next <= 0) setIsGameOver(true);
      return Math.max(0, next);
    });
  }, []);

  const nextLevel = useCallback(() => {
    setLevel(prev => {
      const next = prev + 1;
      if (next > LEVELS.length) {
        setIsWinner(true);
        setIsGameOver(true);
        return prev;
      }
      const config = LEVELS[next - 1];
      setLives(config.lives);
      return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(LEVELS[0].lives);
    setLevel(1);
    setIsGameOver(false);
    setIsWinner(false);
  }, []);

  const activateUltraInstinct = useCallback(() => {
    setIsUltraInstinct(true);
  }, []);

  const deactivateUltraInstinct = useCallback(() => {
    setIsUltraInstinct(false);
  }, []);

  return (
    <GameContext.Provider value={{
      playerName, setPlayerName,
      score, lives, level,
      isGameOver, isWinner,
      isUltraInstinct,
      startGame, addScore, loseLife, nextLevel, resetGame, activateUltraInstinct, deactivateUltraInstinct,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
