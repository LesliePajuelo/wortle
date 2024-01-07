const fs = require("fs");
const Pokedex = require("../../constants/pokedex.json");

const pokedex = Pokedex;
const POKEMON_ID_START = 1;
const POKEMON_ID_END = 492;
const UNIQUE_MOVE_CUTOFF = 1;
const MIN_POKEMON_REPEAT = 20;
const NUM_ANSWERS = 50000;

// MAIN FUNCTION
(async () => {
  // Create an array of all moves for each pokemon evolution family (e.g., pikachu & raichu are one family)
  let tempMoves = [];
  const firstPokemon = pokedex[0];
  const firstPokemonMoves = firstPokemon.moves;
  let firstPokemonMovesNames = [];
  for (const move of firstPokemonMoves) {
    firstPokemonMovesNames.push(move.move);
  }
  tempMoves.push({ pokemon: firstPokemon.name, moves: firstPokemonMovesNames });

  for (const pokemon of pokedex) {
    console.log(pokemon, pokemon.evolutions)
    if (pokemon.evolutions.pokemonInChain.includes(tempMoves[tempMoves.length - 1].pokemon)) {
      // console.log(`${pokemon.name} in list already`);
      let moveNames = [];
      for (const move of pokemon.moves) {
        // console.log(move.move);
        moveNames.push(move.move);
      }
      const previousArray = tempMoves[tempMoves.length - 1].moves;
      const newArray = [...new Set([...previousArray, ...moveNames])];
      tempMoves[tempMoves.length - 1].moves = [...newArray];
    } else {
      let moveNames = [];
      for (const move of pokemon.moves) {
        moveNames.push(move.move);
      }
      tempMoves.push({ pokemon: pokemon.name, moves: moveNames });
    }
  }

  let moveList = [];
  for (move of tempMoves) {
    const moves = move.moves;
    // console.log(moves);
    moveList = [...moves, ...moveList];
  }
  // console.log(moveList);

  // GENERATE ANSWER KEY
  let answerKey = [];
  for (let i = 0; i < NUM_ANSWERS; i++) {
    // while loop that only breaks out if answer is not in most recent 20 answerKey array...
    let includeAnswer = false;
    let randomNumber, pokemon, answer;
    while (!includeAnswer) {
      randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);
      pokemon = pokedex[randomNumber];
      answer = pokemon.name;
      // console.log(`answer ${i}: ${answer}`);

      const prevTwentyAnswers = answerKey.map((item) => item.answer).slice(-20);
      if (!prevTwentyAnswers.includes(answer)) {
        includeAnswer = true;
      } else {
        console.log("pokemon within last 20 answers");
      }
    }

    // generate 5 attacks per answer
    const numMoves = pokemon.moves.length;
    let randomAttacks = [];
    for (let i = 0; i < 5; i++) {
      let isMoveUnique = true;
      let move;
      // filter out unique attacks that make the game too easy, or else place those attacks at the end for later rounds
      // while loop to filter out moves that are unique or shared between less than X pokemon. Exception: Abra only knows teleport and ditto only knows transform.
      while (isMoveUnique) {
        const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
        const randomMove = pokemon?.moves[randomNumber];
        const moveCount = moveList.filter((move) => move === randomMove);
        // if (moveCount.length > UNIQUE_MOVE_CUTOFF || answer === "abra" || answer === "ditto") {
          // if (moveCount.length > 1 || randomMove === "teleport") {
          move = randomMove;
          isMoveUnique = false;
        // } else {
          console.log(randomMove);
        // }
      }
      randomAttacks.push(move);
    }

    answerKey.push({ answer, randomAttacks });
  }
  console.log("how many? ", answerKey.length)
  const answerKeyStringified = JSON.stringify(answerKey);
  fs.writeFile("answerKey.json", answerKeyStringified, "utf8", function (error) {
    if (error) {
      console.log("An error occured while writing JSON Object to file.");
      return console.log(error);
    }
    console.log("JSON file has been saved.");
  });
})();
