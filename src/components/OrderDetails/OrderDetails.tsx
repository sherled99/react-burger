import { useSelector } from '../../services/hooks';
import style from './OrderDetails.module.css';
import done from '../../images/done.svg';

export const OrderDetails = () => {
  const {order, orderRequest, orderFailed, error} = useSelector(state => ({
    order: state.initialReducer.order,
    orderRequest: state.initialReducer.orderRequest,
    orderFailed: state.initialReducer.orderFailed,
    error: `Ошибка: ${state.initialReducer.error}`
  }));

  const orderNumber = order && 'number' in order ? order.number : null;

  return (
      <div className={`${style.container__main} mt-30 mb-30`}>
        { orderRequest && <p className={style.loader}>Загрузка</p>}
        { orderFailed && <p>{error}</p>}
        <p className={`text text_type_digits-large mb-8 ${style.text}`}>{orderNumber}</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <img className={style.image} src={done} alt='Order is done'/>
        <p className={`text text_type_main-default mt-15 mb-2`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default ${style.text_dark}`}>Дождитесь готовности на орбитальной станции</p>
      </div>
  )
}