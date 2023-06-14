import style from './ingredient.module.css';
import { IngredientDetails } from '../components/IngredientDetails/IngredientDetails';

export const IngredientPage = () => {
  return (
    <div className={`${style.container__main} mt-10 mb-15`}>
        <IngredientDetails />
    </div>
  )
}