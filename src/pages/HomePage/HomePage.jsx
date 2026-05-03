import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import styles from './HomePage.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function HomePage() {
  const navigate = useNavigate();
  const { playerName, setPlayerName, startGame } = useGame();
  const [input, setInput] = useState(playerName);
  const [error, setError] = useState('');

  const handlePlay = () => {
    if (!input.trim()) { setError('Ingresa tu nombre para jugar'); return; }
    setPlayerName(input.trim());
    startGame();
    navigate('/game');
  };

  return (
    <motion.div className={styles.page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span style={{ color: '#FF3B3B' }}>COLOR</span>{' '}
          <span style={{ color: '#fff' }}>RUSH</span>
        </h1>
        <p className={styles.desc}>Lee el COLOR del texto, no la palabra.</p>
      </div>

      <div className={styles.card}>
        <label className={styles.label}>¿Cómo te llamas?</label>
        <input
          className={styles.input}
          type="text"
          maxLength={20}
          placeholder="Tu nombre"
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handlePlay()}
          autoFocus
        />
        {error && <p className={styles.error}>{error}</p>}

        <motion.button
          className={styles.btnPlay}
          onClick={handlePlay}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          🎮 Jugar
        </motion.button>
      </div>

      <div className={styles.nav}>
        <button className={styles.btnSecondary} onClick={() => navigate('/score')}>
          🏆 Puntajes
        </button>
        <button className={styles.btnSecondary} onClick={() => navigate('/credits')}>
          ℹ️ Créditos
        </button>
      </div>
    </motion.div>
  );
}
