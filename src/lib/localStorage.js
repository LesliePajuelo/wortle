const LOCAL_STORAGE_PREFIX = "SQWORDL";
const LOCAL_STORAGE_GAMESTATE = `${LOCAL_STORAGE_PREFIX}.gameState`;
const LOCAL_STORAGE_STATS = `${LOCAL_STORAGE_PREFIX}.stats`;

export function loadLanguagePreferenceFromLocalStorage() {
  return localStorage.getItem("i18nextLng") || "en";
}

export function loadStatsFromLocalStorage() {
  const stats = localStorage.getItem(LOCAL_STORAGE_STATS);
  return stats ? JSON.parse(stats) : null;
}

export function saveStatsToLocalStorage(stats) {
  localStorage.setItem(LOCAL_STORAGE_STATS, JSON.stringify(stats));
}

export function loadGameStateFromLocalStorage() {
  const gameState = localStorage.getItem(LOCAL_STORAGE_GAMESTATE);
  return gameState ? JSON.parse(gameState) : null;
}

export function saveGameStateToLocalStorage(gameState) {
  localStorage.setItem(LOCAL_STORAGE_GAMESTATE, JSON.stringify(gameState));
}
