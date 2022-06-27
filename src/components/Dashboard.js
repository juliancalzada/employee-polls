import React, { Fragment } from "react";
import { connect } from "react-redux";
import StickyNote from "./StickyNote";

const Dashboard = ({ unanswered, completed }) => {
  return (
    <Fragment>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Dashboard</h2>
      <h3 className="my-5 is-size-5 has-text-centered-mobile">
        Unanswered Polls
      </h3>
      <div className="columns is-desktop is-multiline">
        {unanswered.map((id) => (
          <StickyNote key={id} id={id} />
        ))}
      </div>
      <h3 className="my-5 is-size-5 has-text-centered-mobile">
        Completed Polls
      </h3>
      <div className="columns is-desktop is-multiline">
        {completed.map((id) => (
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
  const completed = Object.keys(answers);

  // created a new array of question ids and sort them by date
  const unanswered = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(({ id }) => !completed.includes(id))
    .map(({ id }) => id);

  return {
    unanswered,
    completed,
  };
};

export default connect(mapStateToProps)(Dashboard);
