import React from "react";
import { connect } from "react-redux";
import PollView from "./PollView";

const Dashboard = ({ unansweredIds, answeredIds }) => {
  return (
    <div>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Dashboard</h2>
      <div className="columns">
        <div className="column">
          <h3 className="my-5 is-size-5 has-text-centered-mobile">
            New Questions
          </h3>
          <div className="columns is-desktop is-multiline">
            {unansweredIds.map((id) => (
              <PollView key={id} id={id} />
            ))}
          </div>
          <h3 className="my-5 is-size-5 has-text-centered-mobile">Done</h3>
          <div className="columns is-desktop is-multiline">
            {answeredIds.map((id) => (
              <PollView key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
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
