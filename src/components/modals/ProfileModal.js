import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGlobe, faCalculator, faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileModal = (props) => {
  const {
    isOpen,
    handleClose,
    showLanguageSelector,
    setShowLanguageSelector,
    handleChangeLanguage,
    currentLanguageCode,
    setIsSettingsModalOpen,
    setIsStatsPokedexModalOpen,
  } = props;

  const { t } = useTranslation();
  const { user, documentData, logout } = useAuth();

  function handleClickChangeProfilePic() {
    if (!user) return;
    setIsStatsPokedexModalOpen(true);
  }

  async function signOut() {
    await logout();
    window.location.reload(); // completely reload app to reset state
  }

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card custom-reveal-animation">
        <header className="modal-card-head pt-3 pb-3">
          <p className="modal-card-title">Profile</p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div className="custom-profile-modal-pic-container">
              <div
                className="custom-profile-modal-pic"
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    documentData ? documentData.data()?.profilePic : "25"
                  }.png)`,
                }}
                onClick={handleClickChangeProfilePic}
              ></div>
              <span
                className="icon custom-navbar-icon is-medium custom-change-profile-icon"
                onClick={handleClickChangeProfilePic}
              >
                <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faCamera} />
              </span>
            </div>
            <p className="mt-3">{user ? user.email : "you are not logged in"}</p>
            <div className="is-flex is-justify-content-center is-align-items-center mb-6">
              <span className="icon-text custom-cursor" onClick={() => setIsSettingsModalOpen(true)}>
                <span className="icon custom-navbar-icon is-medium">
                  <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faGear} />
                </span>
              </span>
              <div className={`dropdown ${showLanguageSelector ? "is-active" : ""}`}>
                <div className="dropdown-trigger">
                  <button
                    className="button custom-language-button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu6"
                    onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  >
                    <span className="icon custom-navbar-icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faGlobe} />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu custom-language-menu" id="dropdown-menu6" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      <button
                        className={`mb-0 custom-filter-suggestion-item-button ${
                          currentLanguageCode === "en" ? "has-text-weight-bold" : ""
                        }`}
                        onClick={() => handleChangeLanguage("en")}
                      >
                        English
                      </button>
                      <button
                        className={`mb-0 custom-filter-suggestion-item-button ${
                          currentLanguageCode === "es" ? "has-text-weight-bold" : ""
                        }`}
                        onClick={() => handleChangeLanguage("es")}
                      >
                        Español
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <span className="icon-text custom-cursor" onClick={() => setIsStatsPokedexModalOpen(true)}>
                <span className="icon custom-navbar-icon is-medium">
                  <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faCalculator} />
                </span>
              </span>
            </div>
            {user && (
              <p className="has-text-centered is-size-7">
                🌟 NEW 🌟 Change your profile picture to any Pokémon that you have guessed correctly while playing
                Sqwordle, including the Gen 1 starters (bulbasaur, charmander, and squirtle).
              </p>
            )}
            {!user && (
              <p className="has-text-centered">
                Log in or create an account so you don't lose your stats if your browser memory is cleared manually or
                automatically.
              </p>
            )}
            {user ? (
              <div>
                <button className="button custom-pokedex-open-btn" onClick={signOut}>
                  Log Out
                </button>
              </div>
            ) : (
              <div>
                <Link className="" to="/login">
                  <button className="button custom-pokedex-open-btn">Log In</button>
                </Link>
                <div className="pt-3">
                  Need an account?
                  <Link to="/signup"> Sign Up</Link>
                </div>
              </div>
            )}
          </div>
        </section>
        <footer className="modal-card-foot is-flex is-flex-direction-column custom-stats-footer">
          <p className="has-text-weight-bold">{t("modalFooter.newSqwordle")}</p>
        </footer>
      </div>
    </div>
  );
};

export default ProfileModal;
