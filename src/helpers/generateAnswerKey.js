const fs = require("fs");
const Pokedex = require("../pokedex.json");

const POKEMON_ID_START = 1;
const POKEMON_ID_END = 151;
const pokedex = Pokedex;

// main function
(async () => {
  let answerKey = [];
  for (let i = 0; i < 1000; i++) {
    const randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);
    const pokemon = pokedex[randomNumber];
    const answer = pokemon.name;

    // generate 5 attacks
    const numMoves = pokemon.moves.length;
    let randomAttacks = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * (numMoves - 0) + 0);
      const move = pokemon.moves[randomNumber].move;
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
