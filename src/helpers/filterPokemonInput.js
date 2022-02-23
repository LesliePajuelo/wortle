export default function filterPokemonInput(pokedex, guessInput) {
  const allPokemon = [...pokedex];
  const list = [];

  allPokemon.forEach((pokemon) => {
    if (pokemon.name.indexOf(guessInput.toLowerCase()) > -1) {
      list.push(pokemon);
    }
  });
  return list;
}
