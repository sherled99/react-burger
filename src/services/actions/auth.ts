import { register as sendRegister, login as sendLogin, logout as sendLogout, getUserRequest as sendGetUserRequest, refreshToken as sendRefreshToken, updateUser as sendUpdateUser } from '../../utils/burger-api';
import { getCookie } from '../../utils/cookie';
import { AppThunk, AppDispatch } from '../types';
import { IUser } from '../types/data';

export const GET_REGISTOR_REQUEST = 'GET_REGISTOR_REQUEST';
export const GET_REGISTOR_SUCCESS = 'GET_REGISTOR_SUCCESS';
export const GET_REGISTOR_FAILED = 'GET_REGISTOR_FAILED';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED = 'GET_LOGOUT_FAILED';

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const GET_UPDATE_USER_REQUEST = 'GET_UPDATE_USER_REQUEST';
export const GET_UPDATE_USER_SUCCESS = 'GET_UPDATE_USER_SUCCESS';
export const GET_UPDATE_USER_FAILED = 'GET_UPDATE_USER_FAILED';

export const RESET_LOGIN = 'RESET_LOGIN';
export const CLEAR_RESET_LOGIN = 'CLEAR_RESET_LOGIN';

export interface ResetLoginAction {
  type: typeof RESET_LOGIN;
}

export interface ClearResetLoginAction {
  type: typeof CLEAR_RESET_LOGIN;
}

export interface UpdateUserRequestAction {
  type: typeof GET_UPDATE_USER_REQUEST;
}

export interface UpdateUserSuccessAction {
  type: typeof GET_UPDATE_USER_SUCCESS;
  user: IUser
}

export interface UpdateUserFailedAction {
  type: typeof GET_UPDATE_USER_FAILED;
  error: string;
}

export interface RegisterRequestAction {
  type: typeof GET_REGISTOR_REQUEST;
}

export interface RegisterSuccessAction {
  type: typeof GET_REGISTOR_SUCCESS;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterFailedAction {
  type: typeof GET_REGISTOR_FAILED;
  error: string;
}

export interface LoginRequestAction {
  type: typeof GET_LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: typeof GET_LOGIN_SUCCESS;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginFailedAction {
  type: typeof GET_LOGIN_FAILED;
  error: string;
}

export interface LogoutRequestAction {
  type: typeof GET_LOGOUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof GET_LOGOUT_SUCCESS;
}

export interface LogoutFailedAction {
  type: typeof GET_LOGOUT_FAILED;
  error: string;
}

export interface RefreshTokenRequestAction {
  type: typeof GET_REFRESH_TOKEN_REQUEST;
}

export interface RefreshTokenSuccessAction {
  type: typeof GET_REFRESH_TOKEN_SUCCESS;
  accessToken: string;
}

export interface RefreshTokenFailedAction {
  type: typeof GET_REFRESH_TOKEN_FAILED;
  error: string;
}

export interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}

export interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  user: IUser;
}

export interface GetUserFailedAction {
  type: typeof GET_USER_FAILED;
  error: string;
}

export type AuthActionTypes =
  | ResetLoginAction
  | ClearResetLoginAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailedAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailedAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailedAction
  | RefreshTokenRequestAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailedAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailedAction;

export const resetLogin = (): ResetLoginAction => ({
  type: RESET_LOGIN,
});

export const clearResetLogin = (): ClearResetLoginAction => ({
  type: CLEAR_RESET_LOGIN,
});

export const updateUser: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_UPDATE_USER_REQUEST,
  });
  sendUpdateUser(name, email, password)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({
          type: GET_UPDATE_USER_FAILED,
          error: res.message,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_UPDATE_USER_FAILED,
        error: error.message,
      });
    });
};

export const register: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_REGISTOR_REQUEST,
  });
  sendRegister(email, password, name)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: GET_REGISTOR_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      } else {
        dispatch({
          type: GET_REGISTOR_FAILED,
          error: res.message,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_REGISTOR_FAILED,
        error: error.message,
      });
    });
};

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_LOGIN_REQUEST,
  });
  sendLogin(email, password)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      } else {
        dispatch({
          type: GET_LOGIN_FAILED,
          error: res.message,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_LOGIN_FAILED,
        error: error.message,
      });
    });
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_LOGOUT_REQUEST,
  });
  sendLogout()
    .then(() => {
      dispatch({
        type: GET_LOGOUT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_LOGOUT_FAILED,
        error: error.message,
      });
    });
};

export const refreshToken: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_REFRESH_TOKEN_REQUEST,
  });
  sendRefreshToken()
    .then((res) => {
      dispatch({
        type: GET_REFRESH_TOKEN_SUCCESS,
        accessToken: res.accessToken,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_REFRESH_TOKEN_FAILED,
        error: error.message,
      });
    });
};

export const getUserRequest: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  if (!getCookie('accessToken')) {
    dispatch({
      type: GET_USER_FAILED,
    });
    return;
  }
  sendGetUserRequest()
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res && res.user ? res.user : {},
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_FAILED,
        error: error.message,
      });
    });
};
