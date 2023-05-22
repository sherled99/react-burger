import {useEffect} from 'react';
import style from './order.module.css';
import {useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/feed';
import { OrderModal } from '../components/OrderModal/OrderModal';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      if (location.pathname.split("/")[1] === "feed"){
        dispatch({ type: WS_CONNECTION_START, connection: "/feed"});
      } else {
        dispatch({ type: WS_CONNECTION_START, connection: "/profile"});
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