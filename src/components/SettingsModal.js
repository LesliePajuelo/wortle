import { Trans, useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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
          <p className="modal-card-title">{t("settingsModal.header")}</p>
          <button className="delete" aria-label="close" onClick={handleCloseSettings}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <div className="custom-modes-div">
              <p className="custom-mode-header">{t("settingsModal.modesTitle")}</p>
              <div className="custom-mode">
                <div className="custom-mode-descr-div">
                  <p className="custom-mode-title">{t("settingsModal.trainerMode.name")}</p>
                  <p className="custom-mode-descr">{t("settingsModal.trainerMode.description")}</p>
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
                  <p className="custom-mode-title">{t("settingsModal.gymLeaderMode.name")}</p>
                  <p className="custom-mode-descr">{t("settingsModal.gymLeaderMode.description")}</p>
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
                  <p className="custom-mode-title">{t("settingsModal.eliteFourMode.name")}</p>
                  <p className="custom-mode-descr">{t("settingsModal.eliteFourMode.description")}</p>
                </div>
                <input
                  type="checkbox"
                  checked={isEliteFourMode}
                  onChange={handleEliteFourModeChange}
                  disabled={guessFeedback && guessFeedback.length > 0}
                ></input>
              </div>
              <div className="custom-mode mt-2 mb-2">
                <p className="is-size-7">*{t("settingsModal.modeWarning")}</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <p className="has-text-weight-bold">{t("modalFooter.newSqwordle")}</p>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;
