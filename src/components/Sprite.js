const Sprite = ({ pokemon, setGuessInput, setSuggestionClicked }) => {
  function handleSpriteClick() {
    setGuessInput(pokemon.name);

    //check for mobile
    const inputEl = document.querySelector("[data-guess-input]");
    inputEl.focus();
    // inputEl.scrollIntoView(false); // check this
    setSuggestionClicked(true);
  }

  // console.log(pokemon);
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
