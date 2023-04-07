import {getAllIngridients} from '../../utils/burger-api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_TO_BURGER_CONSTRUCTOR = 'ADD_TO_BURGER_CONSTRUCTOR';
export const CLEAR_BURGER_CONSTRUCTOR = 'CLEAR_BURGER_CONSTRUCTOR';
export const DELETE_TO_BURGER_CONSTRUCTOR = 'DELETE_TO_BURGER_CONSTRUCTOR';
export const DELETE_BUN_TO_BURGER_CONSTRUCTOR = 'DELETE_BUN_TO_BURGER_CONSTRUCTOR';
export const UPDATE_ORDER_IN_BURGER_CONSTRUCTOR = 'UPDATE_ORDER_IN_BURGER_CONSTRUCTOR';


export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      getAllIngridients().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
            type: GET_INGREDIENTS_FAILED,
            error: error.message
        });
      });
    };
  }

export function addToBurgerConstructor(ingredient){
  return function(dispatch) {
    dispatch({
      type: ADD_TO_BURGER_CONSTRUCTOR,
      ingredient: ingredient
    });
  };
}

export function clearBurgerConstructor(){
  return function(dispatch) {
    dispatch({
      type: CLEAR_BURGER_CONSTRUCTOR
    });
  };
}

export function deleteIngridient(index){
  return function(dispatch) {
    dispatch({
      type: DELETE_TO_BURGER_CONSTRUCTOR,
      index: index
    });
  };
}

export function deleteBunIngridients(){
  return function(dispatch) {
    dispatch({
      type: DELETE_BUN_TO_BURGER_CONSTRUCTOR
    });
  };
}

export function updateOrderInBurgerConstructor(item, data){
  return function(dispatch) {
    dispatch({
      type: UPDATE_ORDER_IN_BURGER_CONSTRUCTOR,
      item: item,
      data: data
    });
  };
}