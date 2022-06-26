export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_VOTE = "SAVE_VOTE";

/**
 * Loads the questions database.
 * @param {object} questions The `questions` database
 * @returns {object}
 */
export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

/**
 * Records the user's vote on the current poll question.
 * @param {string} authedUser The id of the authorized user
 * @param {string} qid The id of the current poll question
 * @param {string} answer The id of the selected answer
 * @returns {object}
 */
export const saveVote = (authedUser, qid, answer) => {
  return {
    type: SAVE_VOTE,
    authedUser,
    qid,
    answer,
  };
};
