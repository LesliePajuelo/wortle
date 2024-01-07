import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function GuessHeaders({ setIsEvcModalOpen }) {
  return (
    <>
      <div className="columns is-mobile is-centered is-vcentered custom-guess-text">
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase is-3">
          Pokémon
        </div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase is-2 is-3-mobile">
          Type
        </div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered custom-cursor is-2-mobile">
          <span>EvC</span>
          <span>
            <FontAwesomeIcon
              className="fas fa-lg fa-solid custom-evc-info-icon"
              icon={faInfoCircle}
              onClick={() => setIsEvcModalOpen(true)}
            />
          </span>
        </div>
        {/* <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Att</div> */}
        {/* <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Def</div> */}
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Ht</div>
        <div className="column pt-1 pb-1 has-text-black has-text-weight-bold has-text-centered is-uppercase">Wt</div>
      </div>
    </>
  );
}

export default GuessHeaders;
