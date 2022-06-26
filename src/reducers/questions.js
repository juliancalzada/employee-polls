import { RECEIVE_QUESTIONS, SAVE_VOTE } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_VOTE:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: [action.authedUser].concat(state[action.qid][action.answer].votes),
          },
        },
      };

    default:
      return state;
  }
}
