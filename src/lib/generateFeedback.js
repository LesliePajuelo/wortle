export default function generateFeedback(guessedPokemon, answer, guessFeedback) {
  let tempFeedback = [...guessFeedback];

  // check if guess is in evolution-family
  let evolutionCheck;
  if (guessedPokemon.name === answer.name) {
    evolutionCheck = "success";
  } else if (guessedPokemon.evolutions.pokemonInChain.includes(answer.name)) {
    evolutionCheck = "warning-dark";
  } else {
    evolutionCheck = "black";
  }
  // console.log(`evolution check = ${evolutionCheck}`);

  // number of evolutions
  let numEvolutionCheck;
  if (guessedPokemon.evolutions.numberOfPokemonInChain === answer.evolutions.numberOfPokemonInChain) {
    numEvolutionCheck = "success";
  } else {
    numEvolutionCheck = "danger";
  }
  // console.log(`num evolutions check = ${numEvolutionCheck}`);

  // types
  const types = guessedPokemon.types.map((type) => {
    let colour;
    if (answer.types.includes(type)) {
      colour = "success";
    } else {
      colour = "danger";
    }
    return { type, colour };
  });
  // console.log(types);

  // attack
  let attackCheck;
  if (guessedPokemon.stats.attack > answer.stats.attack) {
    attackCheck = "🔻";
  } else if (guessedPokemon.stats.attack < answer.stats.attack) {
    attackCheck = "🔺";
  } else {
    attackCheck = "✅";
  }

  // console.log(`attackCheck = ${attackCheck}`);

  // defense
  let defenseCheck;
  if (guessedPokemon.stats.defense > answer.stats.defense) {
    defenseCheck = "🔻";
  } else if (guessedPokemon.stats.defense < answer.stats.defense) {
    defenseCheck = "🔺";
  } else {
    defenseCheck = "✅";
  }

  // console.log(`defenseCheck = ${defenseCheck}`);

  // height
  let heightCheck;
  if (guessedPokemon.height > answer.height) {
    heightCheck = "🔻";
  } else if (guessedPokemon.height < answer.height) {
    heightCheck = "🔺";
  } else {
    heightCheck = "✅";
  }

  // console.log(`height check = ${heightCheck}`);

  // weight
  let weightCheck;
  if (guessedPokemon.weight > answer.weight) {
    weightCheck = "🔻";
  } else if (guessedPokemon.weight < answer.weight) {
    weightCheck = "🔺";
  } else {
    weightCheck = "✅";
  }
  // console.log(`weight check = ${weightCheck}`);

  tempFeedback.push({
    name: guessedPokemon.name,
    evolutionCheck,
    types,
    numEvolutions: guessedPokemon.evolutions.numberOfPokemonInChain,
    numEvolutionCheck,
    attackCheck,
    defenseCheck,
    heightCheck,
    weightCheck,
  });

  // console.log(tempFeedback);

  return tempFeedback;
}
