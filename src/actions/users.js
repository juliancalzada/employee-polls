export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER = "  SAVE_ANSWER";

/**
 * Loads the users database.
 * @param {object} users The `users` database
 * @returns {object}
 */
export const receiveUsers = (users) => {
  return { type: RECEIVE_USERS, users };
};

/**
 * Records the selected answer for the current poll question.
 * @param {string} userId The id of the authorized user
 * @param {string} questionId The id of the current poll question
 * @param {string} answerId The id of the selected answer
 * @returns {object}
 */
export const saveAnswer = (userId, questionId, answerId) => {
  return {
    type: SAVE_ANSWER,
    authedUser: userId,
    qid: questionId,
    answer: answerId,
  };
};
