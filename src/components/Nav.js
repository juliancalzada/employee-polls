import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, dispatch }) => {
  const [open, setOpen] = useState(false);

  const handleBurger = () => {
    setOpen(!open);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <p className="navbar-item">Emoployee Polls</p>
        <button
          className={"navbar-burger" + (open ? " is-active" : "")}
          aria-label="menu"
          aria-expanded="false"
          data-target="main-navbar"
          onClick={handleBurger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div
        id="main-navbar"
        className={"navbar-menu" + (open ? " is-active" : "")}
      >
        {authedUser && (
          <div className="navbar-start">
            <div className="navbar-item">
              <Link to="/">Home</Link>
            </div>
            <div className="navbar-item">
              <Link to="/leaderboard">Leaderboard</Link>
            </div>
            <div className="navbar-item">
              <Link to="/new">New</Link>
            </div>
          </div>
        )}
        <div className="navbar-end">
          {authedUser && (
            <div className="navbar-item">
              <div class="columns">
                <div className="column is-narrow">
                  <figure>
                    <img src={authedUser.avatarURL} alt={authedUser.name} />
                  </figure>
                </div>
                <div class="column">
                  <p className="title is-6">{authedUser.name}</p>
                  <p className="subtitle is-7">
                    <a href="/" onClick={handleSignOut}>
                      sign out
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(Nav);
