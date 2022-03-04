// TODO: filter unique attacks

// create a set for each evolution family

const fs = require("fs");
const Pokedex = require("../pokedex.json");

const POKEMON_ID_START = 1;
const POKEMON_ID_END = 151;
const pokedex = Pokedex;

// main function
(async () => {
  // TODO: Create an array of all moves
  let tempMoves = [];
  const firstPokemon = pokedex[0];
  const firstPokemonMoves = firstPokemon.moves;
  let firstPokemonMovesNames = [];
  for (const move of firstPokemonMoves) {
    firstPokemonMovesNames.push(move.move);
  }
  tempMoves.push({ pokemon: firstPokemon.name, moves: firstPokemonMovesNames });
  // console.log(tempMoves[tempMoves.length - 1]);

  for (const pokemon of pokedex) {
    if (pokemon.evolutions.includes(tempMoves[tempMoves.length - 1].pokemon)) {
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

  console.log(moveList);

  const moveListStringified = JSON.stringify(moveList);

  fs.writeFile("moveList.json", moveListStringified, "utf8", function (error) {
    if (error) {
      console.log("An error occured while writing JSON Object to file.");
      return console.log(error);
    }
    console.log("JSON file has been saved.");
  });
})();
