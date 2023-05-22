import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
      let socket = null;

      return next => action => {
        const { dispatch } = store;
        const { type, connection } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
        if (type === wsInit) {
          if (connection === "/feed"){
            socket = new WebSocket(`${wsUrl}/all`);
          } else {
            const accessToken = getCookie("accessToken");
            const token = accessToken.split("Bearer ")[1];
            socket = new WebSocket(`${wsUrl}?token=${token}`);
          }
        }
        else if (type === wsClose){
          socket.close();
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onMessage, payload: restParsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
        }

        next(action);
      };
    };
  };