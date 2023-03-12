import style from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

export const IngredientDetails = ({data}) => {
  return (
      <div className={`${style.container__main} mt-10 mb-15`}>
        <p className={`text text_type_main-large mb-8`}>Детали ингредиента</p>
        <img className={style.image} src={data.image} />
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

const burgerData = PropTypes.shape({
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

IngredientDetails.propTypes = {
  burgerIngredients: PropTypes.arrayOf(burgerData)
};