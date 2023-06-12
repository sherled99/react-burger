import {useEffect} from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/feed';
import { Order } from '../components/Order/Order';
import style from'./feed.module.css';
import { IOrder } from '../services/types/data';
 
export function FeedPage(){
  const dispatch = useDispatch();
  const data = useSelector(state => state.wsReducer.messages);
  const ingredients = useSelector(state => state.burgerState.burgerIngredients);
  const message = data[data.length - 1];

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all"});
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE});

    };
  }, [dispatch, ingredients]);

  if (ingredients.length === 0){
    return null;
  }

  return (
      <div>
        <h2 className={`${style.title_text} text_type_main-large`}>Лента заказов</h2>
        <div className={style.main_container}>
            <div className={style.order__container}>
                {data.length > 0 && message?.orders.map((el: IOrder) => <Order props={el} key={el.number} />)}
            </div>
            <div className='pl-15'>
              <div className={`${style.orders_container} mb-15`}>
                <div className={style.ready_container}>
                  <p className='text text_type_main-medium mb-6'>Готовы:</p>
                  {data.length > 0 && message?.orders.slice(0, 5).map((el: IOrder) => <p className={`${style.text_ready} text text_type_digits-default`} key={el.number}>{el.number}</p>)}
                </div>
                <div className={style.ready_container}>
                  <p className='text text_type_main-medium mb-6'>В работе:</p>
                  {data.length > 0 && message?.orders.filter((el: IOrder) => el.status != "done").slice(0, 5).map((el: IOrder) => <p className={`text text_type_digits-default`} key={el.number}>{el.number}</p>)}
                </div>
              </div>
              <div className='mb-15'>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={`${style.text_all_orders} text text_type_digits-large`}>{message?.total}</p>
              </div>
              <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={`${style.text_all_orders} text text_type_digits-large`}>{message?.totalToday}</p>
              </div>
            </div>
        </div>
      </div>
  );
}
