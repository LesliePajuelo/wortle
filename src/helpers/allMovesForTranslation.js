const fs = require("fs");
const XLSX = require("xlsx");
const Pokedex = require("../pokedex.json");

const pokedex = Pokedex;
const FROM_LANGUAGE = "English";
const TO_LANGUAGE = "Spanish";

// move translations from https://bulbapedia.bulbagarden.net/wiki/List_of_moves_in_other_languages
// "Vice Grip" is mistakenly shown as "Vise Grip" at above website. Manually changed in .xlsx
const Workbook = XLSX.readFile("pokemon-move-translations.xlsx");
const translationWorksheet = XLSX.utils.sheet_to_json(Workbook.Sheets["translations"]);
const movesWorksheet = XLSX.utils.sheet_to_json(Workbook.Sheets["gen1Moves"]);
const genOneMoveArray = movesWorksheet.map((move) => move.Name.toLowerCase());
// console.log(genOneMoveArray);

let allMoves = [];
for (const pokemon of pokedex) {
  const moves = pokemon.moves.map((move) => move.move);
  const newArray = [...new Set([...allMoves, ...moves])];
  allMoves = [...newArray];
}

const allMovesObj = {};
for (const move of allMoves) {
  let translation = "";
  for (const translatedMove of translationWorksheet) {
    // regex to remove "-" from moves for comparison
    const dashesRemovedMove = move.replace(/-/g, " ");
    const dashesRemovedtranslatedMove = translatedMove[FROM_LANGUAGE].replace(/-/g, " ");
    if (genOneMoveArray.includes(dashesRemovedMove.toLowerCase())) {
      if (dashesRemovedMove.toLowerCase() === dashesRemovedtranslatedMove.toLowerCase()) {
        translation = translatedMove[TO_LANGUAGE].toLowerCase();
      }
      allMovesObj[move] = translation;
    }
  }
}
console.log(`# of moves: ${Object.keys(allMovesObj).length}`);

const allMovesStringified = JSON.stringify(allMovesObj);

fs.writeFile("moveListTranslation.json", allMovesStringified, "utf8", function (error) {
  if (error) {
    console.log("An error occured while writing JSON Object to file.");
    return console.log(error);
  }
  console.log("JSON file has been saved.");
});
