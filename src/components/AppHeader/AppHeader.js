import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AppHeader.module.css';

export const AppHeader = () => (
  <header className={`${style.header} mt-4 mb-4`}>
    <div className={style.container__left}>
      <div className={`${style.container__button} mt-4 ml-5 mr-5 mb-4`}>
        <BurgerIcon type="primary" />
        <a href='#' className={`${style.btn__text} text text_type_main-default ml-2`}>Конструктор</a>
      </div>
      <div className={`${style.container__button} mt-4 ml-7 mr-5 mb-4`}>
        <ListIcon type="secondary" />
        <a href='#' className={`${style.btn__text} text text_type_main-default ml-2`}>Лента заказов</a>
      </div>
    </div>
    <div className={`${style.logo}`}>
      <Logo/>
    </div>
    <div className={style.container__right}>
      <div className={`${style.container__button} mt-4 ml-5 mr-5 mb-4`}>
        <ProfileIcon type="secondary" />
        <a href='#' className={`${style.profile__text} text text_type_main-default ml-2`}>Личный кабинет</a>
      </div>
    </div>
  </header>
)
