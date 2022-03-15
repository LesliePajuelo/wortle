const StatsSprite = ({ pokemon, stats, setSelectedPokemon }) => {
  return (
    <figure className="image is-48x48 custom-cursor">
      <img
        className={stats.pokemonCaught.includes(pokemon.name) ? "custom-sprite-unfiltered" : "custom-sprite-filtered"}
        src={pokemon.spriteUrl}
        onClick={() => setSelectedPokemon(pokemon)}
      />
    </figure>
  );
};

export default StatsSprite;
