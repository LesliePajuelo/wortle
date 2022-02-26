const GameOver = ({ answer, win, lose, isAnimation }) => {
  return (
    <div
      className={`notification container has-text-centered custom-game-over ${
        isAnimation ? "custom-flip-animation" : ""
      }`}
    >
      {win && (
        <>
          <span className="is-uppercase">{answer.name} </span>
          <span>was caught!</span>
        </>
      )}
      {lose && (
        <>
          <span>You missed </span>
          <span className="is-uppercase">{answer.name}</span>
        </>
      )}
    </div>
  );
};

export default GameOver;
