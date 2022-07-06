import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const StickyNote = ({ id, name, avatarURL, timestamp }) => {
  return (
    <div className="column is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={avatarURL} alt={name} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-6">{name}</p>
              <p className="subtitle is-7">{formatDate(timestamp)}</p>
            </div>
          </div>
          <Link
            data-testid="show-button"
            to={`/questions/${id}`}
            className="button is-primary is-rounded is-fullwidth"
          >
            Show
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id];

  return {
    id,
    name: users[question.author].name,
    avatarURL: users[question.author].avatarURL,
    timestamp: question.timestamp,
  };
};

export default connect(mapStateToProps)(StickyNote);
