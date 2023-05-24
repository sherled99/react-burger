import {
    WS_USER_NAME_UPDATE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSE
  } from '../actions/feed';
  
  const initialState = {
    wsConnected: false,
    messages: []
  };
  
  export const wsReducer = (state = initialState, action) => {
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
      case WS_USER_NAME_UPDATE:
        return {
          ...state,
          user: action.payload
        };
  
      default:
        return state;
    }
  };