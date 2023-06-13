import {
  GET_REGISTOR_REQUEST,
  GET_REGISTOR_SUCCESS,
  GET_REGISTOR_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  RESET_LOGIN,
  CLEAR_RESET_LOGIN,
  GET_UPDATE_USER_REQUEST,
  GET_UPDATE_USER_SUCCESS,
  GET_UPDATE_USER_FAILED
} from '../actions/auth';

import { IUser } from '../types/data';
import { AuthActionTypes } from '../actions/auth';

interface AuthState {
  user: IUser;
  accessToken: string;
  refreshToken: string;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  userRequest: boolean;
  userFailed: boolean;
  userSuccess: boolean;
  userUpdateRequest: boolean;
  userUpdateFailed: boolean;
  resetLogin: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    email: "",
    name: ""
  },
  accessToken: "",
  refreshToken: "",
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  userRequest: false,
  userFailed: false,
  userSuccess: false,
  userUpdateRequest: false,
  userUpdateFailed: false,
  resetLogin: false,
  error: null
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case GET_REGISTOR_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        error: ""
      };
    }
    case GET_REGISTOR_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        registerFailed: false
      };
    }
    case GET_REGISTOR_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
        error: action.error
      };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        error: ""
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginFailed: false,
        error: action.error
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        error: action.error
      };
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        user: {
          name: '',
          email: ''
        },
        accessToken: "",
        refreshToken: "",
        logoutFailed: false
      };
    }
    case GET_LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
        error: action.error
      };
    }
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        accessToken: action.accessToken,
        refreshTokenFailed: false
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenFailed: true,
        refreshTokenRequest: false,
        error: action.error
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        user: action.user,
        userSuccess: true,
        userFailed: false
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
        error: action.error,
        userSuccess: true
      };
    }
    case RESET_LOGIN: {
      return {
        ...state,
        resetLogin: true
      };
    }
    case CLEAR_RESET_LOGIN: {
      return {
        ...state,
        resetLogin: false
      };
    }
    case GET_UPDATE_USER_REQUEST: {
      return {
        ...state,
        userUpdateRequest: true,
        error: ""
      };
    }
    case GET_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userUpdateRequest: false,
        user: action.user,
        userSuccess: true,
        userUpdateFailed: false,
        error: ""
      };
    }
    case GET_UPDATE_USER_FAILED: {
      return {
        ...state,
        userUpdateFailed: true,
        userUpdateRequest: false,
        error: action.error,
        userSuccess: true
      };
    }
    default: {
      return state;
    }
  }
};