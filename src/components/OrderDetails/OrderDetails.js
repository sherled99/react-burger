import style from './OrderDetails.module.css';
import done from '../../images/done.svg';

export const OrderDetails = () => {
  return (
      <div className={`${style.container__main} mt-30 mb-30`}>
        <p className={`text text_type_digits-large mb-8 ${style.text}`}>034536</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <img className={style.image} src={done}/>
        <p className={`text text_type_main-default mt-15 mb-2`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default ${style.text_dark}`}>Дождитесь готовности на орбитальной станции</p>
      </div>
  )
}