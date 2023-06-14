import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSE
} from '../actions/feed';
import { IMessages, IUser } from '../types/data';
import { WsActionTypes } from '../actions/feed';


interface FeedState {
  wsConnected: boolean;
  messages: Array<IMessages>;
  user?: IUser;
}

const initialState: FeedState = {
  wsConnected: false,
  messages: [],
  user: {
    email: "",
    name: ""
  }
};

export const wsReducer = (state = initialState, action: WsActionTypes): FeedState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        messages: [],
        wsConnected: false
      };

    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        messages: [],
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
      };

    default:
      return state;
  }
};