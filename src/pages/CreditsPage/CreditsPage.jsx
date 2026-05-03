import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import styles from './CreditsPage.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function CreditsPage() {
  const navigate = useNavigate();
  const { activateUltraInstinct, isUltraInstinct } = useGame();
  const [clicks, setClicks] = useState(0);
  const [ultraActivated, setUltraActivated] = useState(false);

  const handleLogoClick = () => {
    if (isUltraInstinct) return;
    const next = clicks + 1;
    setClicks(next);
    if (next >= 7) {
      activateUltraInstinct();
      setUltraActivated(true);
    }
  };

  return (
    <motion.div className={styles.page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.div
        className={styles.logo}
        onClick={handleLogoClick}
        whileTap={{ scale: 0.9 }}
        title="..."
      >
        <span style={{ color: '#FF3B3B' }}>C</span>
        <span style={{ color: '#3B8BFF' }}>O</span>
        <span style={{ color: '#2ECC71' }}>L</span>
        <span style={{ color: '#F1C40F' }}>O</span>
        <span style={{ color: '#FF8C00' }}>R</span>
      </motion.div>

      {clicks > 0 && clicks < 7 && (
        <p className={styles.hint}>{7 - clicks} clicks más...</p>
      )}

      <AnimatePresence>
        {ultraActivated && (
          <motion.div
            className={styles.ultraBanner}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            ⚡ ULTRA INSTINCT ACTIVADO ⚡
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Desarrollador</h2>
        <p className={styles.name}>Daniel Andrés Lelo de Larrea</p>
        <p className={styles.detail}>Aplicaciones Móviles — UPB 2025</p>
        <p className={styles.detail}>React · Framer Motion · Firebase</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Sobre el juego</h2>
        <p className={styles.body}>
          Color Rush está basado en el <strong>Efecto Stroop</strong>, fenómeno
          psicológico donde el cerebro tarda más en procesar el color de una palabra
          cuando su significado contradice ese color. Descubierto por John Ridley Stroop en 1935.
        </p>
      </div>

      <button className={styles.back} onClick={() => navigate('/home')}>← Volver</button>
    </motion.div>
  );
}
