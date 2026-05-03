import { MAX_HISTORY_ENTRIES } from '../config/gameConfig';

const STORAGE_KEY = 'colorRushScores';

export function saveScore({ playerName, score, level }) {
  const existing = getScores();
  const entry = { playerName, score, level, date: new Date().toISOString() };
  const updated = [entry, ...existing]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_HISTORY_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function clearScores() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getMutePreference() {
  return localStorage.getItem('colorRushMuted') === 'true';
}

export function saveMutePreference(muted) {
  localStorage.setItem('colorRushMuted', String(muted));
}
