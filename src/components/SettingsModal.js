const SettingsModal = (props) => {
  const {
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isPokemonTrainerMode,
    setIsPokemonTrainerMode,
    isGymLeaderMode,
    setIsGymLeaderMode,
    isEliteFourMode,
    setIsEliteFourMode,
    guessFeedback,
  } = props;

  function handleTrainerModeChange() {
    if (guessFeedback.length > 0) return;
    if (isPokemonTrainerMode) return;
    setIsPokemonTrainerMode(true);
    setIsGymLeaderMode(false);
    setIsEliteFourMode(false);
  }

  function handleLeaderModeChange() {
    if (guessFeedback.length > 0) return;

    if (isGymLeaderMode) return;
    setIsGymLeaderMode(true);
    setIsPokemonTrainerMode(false);
    setIsEliteFourMode(false);
  }

  function handleEliteFourModeChange() {
    if (guessFeedback.length > 0) return;

    if (isEliteFourMode) return;
    setIsEliteFourMode(true);
    setIsGymLeaderMode(false);
    setIsPokemonTrainerMode(false);
  }

  function handleCloseSettings() {
    setIsSettingsModalOpen(false);
  }

  return (
    <div className={`modal ${isSettingsModalOpen ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Settings</p>
          <button className="delete" aria-label="close" onClick={handleCloseSettings}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <div className="custom-modes-div">
              <p className="custom-mode-header">MODES</p>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Pokémon Trainer</p>
                  <p className="custom-mode-descr">
                    Pokédex is shown and filtered after each guess. Mystery Pokémon attacks after each guess.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isPokemonTrainerMode}
                  onChange={handleTrainerModeChange}
                  disabled={guessFeedback && guessFeedback.length > 0}
                ></input>
              </div>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Gym Leader</p>
                  <p className="custom-mode-descr">Mystery Pokémon does not attack.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isGymLeaderMode}
                  onChange={handleLeaderModeChange}
                  disabled={guessFeedback && guessFeedback.length > 0}
                ></input>
              </div>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Elite Four</p>
                  <p className="custom-mode-descr">Pokédex is hidden and mystery Pokémon does not attack.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isEliteFourMode}
                  onChange={handleEliteFourModeChange}
                  disabled={guessFeedback && guessFeedback.length > 0}
                ></input>
              </div>
              <div className="custom-mode mt-2 mb-2">
                <p className="is-size-7">*Game mode can only be changed before the start of a round.</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <p className="has-text-weight-bold">New SQWORDLE available every day!</p>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;
