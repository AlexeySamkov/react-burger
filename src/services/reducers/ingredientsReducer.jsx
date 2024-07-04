import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REMOVE_ALL_BUNS_FROM_CONSTRUCTOR,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED
} from './../actions/actions';

import { getHeading } from './../../utils/getHeading';

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
      const defaultBun = action.payload.find(item => item.type === 'bun');

      if (defaultBun) {
        const topBun = { ...defaultBun, position: 'top', uniqueId: uuidv4() };
        const bottomBun = { ...defaultBun, position: 'bottom', uniqueId: uuidv4() };
        state.constructorIngredients = [topBun, bottomBun];

        state.ingredients = state.ingredients.map(ingredient =>
          ingredient._id === defaultBun._id
            ? { ...ingredient, counter: ingredient.counter + 2 }
            : ingredient
        );
      } else {
        state.constructorIngredients = [];
      }

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
        state.constructorIngredients.push({ ...newIngredient, position: 'top', uniqueId: uuidv4() });
        state.constructorIngredients.push({ ...newIngredient, position: 'bottom', uniqueId: uuidv4() });

        // state.ingredients = state.ingredients.map(ingredient => {...}):
        // Обновляется массив ingredients, увеличивая счётчик (counter) на 2 для добавленного ингредиента, 
        // так как булочка добавляется двумя частями.
        // честно говоря получилась какая то сложнота, 
        // но все мылсли сходятся именно к тому, что бы менять state.ingredients
        state.ingredients = state.ingredients.map(ingredient =>
          ingredient._id === newIngredient._id
            ? { ...ingredient, counter: ingredient.counter + 2 }
            : ingredient
        );
      } else {
        state.constructorIngredients.push({ ...newIngredient, uniqueId: uuidv4() });
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
    });
});
