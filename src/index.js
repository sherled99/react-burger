import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers';
import { socketMiddleware } from './services/middleware';
import { 
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSE
 } from './services/actions/feed';
import thunk from 'redux-thunk';

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

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsUrl, wsActions)));
const store = createStore(rootReducer, enhancer);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

reportWebVitals();