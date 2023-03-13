import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {burgerPropTypes} from '../../utils/prop-types';

const Record = ({data}) => {
  return(
    <div className={`${style.container} mb-4 ml-4`}>
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
    </div>
  );
}

export const BurgerConstructor = ({burgerConstructor, totalPrice, openModal}) => 
  {

    const onOrder = () => {
      openModal(true , "Order");
    }

    return (
    <div className={`mt-25`}>
      <div className={`${style.container__main} mb-10`}>
        {burgerConstructor.map((el, index) => <Record key={index} data={el} />)}
      </div>
      <div className={`${style.container__order}`}>
        <p className='text text_type_digits-medium mr-1'>{totalPrice}</p>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button" type="primary" size="large" tag="order" onClick={onOrder}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
};

BurgerConstructor.propTypes = {
  burgerConstructor: PropTypes.arrayOf(burgerPropTypes).isRequired,
  totalPrice: PropTypes.number
}; 
