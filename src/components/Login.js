import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import pikachuPNG from "../img/pikachu.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmitForm(e) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setLoginLoading(false);
      navigate("/");
    } catch (error) {
      setLoginLoading(false);
      setLoginError(error);
    }
  }

  return (
    <>
      <div className={`modal is-active`}>
        <div className="modal-background"></div>
        <div className="modal-card ">
          <header className="modal-card-head is-flex is-justify-content-center">
            <div className="is-flex is-align-items-center ">
              <p className="modal-card-title">Login</p>
              <img className="custom-login-sprite" src={pikachuPNG} />
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

                <div className="field">
                  <label htmlFor="password" className="label has-text-white">
                    Password
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      id="password"
                      type="password"
                      name="password"
                      ref={passwordRef}
                      placeholder="at least 6 characters"
                    />
                  </div>
                </div>

                {loginError && <div className="notification is-warning">{loginError.message}</div>}

                <div className="field mt-5 mb-3">
                  <div className="control">
                    <button
                      className={`button is-link custom-submit-bug-btn is-fullwidth ${
                        loginLoading ? "is-loading" : ""
                      }`}
                      onClick={handleSubmitForm}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </form>
              <div className="has-text-centered">
                <Link className="has-text-white is-underlined" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot d-flex is-justify-content-center">
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

export default Login;
