import React from "react";
import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div>
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Leaderboard</h2>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>User</th>
            <th className="has-text-centered">Answered</th>
            <th className="has-text-centered">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, avatarURL, questions, answers }) => {
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
  );
};

const mapStateToProps = ({ users }) => {
  const sortedList = Object.values(users).sort((a, b) => {
    const ta = Object.keys(a.answers).length;
    const tb = Object.keys(b.answers).length;
    return tb - ta;
  });
  return { users: sortedList };
};

export default connect(mapStateToProps)(Leaderboard);
