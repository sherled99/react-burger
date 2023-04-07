import {useSelector} from 'react-redux';
import style from './IngredientDetails.module.css';

export const IngredientDetails = () => {
    const data = useSelector(state => state.initialReducer.burgerConfig);
  return (
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
  )
}