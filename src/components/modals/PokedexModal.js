import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import pokedexImg from "../../img/pokedex.png";
import StatsSprite from "./StatsSprite";

const PokedexModal = ({ isOpen, handleClose, filteredPokedex, stats }) => {
  const { t } = useTranslation();

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (!selectedPokemon) return;
    console.log(selectedPokemon);
  }, [selectedPokemon]);

  return (
    <>
      <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={handleClose}></div>

        <div className="custom-pokedex-stats-div">
          <img className="custom-pokedex-stats-img" src={pokedexImg} alt="" />
          <p className="custom-stats-pokedex-counter">{`${stats.pokemonCaught.length}`}/151</p>
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
            <p>
              {selectedPokemon &&
                `#${filteredPokedex.map((pokemon) => pokemon.name).indexOf(selectedPokemon.name) + 1}`}
            </p>
            <p className="has-text-weight-bold is-uppercase">{selectedPokemon && selectedPokemon.name}</p>
            <div className="custom-stats-pokedex-types">
              <p>{selectedPokemon && t(`types.${selectedPokemon.types[0].type.name}`)}</p>
              <p>{selectedPokemon?.types[1] && t(`types.${selectedPokemon.types[1].type.name}`)}</p>
            </div>
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
