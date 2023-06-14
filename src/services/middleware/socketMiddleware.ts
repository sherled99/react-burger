import { Middleware } from "redux";
import { RootState, AppDispatch } from "../types";
import { WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSE } from "../actions/feed";

type wsActionsType = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
  wsClose: typeof WS_CONNECTION_CLOSE;
};

export const socketMiddleware = (
  wsUrl: string,
  wsActions: wsActionsType
): Middleware<{}, RootState, AppDispatch> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { dispatch } = store;
    const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

    const createSocket = (url: string) => {
      socket = new WebSocket(url);

      socket.onopen = (event: Event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event: Event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event: MessageEvent) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch({ type: onMessage, payload: restParsedData });
      };

      socket.onclose = (event: Event) => {
        dispatch({ type: onClose, payload: event });
      };
    };

    return (next) => (action) => {
      const { type, payload } = action;

      if (type === wsInit) {
        if (socket) {
          socket.close();
        }
        createSocket(`${wsUrl}${payload}`);
      } else if (type === wsClose && socket) {
        socket.close();
      }

      return next(action);
    };
  };
};
