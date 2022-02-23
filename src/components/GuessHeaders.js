function GuessHeaders() {
  return (
    <>
      <div className="columns is-mobile is-centered is-vcentered custom-guess-text">
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase is-3">
          Pokémon
        </div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase is-2">
          Type
        </div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">
          E<span className="is-lowercase">v</span>T
        </div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Att</div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Def</div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Ht</div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Wt</div>
      </div>
    </>
  );
}

export default GuessHeaders;
