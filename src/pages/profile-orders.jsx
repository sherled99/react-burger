import { useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import { WS_USER_CONNECTION_START } from "../services/actions/personal_feed";
import { Link } from 'react-router-dom';
import {logout} from '../services/actions/auth';
import { deleteCookie } from "../utils/cookie";
import style from "./profile-orders.module.css";
import { Order } from "../components/Order/Order";
import { getIngredients } from "../services/actions/burger";

export function ProfileOrdersPage() {
    const data = useSelector(state => state.personlFeedReducer.messages);
    const ingredients = useSelector(state => state.burgerState.burgerIngredients);
    const message = data[data.length - 1];
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        deleteCookie('token');
        deleteCookie('accessToken');
    }

    useEffect(() => {
      if (ingredients.length === 0){
        dispatch(getIngredients());
      }
      dispatch({ type: WS_USER_CONNECTION_START });
    }, [dispatch, ingredients]);

    if (ingredients.length === 0){
      return null;
    }

    return (
        <div>
            <div className={style.profile_container}>
                <div className={`${style.navigate_container} mr-15`}>
                    <Link to="/profile" className={style.link}>Профиль</Link>
                    <Link className={`${style.link} ${style.active}`}>История заказов</Link>
                    <Link className={style.link} onClick={onLogout}>Выход</Link>
                </div>
                <div>
                    {data.length > 0 && message?.orders?.map((el) => <Order props={el} key={el.number} />)}
                </div>
            </div>
        </div>
    );
}
