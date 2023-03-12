import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';

const burgerConstructorMessagePropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

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
  burgerConstructor: PropTypes.arrayOf(burgerConstructorMessagePropTypes).isRequired,
  totalPrice: PropTypes.number
}; 
