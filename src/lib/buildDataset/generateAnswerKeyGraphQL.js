const fs = require("fs");
const Pokedex = require("../../constants/pokedex.json");

const POKEMON_ID_START = 1;
const POKEMON_ID_END = 151;
const UNIQUE_MOVE_CUTOFF = 1;
const MIN_POKEMON_REPEAT = 20;
const NUM_ATTACKS = 5;
const NUM_ANSWERS = 1000;

// MAIN FUNCTION
(async () => {
  // Create an array of all moves for each pokemon evolution family (e.g., pikachu & raichu are one family)
  let movesByEvolutionChain = [];

  const firstPokemon = Pokedex[0];
  movesByEvolutionChain.push({ pokemon: firstPokemon.name, moves: firstPokemon.moves });

  for (const pokemon of Pokedex) {
    if (pokemon.evolutions.pokemonInChain.includes(movesByEvolutionChain[movesByEvolutionChain.length - 1].pokemon)) {
      // merge moveset without duplicates
      const previousArray = movesByEvolutionChain[movesByEvolutionChain.length - 1].moves;
      const newArray = [...new Set([...previousArray, ...pokemon.moves])];
      movesByEvolutionChain[movesByEvolutionChain.length - 1].moves = [...newArray];
    } else {
      // create new pokemon and moves
      movesByEvolutionChain.push({ pokemon: pokemon.name, moves: pokemon.moves });
    }
  }

  // combine moves into one big list (there will be duplicates)
  let moveList = [];
  for (pokemonChain of movesByEvolutionChain) {
    const moves = pokemonChain.moves;
    moveList = [...moves, ...moveList];
  }

  // generate random answer key
  let answerKey = [];
  for (let i = 0; i < NUM_ANSWERS; i++) {
    // while loop that only breaks out if answer is not in most recent 20 answerKey array...
    let includeAnswer = false;
    let randomNumber, pokemon, answer;
    while (!includeAnswer) {
      randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);
      pokemon = Pokedex[randomNumber];
      answer = pokemon.name;
      console.log(`answer ${i}: ${answer}`);

      const prevTwentyAnswers = answerKey.map((item) => item.answer).slice(-MIN_POKEMON_REPEAT);
      if (!prevTwentyAnswers.includes(answer)) {
        includeAnswer = true;
      } else {
        console.log("pokemon within last 20 answers");
      }
    }

    // generate 5 attacks per answer
    const numMoves = pokemon.moves.length;
    console.log(numMoves);
    let randomAttacks = [];
    for (let i = 0; i < NUM_ATTACKS; i++) {
      let isMoveUnique = true;
      let move;
      // while loop to filter out moves that are unique or shared between less than X pokemon. Exception: Abra only knows teleport and ditto only knows transform.
      while (isMoveUnique) {
        const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
        const randomMove = pokemon.moves[randomNumber];
        const moveCount = moveList.filter((move) => move === randomMove);
        if (moveCount.length > UNIQUE_MOVE_CUTOFF || answer === "abra" || answer === "ditto") {
          move = randomMove;
          isMoveUnique = false;
        } else {
          console.log(randomMove);
        }
      }
      randomAttacks.push(move);
    }

    answerKey.push({ answer, randomAttacks });
  }

  const answerKeyStringified = JSON.stringify(answerKey);
  fs.writeFile("answerKey.json", answerKeyStringified, "utf8", function (error) {
    if (error) {
      console.log("An error occured while writing JSON Object to file.");
      return console.log(error);
    }
    console.log("JSON file has been saved.");
  });
})();
