const Sprite = ({ pokemon, setGuessInput, setSuggestionClicked }) => {
  function handleSpriteClick() {
    setGuessInput(pokemon.name);
    setSuggestionClicked(true);
  }

  return (
    <figure className="image is-64x64" onClick={handleSpriteClick}>
      <img
        className={pokemon.filtered ? "custom-sprite-filtered" : "custom-sprite-unfiltered"}
        src={pokemon.spriteUrl}
      />
    </figure>
  );
};

export default Sprite;
