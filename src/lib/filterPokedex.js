export default function filterPokedex(feedback, passedPokedex) {
  // filter image aid
  const tempPokedex = [...passedPokedex];
  const typesToFilterRed = feedback.types.filter((t) => t.colour === "danger");
  const typesToFilterGreen = feedback.types.filter((t) => t.colour === "success");

  tempPokedex.forEach((pokemon, index) => {
    // const pokemonTypes = pokemon.types.map((item) => item.type.name);
    if (pokemon.name === feedback.name) {
      tempPokedex[index].filtered = true;
    }

    // TODO: might need an if statement for typesToFilterRed.length > 0
    if (pokemon.types.includes(typesToFilterRed[0]?.type) || pokemon.types.includes(typesToFilterRed[1]?.type)) {
      tempPokedex[index].filtered = true;
    }

    if (typesToFilterGreen.length === 1) {
      if (!pokemon.types.includes(typesToFilterGreen[0]?.type)) {
        tempPokedex[index].filtered = true;
      }
    }

    if (typesToFilterGreen.length === 2) {
      if (
        !pokemon.types.includes(typesToFilterGreen[0]?.type) ||
        !pokemon.types.includes(typesToFilterGreen[1]?.type)
      ) {
        tempPokedex[index].filtered = true;
      }
    }

    // filter by Evolution Tree
    if (feedback.numEvolutionCheck === "danger") {
      if (pokemon.evolutions.numberOfPokemonInChain === feedback.numEvolutions) {
        tempPokedex[index].filtered = true;
      }
    } else {
      if (pokemon.evolutions.numberOfPokemonInChain !== feedback.numEvolutions) {
        tempPokedex[index].filtered = true;
      }
    }
  });
  return tempPokedex;
}
