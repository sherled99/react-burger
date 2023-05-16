import {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Navigate } from 'react-router-dom';
import {login, clearResetLogin} from '../services/actions/auth';
import {
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./login.module.css";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function LoginPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const location = useLocation();
    const error = useSelector(state => state.authReducer.error);
    const auth = useSelector(state => state.authReducer.user);

    const [value, setValue] = useState("");
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const [valuePassword, setValuePassword] = useState("");
    const onChangePassword = (e) => {
        setValuePassword(e.target.value);
    };

    const onLogin = (e) => {
        e.preventDefault();
        dispatch(login(value, valuePassword));
    }

    useEffect(() => {
        dispatch(clearResetLogin());
    }, [dispatch]);

    if (auth.name) {
      return <Navigate to={location?.state?.from || '/'} />
    }

    return (
        <div>
            <AppHeader />
            <div className={style.login_container}>
            <> {error && <div>{error}</div>} </>
                <h2 className="mb-6">Вход</h2>
                <form onSubmit={onLogin}>
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={"email"}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={valuePassword}
                    name={"password"}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={`${style.form} mb-20`}
                >
                    Войти
                </Button>
                </form>
                <div
                    className={`${style.links_container} ${style.links_container_margin}`}
                >
                    <p className={`${style.word} text text_type_main-default`}>Вы — новый пользователь?</p>
                    <Link className={style.link} to='/register' state={state}>Зарегистрироваться</Link>
                </div>
                <div className={`${style.links_container}`}>
                    <p className={`${style.word} text text_type_main-default`}>Забыли пароль?</p>
                    <Link className={style.link} to='/forgot-password' state={state}>Восстановить пароль</Link>
                </div>
            </div>
        </div>
    );
}
