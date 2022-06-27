import React, { Fragment } from "react";
import { connect } from "react-redux";

const Leaderboard = ({ scoreboard }) => {
  return (
    <Fragment>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Leaderboard</h2>
      <div className="table-container">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th colSpan="2">User</th>
              <th className="has-text-centered">Answered</th>
              <th className="has-text-centered">Created</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map(({ id, name, avatarURL, questions, answers }) => {
              const totalAnswers = Object.keys(answers).length;
              return (
                <tr key={id}>
                  <td>
                    <figure className="image is-48x48">
                      <img src={avatarURL} alt={name} />
                    </figure>
                  </td>
                  <td>{name}</td>
                  <td className="has-text-centered">{totalAnswers}</td>
                  <td className="has-text-centered">{questions.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

/**
 * Maps the users to create a sorted list for the scoreboard.
 * @param {object} store.users The `users` slice of the store
 * @returns {object}
 */
const mapStateToProps = ({ users }) => {
  return {
    scoreboard: Object.values(users)
      .sort((a, b) => {
        // sort by questions created
        const la = Object.keys(a.questions).length;
        const lb = Object.keys(b.questions).length;
        return lb - la;
      })
      .sort((a, b) => {
        // sort by questions answered
        const la = Object.keys(a.answers).length;
        const lb = Object.keys(b.answers).length;
        return lb - la;
      }),
  };
};

export default connect(mapStateToProps)(Leaderboard);
