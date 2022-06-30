import React, { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import { withRouter } from "../utils/helpers";

const Poll = (props) => {
  // console.table(props);
  const {
    id,
    name,
    avatarURL,
    optionOne,
    optionTwo,
    completed,
    selected,
    optionOneVotes,
    optionTwoVotes,
    dispatch,
  } = props;
  const [answer, setAnswer] = useState(selected);
  const [OPTION_ONE, OPTION_TWO] = ["optionOne", "optionTwo"];
  const total = optionOneVotes + optionTwoVotes;
  const optionOnePercent = Math.round(100 * (optionOneVotes / total));
  const optionTwoPercent = Math.round(100 * (optionTwoVotes / total));

  const handleOptionChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleVote = (e) => {
    e.preventDefault();
    dispatch(handleSaveQuestionAnswer(id, answer));
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half is-one-quarter-fullhd">
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img src={avatarURL} alt={name} />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <h6 className="my-0 has-text-centered">{name} asks</h6>
              <h3 className="my-0 mb-5 has-text-centered">
                Would you rather &hellip;
              </h3>
              <form className="form">
                <div className="field">
                  <div className="control">
                    <input
                      id="option-one"
                      name="your-answer"
                      className="is-hidden"
                      type="radio"
                      checked={answer === OPTION_ONE}
                      disabled={completed}
                      value={OPTION_ONE}
                      onChange={handleOptionChange}
                    />{" "}
                    <label
                      htmlFor="option-one"
                      className="box radio is-fullwidth"
                    >
                      {optionOne}
                      {completed && (
                        <div className="columns mt-1 is-mobile is-justify-content-space-between">
                          <div className="column">
                            <div className="tags has-addons">
                              <span className="tag is-dark">Votes</span>
                              <span
                                className={
                                  "tag" +
                                  (optionOneVotes >= optionTwoVotes
                                    ? " is-success"
                                    : " is-danger")
                                }
                              >
                                {optionOneVotes}
                              </span>
                            </div>
                          </div>
                          <div className="column is-narrow">
                            <div className="tags has-addons">
                              <span
                                className={
                                  "tag" +
                                  (optionOneVotes >= optionTwoVotes
                                    ? " is-success"
                                    : " is-danger")
                                }
                              >
                                {optionOnePercent}
                              </span>
                              <span className="tag is-dark">%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      id="option-two"
                      name="your-answer"
                      className="is-hidden"
                      type="radio"
                      checked={answer === OPTION_TWO}
                      disabled={completed}
                      value={OPTION_TWO}
                      onChange={handleOptionChange}
                    />{" "}
                    <label
                      htmlFor="option-two"
                      className="box radio is-fullwidth"
                    >
                      {optionTwo}
                      {completed && (
                        <div className="columns mt-1 is-mobile is-justify-content-space-between">
                          <div className="column">
                            <div className="tags has-addons">
                              <span className="tag is-dark">Votes</span>
                              <span
                                className={
                                  "tag" +
                                  (optionOneVotes <= optionTwoVotes
                                    ? " is-success"
                                    : " is-danger")
                                }
                              >
                                {optionTwoVotes}
                              </span>
                            </div>
                          </div>
                          <div className="column is-narrow">
                            <div className="tags has-addons">
                              <span
                                className={
                                  "tag" +
                                  (optionOneVotes <= optionTwoVotes
                                    ? " is-success"
                                    : " is-danger")
                                }
                              >
                                {optionTwoPercent}
                              </span>
                              <span className="tag is-dark">%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                {!completed && (
                  <button
                    className="button is-primary is-fullwidth"
                    disabled={answer === ""}
                    onClick={handleVote}
                  >
                    Vote
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { router }) => {
  const { id } = router.params;
  const user = users[authedUser];
  const question = questions[id];
  const answers = Object.keys(user.answers);
  const selected = user.answers[id] || "";
  const { optionOne, optionTwo } = question;
  const { name, avatarURL } = users[question.author];

  return {
    id,
    avatarURL,
    completed: answers.includes(id),
    name,
    optionOne: optionOne.text,
    optionOneVotes: optionOne.votes.length,
    optionTwo: optionTwo.text,
    optionTwoVotes: optionTwo.votes.length,
    selected,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));
