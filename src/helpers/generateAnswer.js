// TODO: use a hash function so that every user has the same answer and attacks each day
const POKEMON_ID_START = 1;
const POKEMON_ID_END = 151;

export function generateAnswer(pokedex) {
  const randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);
  const dailyAnswer = pokedex[randomNumber];

  // ANSWERS FOR TESTING
  // const dailyAnswe = pokedex[8]; // blastoise
  // const dailyAnswe = pokedex[24]; // pikachu
  // const dailyAnswer = pokedex[88]; // muk

  console.log(`Answer: ${dailyAnswer.name}`);
  return dailyAnswer;
}

export function generateAttacks(dailyAnswer) {
  const numMoves = dailyAnswer.moves.length;
  const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
  const randomAttack = dailyAnswer.moves[randomNumber].move;
  console.log(randomAttack);
  return randomAttack;
}
