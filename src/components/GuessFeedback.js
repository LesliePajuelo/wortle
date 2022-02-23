function GuessFeedback({ guess }) {
  return (
    <>
      <div className="columns is-mobile is-centered is-vcentered custom-guess-text">
        <div className="column pt-1 pb-1 has-text-centered custom-border is-3">
          <span className={`has-text-${guess.evolutionCheck}`}>{guess.name.toUpperCase()}</span>
        </div>

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border is-2">
          {guess.types.map((type, index) => {
            return (
              <span className={`has-text-${type.colour} custom-type-text`} key={index}>
                {type.type}
                {index < guess.types.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </div>

        <div className={`column pt-1 pb-1 has-text-${guess.numEvolutionCheck} has-text-centered custom-border`}>
          {guess.numEvolutions}
        </div>

        {/* <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{guess.numSharedMoves}%</div> */}

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.attackCheck}`}</div>
        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.defenseCheck}`}</div>

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.heightCheck}`}</div>

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.weightCheck}`}</div>
      </div>
    </>
  );
}

export default GuessFeedback;
