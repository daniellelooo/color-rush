import { motion } from 'framer-motion';
import styles from './ColorButton.module.css';

export default function ColorButton({ color, label, onClick, disabled }) {
  return (
    <motion.button
      className={styles.btn}
      style={{ backgroundColor: color.hex, borderColor: color.hex }}
      onClick={() => !disabled && onClick(color.name)}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.06, brightness: 1.2 }}
      whileTap={disabled ? {} : { scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {label}
    </motion.button>
  );
}
