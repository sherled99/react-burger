export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_USER_NAME_UPDATE = "WS_USER_NAME_UPDATE";
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";

export interface WsConnectionStartAction {
  type: typeof WS_CONNECTION_START;
}

export interface WsConnectionSuccessAction {
  type: typeof WS_CONNECTION_SUCCESS;
  connection: string;
}

export interface WsConnectionErrorAction {
  type: typeof WS_CONNECTION_ERROR;
}

export interface WsConnectionClosedAction {
  type: typeof WS_CONNECTION_CLOSED;
}

export interface WsGetMessageAction {
  type: typeof WS_GET_MESSAGE;
  payload: string;
}

export interface WsSendMessageAction {
  type: typeof WS_SEND_MESSAGE;
  payload: string;
}

export interface WsUserNameUpdateAction {
  type: typeof WS_USER_NAME_UPDATE;
  payload: string;
}

export interface WsConnectionCloseAction {
  type: typeof WS_CONNECTION_CLOSE;
}

export type WsActionTypes =
  | WsConnectionStartAction
  | WsConnectionSuccessAction
  | WsConnectionErrorAction
  | WsConnectionClosedAction
  | WsGetMessageAction
  | WsSendMessageAction
  | WsUserNameUpdateAction
  | WsConnectionCloseAction;

export const wsConnectionSuccess = (
  connection: string
): WsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
    connection: connection,
  };
};

export const wsConnectionError = (): WsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): WsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: string): WsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message: string): WsSendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

export const wsUserNameUpdate = (message: string): WsUserNameUpdateAction => {
  return {
    type: WS_USER_NAME_UPDATE,
    payload: message,
  };
};

export const wsUserClose = (): WsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE,
  };
};
