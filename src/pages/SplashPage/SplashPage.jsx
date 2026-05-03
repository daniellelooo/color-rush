import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SplashPage.module.css';

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/home'), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.logoWrap}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, duration: 0.8 }}
      >
        <div className={styles.logo}>
          <span style={{ color: '#FF3B3B' }}>C</span>
          <span style={{ color: '#3B8BFF' }}>O</span>
          <span style={{ color: '#2ECC71' }}>L</span>
          <span style={{ color: '#F1C40F' }}>O</span>
          <span style={{ color: '#FF8C00' }}>R</span>
        </div>
        <motion.div
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          RUSH
        </motion.div>
      </motion.div>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        ¿Puedes confiar en tus ojos?
      </motion.p>

      <motion.div
        className={styles.dots}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span /><span /><span />
      </motion.div>
    </div>
  );
}
