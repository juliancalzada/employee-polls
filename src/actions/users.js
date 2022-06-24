import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_QUESTION_ANSWER = "  SAVE_QUESTION_ANSWER";

export const receiveUsers = (users) => {
  return { type: RECEIVE_USERS, users };
};

const saveAnswer = (userId, questionId, answerId) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser: userId,
    qid: questionId,
    answer: answerId,
  };
};

export const handleSaveVote = (questionId, answerId) => {
  return (dispatch, getState) => {
    const { id } = getState().authedUser;

    return saveQuestionAnswer(id, questionId, answerId)
      .then((successful) => {
        if (successful) dispatch(saveAnswer(id, questionId, answerId));
      })
      .catch((e) => console.error(e));
  };
};
