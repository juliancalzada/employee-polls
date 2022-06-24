import React from "react";
import { connect } from "react-redux";
import { withRouter } from "../utils/helpers";

const PollVote = ({ id, authedUser, users, question }) => {
  console.log(id, authedUser, users, question);
  const { name, avatarURL } = users[question.author];

  return (
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img src={avatarURL} alt={name} />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h6 className="my-0 has-text-centered">{name} asks</h6>
              <h3 className="my-0 mb-5 has-text-centered">
                Would you rather &hellip;
              </h3>
              <form className="form">
                <div class="columns is-centered">
                  <div class="column">
                    <div className="field">
                      <div className="control">
                        <input
                          id="option-one"
                          name="your-answer"
                          className="is-hidden"
                          type="radio"
                        />{" "}
                        <label htmlFor="option-one" className="box radio">
                          {question.optionOne.text}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div className="field">
                      <div className="control">
                        <input
                          id="option-two"
                          name="your-answer"
                          className="is-hidden"
                          type="radio"
                        />{" "}
                        <label htmlFor="option-two" className="box radio">
                          {question.optionTwo.text}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="button is-primary is-fullwidth">Vote</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  return { id, authedUser, users, question: questions[id] };
};

export default withRouter(connect(mapStateToProps)(PollVote));
