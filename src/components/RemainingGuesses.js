import pokeball from "../img/pokeball.png";

const RemainingGuesses = ({ num }) => {
  return (
    <>
      <div className="custom-input mb-1">
        <input className="input" type="text" placeholder={`Guess #${num}`} disabled />
        <button className={`button is-flex is-justify-content-center custom-start-btn`} disabled>
          <img className="custom-pokeball" src={pokeball} />
        </button>
      </div>
    </>
  );
};

export default RemainingGuesses;
