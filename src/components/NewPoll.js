import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../actions/shared";

const NewPoll = ({ name, avatarURL, dispatch }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const navigate = useNavigate();

  const handleCreatePoll = (e) => {
    e.preventDefault();
    dispatch(createPoll(optionOneText, optionTwoText));
    navigate("/");
  };

  return (
    <Fragment>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">New poll</h2>
      <div className="columns is-centered">
        <div className="column is-half is-one-quarter-fullhd">
          <div className="card">
            <div className="card-header">
              <p className="card-header-title">You want to ask</p>
            </div>
            <div className="card-image">
              <figure className="image is-square">
                <img src={avatarURL} alt={name} />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h3 className="is-size-5 mb-3">Would you rather &hellip;</h3>
                <form className="form">
                  <div className="field">
                    <label htmlFor="optionOne" className="label">
                      Option One
                    </label>
                    <textarea
                      id="optionOne"
                      className="textarea"
                      placeholder="Eat some ice cream"
                      value={optionOneText}
                      onChange={({ target }) => setOptionOneText(target.value)}
                    ></textarea>
                  </div>
                  <div className="field">
                    <label htmlFor="optionTwo" className="label">
                      Option Two
                    </label>
                    <textarea
                      id="optionTwo"
                      className="textarea"
                      placeholder="Eat some cake"
                      value={optionTwoText}
                      onChange={({ target }) => setOptionTwoText(target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="button is-primary is-fullwidth"
                    onClick={handleCreatePoll}
                    disabled={optionOneText === "" || optionTwoText === ""}
                  >
                    Create Poll
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    name: user.name,
    avatarURL: user.avatarURL,
  };
};

export default connect(mapStateToProps)(NewPoll);
