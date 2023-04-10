import {createOrder} from '../../utils/burger-api'

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const SET_TAB = 'SET_TAB';

export function openModal(typeModal, burgerConfig) {
    return function(dispatch) {
      dispatch({
        type: OPEN_MODAL,
        burgerConfig: burgerConfig,
        typeModal: typeModal
      });
    };
  }

export function closeModal() {
  return function(dispatch) {
    dispatch({
      type: CLOSE_MODAL
    });
  };
}

export function setTab(tabCurrent){
  return function(dispatch) {
    dispatch({
      type: SET_TAB,
      tabCurrent: tabCurrent
    });
  };
}

export function addOrder(ids) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    createOrder(ids).then(res => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        data: res
      });
    })
    .catch(error => {
      dispatch({
          type: GET_ORDER_FAILED,
          error: error.message
      });
    });
  };
}