import { JOIN_CHAT, JOIN_CHAT_FAILED, JOIN_CHAT_SUCCESS } from '../actions/auth';

const initialState = {
  joinRequest: false,
  joinFailed: false,
  user: undefined
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_CHAT:
      return {
        ...state,
        joinFailed: false,
        joinRequest: true
      };

    case JOIN_CHAT_FAILED:
      return {
        ...state,
        joinFailed: true,
        joinRequest: false
      };

    case JOIN_CHAT_SUCCESS:
      return {
        ...state,
        user: action.user,
        joinRequest: false
      };

    default:
      return state;
  }
};