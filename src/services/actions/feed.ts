import { IUser, IMessages } from "../types/data";
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_USER_NAME_UPDATE: "WS_USER_NAME_UPDATE" = "WS_USER_NAME_UPDATE";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";

export interface WsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface WsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly connection?: string;
}

export interface WsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface WsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface WsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IMessages;
}

export interface WsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}

export interface WsUserNameUpdateAction {
  readonly type: typeof WS_USER_NAME_UPDATE;
  readonly payload: string;
  readonly user: IUser;
}

export interface WsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
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
): WsConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS,
    connection: connection
  });

export const wsConnectionError = (): WsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR
});

export const wsConnectionClosed = (): WsConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED,
  });

export const wsGetMessage = (message: IMessages): WsGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload: message
});

export const wsSendMessage = (message: string): WsSendMessageAction => ({
    type: WS_SEND_MESSAGE,
    payload: message,
  });

export const wsUserNameUpdate = (message: string, user: IUser): WsUserNameUpdateAction => ({
    type: WS_USER_NAME_UPDATE,
    payload: message,
    user: user
  });

export const wsUserClose = (): WsConnectionCloseAction => ({
    type: WS_CONNECTION_CLOSE,
});
