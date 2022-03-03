import { useState } from "react";

const GymBadge = ({ badge, badgeName, location, description, stats, comingSoon }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const unlocked = stats.badges[badgeName];
  // console.log(unlocked);

  function handleInfoOpen() {
    setIsOpen(true);
  }

  function handleInfoClose() {
    setIsOpen(false);
  }

  return (
    <>
      <img
        className={`custom-gym-badge custom-badge-${stats.badges[badgeName] ? "unlocked" : "locked"}`}
        src={badge}
        onClick={handleInfoOpen}
      />
      {isOpen && (
        <div className="card custom-badge-info">
          <div className="card-content">
            <div className="custom-badge-header">
              <div className="custom-badge-title">
                <img
                  className={`custom-badge-info-img custom-badge-modal-${
                    stats.badges[badgeName] ? "unlocked" : "locked"
                  }`}
                  src={badge}
                />
                <div className="">
                  <p className="title is-4 is-size-5-mobile">{badgeName}</p>
                  <p className="subtitle is-6 is-size-7-mobile">{location}</p>
                </div>
              </div>
              <button className="delete" aria-label="delete" onClick={handleInfoClose}></button>
            </div>
            <div className="content pt-3">
              {description}
              {comingSoon && (
                <>
                  Coming soon... Suggestions welcome at this{" "}
                  <a
                    href="https://www.reddit.com/r/pokemon/comments/t1htd3/sqwordle_wordle_for_pokémon/?utm_source=share&utm_medium=web2x&context=3"
                    target="blank"
                  >
                    Reddit Post
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GymBadge;
