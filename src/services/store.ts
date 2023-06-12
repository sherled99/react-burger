import { applyMiddleware, createStore, Middleware  } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import { 
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_CLOSE
   } from './actions/feed';

import { compose } from 'redux';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsClose: WS_CONNECTION_CLOSE
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer: any = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions) as unknown as Middleware)
);


export const store = createStore(rootReducer, enhancer);