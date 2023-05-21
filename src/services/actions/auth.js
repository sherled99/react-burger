import {register as sendRegister, login as sendLogin, logout as sendLogout, getUserRequest as sendGetUserRequest, refreshToken as sendRefreshToken, updateUser as sendUpdateUser} from '../../utils/burger-api';
import { getCookie } from '../../utils/cookie';

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

export const JOIN_CHAT = 'JOIN_CHAT';
export const JOIN_CHAT_SUCCESS = 'JOIN_CHAT_SUCCESS';
export const JOIN_CHAT_FAILED = 'JOIN_CHAT_FAILED';


export function resetLogin(){
  return function(dispatch) {
    dispatch({
      type: RESET_LOGIN
    });
  }
}

export function clearResetLogin(){
  return function(dispatch) {
    dispatch({
      type: CLEAR_RESET_LOGIN
    });
  }
}

export function updateUser(name, email, password) {
  return function(dispatch) {
    dispatch({
      type: GET_UPDATE_USER_REQUEST
    });
    sendUpdateUser(name, email, password).then(res => {
      if (res.success){
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: GET_UPDATE_USER_FAILED,
          error: res.message
      });
      }
        
    })
    .catch(error => {
      dispatch({
          type: GET_UPDATE_USER_FAILED,
          error: error.message
      });
    });
  };
}

export function register(email, password, name) {
  return function(dispatch) {
    dispatch({
      type: GET_REGISTOR_REQUEST
    });
    sendRegister(email, password, name).then(res => {
      if (res.success){
        dispatch({
          type: GET_REGISTOR_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
      } else {
        dispatch({
          type: GET_REGISTOR_FAILED,
          error: res.message
        });
      }
        
    })
    .catch(error => {
      dispatch({
          type: GET_REGISTOR_FAILED,
          error: error.message
      });
    });
  };
}

export function login(email, password) {
  return function(dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST
    });
    sendLogin(email, password).then(res => {
      if (res.success){
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
      } else {
        dispatch({
          type: GET_LOGIN_FAILED,
          error: res.message
      });
      }
        
    })
    .catch(error => {
      dispatch({
          type: GET_LOGIN_FAILED,
          error: error.message
      });
    });
  };
}

export function logout() {
  return function(dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST
    });
    sendLogout().then(() => {
        dispatch({
          type: GET_LOGOUT_SUCCESS
        });
    })
    .catch(error => {
      dispatch({
          type: GET_LOGOUT_FAILED,
          error: error.message
      });
    });
  };
}

export function refreshToken(token) {
  return function(dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST
    });
    sendRefreshToken(token).then((res) => {
        dispatch({
          type: GET_REFRESH_TOKEN_SUCCESS,
          accessToken: res.accessToken
        });
    })
    .catch(error => {
      dispatch({
          type: GET_REFRESH_TOKEN_FAILED,
          error: error.message
      });
    });
  };
}

export function getUserRequest() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    if (!getCookie('accessToken')){
      dispatch({
        type: GET_USER_FAILED
      });
      return;
    }
    sendGetUserRequest().then((res) => {
      dispatch({
          type: GET_USER_SUCCESS,
          user: res && res.user ? res.user : {}
        });
    }).catch(error => {
      dispatch({
          type: GET_USER_FAILED,
          error: error.message
      });
    });
  };
}