import {getAllIngridients} from '../../utils/burger-api'
import { AppThunk,AppDispatch } from '../types';
import { IIngredient, IIngredientDrop } from '../types/data';

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = 'GET_INGREDIENTS_FAILED';

export const ADD_TO_BURGER_CONSTRUCTOR: "ADD_TO_BURGER_CONSTRUCTOR" = 'ADD_TO_BURGER_CONSTRUCTOR';
export const CLEAR_BURGER_CONSTRUCTOR: "CLEAR_BURGER_CONSTRUCTOR" = 'CLEAR_BURGER_CONSTRUCTOR';
export const DELETE_TO_BURGER_CONSTRUCTOR: "DELETE_TO_BURGER_CONSTRUCTOR" = 'DELETE_TO_BURGER_CONSTRUCTOR';
export const DELETE_BUN_TO_BURGER_CONSTRUCTOR: "DELETE_BUN_TO_BURGER_CONSTRUCTOR" = 'DELETE_BUN_TO_BURGER_CONSTRUCTOR';
export const UPDATE_ORDER_IN_BURGER_CONSTRUCTOR: "UPDATE_ORDER_IN_BURGER_CONSTRUCTOR" = 'UPDATE_ORDER_IN_BURGER_CONSTRUCTOR';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: Array<IIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly error: string;
}

export interface IAddToBurgerConstructorAction {
  readonly type: typeof ADD_TO_BURGER_CONSTRUCTOR;
  readonly ingredient: IIngredientDrop;
}

export interface IClearBurgerConstructorAction {
  readonly type: typeof CLEAR_BURGER_CONSTRUCTOR;
}

export interface IDeleteToBurgerConstructorAction {
  readonly type: typeof DELETE_TO_BURGER_CONSTRUCTOR;
  readonly index: number;
}

export interface IDeleteBunToBurgerConstructorAction {
  readonly type: typeof DELETE_BUN_TO_BURGER_CONSTRUCTOR;
}

export interface IUpdateOrderInBurgerConstructorAction {
  readonly type: typeof UPDATE_ORDER_IN_BURGER_CONSTRUCTOR;
  readonly item: IIngredientDrop;
  readonly data: IIngredientDrop;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddToBurgerConstructorAction
  | IClearBurgerConstructorAction
  | IDeleteToBurgerConstructorAction
  | IDeleteBunToBurgerConstructorAction
  | IUpdateOrderInBurgerConstructorAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = (items: Array<IIngredient>): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  items
});

export const getIngredientsFailedAction = (error: string): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
  error
});

export const addToBurgerConstructor = (ingredient: IIngredientDrop): IAddToBurgerConstructorAction => ({
  type: ADD_TO_BURGER_CONSTRUCTOR,
  ingredient
});

export const clearBurgerConstructor = (): IClearBurgerConstructorAction => ({
  type: CLEAR_BURGER_CONSTRUCTOR
});

export const deleteIngridient = (index: number): IDeleteToBurgerConstructorAction => ({
  type: DELETE_TO_BURGER_CONSTRUCTOR,
  index
});

export const deleteBunIngridients = (): IDeleteBunToBurgerConstructorAction => ({
  type: DELETE_BUN_TO_BURGER_CONSTRUCTOR
});

export const updateOrderInBurgerConstructor = (item: IIngredientDrop, data: IIngredientDrop): IUpdateOrderInBurgerConstructorAction => ({
  type: UPDATE_ORDER_IN_BURGER_CONSTRUCTOR,
  item,
  data
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());
  getAllIngridients()
    .then((res: {data: Array<IIngredient>}) => {
      dispatch(getIngredientsSuccessAction(res.data));
    })
    .catch((error: {message: string}) => {
      dispatch(getIngredientsFailedAction(error.message));
    });
};