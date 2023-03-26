import {useState, useEffect} from 'react';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {Modal} from '../Modal/Modal';
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {OrderDetails} from '../OrderDetails/OrderDetails';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {getAllIngridients} from '../../utils/burger-api';
import {BurgerIngredientsContext, BurgerConstructorContext, OrderContext} from '../../utils/appContext';
import style from'./App.module.css';


export const App = () => {
  const [state, setState] = useState({
    totalPrice: 0,
    isOpen: false,
    typeModal: null,
    burgerConfig: {}
  });

  const [burgerIngredients, setBurgerIngredients] = useState([]);
  const [burgerConstructor, setBurgerConstructor] = useState([]);
  const [order, setOrder] = useState({});

  
  const addIngridient = ({data}) => {
    if (burgerConstructor.length === 0 && data.type !== 'bun' || (burgerConstructor.length > 1 && burgerConstructor.at(-1).type === 'bun')){
      return;
    }
    
    setBurgerConstructor(prev => ([...prev, data]));
  }

  useEffect(() => {
    getAllIngridients()
    .then(({data}) => {
      setBurgerIngredients(data);
    })
    .catch((err) => console.log(err));
  }, []);


  const updateModal = (isOpen, tag, burgerConfig) => {
    setState(prevState => ({
      ...prevState,
      isOpen: isOpen,
      typeModal: tag ? tag : null,
      burgerConfig: burgerConfig ? burgerConfig : {}
    }));
  }

  return (
      <div className={`${style.App}`}>
        <AppHeader />
        <OrderContext.Provider value={{order, setOrder}}>
          <main className={`${style.container__burger} mb-10`}>
            <BurgerIngredientsContext.Provider value={{burgerIngredients, setBurgerIngredients}}>
              <BurgerIngredients addIngridient={addIngridient} openModal={updateModal} />
              <BurgerConstructorContext.Provider value={{burgerConstructor, setBurgerConstructor}}>
                <BurgerConstructor openModal={updateModal} />
              </BurgerConstructorContext.Provider>
            </BurgerIngredientsContext.Provider>
          </main>
          <section>
            <ModalOverlay isOpen={state.isOpen}/>
            <Modal onClose={updateModal} isOpen={state.isOpen}>
              {state.typeModal === 'Order' && <OrderDetails/>}
              {state.typeModal === 'Burger' && <IngredientDetails data={state.burgerConfig}/>}
            </Modal>
          </section>
        </OrderContext.Provider>
      </div>
    
  );
}
