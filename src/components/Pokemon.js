function Pokemon({ index, pokeman, setGuessInput, suggestionClicked, setSuggestionClicked }) {
  function handleSuggestionClick(e) {
    setGuessInput(e.target.innerText);
    //focus back on input field
    const inputField = document.querySelector("[data-guess-input]");
    inputField.focus();
    inputField.select(); // do I need this?
    //TODO: close suggestion popup... can't easily do this with how i've set things up
    setSuggestionClicked(true);
  }

  function handleUpKeyList(e) {
    if (e.keyCode !== 38 && e.keyCode !== 40) return;
    if (e.keyCode === 38) {
      const currentFilterEl = e.target;
      const nextFilterEl = currentFilterEl.previousElementSibling;
      if (!nextFilterEl) return;
      nextFilterEl.focus();
    }
    if (e.keyCode === 40) {
      const currentFilterEl = e.target;
      const nextFilterEl = currentFilterEl.nextElementSibling;
      if (!nextFilterEl) {
        const inputField = document.querySelector("[data-guess-input]");
        inputField.focus();
        inputField.select(); // do I need this?
        return;
      }
      nextFilterEl.focus();
    }
  }

  return (
    <>
      <button
        className={`mb-0 custom-filter-suggestion-item-button ${pokeman.filtered ? "custom-filtered-text" : ""}`}
        onKeyDown={handleUpKeyList}
        onClick={handleSuggestionClick}
      >
        {pokeman.name}
      </button>
    </>
  );
}

export default Pokemon;
