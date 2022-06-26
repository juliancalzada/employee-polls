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
              <th>User</th>
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
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img src={avatarURL} alt={name} />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-6">{name}</p>
                        <p className="subtitle is-7">{id}</p>
                      </div>
                    </div>
                  </td>
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
 * @param {object} param0
 * @returns {object}
 */
const mapStateToProps = ({ users }) => {
  return {
    scoreboard: Object.values(users)
      .sort((a, b) => {
        // sort by questions created
        const qa = Object.keys(a.questions).length;
        const qb = Object.keys(b.questions).length;
        return qb - qa;
      })
      .sort((a, b) => {
        // sort by questions answered
        const aa = Object.keys(a.answers).length;
        const ab = Object.keys(b.answers).length;
        return ab - aa;
      }),
  };
};

export default connect(mapStateToProps)(Leaderboard);
