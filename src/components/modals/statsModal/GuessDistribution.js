const GuessDistribution = ({ guess, maxGuesses, guessFeedback, win }) => {
  const [key, value] = guess;

  return (
    <>
      <div className="custom-dist-guess-container">
        <span>{key}</span>
        <div
          style={{ width: `${maxGuesses ? 10 + 90 * (value / maxGuesses) : 10}%` }}
          className={`custom-dist-bar ${
            parseInt(key) === guessFeedback.length && win ? "custom-dist-bar-current" : ""
          }`}
        >
          {value}
        </div>
      </div>
    </>
  );
};

export default GuessDistribution;
