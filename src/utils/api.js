import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()])
    .then(([users, questions]) => ({
      users,
      questions,
    }))
    .catch((e) => {
      console.error("An error occurred with [getInitialData]: ", e);
    });
};

export const saveQuestion = (question) => {
  return _saveQuestion(question).catch((e) => {
    console.error("An error occurred with [saveQuestion]: ", e);
  });
};

export const saveQuestionAnswer = (authedUser, qid, answer) => {
  return _saveQuestionAnswer({ authedUser, qid, answer }).catch((e) => {
    console.error("An error occurred with [saveQuestionAnswer]: ", e);
  });
};
