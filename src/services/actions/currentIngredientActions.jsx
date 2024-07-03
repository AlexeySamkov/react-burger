import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from './actions'


export const setCurrentIngredient = (ingredient) => ({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient
  });
  
  export const clearCurrentIngredient = () => ({
    type: CLEAR_CURRENT_INGREDIENT
  });