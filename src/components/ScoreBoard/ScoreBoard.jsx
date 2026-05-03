import { motion } from 'framer-motion';
import styles from './ScoreBoard.module.css';

export default function ScoreBoard({ entries, title }) {
  return (
    <div className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {entries.length === 0 ? (
        <p className={styles.empty}>Sin registros aún.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th>Puntaje</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <motion.tr
                key={entry.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={i === 0 ? styles.top : ''}
              >
                <td>{i + 1}</td>
                <td>{entry.playerName}</td>
                <td className={styles.score}>{entry.score}</td>
                <td>{entry.level}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
