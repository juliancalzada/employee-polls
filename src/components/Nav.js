import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

const Nav = ({ authedUser }) => {
  const [open, setOpen] = useState(false);

  const handleBurger = () => {
    setOpen(!open);
  };

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <p className="navbar-item">Employee Polls</p>
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
        <div className="navbar-start">
          <div className="navbar-item">
            <Link to="/">Home</Link>
          </div>
          {authedUser && (
            <Fragment>
              <div className="navbar-item">
                <Link to="/leaderboard">Leaderboard</Link>
              </div>
              <div className="navbar-item">
                <Link to="/new">New</Link>
              </div>
            </Fragment>
          )}
        </div>
        <div className="navbar-end">
          {authedUser && (
            <div className="navbar-item">
              <SignOut />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser: users[authedUser],
});

export default connect(mapStateToProps)(Nav);
