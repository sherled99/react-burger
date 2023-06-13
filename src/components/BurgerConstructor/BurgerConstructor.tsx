import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../services/hooks';
import { addOrder } from '../../services/actions/index';
import { useDrop, useDrag } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.css';
import { clearBurgerConstructor, addToBurgerConstructor, deleteIngridient, deleteBunIngridients, updateOrderInBurgerConstructor } from '../../services/actions/burger';
import {FC} from "react";
import { IIngredientDrop, IIngredient } from '../../services/types/data';

interface RecordProps {
  data: IIngredientDrop;
  length: number;
}

const Record: FC<RecordProps> = ({ data, length }) => {
  const burgerConstructor = useSelector(state => state.burgerState.burgerConstructor);
  const dispatch = useDispatch();
  const id: string | undefined = data.id;
  let type: 'top' | 'bottom' | undefined = undefined;
  if (data.type === 'bun') {
    type = length === 0 ? "top" : "bottom";
  }

  const [, dragRef] = useDrag({
    type: "ingridientIsMove",
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [, dropTarget] = useDrop({
    accept: "ingridientIsMove",
    drop(item: {id: string}) {
      const ingredient = burgerConstructor.find(x => x.id === item.id);
      if (ingredient?.type === 'bun' || ingredient?.type === 'bun' || ingredient?._id === data._id) {
        return;
      }
      if (ingredient){
        handleDrop(ingredient);
      }
    },
  });

  const handleDrop = (item: IIngredientDrop) => {
    dispatch(updateOrderInBurgerConstructor(item, data));
  };

  return (
    <div ref={dropTarget}>
      <div className={`${style.container} mb-4 ml-4`} ref={dragRef}>
        <ConstructorElement
          type={type}
          isLocked={data.type === 'bun'}
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={() => { dispatch(deleteIngridient(data.index ?? 0)) }}
        />
      </div>
    </div>
  );
}

export const BurgerConstructor: FC = () => {
  let { auth } = useSelector(state => ({
    auth: state.authReducer.user
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const burgerConstructor = useSelector(state => state.burgerState.burgerConstructor);
  const burgerIngredients = useSelector(state => state.burgerState.burgerIngredients);
  burgerConstructor.sort((a: IIngredientDrop, b: IIngredientDrop) => (a.index ?? 0) - (b.index ?? 0));

  const onOrder = () => {
    if (!auth.name) {
      navigate('/login');
      return;
    }
    const order = Array.from(burgerConstructor.map(x => x._id));
    dispatch(addOrder(order));
    navigate("send_order", { state: { backgroundLocation: true } });
    dispatch(clearBurgerConstructor());
  };

  const handleDrop = (itemId: string) => {
    const data: IIngredient | undefined = burgerIngredients?.find(x => x._id === itemId);
    if (!data) {
      return;
    }
    if (data.type === 'bun') {
      dispatch(deleteBunIngridients());
      addIgridient(data, 1, `${data.name} (верх)`);
      addIgridient(data, 99, `${data.name} (низ)`);
      return;
    }
    addIgridient(data, burgerConstructor.length);
  };

  const addIgridient = (data: IIngredient, index: number, name?: string) => {
    dispatch(addToBurgerConstructor({
      id: uuidv4(),
      _id: data._id,
      name: data.type === 'bun' ? name || '' : data.name,
      type: data.type,
      price: data.price,
      image: data.image,
      index: index
    }));
  };

  const [, dropTarget] = useDrop({
    accept: "ingridient",
    drop(item: {_id: string}) {
      handleDrop(item._id);
    },
  });

  return (
    <div className={`mt-25`} ref={dropTarget}>
      <div className={`${style.container__main} mb-10`}>
        {burgerConstructor.sort((a: IIngredientDrop, b: IIngredientDrop) => (a.index ?? 0) - (b.index ?? 0)).map((el, index) => <Record key={el.id} data={el} length={index} />)}
      </div>
      <div className={`${style.container__order}`}>
        <p className='text text_type_digits-medium mr-1'>{burgerConstructor.length !== 0 ? burgerConstructor.map(x => x.price).reduce((sum, x) => { return sum + x }) : 0}</p>
        <CurrencyIcon type="primary" />
        <div className='ml-10'>
          <Button htmlType="button" id='orderButton' type="primary" size="large" onClick={onOrder} disabled={burgerConstructor.length === 0 || !(burgerConstructor.length > 1 && burgerConstructor[0].type === 'bun' && burgerConstructor.at(-1)?.type === 'bun')}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};