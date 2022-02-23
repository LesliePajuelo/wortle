const AnswerAttack = ({ answerAttack }) => {
  return (
    <div className={`notification container has-text-centered custom-answer-attack`}>
      <span>mystery pokémon attacked you with </span>
      <span className="is-uppercase">
        <strong>{answerAttack}</strong>{" "}
      </span>
    </div>
  );
};

export default AnswerAttack;
