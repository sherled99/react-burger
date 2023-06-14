import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { getUserRequest } from '../services/actions/auth';
import {FC} from 'react';

type UnProtectedRouteElement = {
  element: JSX.Element
};

export const UnProtectedRouteElement: FC<UnProtectedRouteElement> = ({ element }) => {
  const location = useLocation();
  let {auth, success} = useSelector(state => ({
    auth: state.authReducer.user,
    success: state.authReducer.userSuccess
  }));
  const dispatch = useDispatch();

  const init = () => {
    dispatch(getUserRequest());
  };

  useEffect(() => {
    init(); 
  }, []);
  
  if (!success){
    return null;
  }
  
  return auth && auth.name ? <Navigate to={location?.state?.from || '/'} /> : element;
}