import { Middleware } from 'redux';
import { RootState, AppDispatch } from '../types';

type wsActionsType = {
   wsInit: string; 
   wsSendMessage: string; 
   onOpen: string; 
   onClose: string; 
   onError: string; 
   onMessage: string; 
   wsClose: string; 
}

export const socketMiddleware = (wsUrl: string, wsActions: wsActionsType): Middleware<{}, RootState, AppDispatch> => {
  return store => {
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

    return next => action => {
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
