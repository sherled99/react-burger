import {useEffect} from 'react';
import style from './order.module.css';
import {useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/feed';
import { OrderModal } from '../components/OrderModal/OrderModal';
import { getCookie } from '../utils/cookie';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      if (location.pathname.split("/")[1] === "feed"){
        dispatch({ type: WS_CONNECTION_START, payload: "/all"});
      } else {
        const accessToken = getCookie("accessToken");
        const token = accessToken.split("Bearer ")[1];
        dispatch({ type: WS_CONNECTION_START, payload: `?token=${token}`});
      }
      
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSE});
  
      };
    }, []);

  return (
    <div className={style.div}>
         <OrderModal />
    </div>
  )
}