function Pokemon({ pokeman, setGuessInput, setSuggestionClicked, isEliteFourMode }) {
  function handleSuggestionClick(e) {
    setGuessInput(e.target.innerText);

    const inputField = document.querySelector("[data-guess-input]");
    inputField.focus();
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
        inputField.select(); // TODO: check if I need this?
        return;
      }
      nextFilterEl.focus();
    }
  }

  return (
    <>
      <button
        className={`pokeman mb-0 custom-filter-suggestion-item-button ${
          pokeman.filtered && !isEliteFourMode ? "custom-filtered-text" : ""
        }`}
        onKeyDown={handleUpKeyList}
        onClick={handleSuggestionClick}
      >
        {pokeman.name}
      </button>
    </>
  );
}

export default Pokemon;
