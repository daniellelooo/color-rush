import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'leaderboard';

export async function submitScore({ playerName, score, level }) {
  try {
    await addDoc(collection(db, COLLECTION), {
      playerName,
      score,
      level,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error submitting score:', err);
  }
}

export async function getTopScores(limitCount = 10) {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy('score', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return [];
  }
}
