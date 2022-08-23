import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { addUserData } from "../lib/firebaseFunctions";

import bulbasaurPNG from "../img/bulbasaur.png";
import charmanderPNG from "../img/charmander.png";
import squirtlePNG from "../img/squirtle.png";

const Signup = () => {
  const { signup, removeUserOnSignupError } = useAuth();
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [starter, setStarter] = useState("4");

  async function handleSubmitForm(e) {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setSignupError({ message: "Passwords do not match" });
      return setSignupLoading(false);
    }

    let data;

    try {
      data = await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(error.message);
      setSignupLoading(false);
      return setSignupError(error);
    }

    // delete user if writing stats to database fails
    try {
      await addUserData(data.user, starter);
      // await addUserData(data.fakeProperty, starter); // error example
      setSignupLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      removeUserOnSignupError(data.user);
      setSignupLoading(false);
      return setSignupError({ message: "Error creating account. Please try again." });
    }
  }

  return (
    <>
      <div className={`modal is-active`}>
        <div className="modal-background"></div>
        <div className="modal-card ">
          <header className="modal-card-head is-flex is-flex-direction-column is-justify-content-center is-align-items-center pt-3 pb-3">
            <p className="modal-card-title">Sign Up</p>
          </header>
          <section className="modal-card-body has-background-dark has-text-white">
            <div className="content">
              <p className="is-size-7">
                To make sure your existing stats get added to your account, make sure you are currently on the device
                that stores your data (the device you always use to play Sqwordle) before creating your account.
              </p>
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

                <div className="field">
                  <label htmlFor="passwordConfirmation" className="label has-text-white">
                    Password Confirmation
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      id="passwordConfirmation"
                      type="password"
                      name="passwordConfirmation"
                      ref={passwordConfirmationRef}
                      placeholder="at least 6 characters"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="starter" className="label has-text-white mb-0">
                    Choose a starter for your profile picture
                  </label>
                  <div className="control is-flex is-justify-content-center custom-signup-sprite-container">
                    <img
                      className={`custom-signup-sprite ${starter === "1" ? "custom-signup-sprite-starter" : ""}`}
                      src={bulbasaurPNG}
                      onClick={() => setStarter("1")}
                    />
                    <img
                      className={`custom-signup-sprite ${starter === "4" ? "custom-signup-sprite-starter" : ""}`}
                      src={charmanderPNG}
                      onClick={() => setStarter("4")}
                    />
                    <img
                      className={`custom-signup-sprite ${starter === "7" ? "custom-signup-sprite-starter" : ""}`}
                      src={squirtlePNG}
                      onClick={() => setStarter("7")}
                    />
                  </div>
                </div>

                {signupError && <div className="notification is-warning">{signupError.message}</div>}

                <div className="field">
                  <div className="control">
                    <button
                      className={`button is-link custom-submit-bug-btn is-fullwidth ${
                        signupLoading ? "is-loading" : ""
                      }`}
                      onClick={handleSubmitForm}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <footer className="modal-card-foot is-flex is-justify-content-center pt-2 pb-2">
            <div className="">
              Already have an account?
              <Link to="/login"> Log in</Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Signup;
