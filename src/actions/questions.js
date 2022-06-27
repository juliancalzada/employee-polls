export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_VOTE = "SAVE_VOTE";
export const ADD_QUESTION = "ADD_QUESTION";

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

/**
 * Adds a new question to the list.
 * @param {object} question The formatted question
 * @returns {object}
 */
export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};
