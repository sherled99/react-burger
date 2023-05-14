import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import {register} from '../services/actions/auth';
import { getCookie } from "../utils/cookie";
import {
    EmailInput,
    PasswordInput,
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function RegisterPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const error = useSelector(state => state.authReducer.error);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [valueEmail, setValueEmail] = useState("");
    const onChangeEmail = (e) => {
        setValueEmail(e.target.value);
    };

    const [valuePassword, setValuePassword] = useState("");
    const onChangePassword = (e) => {
        setValuePassword(e.target.value);
    };

    const [valueName, setValueName] = useState('');
    const onChangeName = (e) => {
        setValueName(e.target.value);
    }

    const onRegister = () => {
        dispatch(register(valueEmail, valuePassword, valueName));

    }

    if (user && user.name && getCookie("token")) {
        return (
          <Navigate
            to={'/'}
          />
        );
      }

    return (
        <div>
            <AppHeader />
            <div className={style.register_container}>
            <> {error && <div>{error}</div>} </>
                <h2 className="mb-6">Регистрация</h2>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChangeName}
                    value={valueName}
                    size={"default"}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={onChangeEmail}
                    value={valueEmail}
                    placeholder={"Логин"}
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
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                    onClick={onRegister}
                >
                    Зарегистрироваться
                </Button>
                <div className={`${style.links_container}`}>
                    <p className={`${style.word} text text_type_main-default`}>Уже зарегистрированы?</p>
                    <Link className={style.link} to='/login' state={state}>Войти</Link>
                </div>
            </div>
        </div>
    );
}
