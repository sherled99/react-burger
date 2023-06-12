import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "../services/hooks";
import { Link, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {reset} from '../utils/burger-api';
import {
    PasswordInput,
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";

export function ResetPasswordPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const auth = useSelector(state => state.authReducer.user);
    const resetLogin = useSelector(state => state.authReducer.resetLogin);

    const [valuePassword, setValuePassword] = useState("");
    const [valueToken, setValueToken] = useState('');
    const [error, setError] = useState("");

    const onChangeValuePassword = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        if (e){
            setValuePassword(e.target.value);
        }
    };

    const onChangeValueToken = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        if (e){
            setValueToken(e.target.value);
        }
    };

    const onReset = (e: FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        setError("");
        reset(valuePassword, valueToken)
        .then((res) => {
            if (res.success){
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
            <div className={style.reset_password_container}>
                {error && <>{error}</>}
                <h2 className="mb-6">Восстановление пароля</h2>
                <form onSubmit={onReset}>
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
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={`${style.form} mb-20`}
                >
                    Сохранить
                </Button>
                </form>
                <div className={`${style.links_container}`}>
                    <p className={`${style.word} text text_type_main-default`}>Вспомнили пароль?</p>
                    <Link className={style.link} to='/login' state={state}>Войти</Link>
                </div>
            </div>
        </div>
    );
}
