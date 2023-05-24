import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useEffect} from "react";
import style from './AppHeader.module.css';
import { getIngredients } from '../../services/actions/burger';

export const AppHeader = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
  <header className={`${style.header} mt-4 mb-4`}>
    <div className={style.container__left}>
      <div className={`${style.container__button} mt-4 ml-5 mr-5 mb-4`}>
        <div className={style.icon}>
          <BurgerIcon type={location.pathname==="/" ? "primary" : "secondary"} />
        </div>
        <Link to='/' className={`${location.pathname==="/" ? style.link__text : style.link} text text_type_main-default ml-2`}>Конструктор</Link>
      </div>
      <div className={`${style.container__button} mt-4 ml-7 mr-5 mb-4`}>
        <div className={style.icon}>
          <ListIcon type={location.pathname.split("/")[1] === "feed" ? "primary" : "secondary"} />
        </div>
        <Link to='/feed' className={`${location.pathname.split("/")[1] === "feed" ? style.link__text : style.link} text text_type_main-default ml-2`}>Лента заказов</Link>
      </div>
    </div>
    <div className={`${style.logo}`}>
      <Link to='/'>
        <Logo />
      </Link>
    </div>
    <div className={style.container__right}>
      <div className={`${style.container__button} mt-4 ml-5 mr-5 mb-4`}>
        <div className={style.icon}>
          <ProfileIcon type={location.pathname.split("/")[1] === "profile" ? "primary" : "secondary"} />
        </div>
        <Link to='/profile' state={state} className={`${location.pathname.split("/")[1] === "profile" ? style.link__text : style.link} text text_type_main-default ml-2`}>Личный кабинет</Link>
      </div>
    </div>
  </header>
)
}
