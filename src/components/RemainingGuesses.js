import pokeball from "../img/pokeball.png";

const RemainingGuesses = ({ num }) => {
  return (
    <>
      <div className="custom-input mb-1">
        <input
          className="input"
          type="text"
          placeholder={`Guess #${num}`}
          disabled
          // value={guessInput}
          // onChange={handleGuessInput}
          // onKeyPress={handleEnterKey}
        />
        <button
          className={`button is-flex is-justify-content-center custom-start-btn`}
          disabled
          // onClick={handleGuess}
        >
          <img className="custom-pokeball" src={pokeball} />
          {/* <span>Guess</span> */}
        </button>
      </div>
      {/* <div className="control mb-1 custom-remaining-guess">
        <input
          className="input is-small has-text-centered custom-remaining-guess"
          type="text"
          placeholder={`Guess #${num}`}
          disabled
        />
      </div> */}
    </>
  );
};

export default RemainingGuesses;
