import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useSelector, useDispatch } from "react-redux";
import { getUserRequest } from '../services/actions/auth';

export const UnProtectedRouteElement = ({ element }) => {
  let {auth, success, accessToken} = useSelector(state => ({
    auth: state.authReducer.user,
    success: state.authReducer.userSuccess,
    accessToken: state.authReducer.accessToken
  }));
  const dispatch = useDispatch();

  const init = () => {
    dispatch(getUserRequest(accessToken));
  };

  useEffect(() => {
    init(); 
  }, []);
  
  if (!success){
    return null;
  }
  
  return auth && auth.name ? <Navigate to="/"/> : element;
}