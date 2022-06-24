export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_VOTE = "SAVE_VOTE";

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};
