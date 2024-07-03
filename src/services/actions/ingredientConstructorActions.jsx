import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from './actions'


export const addIngredientToConstructor = (ingredient) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: ingredient
  });
  
  export const removeIngredientFromConstructor = (ingredientId) => ({
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: ingredientId
  });
  