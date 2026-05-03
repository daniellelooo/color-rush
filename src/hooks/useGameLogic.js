import { useState, useCallback } from 'react';
import { COLOR_PALETTE, LEVELS, ULTRA_INSTINCT_TIME } from '../config/gameConfig';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(levelIndex, isUltraInstinct) {
  const palette = isUltraInstinct ? COLOR_PALETTE.ultraInstinct : COLOR_PALETTE.normal;
  const count = isUltraInstinct ? palette.length : LEVELS[levelIndex].colors;
  const pool = shuffle(palette).slice(0, count);

  const colorForText = pool[Math.floor(Math.random() * pool.length)];
  let wordColor;
  do {
    wordColor = pool[Math.floor(Math.random() * pool.length)];
  } while (wordColor.name === colorForText.name);

  return {
    word: colorForText.name,
    wordColor: wordColor.hex,
    correctAnswer: wordColor.name,
    options: shuffle(pool),
  };
}

export function useGameLogic(level, isUltraInstinct) {
  const levelIndex = Math.min(level - 1, LEVELS.length - 1);
  const config = isUltraInstinct
    ? { ...LEVELS[levelIndex], timePerQuestion: ULTRA_INSTINCT_TIME }
    : LEVELS[levelIndex];

  const [question, setQuestion] = useState(() => generateQuestion(levelIndex, isUltraInstinct));
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [lastResult, setLastResult] = useState(null); // 'correct' | 'wrong'

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(levelIndex, isUltraInstinct));
    setLastResult(null);
  }, [levelIndex, isUltraInstinct]);

  const handleAnswer = useCallback((colorName) => {
    const isCorrect = colorName === question.correctAnswer;
    setLastResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setQuestionsCompleted(prev => prev + 1);
    }
    return isCorrect;
  }, [question]);

  const resetProgress = useCallback(() => {
    setQuestionsCompleted(0);
    setQuestion(generateQuestion(levelIndex, isUltraInstinct));
    setLastResult(null);
  }, [levelIndex, isUltraInstinct]);

  return {
    question,
    questionsCompleted,
    lastResult,
    config,
    handleAnswer,
    nextQuestion,
    resetProgress,
  };
}
