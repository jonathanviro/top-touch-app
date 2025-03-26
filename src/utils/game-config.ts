export const GAME_CONFIG = {
  grid: {
    columns: 4,
    rows: 5,
  },
  timing: {
    gameDuration: 5, // Tiempo total del juego (segundos)
    characterLifetime: 2000, // Tiempo de visibilidad de personaje
    spawnInterval: 250, // Intervalo de aparición de personajes
    maxPerCycle: 10, // Máximo de personajes por ciclo
    destroyDelay: 400, // Duración de animaciones de salida
  },
  results: {
    goalLoser: 1,
    goalPartialWinner: 3,
    goalWinner: 5,
  },
};
