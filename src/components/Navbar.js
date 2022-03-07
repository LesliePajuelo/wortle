import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faGear, faChartColumn, faGlobe } from "@fortawesome/free-solid-svg-icons";

import { safariZoneUrl } from "../constants/strings";

const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  showLanguageSelector,
  setShowLanguageSelector,
  handleChangeLanguage,
  currentLanguageCode,
}) => {
  const { t } = useTranslation();

  function handleOpenInfo() {
    setIsInfoModalOpen(true);
  }

  function handleOpenStats() {
    setIsStatsModalOpen(true);
  }

  function handleOpenSettings() {
    setIsSettingsModalOpen(true);
  }

  return (
    <div className="toggles is-flex is-justify-content-space-between">
      <span className="icon-text custom-cursor" onClick={handleOpenInfo}>
        <span className="icon custom-navbar-icon is-medium">
          <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faInfoCircle} />
        </span>
      </span>
      <div className="is-flex is-align-items-center">
        <a className="custom-navbar-icon is-uppercase pr-2 has-text-weight-bold" href={safariZoneUrl}>
          {t("navbar.safariZone")}
        </a>
        <span className="icon-text custom-cursor" onClick={handleOpenStats}>
          <span className="icon custom-navbar-icon is-medium">
            <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faChartColumn} />
          </span>
        </span>
        <span className="icon-text custom-cursor" onClick={handleOpenSettings}>
          <span className="icon custom-navbar-icon is-medium">
            <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faGear} />
          </span>
        </span>

        <div className={`dropdown is-right ${showLanguageSelector ? "is-active" : ""}`}>
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
      </div>
    </div>
  );
};

export default Navbar;
