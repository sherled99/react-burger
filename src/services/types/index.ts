import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { BurgerActionTypes } from '../actions';
import { TIngredientsActions } from '../actions/burger';
import { AuthActionTypes } from '../actions/auth';
import { WsActionTypes } from '../actions/feed';

type TApplicationActions = 
    | BurgerActionTypes
    | TIngredientsActions
    | AuthActionTypes
    | WsActionTypes;



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;