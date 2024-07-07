import { createReducer } from '@reduxjs/toolkit';
import { getHeading } from './../../utils/getHeading';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REMOVE_ALL_BUNS_FROM_CONSTRUCTOR,
  REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  UPDATE_INGREDIENT_ORDER
} from './../actions/actions';

const initialState = {
  ingredients: [],
  groupTypes: [],
  currentIngredient: null,
  constructorIngredients: [],
  order: null,
  error: null,
};

export const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_ITEMS_SUCCESS, (state, action) => {
      state.ingredients = action.payload.map((item) => ({ ...item, counter: 0 }));
      state.groupTypes = [...new Set(action.payload.map(i => i.type))].map(type => ({
        type,
        name: getHeading(type)
      }));
      state.constructorIngredients = [];
      state.loading = false;
      state.error = null;
    })
    .addCase(GET_ITEMS_FAILED, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(SET_CURRENT_INGREDIENT, (state, action) => {
      state.currentIngredient = action.payload;
    })
    .addCase(CLEAR_CURRENT_INGREDIENT, (state) => {
      state.currentIngredient = null;
    })
    .addCase(ADD_INGREDIENT_TO_CONSTRUCTOR, (state, action) => {
      const newIngredient = action.payload;
      if (newIngredient.type === 'bun') {
        state.constructorIngredients.push({ ...newIngredient, position: 'top' });
        state.constructorIngredients.push({ ...newIngredient, position: 'bottom' });
        state.ingredients = state.ingredients.map(ingredient =>
          ingredient._id === newIngredient._id
            ? { ...ingredient, counter: ingredient.counter + 2 }
            : ingredient
        );
      } else {
        state.constructorIngredients.push(newIngredient);
        state.ingredients = state.ingredients.map(ingredient =>
          ingredient._id === newIngredient._id
            ? { ...ingredient, counter: ingredient.counter + 1 }
            : ingredient
        );
      }
    })
    .addCase(REMOVE_INGREDIENT_FROM_CONSTRUCTOR, (state, action) => {
      const uniqueId = action.payload;
      const removedIngredient = state.constructorIngredients.find(item => item.uniqueId === uniqueId);
      state.constructorIngredients = state.constructorIngredients.filter(
        item => item.uniqueId !== uniqueId
      );
      if (removedIngredient) {
        state.ingredients = state.ingredients.map(ingredient =>
          ingredient._id === removedIngredient._id
            ? { ...ingredient, counter: ingredient.counter - 1 }
            : ingredient
        );
      }
    })
    .addCase(REMOVE_ALL_BUNS_FROM_CONSTRUCTOR, (state) => {
      const buns = state.constructorIngredients.filter(item => item.type === 'bun');
      state.constructorIngredients = state.constructorIngredients.filter(item => item.type !== 'bun');
      buns.forEach(bun => {
        state.ingredients = state.ingredients.map(ingredient =>
          ingredient._id === bun._id
            ? { ...ingredient, counter: ingredient.counter - 1 }
            : ingredient
        );
      });
    })
    .addCase(PLACE_ORDER_SUCCESS, (state, action) => {
      state.order = action.payload;
    })
    .addCase(PLACE_ORDER_FAILED, (state, action) => {
      state.error = action.error;
    })
    .addCase(UPDATE_INGREDIENT_ORDER, (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const nonBunIngredients = state.constructorIngredients.filter(ingredient => ingredient.type !== 'bun');
      const [draggedItem] = nonBunIngredients.splice(dragIndex, 1);
      nonBunIngredients.splice(hoverIndex, 0, draggedItem);
      state.constructorIngredients = [
        ...state.constructorIngredients.filter(ingredient => ingredient.type === 'bun' && ingredient.position === 'top'),
        ...nonBunIngredients,
        ...state.constructorIngredients.filter(ingredient => ingredient.type === 'bun' && ingredient.position === 'bottom')
      ];
    })
    .addCase(REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR, (state) => {
      state.constructorIngredients = [];
    });
});
