import {useState} from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerIngredients.module.css';

const Tabs = () => {
  const [current, setCurrent] = useState('rolls')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="rolls" active={current === 'rolls'} onClick={(evt) => {
        setCurrent(evt);
        window.location.href='#rolls'
        }}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={(evt) => {
        setCurrent(evt);
        window.location.href='#sauces'
        }}>
        Соусы
      </Tab>
      <Tab value="toppings" active={current === 'toppings'} onClick={(evt) => {
        setCurrent(evt);
        window.location.href='#toppings'
        }}>
        Начинки
      </Tab>
    </div>
  )
}

const Ingredients = ({data, addIngridient}) => {
  return (
    <div className={`mt-6 ${style.mr_first_el} ${style.container__max}`}>
      <img src={data.image} className={`${style.image} ml-4 mr-4`} onClick={() => addIngridient({data})}/>
      <div className={`${style.container__price} mb-1 mb-1`}>
        <p className={`mr-2`}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.description} text text_type_main-default`}>{data.name}</p>
    </div>
  )
}

const Menu = ({data, title, addIngridient, anchor}) => {
  return (
    <div>
      <h2 id={anchor} className={`${style.subtitle} text text_type_main-default mt-10`}>
          {title}
      </h2>
      <div className={`${style.container__ingredient}`}>
        {data.map((el) => <Ingredients key={el._id} data={el} addIngridient={addIngridient} />)}
      </div>
    </div>
  )
}

export const BurgerIngredients = ({burgerIngredients, addIngridient}) => 
  (
      <div className={`${style.container__main}`}>
        <h1 className={`${style.title} text text_type_main-default mt-10 mb-5`}>
          Соберите бургер 
        </h1>
        <Tabs/>
        <div className={`${style.container__menu}`}>
          <Menu data={burgerIngredients.filter(x =>x.type == 'bun')} addIngridient={addIngridient} title='Булки' anchor='rolls' />
          <Menu data={burgerIngredients.filter(x =>x.type == 'sauce')} addIngridient={addIngridient} title='Соусы' anchor='sauces' />
          <Menu data={burgerIngredients.filter(x =>x.type == 'main')} addIngridient={addIngridient} title='Начинки' anchor='toppings' />
        </div>
      </div>
  )
