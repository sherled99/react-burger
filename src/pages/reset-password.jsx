import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {reset} from '../utils/burger-api';
import { clearResetLogin } from "../services/actions/auth";
import {
    PasswordInput,
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function ResetPasswordPage() {
    const { state } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer.user);
    const resetLogin = useSelector(state => state.authReducer.resetLogin);
    const [value, setValue] = useState("");

    const [valuePassword, setValuePassword] = useState("");
    const [valueToken, setValueToken] = useState('');
    const [error, setError] = useState("");

    const onChangeValuePassword = (e) => {
        setValuePassword(e.target.value);
    };

    const onChangeValueToken = (e) => {
        setValueToken(e.target.value);
    };

    const onReset = () => {
        setError("");
        reset(valuePassword, valueToken)
        .then((res) => {
            if (res.success){
                dispatch(clearResetLogin());
                navigate('/login');
            } else {
                setError(res.message);
                setValuePassword("");
                setValueToken("");
            }
        })
    }

    
    if (auth.name) {
        return (
          <Navigate
            to={'/'}
          />
        );
      }
    if (!resetLogin) {
          return (
            <Navigate
              to={'/forgot-password'}
            />
          );
    }

    return (
        <div>
            <AppHeader />
            <div className={style.reset_password_container}>
                {error && <>{error}</>}
                <h2 className="mb-6">Восстановление пароля</h2>
                <PasswordInput
                    value={valuePassword}
                    onChange={onChangeValuePassword}
                    name={"password"}
                    placeholder={"Введите новый пароль"}
                    extraClass="mb-6"
                />
                <Input
                    type={"text"}
                    onChange={onChangeValueToken}
                    placeholder={"Введите код из письма"}
                    value={valueToken}
                    size={"default"}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                    onClick={onReset}
                >
                    Сохранить
                </Button>
                <div className={`${style.links_container}`}>
                    <p className={`${style.word} text text_type_main-default`}>Вспомнили пароль?</p>
                    <Link className={style.link} to='/login' state={state}>Войти</Link>
                </div>
            </div>
        </div>
    );
}
