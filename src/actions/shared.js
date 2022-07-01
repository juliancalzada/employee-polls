import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { createQuestion, receiveUsers, saveAnswer } from "./users";
import { addQuestion, receiveQuestions, saveVote } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

/**
 * Loads the startup data need to launch the app.
 * @returns {function}
 */
export const handleInitialData = () => {
  return async (dispatch) => {
    // use the loading bar to provide feedback
    dispatch(showLoading());
    // call the api to get the data
    const { users, questions } = await getInitialData();
    // lets the users slice know the data has been received
    dispatch(receiveUsers(users));
    // lets the questions slice know the data has been received
    dispatch(receiveQuestions(questions));
    // hide loading bar
    dispatch(hideLoading());
  };
};

/**
 * Updates the store to record the user's vote for the current poll question.
 * @param {string} questionId The id for the poll question
 * @param {string} answerId The id for the selected answer
 * @returns {function}
 */
export const handleSaveQuestionAnswer = (questionId, answerId) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    // use the loading bar to provide feedback
    dispatch(showLoading());
    // let the users slice know there is a new answer to record
    dispatch(saveAnswer(authedUser, questionId, answerId));
    // let the questions slice know there is a new vote to record
    dispatch(saveVote(authedUser, questionId, answerId));
    // hide loading bar
    dispatch(hideLoading());
    // update the data
    // TODO: should have error handling? the api always returns `true` but is that for learning purposes?
    return saveQuestionAnswer(authedUser, questionId, answerId);
  };
};

/**
 * Saves a user-created poll.
 * @param {string} optionOneText The text for the first option
 * @param {string} optionTwoText The text for the second option
 * @returns {function}
 */
export const createPoll = (optionOneText, optionTwoText) => {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    // use the loading bar to provide feedback
    dispatch(showLoading());
    try {
      const question = await saveQuestion({
        author: authedUser,
        optionOneText,
        optionTwoText,
      });
      dispatch(createQuestion(question));
      dispatch(addQuestion(question));
    } catch (e) {
      console.error("An error occurred with [createPoll]: ", e);
    }
    // hide loading bar
    dispatch(hideLoading());
  };
};
