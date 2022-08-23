import { useState, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import missingnoPNG from "../img/missingno.png";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef();

  async function handleSubmitForm(e) {
    e.preventDefault();
    setSuccessMessage("");
    setError("");
    setLoading(true);

    try {
      await resetPassword(emailRef.current.value);
      setSuccessMessage("Check your inbox for further instructions. The email may end up in your spam folder.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  return (
    <>
      <div className={`modal is-active`}>
        <div className="modal-background"></div>
        <div className="modal-card ">
          <header className="modal-card-head is-flex is-justify-content-center">
            <div className="is-flex is-align-items-center">
              <img className="custom-forgot-password-sprite" src={missingnoPNG} />
              <p className="modal-card-title">Password Reset</p>
            </div>
          </header>
          <section className="modal-card-body has-background-dark has-text-white">
            <div className="content">
              <form name="submit-bug-report" action="/?success=true" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="submit-bug-report" />
                <div className="field">
                  <label htmlFor="email" className="label has-text-white">
                    Email
                  </label>
                  <div className="control has-icons-right">
                    <input className="input" id="email" type="email" name="email" ref={emailRef} placeholder="" />
                  </div>
                </div>

                {error && <div className="notification is-warning">{error.message}</div>}
                {successMessage && <div className="notification is-success">{successMessage}</div>}

                <div className="field mt-5 mb-3">
                  <div className="control">
                    <button
                      className={`button is-link custom-submit-bug-btn is-fullwidth ${loading ? "is-loading" : ""}`}
                      onClick={handleSubmitForm}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
              <div className="has-text-centered">
                <Link className="has-text-white is-underlined" to="/login">
                  Log In
                </Link>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot is-flex is-justify-content-center">
            <div>
              Need an account?
              <Link to="/signup"> Sign Up</Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
