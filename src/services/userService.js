import { db } from './firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

export const saveUserScore = async (playerName, score) => {
  try {
    const usersRef = collection(db, 'users');
    await addDoc(usersRef, {
      playerName,
      score,
      timestamp: new Date(),
    });
    console.log('Puntuación guardada exitosamente');
  } catch (error) {
    console.error('Error al guardar:', error);
  }
};

export const getTopScores = async (topN = 10) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('score', 'desc'), limit(topN));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener puntuaciones:', error);
    return [];
  }
};