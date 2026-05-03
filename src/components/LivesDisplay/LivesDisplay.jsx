import { motion, AnimatePresence } from 'framer-motion';
import styles from './LivesDisplay.module.css';

export default function LivesDisplay({ lives, maxLives }) {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        {Array.from({ length: maxLives }).map((_, i) => (
          <motion.span
            key={i}
            className={styles.heart}
            initial={{ scale: 1 }}
            animate={i < lives ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            ❤️
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
