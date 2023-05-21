import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
      let socket = null;
      let usrSocket = null;

      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsUsrInit, onUsrOpen, onUsrClose, onUsrError, onUsrMessage } = wsActions;
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}/all`);
        }
        if (type === wsUsrInit) {
          const accessToken = getCookie("accessToken");
          const token = accessToken.split("Bearer ")[1];
          usrSocket = new WebSocket(`${wsUrl}?token=${token}`);
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

        if (usrSocket){
          
          usrSocket.onopen = event => {
            dispatch({ type: onUsrOpen, payload: event });
          };
  
          usrSocket.onerror = event => {
            dispatch({ type: onUsrError, payload: event });
          };
  
          usrSocket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onUsrMessage, payload: restParsedData });
          };
  
          usrSocket.onclose = event => {
            dispatch({ type: onUsrClose, payload: event });
          };
        }
  
        next(action);
      };
    };
  };