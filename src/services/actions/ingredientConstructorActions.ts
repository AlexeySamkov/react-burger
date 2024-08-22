import { v4 as uuidv4 } from 'uuid';

import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REMOVE_ALL_BUNS_FROM_CONSTRUCTOR,
  UPDATE_INGREDIENT_ORDER,
  TConstructorActions
} from './actions'
import { IIngredient } from '../../utils/types';


export const addIngredientToConstructor = (ingredient: IIngredient) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: { ...ingredient, uniqueId: uuidv4() }
  };
};

export const removeIngredientFromConstructor = (uniqueId: string): TConstructorActions => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: uniqueId
  };
};

export const removeAllBunsFromConstructor = (): TConstructorActions => {
  return {
    type: REMOVE_ALL_BUNS_FROM_CONSTRUCTOR
  };
};


export const updateIngredientOrder = (dragIndex: number, hoverIndex: number): TConstructorActions => {
  return {
    type: UPDATE_INGREDIENT_ORDER,
    payload: { dragIndex, hoverIndex }
  };
};
