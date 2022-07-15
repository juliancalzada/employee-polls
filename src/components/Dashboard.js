import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import StickyNote from "./StickyNote";

const Dashboard = ({ unanswered, completed, all }) => {
  const ALL = "All";
  const COMPLETED = "Completed";
  const UNANSWERED = "Unanswered";
  const [viewState, setViewState] = useState(UNANSWERED);

  let title = UNANSWERED;
  let list = unanswered;

  switch (viewState) {
    default:
    case UNANSWERED:
      title = UNANSWERED;
      list = unanswered;
      break;

    case COMPLETED:
      title = COMPLETED;
      list = completed;
      break;

    case ALL:
      title = ALL;
      list = all;
      break;
  }

  const handleChangeView = (e) => {
    e.preventDefault();
    const { target } = e;
    setViewState(target.value);
  };

  return (
    <Fragment>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Dashboard</h2>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="buttons has-addons">
              <button
                className={`button${
                  viewState === UNANSWERED ? " is-info is-selected" : ""
                }`}
                onClick={handleChangeView}
                value={UNANSWERED}
              >
                {UNANSWERED} Polls
              </button>
              <button
                className={`button${
                  viewState === COMPLETED ? " is-info is-selected" : ""
                }`}
                onClick={handleChangeView}
                value={COMPLETED}
              >
                {COMPLETED} Polls
              </button>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="buttons has-addons">
              <button
                className={`button${
                  viewState === ALL ? " is-info is-selected" : ""
                }`}
                onClick={handleChangeView}
                value={ALL}
              >
                {ALL} Polls
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="my-5 is-size-5 has-text-centered-mobile">{title} Polls</h3>
      <div className="columns is-desktop is-multiline">
        {list.map((id) => (
          <StickyNote key={id} id={id} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  // gets the answers the user has completed
  const { answers } = users[authedUser];

  // create a new array of answer ids
  const completed = Object.keys(answers)
    .map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ id }) => id);

  // created a new array of question ids and sort them by date
  const unanswered = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(({ id }) => !completed.includes(id))
    .map(({ id }) => id);

  const all = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ id }) => id);

  return {
    unanswered,
    completed,
    all,
  };
};

export default connect(mapStateToProps)(Dashboard);
