// https://beta.pokeapi.co/graphql/console/

/** 
GraphQL database issues to be aware of for Gen 1 query (all addressed in code below):
- [ ] Clefairy/Clefable & Jigglypuff/Wigglytuff types need to change from Fairy to Normal
- [ ] Eevee evolution chain issues
- [ ] Duplicate moves
- [ ] Sprites data comes in as a giant string that needs to be parsed
  */

const fetch = require("node-fetch");
const fs = require("fs");

const query = `query gen1Query {
  pokemon_v2_pokemon(limit: 151, order_by: {id: asc}) {
    id
    name
    height
    weight
    pokemon_v2_pokemonstats {
      pokemon_v2_stat {
        name
      }
      base_stat
    }
    pokemon_v2_pokemontypes(where: {pokemon_v2_type: {generation_id: {_eq: 1}}}) {
      pokemon_v2_type {
        name
        generation_id
      }
    }
    pokemon_v2_pokemonmoves(where: {pokemon_v2_movelearnmethod: {name: {_eq: "level-up"}}, pokemon_v2_move: {generation_id: {_eq: 1}}, version_group_id: {_eq: 1}}) {
      pokemon_v2_move {
        generation_id
        name
      }
      version_group_id
    }
    pokemon_v2_pokemonspecy {
      evolution_chain_id
      evolves_from_species_id
      is_legendary
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {id: {_eq: 1}}}) {
          id
          name
        }
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
}`;

(async function createPokedex() {
  const data = await fetchData();

  let organizedPokedex = [];
  data.forEach((pokemon) => {
    const stats = organizeStats(pokemon.pokemon_v2_pokemonstats);
    const types = organizeTypes(pokemon.pokemon_v2_pokemontypes);
    const moves = organizeMoves(pokemon.pokemon_v2_pokemonmoves);
    const evolutions = organizeEvolutions(pokemon.pokemon_v2_pokemonspecy);
    const [spriteUrl, animatedSpriteUrl] = parseSpriteUrl(pokemon.pokemon_v2_pokemonsprites);

    organizedPokedex.push({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      stats: stats,
      types: types,
      moves: moves,
      evolutions: evolutions,
      spriteUrl: spriteUrl,
      animatedSpriteUrl: animatedSpriteUrl,
      filtered: false,
    });
  });

  // correct for database issues

  // modify eevee evolution chain
  const eeveeChain = [132, 133, 134, 135];
  eeveeChain.forEach((pokemon) => {
    // console.log(organizedPokedex[pokemon]);
    organizedPokedex[pokemon].evolutions.numberOfPokemonInChain = 2;
  });

  // add normal type to clefairy and clefable
  const clefairyChain = [34, 35];
  clefairyChain.forEach((pokemon) => {
    organizedPokedex[pokemon].types.push("normal");
  });

  const pokedexStringified = JSON.stringify(organizedPokedex);
  fs.writeFile("pokedex.json", pokedexStringified, "utf8", function (error) {
    if (error) {
      console.log("An error occured while writing JSON Object to file.");
      return console.log(error);
    }
    console.log("JSON file has been saved.");
  });
})();

async function fetchData() {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    body: JSON.stringify({ query: query }),
    method: "POST",
  });
  const json = await response.json();
  return (data = json.data.pokemon_v2_pokemon);
}

// graphQL for sprites is broken.
function parseSpriteUrl(allSprites) {
  const spriteString = allSprites[0].sprites;
  const spriteObject = JSON.parse(spriteString);
  // console.log(spriteObject);
  console.log(spriteObject.versions["generation-v"]["black-white"].animated.front_default);
  return [spriteObject.front_default, spriteObject.versions["generation-v"]["black-white"].animated.front_default];
}

function organizeStats(unorganizedStats) {
  let stats = {};
  unorganizedStats.forEach((stat) => {
    stats[stat.pokemon_v2_stat.name] = stat.base_stat;
  });
  return stats;
}

function organizeTypes(unorganizedTypes) {
  let types = [];
  unorganizedTypes.forEach((type) => {
    types.push(type.pokemon_v2_type.name);
  });
  return types;
}

function organizeMoves(unorganizedMoves) {
  let moves = [];
  unorganizedMoves.forEach((move) => {
    moves.push(move.pokemon_v2_move.name);
  });
  // remove duplicate moves (graphQL database error)
  return [...new Set([...moves])];
}

function organizeEvolutions(unorganizedEvolutions) {
  let evolutions = {};

  evolutions["chainId"] = unorganizedEvolutions.evolution_chain_id;
  evolutions["pokemonInChain"] = unorganizedEvolutions.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map(
    (item) => item.name
  );
  evolutions["numberOfPokemonInChain"] = evolutions["pokemonInChain"].length;
  return evolutions;
}
