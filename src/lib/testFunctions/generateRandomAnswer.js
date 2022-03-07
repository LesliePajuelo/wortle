// CURRENTLY USING THESE FUNCTIONS IN THE SAFARI ZONE
// TODO: filter unique moves in generateRandomAttacks()
const POKEMON_ID_START = 1;
const POKEMON_ID_END = 151;

export function generateRandomAnswer(pokedex) {
  const randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);
  const dailyAnswer = pokedex[randomNumber];

  // ANSWERS FOR TESTING
  // const dailyAnswer = pokedex[8]; // blastoise
  // const dailyAnswer = pokedex[24]; // pikachu
  // const dailyAnswer = pokedex[88]; // muk

  // generate 5 attacks
  const numMoves = dailyAnswer.moves.length;
  let randomAttacks = [];
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
    const move = dailyAnswer.moves[randomNumber].move;
    randomAttacks.push(move);
  }
  return dailyAnswer;
}

export function generateRandomAttacks(dailyAnswer) {
  const numMoves = dailyAnswer.moves.length;
  const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
  const randomAttack = dailyAnswer.moves[randomNumber].move;
  console.log(randomAttack);
  return randomAttack;
}
