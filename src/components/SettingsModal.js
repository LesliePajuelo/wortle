const SettingsModal = ({ isSettingsModalOpen, setIsSettingsModalOpen }) => {
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
              <p className="has-text-centered is-uppercase">Coming Soon...</p>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Standard</p>
                  <p className="custom-mode-descr">
                    Pokédex is shown and filtered after each guess. Mystery Pokémon attacks after each guess.
                  </p>
                </div>
                <input type="checkbox" checked disabled></input>
              </div>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Pokémon Trainer</p>
                  <p className="custom-mode-descr">Pokédex is shown but not filtered.</p>
                </div>
                <input type="checkbox" disabled></input>
              </div>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Gym Leader</p>
                  <p className="custom-mode-descr">Pokédex is hidden.</p>
                </div>
                <input type="checkbox" disabled></input>
              </div>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">Elite Four</p>
                  <p className="custom-mode-descr">Pokédex is hidden and mystery Pokémon does not attack.</p>
                </div>
                <input type="checkbox" disabled></input>
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
