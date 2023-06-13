import { useRef, useEffect, FC, RefObject  } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrag } from "react-dnd";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import { openModal, setTab } from '../../services/actions/index';
import { addToBurgerConstructor } from '../../services/actions/burger';
import { useNavigate } from 'react-router-dom';
import { IIngredient, IIngredientDrop } from '../../services/types/data';

interface TabsProps {
  refs: {
    bunRef: RefObject<HTMLElement | null>;
    sauceRef: RefObject<HTMLElement | null>;
    mainRef: RefObject<HTMLElement | null>;
  };
}

const Tabs: FC<TabsProps> = ({refs}) => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.initialReducer.tabCurrent);

  return (
    <div className={`${style.container__constructorElement}`}>
      <Tab value="rolls" active={current === 'rolls'} onClick={(evt) => {
        dispatch(setTab(evt));
        refs.bunRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      }}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={(evt) => {
        dispatch(setTab(evt));
        refs.sauceRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      }}>
        Соусы
      </Tab>
      <Tab value="toppings" active={current === 'toppings'} onClick={(evt) => {
        dispatch(setTab(evt));
        refs.mainRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      }}>
        Начинки
      </Tab>
    </div>
  );
}

const Ingredients = ({ data }: { data: IIngredient }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const burgerConstructor = useSelector(state => state.burgerState.burgerConstructor);
  const _id = data._id;

  const [, dragRef] = useDrag({
    type: "ingridient",
    item: { _id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const count = burgerConstructor.filter(x => x._id === data._id).length;

  const onOrder = () => {
    dispatch(openModal("Burger", data));
    navigation(`/ingredients/${data._id}`, { state: { backgroundLocation: true } });
  }

  const addIngredient = () => {
    if (burgerConstructor.length === 0 && data.type !== 'bun' || (burgerConstructor.length > 1 && burgerConstructor[burgerConstructor.length - 1].type === 'bun')) {
      return;
    }
    let name = data.name;
    if (data.type === 'bun') {
      if (burgerConstructor.length === 0) {
        name = `${data.name} (верх)`;
      } else {
        name = `${data.name} (низ)`;
      }
    }
    dispatch(addToBurgerConstructor({
      _id: data._id,
      name: data.type === 'bun' ? name : data.name,
      type: data.type,
      price: data.price,
      image: data.image
    }));
  }

  return (
    <div className={`mt-6 ${style.mr_first_el} ${style.container__max}`}>
      {count > 0 &&
        <div className={`${style.position}`}>
          <Counter count={count} size="default" extraClass="m-1" />
        </div>
      }
      <img src={data.image} className={`${style.image} ml-4 mr-4`} onClick={onOrder} alt={data.name} ref={dragRef} />
      <div className={`${style.container__price} mb-1 mb-1`} onClick={addIngredient} >
        <p className={`mr-2`}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.description} text text_type_main-default`}>{data.name}</p>
    </div>
  );
}

const Menu = ({ data, title }: { data: Array<IIngredient>, title: string }) => {
  return (
    <div>
      <h2 className={`${style.subtitle} text text_type_main-default mt-10`}>
        {title}
      </h2>
      <div className={`${style.container__ingredient}`}>
        {data.map(el => <Ingredients key={el._id} data={el} />)}
      </div>
    </div>
  );
}

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { burgerIngredients, burgerIngredientsIsLoad, burgerIngredientsIsFail, error } = useSelector(state => ({
    burgerIngredients: state.burgerState.burgerIngredients,
    burgerIngredientsIsLoad: state.burgerState.burgerIngredientsRequest,
    burgerIngredientsIsFail: state.burgerState.burgerIngredientsFailed,
    error: `Ошибка: ${state.burgerState.error}`
  }));
  const current = useSelector(state => state.initialReducer.tabCurrent);

  const scrollRef = useRef<HTMLDivElement>(null);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const refs = {
    bunRef: bunRef,
    sauceRef: sauceRef,
    mainRef: mainRef
  }

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.scrollTop >= 0 && scrollRef.current.scrollTop <= 237 && current !== "rolls") {
      dispatch(setTab("rolls"));
    } else if (scrollRef.current && scrollRef.current.scrollTop >= 237 && scrollRef.current.scrollTop <= 891 && current !== "sauces") {
      dispatch(setTab("sauces"));
    } else if (scrollRef.current && scrollRef.current.scrollTop >= 891 && current !== "toppings") {
      dispatch(setTab("toppings"));
    }
  }

  return (
    <div className={`${style.container__main}`} >
      <h1 className={`${style.title} text text_type_main-default mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <Tabs refs={refs} />
      <div className={`${style.container__menu}`} ref={scrollRef}>
        {burgerIngredientsIsLoad && <p> ЗАГРУЗКА </p>}
        {burgerIngredientsIsFail && <p> {error} </p>}
        <div ref={bunRef}>
          <Menu data={burgerIngredients.filter(x => x.type === 'bun')} title='Булки' />
        </div>
        <div ref={sauceRef}>
          <Menu data={burgerIngredients.filter(x => x.type === 'sauce')} title='Соусы' />
        </div>
        <div ref={mainRef}>
          <Menu data={burgerIngredients.filter(x => x.type === 'main')} title='Начинки' />
        </div>
      </div>
    </div>
  );
}
