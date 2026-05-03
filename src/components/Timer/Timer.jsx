import { motion } from 'framer-motion';
import styles from './Timer.module.css';

export default function Timer({ progress, duration }) {
  const color = progress > 0.5 ? '#2ECC71' : progress > 0.25 ? '#F1C40F' : '#FF3B3B';

  return (
    <div className={styles.track}>
      <motion.div
        className={styles.bar}
        style={{ backgroundColor: color }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.05, ease: 'linear' }}
        initial={false}
      />
    </div>
  );
}
