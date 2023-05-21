import {useSelector} from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderModal.module.css';
import { getStatus, getDate } from '../Order/Order';
import {useParams, Outlet} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const OrderModal = ({data}) => {
  const { id } = useParams();
  const ingredients = useSelector(state => state.burgerState.burgerIngredients);
  const message = data[data.length - 1];
  const order = message?.orders?.find(x => x._id === id);
  
  let sum = 0;
    order?.ingredients?.map((i) => { 
      sum += ingredients?.find(el => el._id === i)?.price;
    })

  if (!order){
    return;
  }
  return (
      <div className={`${style.container__main} mt-15 mb-15 pr-6 pl-6`}>
        <p className={`${style.number} text text_type_digits-default mb-10`}>{`#${order.number}`}</p>
        <h2 className={`${style.title} text text text_type_main-medium`}>{order.name}</h2>
        <p className={`${order.status === 'done' && style.status_done} text text_type_main-small mb-15 mt-3`}>{getStatus(order.status)}</p>
        <p className='text text text_type_main-medium'>Состав:</p>
        <div className={style.imgs_container}>
            {data.length > 0 && order.ingredients.map((i, index) => {   
              return <Image ingredientId={i} data={ingredients} key={uuidv4()} /> 
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

const Image = ({ingredientId, data}) => {
    const ingredient = data.find(el => el._id === ingredientId);
    let src = "";
    if (ingredient){
      src = ingredient.image_mobile;
    }
    
    return (
        <div className={style.img_container}>
            <img src={src} className={`${style.image} mr-4`}/>
            <p className={`${style.ingredient_name} text text text_type_main-default`}>{ingredient.name}</p>
            <div className={style.sumIngredient_container}>
                <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
  }