import { motion, AnimatePresence } from 'framer-motion';
import styles from './EasterEggModal.module.css';

const GLITCH_TEXT = '1337 H4X0R';

export default function EasterEggModal({ visible, onClose }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.box}
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <p className={styles.glitch} data-text={GLITCH_TEXT}>{GLITCH_TEXT}</p>
            <p className={styles.msg}>Eres un l33t h4x0r del Efecto Stroop.<br />Nadie llega a 1337. Eres una leyenda.</p>
            <button className={styles.close} onClick={onClose}>Cerrar</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
