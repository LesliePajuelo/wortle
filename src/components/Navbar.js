import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faGear, faChartColumn } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen, setIsSettingsModalOpen }) => {
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
      <div>
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
      </div>
    </div>
  );
};

export default Navbar;
