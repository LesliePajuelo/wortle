import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../contexts/AuthContext";
import { updateProfilePic } from "../../lib/firebaseFunctions";
import pokedexImg from "../../img/pokedex.png";
import StatsSprite from "./StatsSprite";

const PokedexModal = ({ isOpen, handleClose, filteredPokedex, stats }) => {
  const { t } = useTranslation();

  const { user } = useAuth();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  async function changeProfilePic() {
    if (
      !stats.pokemonCaught.includes(selectedPokemon.name) &&
      selectedPokemon.name !== "bulbasaur" &&
      selectedPokemon.name !== "charmander" &&
      selectedPokemon.name !== "squirtle"
    ) {
      return setShowErrorMessage(true);
    }
    const id = filteredPokedex.map((pokemon) => pokemon.name).indexOf(selectedPokemon.name) + 1;
    await updateProfilePic(user, id);
    handleClose();
  }

  return (
    <>
      <div className={`modal custom-reveal-animation ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={handleClose}></div>

        <div className="custom-pokedex-stats-div ">
          <img className="custom-pokedex-stats-img" src={pokedexImg} alt="" />
          {/* {showErrorMessage && <div className="notification is-warning">You do not have this pokemons</div>} */}

          <p className="custom-stats-pokedex-counter">{`${stats.pokemonCaught.length}`}/492</p>
          <div className="custom-stats-pokedex-gallery">
            <div className="custom-sprite-gallery-images">
              {filteredPokedex.map((pokemon, index) => {
                return (
                  <StatsSprite key={index} pokemon={pokemon} stats={stats} setSelectedPokemon={setSelectedPokemon} />
                );
              })}
            </div>
          </div>
          <div className="custom-pokedex-stats-info">
            {/* <p>
              {selectedPokemon &&
                `#${filteredPokedex.map((pokemon) => pokemon.name).indexOf(selectedPokemon.name) + 1}`}
            </p> */}
            <p className="has-text-weight-bold is-uppercase">{selectedPokemon && selectedPokemon.name}</p>
            <div className="custom-stats-pokedex-types">
              <p>{selectedPokemon && t(`types.${selectedPokemon.types[0]}`)}</p>
              <p>{selectedPokemon?.types[1] && t(`types.${selectedPokemon.types[1]}`)}</p>
            </div>
            {selectedPokemon && user && (
              <button
                className="button custom-change-profile-pic-button"
                disabled={
                  !stats.pokemonCaught.includes(selectedPokemon.name) &&
                  selectedPokemon.name !== "bulbasaur" &&
                  selectedPokemon.name !== "charmander" &&
                  selectedPokemon.name !== "squirtle"
                }
                onClick={changeProfilePic}
              >
                Make Profile Pic
              </button>
            )}
          </div>
        </div>
        <button
          className="modal-close is-large custom-pokedex-close"
          aria-label="close"
          onClick={() => {
            handleClose();
            setSelectedPokemon(null);
          }}
        ></button>
      </div>
    </>
  );
};

export default PokedexModal;
