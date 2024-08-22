import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from './actions'
import { IIngredient } from '../../utils/types';

export const setCurrentIngredient = (ingredient: IIngredient) => ({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient
  });
  
  export const clearCurrentIngredient = () => ({
    type: CLEAR_CURRENT_INGREDIENT
  });