import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import "./App.scss";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App({ authedUser, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return (
    <div className="container">
      <h1 className="my-5 is-size-1 has-text-centered">Employee Polls</h1>
      {authedUser === null ? <Login /> : <Dashboard />}
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser,
});

export default connect(mapStateToProps)(App);
