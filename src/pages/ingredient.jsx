import {useEffect} from 'react';
import style from './ingredient.module.css';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getIngredients } from '../services/actions/burger';

export const IngredientPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const ingredients = useSelector(state => state.burgerState.burgerIngredients);
    let data;

    useEffect(() => {
        dispatch(getIngredients());
      }, [dispatch]);

  if (!ingredients){
    return null;
  }

  if (ingredients){
    data = ingredients.find(x => x._id === id); 
  }

  if (!data){
    return null;
  }

  return (
    <>
        <div className={`${style.container__main} mt-10 mb-15`}>
        <p className={`text text_type_main-large mb-8`}>Детали ингредиента</p>
        <img className={style.image} src={data.image} alt={data.name} />
        <p className={`text text_type_main-medium mt-15 mb-2`}>{data.name}</p>
        <div className={`text text_type_main-default ${style.container__colories}`}>
            <div className={`mr-5`}>
                <p>Калории,ккал</p>
                <p>{data.calories}</p>
            </div>
            <div className={`mr-5`}>
                <p>Белки, г</p>
                <p>{data.proteins}</p>
            </div>
            <div className={`mr-5`}>
                <p>Жиры, г</p>
                <p>{data.fat}</p>
            </div>
            <div className={``}>
                <p>Углеводы, г</p>
                <p>{data.carbohydrates}</p>
            </div>
        </div>
      </div>
    </>
  )
}