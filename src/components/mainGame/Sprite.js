const Sprite = ({ pokemon, setGuessInput, setSuggestionClicked, isEliteFourMode }) => {
  function handleSpriteClick() {
    if (isEliteFourMode) return;
    setGuessInput(pokemon.name);
    setSuggestionClicked(true);
  }

  return (
    <figure className="image is-64x64" onClick={handleSpriteClick}>
      <img
        className={pokemon.filtered && !isEliteFourMode ? "custom-sprite-filtered" : "custom-sprite-unfiltered"}
        src={pokemon.spriteUrl}
      />
    </figure>
  );
};

export default Sprite;
