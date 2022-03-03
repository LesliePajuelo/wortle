import { useState } from "react";
import pokeball from "../img/logo.png";

const DataSources = ({ isSourcesModalOpen, setIsSourcesModalOpen }) => {
  // TODO - change to useCallback
  function handleCloseSources() {
    setIsSourcesModalOpen(false);
  }

  return (
    <div className={`modal ${isSourcesModalOpen ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Data Sources</p>
          <button className="delete" aria-label="close" onClick={handleCloseSources}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <div className="custom-source-div">
              <img className="custom-pokeball-bullet" src={pokeball} />
              <p className="has-text-white is-size-7-mobile">
                <span>Pokémon data and sprite images from </span>
                <a className="has-text-white is-underlined" href="https://pokeapi.co/" target="_blank">
                  PokéApi
                </a>
              </p>
            </div>
            <div className="custom-source-div">
              <img className="custom-pokeball-bullet" src={pokeball} />
              <p className="has-text-white is-size-7-mobile">
                <span>Professor Oak image from </span>
                <a
                  className="has-text-white is-underlined"
                  href="https://toppng.com/free-image/being-charismatic-and-popular-professor-oak-often-okido-pokemo-PNG-free-PNG-Images_217605"
                  target="_blank"
                >
                  topPNG
                </a>
              </p>
            </div>
            <div className="custom-source-div">
              <img className="custom-pokeball-bullet" src={pokeball} />
              <p className="has-text-white is-size-7-mobile">
                <span>SQWORDLE title font 'Eviolite' from </span>
                <a
                  className="has-text-white is-underlined"
                  href="https://www.fontspace.com/pixel-kitchen"
                  target="_blank"
                >
                  Pixel Kitchen
                </a>
              </p>
            </div>
            <div className="custom-source-div">
              <img className="custom-pokeball-bullet" src={pokeball} />
              <p className="has-text-white is-size-7-mobile">
                <span>Gym badge images by Lego Master BB at </span>
                <a
                  className="has-text-white is-underlined"
                  href="https://pokemon.fandom.com/wiki/File:Kanto_Gym_Badges_(Let%27s_Go).png"
                  target="_blank"
                >
                  Pokémon Wiki
                </a>
              </p>
            </div>
            <div className="custom-source-div">
              <img className="custom-pokeball-bullet" src={pokeball} />
              <p className="has-text-white is-size-7-mobile">
                <span>Pokéball image from </span>
                <a
                  className="has-text-white is-underlined"
                  href="https://www.kindpng.com/userpngs/5871/"
                  target="_blank"
                >
                  Maria Thompson
                </a>
                <span> at KindPNG.</span>
              </p>
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

export default DataSources;
