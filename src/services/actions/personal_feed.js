export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';
export const WS_USER_USER_NAME_UPDATE = 'WS_USER_USER_NAME_UPDATE';

export const SET_ORDER = "SET_ORDER"


export const wsUserConnectionSuccess = () => {
    return {
      type: WS_USER_CONNECTION_SUCCESS
    };
  };
  
  export const wsUserConnectionError = () => {
    return {
      type: WS_USER_CONNECTION_ERROR
    };
  };
  
  export const wsUserConnectionClosed = () => {
    return {
      type: WS_USER_CONNECTION_CLOSED
    };
  };
  
  export const wsUserGetMessage = message => {
    return {
      type: WS_USER_GET_MESSAGE,
      payload: message
    };
  };
  
  export const wsUserUserNameUpdate = userName => {
    return {
      type: WS_USER_USER_NAME_UPDATE,
      payload: userName
    };
  };

  export const setOrder = (order) => {
    return function(dispatch) {
      dispatch({
        type: SET_ORDER,
        order: order
      });
    };
  }