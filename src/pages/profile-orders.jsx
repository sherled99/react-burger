import { useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import {logout} from '../services/actions/auth';
import { deleteCookie } from "../utils/cookie";
import style from "./profile-orders.module.css"

export function ProfileOrdersPage() {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        deleteCookie('token');
        deleteCookie('accessToken');
    }

    return (
        <div>
            <div className={style.profile_container}>
                <div className={`${style.navigate_container} mr-15`}>
                    <Link to="/profile" className={style.link}>Профиль</Link>
                    <Link className={`${style.link} ${style.active}`}>История заказов</Link>
                    <Link className={style.link} onClick={onLogout}>Выход</Link>
                </div>
            </div>
        </div>
    );
}
