import profOak from "../img/prof-oak-3.png";
import gameExamplePikachuMagnemite from "../img/game-example-pikachu-magnemite.jpg";
import gameExamplePikachuRaichu from "../img/game-example-pikachu-raichu.jpg";
import gameExamplePokedex from "../img/game-example-pokedex-cropped.jpg";

const InstructionsModal = ({ isInfoModalOpen, setIsInfoModalOpen }) => {
  function handleCloseInfo() {
    setIsInfoModalOpen(false);
  }
  return (
    <div className={`modal ${isInfoModalOpen ? "is-active" : ""} custom-info-modal`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head custom-info-modal-header">
          <img className="custom-prof-oak" src={profOak} />
          <div>
            <p className="modal-card-title custom-info-title">Hello there! Welcome to the world of SQWORDLE!</p>
          </div>
          <button className="delete custom-delete-button" aria-label="close" onClick={handleCloseInfo}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content custom-intruction-text">
            <p>
              Guess the mystery <strong className="has-text-white is-uppercase">Pokémon</strong> in six tries.
            </p>
            <p>
              <span>Each guess must be a valid </span>
              <a
                className="is-underlined has-text-white"
                href="https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon"
                target="_blank"
              >
                Gen 1
              </a>
              <span> Pokémon.</span>
            </p>
            <p>
              After each guess, you are provided with feedback to show how close your guess is to the mystery Pokémon.
            </p>
            <p>Ready for a challenge? Try 'Gym Leader' or 'Elite Four' mode, available in settings.</p>
            <div className="instructions-example-div">
              <p>
                <span className="has-text-weight-bold">Examples</span>
                <span> (mystery Pokémon is Pikachu)</span>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={gameExamplePikachuMagnemite} />
              </figure>
              <p>
                <span>You guessed </span>
                <span className="has-text-weight-bold">Magnemite</span>
                <span>
                  . The mystery Pokémon is <span className="has-text-success">electric</span> Type like Magnemite, but
                  is not <span className="has-text-danger">steel</span> Type. The mystery Pokémon has the same number of
                  Pokémon in its Evolution Tree (EvT) as Magnemite (<span className="has-text-success">2</span>, i.e.,
                  Magnemite & Magneton). The mystery Pokémon has higher Attack, lower Defense, and greater Height than
                  Magnemite, but has the same Weight.
                </span>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={gameExamplePikachuRaichu} />
              </figure>
              <p>
                <span>You guessed </span>
                <span className="has-text-weight-bold">Raichu</span>
                <span>
                  . Raichu is <span className="has-text-warning-dark">yellow</span> to indicate that the mystery Pokémon
                  is in Raichu's Evolution Tree.
                </span>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={gameExamplePokedex} />
              </figure>
              <p>
                After each guess the pokédex will filter based on what you know about{" "}
                <span className="has-text-weight-bold">Type</span> and{" "}
                <span className="has-text-weight-bold">Evolution Tree (EvT)</span>, and the mystery Pokémon will attack
                you.
              </p>
              <p>
                In the above example, all <span className="has-text-weight-bold">water</span> Type Pokémon and Pokémon
                with an Evolution Tree (EvT) of <span className="has-text-weight-bold">3</span> are greyed out. The
                mystery Pokémon attacked you with <span className="has-text-weight-bold is-uppercase">thunder</span>,
                giving you a clue to who the mystery Pokémon is!
              </p>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot pt-3 pb-3">
          <p className="has-text-weight-bold">New SQWORDLE available every day!</p>
        </footer>
      </div>
    </div>
  );
};

export default InstructionsModal;
