const GuessDistribution = ({ guess, maxGuesses, guessFeedback, win }) => {
  // console.log(guess);

  const [key, value] = guess;
  // console.log(guess);
  return (
    <>
      <div className="custom-dist-guess-container">
        <span className="custom-dist-guess-num">{key}</span>
        <div
          style={{ width: `${10 + 90 * (value / maxGuesses)}%` }}
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
