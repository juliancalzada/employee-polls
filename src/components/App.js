import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import "./App.scss";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import Leaderboard from "./Leaderboard";
import PollVote from "./PollVote";

function App({ loading, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return (
    <Fragment>
      <div className="container is-fluid">
        <Nav />

        {loading ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/new" element={<Dashboard />} />
            <Route path="/question/:id" element={<PollVote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
