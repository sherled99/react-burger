import {useContext} from 'react';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css';
import {BurgerConstructorContext, OrderContext} from '../../utils/appContext';
import {createOrder} from '../../utils/burger-api';

const Record = ({data, length}) => {

  let type = null;
  if (data.type === 'bun'){
    type = length===0 ? "top" : "bottom";
  }

  return(
    <div className={`${style.container} mb-4 ml-4`}>
      <ConstructorElement
        type={type}
        isLocked={data.type === 'bun'}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
    </div>
  );
}

export const BurgerConstructor = ({openModal}) => 
  {
    const {burgerConstructor, setBurgerConstructor} = useContext(BurgerConstructorContext);
    const {setOrder} = useContext(OrderContext);

    const onOrder = () => {
      createOrder(Array.from(burgerConstructor.map(x => x._id)))
      .then((res) => {
        setOrder({
          name: res.name,
          number: res.order.number
        });
        openModal(true , "Order");
        setBurgerConstructor([]);
      })
      .catch((err) => console.log(err));
    }

    return (
    <div className={`mt-25`}>
      <div className={`${style.container__main} mb-10`}>
        {burgerConstructor.map((el, index) => <Record key={index} data={el} length={index} />)}
      </div>
      <div className={`${style.container__order}`}>
        <p className='text text_type_digits-medium mr-1'>{burgerConstructor.length !== 0 ? burgerConstructor.map(x => x.price).reduce((sum, x) => {return sum + x}) : 0}</p>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button" id='orderButton' type="primary" size="large" tag="order" onClick={onOrder} disabled={burgerConstructor.length === 0 || !(burgerConstructor.length > 1 && burgerConstructor[0].type ==='bun' && burgerConstructor.at(-1).type ==='bun')}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
};
