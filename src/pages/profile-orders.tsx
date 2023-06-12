import { useDispatch, useSelector } from '../services/hooks';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../services/actions/auth';
import { deleteCookie } from "../utils/cookie";
import style from "./profile-orders.module.css";
import { Order } from "../components/Order/Order";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../services/actions/feed";
import { getCookie } from "../utils/cookie";
import { IOrder } from '../services/types/data';

export function ProfileOrdersPage() {
    const data = useSelector(state => state.wsReducer.messages);
    const ingredients = useSelector(state=> state.burgerState.burgerIngredients);
    const message = data[data.length - 1];
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        deleteCookie('token');
        deleteCookie('accessToken');
    }

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        const token = accessToken?.split("Bearer ")[1];
        dispatch({ type: WS_CONNECTION_START, payload: `?token=${token}`});
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSE});
    
        };
      }, [dispatch, ingredients]);

    if (ingredients.length === 0){
      return null;
    }

    return (
        <div>
            <div className={style.profile_container}>
                <div className={`${style.navigate_container} mr-15`}>
                    <Link to="/profile" className={style.link}>Профиль</Link>
                    <Link to="/profile/orders" className={`${style.link} ${style.active}`}>История заказов</Link>
                    <p className={style.link} onClick={onLogout}>Выход</p>
                </div>
                <div>
                    {data.length > 0 && message?.orders?.map((el: IOrder) => <Order props={el} key={el.number} />)}
                </div>
            </div>
        </div>
    );
}
