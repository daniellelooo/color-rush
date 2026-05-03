export const LEVELS = [
  { level: 1, colors: 4, timePerQuestion: 3000, lives: 3, pointsPerCorrect: 10, questionsToAdvance: 10 },
  { level: 2, colors: 6, timePerQuestion: 2000, lives: 3, pointsPerCorrect: 20, questionsToAdvance: 10 },
  { level: 3, colors: 8, timePerQuestion: 1500, lives: 2, pointsPerCorrect: 30, questionsToAdvance: 10 },
];

export const ULTRA_INSTINCT_TIME = 800;

export const COLOR_PALETTE = {
  normal: [
    { name: 'ROJO',     hex: '#FF3B3B' },
    { name: 'AZUL',     hex: '#3B8BFF' },
    { name: 'VERDE',    hex: '#2ECC71' },
    { name: 'AMARILLO', hex: '#F1C40F' },
    { name: 'NARANJA',  hex: '#FF8C00' },
    { name: 'MORADO',   hex: '#9B59B6' },
    { name: 'ROSA',     hex: '#FF69B4' },
    { name: 'CIAN',     hex: '#00BCD4' },
  ],
  ultraInstinct: [
    { name: 'AZUL',      hex: '#1565C0' },
    { name: 'ÍNDIGO',    hex: '#283593' },
    { name: 'CELESTE',   hex: '#0288D1' },
    { name: 'MARINO',    hex: '#0D47A1' },
    { name: 'COBALTO',   hex: '#1976D2' },
    { name: 'ZAFIRO',    hex: '#1A237E' },
    { name: 'ACERO',     hex: '#37474F' },
    { name: 'PIZARRA',   hex: '#455A64' },
  ],
};

export const MAX_HISTORY_ENTRIES = 10;
