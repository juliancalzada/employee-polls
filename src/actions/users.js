export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const CREATE_QUESTION = "CREATE_QUESTION";

/**
 * Loads the users database.
 * @param {object} users The `users` database return by the api
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

/**
 * Creates a new poll question.
 * @param {object} question The formatted question returned by the api
 * @param {string} question.id The unique id generated for the new question
 * @param {object} question.author The creator of the new question
 * @returns
 */
export const createQuestion = ({ id, author }) => {
  return {
    type: CREATE_QUESTION,
    id,
    author,
  };
};
