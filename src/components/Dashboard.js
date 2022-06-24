import React, { Fragment } from "react";
import { connect } from "react-redux";
import StickyNote from "./StickyNote";

const Dashboard = ({ unansweredIds, answeredIds }) => {
  return (
    <Fragment>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Dashboard</h2>
      <h3 className="my-5 is-size-5 has-text-centered-mobile">
        Unanswered Polls
      </h3>
      <div className="columns is-desktop is-multiline">
        {unansweredIds.map((id) => (
          <StickyNote key={id} id={id} />
        ))}
      </div>
      <h3 className="my-5 is-size-5 has-text-centered-mobile">
        Completed Polls
      </h3>
      <div className="columns is-desktop is-multiline">
        {answeredIds.map((id) => (
          <StickyNote key={id} id={id} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, questions }) => {
  const questionsList = Object.values(questions).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const unansweredQuestions = questionsList.filter(
    ({ optionOne, optionTwo }) => {
      const votes = [...optionOne.votes, ...optionTwo.votes];
      return !votes.includes(authedUser.id);
    }
  );

  const answeredQuestions = questionsList.filter(({ optionOne, optionTwo }) => {
    const votes = [...optionOne.votes, ...optionTwo.votes];
    return votes.includes(authedUser.id);
  });

  const getIds = (list) => {
    return list.map(({ id }) => id);
  };

  return {
    unansweredIds: getIds(unansweredQuestions),
    answeredIds: getIds(answeredQuestions),
  };
};

export default connect(mapStateToProps)(Dashboard);
