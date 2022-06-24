import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Login = ({ users, dispatch }) => {
  const [usernameText, setUsernameText] = useState("zoshikanlu");
  const [passwordText, setPasswordText] = useState("pass246");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleUsername = ({ target }) => {
    setHasError(false);
    setUsernameText(target.value);
  };

  const handlePassword = ({ target }) => {
    setHasError(false);
    setPasswordText(target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const authedUser = users[usernameText];

    if (authedUser) {
      const { id, password } = authedUser;

      if (id === usernameText && password === passwordText) {
        setHasError(false);
        dispatch(setAuthedUser(authedUser.id));
        navigate("/");
      }
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="has-text-centered">
      <div className="columns is-centered">
        <div className="column is-two-fifths">
          <h2 className="is-size-2 my-5">Login</h2>

          <p>
            <FontAwesomeIcon
              className="my-5"
              icon={solid("user-lock")}
              size="10x"
            />
          </p>

          {hasError && (
            <article className="message is-danger">
              <div className="message-body has-text-left">
                <p>
                  The username and password do not match any accounts on record.
                </p>
              </div>
            </article>
          )}

          <form className="my-5">
            <div className="field">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                value={usernameText}
                onChange={handleUsername}
                type="text"
                className={"input" + (hasError ? " is-danger" : "")}
              />
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                value={passwordText}
                onChange={handlePassword}
                type="password"
                className={"input" + (hasError ? " is-danger" : "")}
              />
            </div>

            <button className="button is-primary" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Login);
