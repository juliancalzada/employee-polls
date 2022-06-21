import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Question = ({ creator, question }) => {
  console.log(question);
  const inputOneId = question.id + "-optionOne";
  const inputTwoId = question.id + "-optionTwo";
  const groupId = question.id + "-group";

  return (
    <div className="column is-4">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={creator.avatar} alt={creator.name} />
              </figure>
            </div>
            <div className="media-content">
              <p class="title is-4">{creator.name}</p>
              <p class="subtitle is-6">@{creator.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const creator = {
    name: users[question.author].name,
    avatar: users[question.author].avatarURL,
    id: question.author,
  };

  return {
    authedUser,
    question,
    creator,
  };
};

export default connect(mapStateToProps)(Question);
