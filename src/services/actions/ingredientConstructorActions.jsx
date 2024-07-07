import { v4 as uuidv4 } from 'uuid';

import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REMOVE_ALL_BUNS_FROM_CONSTRUCTOR,
  UPDATE_INGREDIENT_ORDER
} from './actions'


export const addIngredientToConstructor = (ingredient) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: { ...ingredient, uniqueId: uuidv4() } 
  };
};

export const removeIngredientFromConstructor = (uniqueId) => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: uniqueId 
  };
};

export const removeAllBunsFromConstructor = () => {
  return {
    type: REMOVE_ALL_BUNS_FROM_CONSTRUCTOR
  };
};


export const updateIngredientOrder = (dragIndex, hoverIndex) => {
  return {
    type: UPDATE_INGREDIENT_ORDER,
    payload: { dragIndex, hoverIndex }
  };
};
