import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {addOrder} from '../../services/actions/index';
import { useDrop, useDrag } from "react-dnd";
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css';
import {openModal} from '../../services/actions/index';
import {clearBurgerConstructor, addToBurgerConstructor, deleteIngridient, deleteBunIngridients, updateOrderInBurgerConstructor} from '../../services/actions/burger';

const Record = ({data, length}) => {
  const burgerConstructor = useSelector(state => state.burgerState.burgerConstructor);
  const dispatch = useDispatch();
  const id = data.id;
  let type = null;
  if (data.type === 'bun'){
    type = length ===0 ? "top" : "bottom";
  }

  const [, dragRef] = useDrag({
    type: "ingridientIsMove",
    item: {id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [, dropTarget] = useDrop({
    accept: "ingridientIsMove",
    drop(item) {
      const data = burgerConstructor.filter(x => x.id === item.id);
      const ingredient = data[0];
      if (ingredient.type === 'bun' || ingredient.type === 'bun' || ingredient._id === data._id){
        return;
      }
      handleDrop(ingredient);
    },
  });

  const handleDrop = (item) => {
    dispatch(updateOrderInBurgerConstructor(item, data));
  };

  return(
    <div ref={dropTarget}>
      <div className={`${style.container} mb-4 ml-4`} ref={dragRef}>
        <ConstructorElement
          type={type}
          isLocked={data.type === 'bun'}
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={()=> {dispatch(deleteIngridient(data.index))}}
        />
      </div>
    </div>
  );
}

export const BurgerConstructor = () => 
  {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(state => state.burgerState.burgerConstructor);
    const burgerIngredients = useSelector(state => state.burgerState.burgerIngredients);
    burgerConstructor.sort(x => x.index);


    const onOrder = () => {
      dispatch(addOrder((Array.from(burgerConstructor.map(x => x._id)))));
      dispatch(openModal("Order"));
      dispatch(clearBurgerConstructor());
    }

    const handleDrop = (itemId) => {
      const data = burgerIngredients.filter(x => x._id === itemId);
      if (!data){
        return;
      }
      const burgerIngredient = data[0];
      if (burgerIngredient.type === 'bun'){
        dispatch(deleteBunIngridients());
        addIgridient(burgerIngredient, 1, `${burgerIngredient.name} (верх)`);
        addIgridient(burgerIngredient, 99, `${burgerIngredient.name} (низ)`);
        return
      }
      addIgridient(burgerIngredient, burgerConstructor.length);
    };

    const addIgridient = (data, index, name) => {
      dispatch(addToBurgerConstructor({
        id: uuidv4(),
        _id: data._id,
        name: data.type === 'bun' ? name : data.name,
        type: data.type,
        price: data.price,
        image: data.image,
        index: index
      }));
    }

    const [, dropTarget] = useDrop({
      accept: "ingridient",
      drop(item) {
          handleDrop(item._id);
      },
    });
    return (
    <div className={`mt-25`} ref={dropTarget}>
      <div className={`${style.container__main} mb-10`}>
        {burgerConstructor.sort((a, b) => a.index - b.index).map((el, index) => <Record key={el.id} data={el} length={index} />)}
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
