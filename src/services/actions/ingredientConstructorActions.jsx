import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const REMOVE_ALL_BUNS_FROM_CONSTRUCTOR = 'REMOVE_ALL_BUNS_FROM_CONSTRUCTOR';

export const addIngredientToConstructor = (ingredient) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: { ...ingredient, uniqueId: uuidv4() } // Добавляем уникальный идентификатор
  };
};

export const removeIngredientFromConstructor = (uniqueId) => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: uniqueId // Удаляем ингредиент по уникальному идентификатору
  };
};

export const removeAllBunsFromConstructor = () => {
  return {
    type: REMOVE_ALL_BUNS_FROM_CONSTRUCTOR
  };
};
