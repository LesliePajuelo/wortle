const EvcModal = ({ isOpen, handleClose }) => {
  return (
    <>
      <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={handleClose}></div>
        <div className="card">
          <div className="card-content custom-evc-modal-content">
            <div className="content">
              <p className="subtitle">Evolution Chain (EvC)</p>
              <p>
                This is the TOTAL NUMBER of Pokémon in your guesses evolution chain. It does NOT represent the Pokémon's
                place within its evolution chain.
              </p>
              <p>
                If you guess Wartortle, the EvC will be 3 because there are 3 Pokémon in Wartortle's evolution chain
                (Sqwordle, Wartortle, Blastoise). This is the case, even though Wartortle is the second (#2) evolution
                in the chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvcModal;
