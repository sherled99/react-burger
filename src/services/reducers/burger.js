import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, ADD_TO_BURGER_CONSTRUCTOR, CLEAR_BURGER_CONSTRUCTOR, 
  DELETE_TO_BURGER_CONSTRUCTOR, DELETE_BUN_TO_BURGER_CONSTRUCTOR, UPDATE_ORDER_IN_BURGER_CONSTRUCTOR} from '../actions/burger';

export const initialState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false,
    burgerConstructor: [],
    error: null
  };

  export const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
          ...state,
          burgerIngredientsRequest: true
        };
      }
      case GET_INGREDIENTS_SUCCESS: {
        return { ...state, burgerIngredientsRequest: false, burgerIngredients: action.items, burgerIngredientsFailed: false };
      }
      case GET_INGREDIENTS_FAILED: {
        return { ...state, burgerIngredientsFailed: true, burgerIngredientsRequest: false, error: action.error };
      }
      case ADD_TO_BURGER_CONSTRUCTOR: {
        return {
          ...state,
          burgerConstructor: [...state.burgerConstructor, {...action.ingredient}]
        };
      }
      case DELETE_TO_BURGER_CONSTRUCTOR: {
        return {
          ...state,
          burgerConstructor: state.burgerConstructor.filter((el) => el.index != action.index)
        };
      }
      case DELETE_BUN_TO_BURGER_CONSTRUCTOR: {
        return {
          ...state,
          burgerConstructor: state.burgerConstructor.filter((el) => el.type != 'bun')
        };
      }
      case UPDATE_ORDER_IN_BURGER_CONSTRUCTOR: {
        var fIndex = action.item.index;
        const lIndex = action.data.index;
        return {
          ...state,
          burgerConstructor: state.burgerConstructor.map(x => {
            if (x.index === fIndex) {
              x.index = lIndex;
              return x;
            } else if (x.index === lIndex){
              x.index = fIndex;
              return x;
            } else {
              return x;
            }
          })
        };
      }
      case CLEAR_BURGER_CONSTRUCTOR: {
        return { ...state, burgerConstructor: [] };
      }
      default: {
        return state;
      }
    }
  };