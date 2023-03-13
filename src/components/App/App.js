import {useState, useEffect} from 'react';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {Modal} from '../Modal/Modal';
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {OrderDetails} from '../OrderDetails/OrderDetails';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails'
import {getAllIngridients} from '../../utils/burger-api'
import style from'./App.module.css';


export const App = () => {
  const [state, setState] = useState({
    burgerIngredients: [],
    burgerConstructor: [],
    totalPrice: 0,
    isOpen: false,
    tag: null,
    burgerConfig: {}
  });

  
  const addIngridient = ({data}) => {
    if (state.burgerConstructor.length === 0 && data.type !== 'bun'){
      return;
    }
    setState(prevState => ({
      ...prevState,
      burgerConstructor:[
        ...prevState.burgerConstructor,
        data
      ],
      totalPrice: prevState.totalPrice + data.price
    }));
  }

  useEffect(() => {
    getAllIngridients()
    .then(({data}) => {
      setState(prevState => ({
            ...prevState,
            burgerIngredients:data,
      }))
    })
    .catch((err) => console.log(err));
  }, []);


  const updateModal = (isOpen, tag, burgerConfig) => {
    setState(prevState => ({
      ...prevState,
      isOpen: isOpen,
      tag: tag ? tag : null,
      burgerConfig: burgerConfig ? burgerConfig : {}
    }));
  }


  return (
    <div className={`${style.App}`}>
      <AppHeader />
      <main className={`${style.container__burger} mb-10`}>
        <BurgerIngredients burgerIngredients={state.burgerIngredients} addIngridient={addIngridient} openModal={updateModal} />
        <BurgerConstructor burgerConstructor={state.burgerConstructor} totalPrice={state.totalPrice} openModal={updateModal} />
      </main>
      <section>
        <ModalOverlay isOpen={state.isOpen}/>
        <Modal onClose={updateModal} isOpen={state.isOpen}>
          {state.tag === 'Order' && <OrderDetails/>}
          {state.tag === 'Burger' && <IngredientDetails data={state.burgerConfig}/>}
        </Modal>
      </section>
    </div>
  );
}
