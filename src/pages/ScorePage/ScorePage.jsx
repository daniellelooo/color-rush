import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { getScores } from '../../services/localStorage';
import { getTopScores } from '../../services/leaderboard';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import EasterEggModal from '../../components/EasterEggModal/EasterEggModal';
import styles from './ScorePage.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function ScorePage() {
  const navigate = useNavigate();
  const { score, level, isWinner, isGameOver, resetGame, playerName } = useGame();
  const [localScores, setLocalScores] = useState([]);
  const [onlineScores, setOnlineScores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isPostGame = !!playerName && isGameOver;

  useEffect(() => {
    setLocalScores(getScores());
    getTopScores(10).then(setOnlineScores);
    if (score === 1337) setShowModal(true);
  }, [score]);

  const handleRetry = () => {
    resetGame();
    navigate('/home');
  };

  return (
    <motion.div className={styles.page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {isPostGame && (
        <motion.div
          className={`${styles.result} ${isWinner ? styles.win : styles.lose}`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        >
          <span className={styles.resultEmoji}>{isWinner ? '🏆' : '💀'}</span>
          <span className={styles.resultLabel}>{isWinner ? '¡Ganaste!' : 'Game Over'}</span>
          <span className={styles.resultScore}>{score}</span>
          <span className={styles.resultSub}>puntos · nivel {level}</span>
        </motion.div>
      )}

      <div className={styles.tables}>
        <ScoreBoard entries={localScores} title="Historial local" />
        {onlineScores.length > 0 && (
          <ScoreBoard entries={onlineScores} title="🌐 Top Global" />
        )}
      </div>

      <div className={styles.actions}>
        <motion.button
          className={styles.btnPrimary}
          onClick={handleRetry}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          🔄 Volver al inicio
        </motion.button>
      </div>

      <EasterEggModal visible={showModal} onClose={() => setShowModal(false)} />
    </motion.div>
  );
}
