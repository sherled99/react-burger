import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {logout, updateUser} from '../services/actions/auth';
import { deleteCookie } from "../utils/cookie";
import {
    EmailInput,
    PasswordInput,
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";

export function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const error = useSelector(state => state.authReducer.error);
    const [value, setValue] = useState(user.email);
    const onChangeValue = (e) => {
        setValueName(e.target.value);
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const [valuePassword, setValuePassword] = useState("");
    const onChangePassword = (e) => {
        setValuePassword(e.target.value);
    };

    const [valueName, setValueName] = useState(user.name);

    const onLogout = () => {
        dispatch(logout());
        deleteCookie('token');
        deleteCookie('accessToken');
    }

    const save = (e) => {
        e.preventDefault();
        dispatch(updateUser(valueName, value, valuePassword));
    }

    return (
        <div>
            <div className={style.profile_container}>
                <div className={`${style.navigate_container} mr-15`}>
                    <Link className={`${style.link} ${style.active}`}>Профиль</Link>
                    <Link to="/profile/orders" className={style.link}>История заказов</Link>
                    <Link className={style.link} onClick={onLogout}>Выход</Link>
                    <p className={style.text}>В этом разделе вы можете
изменить свои персональные данные</p>
                </div>
                <div>
                    <> {error && <div>{error}</div>} </>
                    <form onSubmit={save}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={onChangeValue}
                        value={valueName}
                        size={"default"}
                        extraClass="mb-6"
                        icon="EditIcon"
                    />
                    <EmailInput
                        onChange={onChange}
                        value={value}
                        name={"email"}
                        isIcon={false}
                        extraClass="mb-6"
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={valuePassword}
                        name={"password"}
                        extraClass="mb-6"
                        icon="EditIcon"
                    />
                        <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="mb-20"
                    >
                        Сохранить
                    </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
