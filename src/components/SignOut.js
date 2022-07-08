import React, { Fragment } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const SignOut = ({ name, avatarURL, dispatch }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
  };

  return (
    <Fragment>
      <div className="columns is-mobile">
        <div className="column is-narrow">
          <figure>
            <img src={avatarURL} alt={name} />
          </figure>
        </div>
        <div className="column">
          <p className="title is-6">{name}</p>
          <p className="subtitle is-7">
            <button className="button is-small" onClick={handleSignOut}>
              sign out
            </button>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const { name, avatarURL } = users[authedUser];

  return {
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(SignOut);
