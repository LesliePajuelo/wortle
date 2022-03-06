// bring in pokedex and answer key etc
const START_DATE = new Date("February 21, 2022 00:00:00");
const MILLISECONDS_TO_DAYS = 1000 * 60 * 60 * 24;
const FLIP_DURATION = 300;
const STATS_MODAL_DELAY = 4000;
const ATTACK_DELAY = 7000;
const INFO_MODAL_DELAY = 1000;

const LOCAL_STORAGE_PREFIX = "SQWORDL";
const LOCAL_STORAGE_GAMESTATE = `${LOCAL_STORAGE_PREFIX}.gameState`;
const LOCAL_STORAGE_STATS = `${LOCAL_STORAGE_PREFIX}.stats`;
