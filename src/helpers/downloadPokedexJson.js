/* IMPORTANT: the following changes need to be made for a Gen 1 only game
- Clefairy/Clefable & Jigglypuff/Wigglytuff changed to Normal from Fairy
- Mr. Mime changed from Psychic/Fairy to only Psychic
- Magnemite/Magneton changed from electric/steel to only electric
*/

// TODO: add try catches to all fetch calls
const fetch = require("node-fetch");
const fs = require("fs");

// main function
(async () => {
  const pokedex = await fetchPokedex();
  const pokedexStringified = JSON.stringify(pokedex);
  fs.writeFile("pokedex.json", pokedexStringified, "utf8", function (error) {
    if (error) {
      console.log("An error occured while writing JSON Object to file.");
      return console.log(error);
    }
    console.log("JSON file has been saved.");
  });
})();

async function fetchPokedex() {
  console.log("fetching initial pokemon information...");
  const allPokemonResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  console.log("initial information fetched!");
  const allPokemonJson = await allPokemonResponse.json();

  let pokedexData = [];
  console.log("fetching attributes, evolutions, sprites for 151 pokemon. This may take a while...");
  for await (const pokemon of allPokemonJson.results) {
    console.log(pokemon.name);
    const attributes = await fetchAttributes(pokemon.name);
    const evolutions = await fetchEvolutions(attributes.species.url);
    const spriteUrl = await fetchSprite(pokemon.name);
    const allMoves = attributes.moves;
    const selectedMoves = [];
    selectedMoves.forEach((move) => {
      if (move.version_group_details[0].level_learned_at > 0) {
        selectedMoves.push({ move: move.move.name, level: move.version_group_details[0].level_learned_at });
      }
    });

    pokedexData.push({
      name: attributes.name,
      height: attributes.height,
      weight: attributes.weight,
      stats: attributes.stats,
      types: attributes.types,
      moves: allMoves,
      evolutions,
      spriteUrl,
      filtered: false,
    });
  }
  return pokedexData;
}

async function fetchAttributes(pokemonName) {
  const attributesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const attributesJson = await attributesResponse.json();
  return attributesJson;
}

async function fetchEvolutions(speciesUrl) {
  const speciesResponse = await fetch(speciesUrl);
  const speciesJson = await speciesResponse.json();
  const evolutionChainResponse = await fetch(speciesJson.evolution_chain.url);
  const evolutionChainJson = await evolutionChainResponse.json();

  let evolutions = [];
  let evolutionSet = evolutionChainJson.chain;
  // ?. for optional chaining
  while (evolutionSet?.evolves_to.length >= 0) {
    const evolutionName = evolutionSet.species.name;
    const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`);
    const evolutionJson = await evolutionResponse.json();
    // exclude pokemon with ID's greater than 151 (e.g., baby pokemon introduced after Gen 1)
    if (evolutionJson.id <= 151) {
      evolutions.push(evolutionName);
    }
    evolutionSet = evolutionSet.evolves_to[0];
  }
  return evolutions;
}

async function fetchSprite(pokemonName) {
  const spriteResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const spriteJson = await spriteResponse.json();
  const url = spriteJson.sprites.front_default;
  // const url = spriteJson.sprites.other["official-artwork"].front_default;
  return url;
}
