import {useEffect} from 'react';
import style from './order.module.css';
import { useParams, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getIngredients } from '../services/actions/burger';
import { WS_USER_CONNECTION_START } from '../services/actions/personal_feed';
import { WS_CONNECTION_START } from '../services/actions/feed';
import { OrderModal } from '../components/OrderModal/OrderModal';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();
    const type = location.pathname.split('/');
    const ingredients = useSelector(state => state.burgerState.burgerIngredients);
    const wsReducer = useSelector(state => state.wsReducer.messages);
    const messageAll = wsReducer[wsReducer.length - 1];
    const personlFeedReducer = useSelector(state => state.personlFeedReducer.messages);
    const messagePersonal = personlFeedReducer[personlFeedReducer.length - 1];
    let data;

    useEffect(() => {
        dispatch(getIngredients());
        dispatch({ type: WS_CONNECTION_START });
        dispatch({ type: WS_USER_CONNECTION_START });
      }, [dispatch]);
  if (!ingredients && (!personlFeedReducer || !messagePersonal)){
    return null;
  }

  if (ingredients){
    if (type.length >2 && type[1] === "profile" && personlFeedReducer){
        data = messagePersonal?.orders?.find(x => x._id === id); 
    } else if (type.length >2 && type[1] === "feed" && wsReducer){
        data = messageAll?.orders?.find(x => x._id === id); 
    }
  }

  if (!data){
    return null;
  }

  return (
    <div className={style.div}>
        {type.length >2 && type[1] === "feed" && <OrderModal data={wsReducer} />}
        {type.length >2 && type[1] === "profile" && <OrderModal data={personlFeedReducer}/>}
    </div>
  )
}