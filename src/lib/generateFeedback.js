export default function generateFeedback(guessedPokemon, answer, guessFeedback) {
  let tempFeedback = [...guessFeedback];

  const name = guessedPokemon.name;
  // check if guess is in evolution-family
  const evolutions = guessedPokemon.evolutions;
  let evolutionCheck;
  if (name === answer.name) {
    evolutionCheck = "success";
  } else if (evolutions.includes(answer.name)) {
    evolutionCheck = "warning-dark";
  } else {
    evolutionCheck = "black";
  }

  // number of evolutions
  const numEvolutions = evolutions.length;
  // console.log(numEvolutions);
  let numEvolutionCheck;
  if (numEvolutions === answer.evolutions.length) {
    numEvolutionCheck = "success";
  } else {
    numEvolutionCheck = "danger";
  }

  // types
  const answerTypes = answer.types.map((item) => item.type.name);
  const types = guessedPokemon.types.map((item) => {
    const type = item.type.name;
    let colour;
    if (answerTypes.includes(type)) {
      colour = "success";
    } else {
      colour = "danger";
    }
    return { type, colour };
  });

  // attack
  let attackCheck;
  if (guessedPokemon.stats[1].base_stat > answer.stats[1].base_stat) {
    attackCheck = "🔻";
  } else if (guessedPokemon.stats[1].base_stat < answer.stats[1].base_stat) {
    attackCheck = "🔺";
  } else {
    attackCheck = "✅";
  }

  // defense
  let defenseCheck;
  if (guessedPokemon.stats[2].base_stat > answer.stats[2].base_stat) {
    defenseCheck = "🔻";
  } else if (guessedPokemon.stats[2].base_stat < answer.stats[2].base_stat) {
    defenseCheck = "🔺";
  } else {
    defenseCheck = "✅";
  }

  // height
  let heightCheck;
  if (guessedPokemon.height > answer.height) {
    heightCheck = "🔻";
  } else if (guessedPokemon.height < answer.height) {
    heightCheck = "🔺";
  } else {
    heightCheck = "✅";
  }

  // weight
  let weightCheck;
  if (guessedPokemon.weight > answer.weight) {
    weightCheck = "🔻";
  } else if (guessedPokemon.weight < answer.weight) {
    weightCheck = "🔺";
  } else {
    weightCheck = "✅";
  }

  tempFeedback.push({
    name,
    evolutionCheck,
    types,
    numEvolutions,
    numEvolutionCheck,
    attackCheck,
    defenseCheck,
    heightCheck,
    weightCheck,
  });

  return tempFeedback;
}
