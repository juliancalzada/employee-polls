import React, { Fragment } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "../utils/helpers";

const SignOut = ({ authedUser, dispatch, navigate }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
    navigate("/");
  };

  return (
    <Fragment>
      <div className="columns">
        <div className="column is-narrow">
          <figure>
            <img src={authedUser.avatarURL} alt={authedUser.name} />
          </figure>
        </div>
        <div className="column">
          <p className="title is-6">{authedUser.name}</p>
          <p className="subtitle is-7">
            <a href="/" onClick={handleSignOut}>
              sign out
            </a>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser: users[authedUser],
  };
};

export default withRouter(connect(mapStateToProps)(SignOut));
