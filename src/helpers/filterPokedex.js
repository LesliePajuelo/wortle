export default function filterPokedex(feedback, passedPokedex) {
  console.log(feedback);

  // filter image aid
  const tempPokedex = [...passedPokedex];
  // console.log(answerTypes);
  const typesToFilterRed = feedback.types.filter((t) => t.colour === "danger");
  const typesToFilterGreen = feedback.types.filter((t) => t.colour === "success");

  // console.log(typesToFilterRed);
  // console.log(typesToFilterRed[0]);
  // console.log(typesToFilterRed[1]);
  // console.log(typesToFilterGreen);
  // console.log(tempPokedex[0]);
  tempPokedex.forEach((pokemon, index) => {
    //types variable is from above
    const pokemonTypes = pokemon.types.map((item) => item.type.name);
    // console.log(pokemonTypes);
    if (pokemon.name === feedback.name) {
      tempPokedex[index].filtered = true;
    }

    // might need an if statement for typesToFilterRed.length > 0
    if (pokemonTypes.includes(typesToFilterRed[0]?.type) || pokemonTypes.includes(typesToFilterRed[1]?.type)) {
      tempPokedex[index].filtered = true;
    }

    if (typesToFilterGreen.length === 1) {
      if (!pokemonTypes.includes(typesToFilterGreen[0]?.type)) {
        tempPokedex[index].filtered = true;
      }
    }

    if (typesToFilterGreen.length === 2) {
      if (!pokemonTypes.includes(typesToFilterGreen[0]?.type) || !pokemonTypes.includes(typesToFilterGreen[1]?.type)) {
        tempPokedex[index].filtered = true;
      }
    }

    // filter by #EV
    if (feedback.numEvolutionCheck === "danger") {
      if (pokemon.evolutions.length === feedback.numEvolutions) {
        tempPokedex[index].filtered = true;
      }
    } else {
      if (pokemon.evolutions.length !== feedback.numEvolutions) {
        tempPokedex[index].filtered = true;
      }
    }
  });
  return tempPokedex;
}
