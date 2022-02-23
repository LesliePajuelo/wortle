// import profOak from "../img/prof-oak-1.png";
// import profOak from "../img/prof-oak-2.jpg";
import profOak from "../img/prof-oak-3.png";
// import gameExample from "../img/game-example.jpg";
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
          <div className="content">
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
              After each guess, you are provided with feedback to show how close your guess was to the mystery Pokémon.
            </p>
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
                {/* <span>
                  . The mystery Pokémon is <span className="has-text-success">electric</span> Type like Raichu. The
                  mystery Pokémon has the same number of Pokémon in its Evolution Tree (EvT) as Raichu (
                  <span className="has-text-success">2</span>, i.e., Pikachu & Raichu). The mystery Pokémon has lower
                  Attack, Defense, Height, and Weight than Raichu.{" "}
                </span> */}
                <span>
                  . Raichu is <span className="has-text-warning-dark">yellow</span> to indicate that the mystery Pokémon
                  is in Raichu's Evolution Tree.
                </span>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={gameExamplePokedex} />
              </figure>
              <p>
                In addition, after each guess the pokédex will filter based on what you know about{" "}
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
            {/* <ul>
              <li>
                <span className="has-text-weight-bold">Pokémon</span> (name): turns
                <span className="has-text-warning-dark"> yellow</span> if your guess is in the same evolution family as
                the answer (e.g., you guess wartortle and the answer is squirtle).
              </li>
              <li>
                <span className="has-text-weight-bold">Type</span>: <span className="has-text-success">green</span> if
                your guess has the same primary or secondary type as the answer,{" "}
                <span className="has-text-danger">red</span> if it does not.
              </li>
              <li>
                <span className="has-text-weight-bold">#EV</span> (number of evolutions): the number of pokémon in your
                guesses evolution tree (e.g., squirtle = 3 for squirtle, wartortle, blastoise).
                <span className="has-text-success"> Green</span> if same as answer,
                <span className="has-text-danger"> red</span> if not.
              </li>
              <li>
                <span className="has-text-weight-bold">ATT/DEF/HT/WT</span> (Attack/Defense/Height/Weight): 🔺 means the
                ANSWER has a HIGHER stat than your guess. 🔻 means the ANSWER has a LOWER stat than your guess. ✅ means
                your guess has the same stat as the answer.
              </li>
            </ul>
            <p>
              The images in the pokedex gallery will fade to reflect what you know about{" "}
              <strong className="has-text-white">Type</strong> and <strong className="has-text-white">#EV</strong> in a
              Pokémon's evolution tree.
            </p>
            <p>
              <span>
                <strong className="has-text-white">Example</strong>
              </span>
              <span> (answer is Pikachu):</span>
            </p>

            <figure className="image custom-game-example">
              <img src={gameExample} />
            </figure> */}
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
