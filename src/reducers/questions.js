import { RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, action) {

  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    // case SAVE_QUESTION_ANSWER:
    //   return {
    //     ...state,
    //     users: {
    //       ...state.users,
    //       [action.authedUser]: {
    //         ...state.users[action.authedUser],
    //         answers: {
    //           ...state.users[action.authedUser].answer,
    //           [action.qid]: action.answer,
    //         },
    //       },
    //     },
    //   };

    default:
      return state;
  }
}
