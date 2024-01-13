/* IMPORTANT: the following changes need to be made for a Gen 1 only game:
- [ ] Clefairy/Clefable & Jigglypuff/Wigglytuff changed to Normal from Fairy
- [ ] Mr. Mime changed from Psychic/Fairy to only Psychic
- [ ] Magnemite/Magneton changed from electric/steel to only electric
-  [ ] Eevee evolution issue
*/

// TODO: add try catches to all fetch calls
const fetch = require("node-fetch");
const fs = require("fs");
const path = require('path');
const XLSX = require("xlsx");

async function safeAwait(promise) {
  try {
      const result = await promise;
      return [null, result];
  } catch (error) {
      return [error, null]; 
  }
}

const Workbook = XLSX.readFile("./pokemon-move-translations.xlsx");
const movesWorksheet = XLSX.utils.sheet_to_json(Workbook.Sheets["gen1Moves"]);
const genOneMoveArray = movesWorksheet.map((move) => move.Name.toLowerCase());
// console.log(genOneMoveArray);

// main function
(async () => {
  const [error, pokedex] = await safeAwait(fetchPokedex());
  error ? console.log('fetchPokedex', error) : null;
  const pokedexStringified = JSON.stringify(pokedex);
  fs.writeFile("pokedex2.json", pokedexStringified, "utf8", function (error) {
    if (error) {
      console.log("An error occured while writing JSON Object to file.", error);
      return console.log(error);
    }
    console.log("JSON file has been saved.");
  });
})();

async function fetchPokedex() {
  console.log("fetching initial pokemon information...");
  const offset = 151
  const limit = 341
  const [error, allPokemonResponse] = await safeAwait(fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`));
  error ? console.log('allPokemonResponse', error) : null;
  console.log("initial information fetched!");
  const allPokemonJson = await allPokemonResponse.json().catch((error)=>{console.log('allPokemon', error)});;

  let pokedexData = [];
  console.log("fetching attributes, evolutions, sprites for pokemon. This may take a while...");
  for await (const pokemon of allPokemonJson.results) {
    console.log(pokemon.name);
    const [errorAttributes,attributes] = await safeAwait(fetchAttributes(pokemon.name));
    const [errorEvolution,evolutions] = await safeAwait(fetchEvolutions(attributes?.species?.url));
    const [errorSpriteUrl,spriteUrl] = await safeAwait(fetchSprite(pokemon.name));
   
    // TODO: soft-code clefairy/clefable/mr-mime/jiggly/wiggly/magnemite/magneton to gen 1 type

    errorAttributes ? console.log('errorAttributes', errorAttributes) : null;
    errorEvolution ? console.log('errorEvolution',errorEvolution ) : null;
    errorSpriteUrl? console.log('errorSpriteUrl',errorSpriteUrl ) : null;




    const allMoves = attributes.moves;
    const selectedMoves = [];
    allMoves.forEach((move) => {
      if (move.version_group_details[0].level_learned_at > 0) {
        const dashesRemovedMove = move.move.name.replace(/-/g, " ");
        if (genOneMoveArray.includes(dashesRemovedMove)) {
          selectedMoves.push({ move: move.move.name, level: move.version_group_details[0].level_learned_at });
        }
      }
    });

    pokedexData.push({
      name: attributes.name,
      height: attributes.height,
      weight: attributes.weight,
      stats: attributes.stats,
      types: attributes.types,
      moves: selectedMoves,
      evolutions,
      spriteUrl,
      filtered: false,
    });
  }

  return pokedexData;
}

async function fetchAttributes(pokemonName) {
  const [errorAttributesResponse,attributesResponse] = await safeAwait(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`));
  errorAttributesResponse ? console.log('errorAttributesResponse', errorAttributesResponse) : null;



  const attributesJson = await attributesResponse.json().catch((error)=>{console.log('fetchAttributes',pokemonName, error)});;
  return attributesJson;
}

// TODO - fix eevee issue
async function fetchEvolutions(speciesUrl) {

  const [errorSpeciesResponse,speciesResponse] = await safeAwait(fetch(speciesUrl));
  errorSpeciesResponse ? console.log('errorSpeciesResponse', errorSpeciesResponse) : null;


  const speciesJson = await speciesResponse.json().catch((error)=>{console.log('speciesResponse', error)});;
  
  const [errorEvolutionChainResponse,evolutionChainResponse] = await safeAwait(fetch(speciesJson.evolution_chain.url));
  errorEvolutionChainResponse ? console.log('errorEvolutionChainResponse', errorEvolutionChainResponse) : null;

  const evolutionChainJson = await evolutionChainResponse.json().catch((error)=>{console.log('evolution_chain', evolutionName, error)});

  let evolutions = [];
  let evolutionSet = evolutionChainJson.chain;
  
  // ?. for optional chaining
  while (evolutionSet?.evolves_to.length >= 0) {
    const evolutionName = evolutionSet.species.name;

    const [errorEvolutionResponse, evolutionResponse] = await safeAwait(fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`));
    errorEvolutionResponse ? console.log('errorEvolutionResponse', errorEvolutionResponse) : null;
  
    const evolutionJson = await evolutionResponse.json().catch((error)=>{console.log('evolutionName', evolutionName, error)});
    // exclude pokemon with ID's greater than 151 (e.g., baby pokemon introduced after Gen 1)
    if (evolutionJson.id <= 2000) {
      evolutions.push(evolutionName);
    }
    evolutionSet = evolutionSet.evolves_to[0];
  }

  return evolutions;
}



// Define the file path and the value to be appended
const filePath = 'example.txt'; // Replace with your desired file path
const valueToAppend = 'Your text here\n'; // Replace with the text you want to append

// Function to append data to the file
function appendToFile(filePath, data) {
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('Data appended successfully', data);
        }
    });
}


async function fetchSprite(pokemonName) {

  const [errorSpriteResponse, spriteResponse] = await safeAwait(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`));
  errorSpriteResponse ? console.log('errorSpriteResponse', errorSpriteResponse) : null;

  const spriteJson = await spriteResponse.json().catch((error)=>{console.log('fetchSprite', error)});;
  const url = spriteJson.sprites.front_default;
  return url;
}
