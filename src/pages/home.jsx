import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {AppHeader} from '../components/AppHeader/AppHeader';
import {BurgerIngredients} from '../components/BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../components/BurgerConstructor/BurgerConstructor';
import {Modal} from '../components/Modal/Modal';
import {OrderDetails} from '../components/OrderDetails/OrderDetails';
import {IngredientDetails} from '../components/IngredientDetails/IngredientDetails';
import {getIngredients} from '../services/actions/burger';
import style from'./home.module.css';
 
export function HomePage(){
  const dispatch = useDispatch();
  const refreshToken = useSelector(state => state.authReducer.refreshToken);
  const {typeModal, isOpen} = useSelector(state => ({
    typeModal: state.initialReducer.typeModal,
    isOpen: state.initialReducer.isOpen
  }));

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return (
      <div className={`${style.home_page}`}>
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
