import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useTimer } from '../../hooks/useTimer';
import { useSound } from '../../hooks/useSound';
import { saveScore } from '../../services/localStorage';
import { submitScore } from '../../services/leaderboard';
import { LEVELS } from '../../config/gameConfig';
import ColorButton from '../../components/ColorButton/ColorButton';
import LivesDisplay from '../../components/LivesDisplay/LivesDisplay';
import Timer from '../../components/Timer/Timer';
import styles from './GamePage.module.css';
import { saveUserScore } from '../../services/userService';

const pageVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

export default function GamePage() {
  const navigate = useNavigate();
  const { playerName, score, lives, level, isGameOver, isWinner, isUltraInstinct,
          addScore, loseLife, nextLevel } = useGame();

  const { question, questionsCompleted, lastResult, config, handleAnswer, nextQuestion, resetProgress } =
    useGameLogic(level, isUltraInstinct);

  const sound = useSound();
  const [locked, setLocked] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [muted, setMuted] = useState(sound.isMuted());
  const [timerKey, setTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(config.timePerQuestion);

  useEffect(() => {
    if (!playerName) navigate('/home');
  }, [playerName, navigate]);

  useEffect(() => {
    sound.startBg();
    return () => sound.stopBg();
  }, []);

  const handleExpire = useCallback(() => {
    if (locked) return;
    setLocked(true);
    sound.playWrong();
    loseLife();
    setTimeout(() => {
      setLocked(false);
      setTimerKey(k => k + 1);
      nextQuestion();
    }, 800);
  }, [locked, loseLife, nextQuestion, sound]);

  const { progress } = useTimer(timerDuration, handleExpire, timerKey);

  useEffect(() => {
    setTimerDuration(config.timePerQuestion);
    setTimerKey(k => k + 1);
  }, [config.timePerQuestion]);

  useEffect(() => {
    if (isGameOver) {
      sound.playGameOver();
      sound.stopBg();
      saveScore({ playerName, score, level });
      submitScore({ playerName, score, level });
      // También guardamos en la colección de usuarios (sin prompt, usamos playerName del contexto)
      saveUserScore(playerName, score).catch(err => console.error('saveUserScore error:', err));
      setTimeout(() => navigate('/score'), 1200);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (questionsCompleted > 0 && questionsCompleted % config.questionsToAdvance === 0) {
      if (level >= LEVELS.length) {
        sound.playLevelUp();
        return;
      }
      setShowLevelUp(true);
      sound.playLevelUp();
      setLocked(true);
      setTimeout(() => {
        setShowLevelUp(false);
        setLocked(false);
        nextLevel();
        resetProgress();
        setTimerKey(k => k + 1);
      }, 2000);
    }
  }, [questionsCompleted]);

  const onAnswer = (colorName) => {
    if (locked) return;
    setLocked(true);
    const correct = handleAnswer(colorName);
    if (correct) {
      sound.playCorrect();
      addScore(config.pointsPerCorrect);
    } else {
      sound.playWrong();
      loseLife();
    }
    setTimeout(() => {
      setLocked(false);
      setTimerKey(k => k + 1);
      nextQuestion();
    }, 600);
  };

  const shakeVariants = {
    wrong: { x: [0, -12, 12, -10, 10, -6, 6, 0], transition: { duration: 0.45 } },
    correct: { scale: [1, 1.12, 1], transition: { duration: 0.3 } },
    idle: {},
  };

  return (
    <motion.div className={styles.page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Nivel</span>
          <span className={styles.statValue}>{level}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Puntos</span>
          <span className={styles.statValue}>{score}</span>
        </div>
        <button className={styles.muteBtn} onClick={() => { sound.toggleMute(); setMuted(m => !m); }}>
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      <LivesDisplay lives={lives} maxLives={LEVELS[Math.min(level - 1, LEVELS.length - 1)].lives} />

      <Timer key={timerKey.current} progress={progress} duration={timerDuration} />

      {/* Word */}
      <motion.div
        key={question.word + question.wordColor}
        className={styles.wordCard}
        animate={lastResult === 'wrong' ? shakeVariants.wrong : lastResult === 'correct' ? shakeVariants.correct : shakeVariants.idle}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span
          className={styles.word}
          style={{ color: question.wordColor, textShadow: `0 0 30px ${question.wordColor}` }}
        >
          {question.word}
        </span>
        <p className={styles.hint}>Toca el color del texto</p>
      </motion.div>

      {/* Buttons */}
      <div className={styles.grid}>
        {question.options.map(color => (
          <ColorButton
            key={color.name}
            color={color}
            label={color.name}
            onClick={onAnswer}
            disabled={locked}
          />
        ))}
      </div>

      {/* Level up overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className={styles.levelUpOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className={styles.levelUpText}>🚀 ¡NIVEL {level + 1}!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isUltraInstinct && (
        <div className={styles.ultraBadge}>⚡ ULTRA INSTINCT</div>
      )}
    </motion.div>
  );
}
