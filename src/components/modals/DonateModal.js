import donateImg from "../../img/donate-address.png";
import btcImg from "../../img/btc.png";

const DonateModal = ({ isOpen, handleClose }) => {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card custom-reveal-animation">
        <header className="modal-card-head">
          <img className="custom-btc-img" src={btcImg} />

          <p className="modal-card-title">Donate bitcoin</p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <p className="has-text-white is-size-7-mobile mb-2">Wallet Address:</p>
              <p className="custom-text-orange is-size-7-mobile mb-3">bc1q6lgj35smxtlpjfk88hxq5ykdge8urulqscth4t</p>
              <img className="custom-btc-qr mb-2" src={donateImg} />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};

export default DonateModal;
