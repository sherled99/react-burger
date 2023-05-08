import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {Modal} from '../Modal/Modal';
import {OrderDetails} from '../OrderDetails/OrderDetails';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {getIngredients} from '../../services/actions/burger';
import style from'./App.module.css';
 
export const App = () => {
  const dispatch = useDispatch();
  const {typeModal, isOpen} = useSelector(state => ({
    typeModal: state.initialReducer.typeModal,
    isOpen: state.initialReducer.isOpen
  }));

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
      <div className={`${style.App}`}>
        <AppHeader />
          <main className={`${style.container__burger} mb-10`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </main>
          <section>
            {
              isOpen && 
              <Modal>
                {typeModal === 'Order' && <OrderDetails/>}
                {typeModal === 'Burger' && <IngredientDetails/>}
              </Modal>
            }
          </section>
      </div>
    
  );
}
