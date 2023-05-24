import {useSelector} from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderModal.module.css';
import { getStatus, getDate } from '../Order/Order';
import {useParams, Outlet} from 'react-router-dom';

const getIngredientsInOrder = (ingredients) => {
  const idCountMap = new Map();
  ingredients.forEach(obj => {
    const _id = obj;
    if (idCountMap.has(_id)) {
      idCountMap.set(_id, idCountMap.get(_id) + 1);
    } else {
      idCountMap.set(_id, 1);
    }
  });

  return Array.from(idCountMap);
}

export const OrderModal = () => {
  const { id } = useParams();
  const ingredients = useSelector(state => state.burgerState.burgerIngredients);
  const wsReducer = useSelector(state => state.wsReducer.messages);
  const message = wsReducer[wsReducer.length - 1];
  const order = message?.orders?.find(x => x._id === id);
  const ingredientsInOrder = order?.ingredients && getIngredientsInOrder(order.ingredients);

  let sum = 0;
    order?.ingredients?.map((i) => { 
      sum += ingredients?.find(el => el._id === i)?.price;
    })
  
  if (!order || !ingredients){
    return;
  }
  return (
      <div className={`${style.container__main} mt-15 mb-15 pr-6 pl-6`}>
        <p className={`${style.number} text text_type_digits-default mb-10`}>{`#${order.number}`}</p>
        <h2 className={`${style.title} text text text_type_main-medium`}>{order.name}</h2>
        <p className={`${order.status === 'done' && style.status_done} text text_type_main-small mb-15 mt-3`}>{getStatus(order.status)}</p>
        <p className='text text text_type_main-medium'>Состав:</p>
        <div className={style.imgs_container}>
            {ingredientsInOrder?.map((i, index) => {   
              return <Image ingredients={i} message={ingredients} data={ingredients} key={index} /> 
            })}
        </div>
        <div className={style.container_footer}>
            <p className={`${style.color_text} text text_type_main-small`}>{getDate(order.createdAt)}</p>
            <div className={style.sum_container}>
                <p className='text text_type_digits-default mr-2'>{sum}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
        <Outlet/>
      </div>
  )
}

const Image = ({ingredients, data}) => {
    const ingredient = data?.find(el => el._id === ingredients[0]);
    let src = "";
    if (ingredient){
      src = ingredient.image_mobile;
    }
    
    return (
        <div className={style.img_container}>
            <img src={src} className={`${style.image} mr-4`}/>
            <p className={`${style.ingredient_name} text text text_type_main-default`}>{ingredient?.name}</p>
            <div className={style.sumIngredient_container}>
                <p className='text text_type_digits-default mr-2'>{ingredients[1] > 1 ? `${ingredients[1]} x ${ingredient.price}` : `${ingredient.price}`}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
  }