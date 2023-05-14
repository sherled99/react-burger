import { combineReducers } from 'redux';
import {burgerReducer} from './burger';
import { authReducer } from './auth';
import {OPEN_MODAL, CLOSE_MODAL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, SET_TAB} from '../actions/index';

const initialState = {
    isOpen: false,
    typeModal: null,

    order: {},
    orderRequest: false,
    orderFailed: false,
    error: null,

    tabCurrent: "rolls",
    burgerConfig: {}
};

export const initialReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_MODAL: {
        return {
          ...state,
          isOpen: true,
          burgerConfig: action.burgerConfig,
          typeModal: action.typeModal
        };
      }
      case CLOSE_MODAL: {
        return {
          ...state,
          isOpen: false,
          burgerConfig: null,
          typeModal: null
        };
      }
      case GET_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true
        };
      }
      case GET_ORDER_SUCCESS: {
        return { ...state, 
          orderRequest: false, 
          orderFailed: false, 
          order: {
            ...initialState.order,
            name: action.data.name,
            number: action.data.order.number
          } 
        };
      }
      case GET_ORDER_FAILED: {
        return { ...state, orderFailed: true, orderRequest: false, error: action.error, order: {} };
      }
      case SET_TAB: {
        return { ...state, tabCurrent: action.tabCurrent};
      }
      default: {
        return state;
      }
    }
};


export const rootReducer = combineReducers({
    initialReducer: initialReducer,
    burgerState: burgerReducer,
    authReducer: authReducer
});