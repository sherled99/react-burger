import {useEffect} from 'react';
import { useDispatch } from '../services/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {BurgerIngredients} from '../components/BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../components/BurgerConstructor/BurgerConstructor';
import { getUserRequest } from '../services/actions/auth';
import style from'./home.module.css';
 
export function HomePage(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);


  return (
      <div className={`${style.home_page}`}>
          <main className={`${style.container__burger} mb-10`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </main>
          <section>
          </section>
      </div>
  );
}
