import { CurrencyIcon, LockIcon, DragIcon, Button, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css';

const Record = ({data}) => {
  return(
    <div className={`${style.container} mb-4 ml-4`}>
      {data.type !== 'bun' && <DragIcon type="primary" /> }
      <div className={`${style.container__record} pb-4 pt-4 ml-2`} style={data.type === 'bun' ? {marginLeft:24} : {}}>
        <img className={`${style.image} ml-6`} src={data.image}/>
        <p className={`${style.title} text text_type_main-small ml-5 mr-5`}>{data.name}</p>
        <div className={`${style.container} mr-5`}>
          <p className={`text text_type_digits-default mr-2`}>{data.price}</p>
          <div className='mr-5'>
            <CurrencyIcon type="primary"/>
          </div>
          <div className='mr-8'>
            {data.type == 'bun' ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export const BurgerConstructor = ({burgerConstructor, totalPrice}) => 
  {
    return (
    <div className={`mt-25`}>
      <div className={`${style.container__main} mb-10`}>
        {burgerConstructor.map((el, index) => <Record key={index} data={el} />)}
      </div>
      <div className={`${style.container__order}`}>
        <p className='text text_type_digits-medium mr-1'>{totalPrice}</p>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
};
