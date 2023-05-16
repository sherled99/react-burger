import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {resetPassword} from '../utils/burger-api';
import { resetLogin } from "../services/actions/auth";
import {
    EmailInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function ForgotPasswordPage() {
    const { state } = useLocation();
    const auth = useSelector(state => state.authReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onResetPassword = (e) => {
        e.preventDefault();
        setError("");
        resetPassword(value)
        .then((res) => {
            if (res.success){
                navigate('/reset-password');
                dispatch(resetLogin());
            } else {
                setError(res.message);
                setValue("setValue");
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

    return (
        <div>
            <AppHeader />
            <div className={style.forgot_password_container}>
                {error && <>{error}</>}
                <h2 className="mb-6">Восстановление пароля</h2>
                <form onSubmit={onResetPassword}>
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={"email"}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={`${style.form} mb-20`}
                >
                    Восстановить
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
