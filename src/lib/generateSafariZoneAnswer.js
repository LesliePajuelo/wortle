// CURRENTLY USING THESE FUNCTIONS IN THE SAFARI ZONE
// TODO: filter unique moves in generateRandomAttacks()
import Pokedex from "../constants/pokedex.json";

const POKEMON_ID_START = 1;
const POKEMON_ID_END = 151;

export function generateSafariZoneAnswer() {
  const randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);
  return Pokedex[randomNumber];
}

export function generateSafariZoneAttack(answer) {
  const numMoves = answer.moves.length;
  const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
  const randomAttack = answer.moves[randomNumber].move;
  return randomAttack;
}
