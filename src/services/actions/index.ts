import { createOrder } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { IIngredient, IOrderResolve } from "../types/data";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const SET_TAB = "SET_TAB";

interface OpenModalAction {
  type: typeof OPEN_MODAL;
  burgerConfig: IIngredient;
  typeModal: string;
}

interface CloseModalAction {
  type: typeof CLOSE_MODAL;
}

interface SetTabAction {
  type: typeof SET_TAB;
  tabCurrent: string;
}

interface GetOrderRequestAction {
  type: typeof GET_ORDER_REQUEST;
}

interface GetOrderSuccessAction {
  type: typeof GET_ORDER_SUCCESS;
  data: IOrderResolve;
}

interface GetOrderFailedAction {
  type: typeof GET_ORDER_FAILED;
  error: string;
}

export type BurgerActionTypes =
  | OpenModalAction
  | CloseModalAction
  | SetTabAction
  | GetOrderRequestAction
  | GetOrderSuccessAction
  | GetOrderFailedAction;

export function openModal(
  typeModal: string,
  burgerConfig: IIngredient
): BurgerActionTypes {
  return {
    type: OPEN_MODAL,
    burgerConfig: burgerConfig,
    typeModal: typeModal,
  };
}

export function closeModal(): BurgerActionTypes {
  return {
    type: CLOSE_MODAL,
  };
}

export function setTab(tabCurrent: string): BurgerActionTypes {
  return {
    type: SET_TAB,
    tabCurrent: tabCurrent,
  };
}

export const addOrder: AppThunk = (ids: Array<string>) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  createOrder(ids)
    .then((res) => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        data: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ORDER_FAILED,
        error: error.message,
      });
    });
};