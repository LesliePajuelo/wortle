import bugCatcherPNG from "../../../img/bug-catcher.png";
import weedlePNG from "../../../img/weedle.png";

const BugReportSuccessMessage = () => {
  return (
    <div className={`modal is-active`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <img className="pr-2" src={weedlePNG} />
          <p className="modal-card-title">Bug Report</p>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
              <img src={bugCatcherPNG} alt="picture of a bug catcher sprite" />
              <p className="mt-2 mb-1">Thanks Bug Catcher!</p>
              <p className="">Your report was successfully submitted.</p>
              <a className="has-text-white is-underlined" href="https://wortle.envirotechie.com/">
                Return to WORTLE
              </a>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};

export default BugReportSuccessMessage;
