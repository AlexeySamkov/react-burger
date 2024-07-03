import { createReducer } from '@reduxjs/toolkit'

import {  GET_ITEMS_SUCCESS,
          GET_ITEMS_FAILED, 
          SET_CURRENT_INGREDIENT, 
          CLEAR_CURRENT_INGREDIENT,
          ADD_INGREDIENT_TO_CONSTRUCTOR, 
          REMOVE_INGREDIENT_FROM_CONSTRUCTOR, 
          PLACE_ORDER_SUCCESS, 
          PLACE_ORDER_FAILED 
 } from './../actions/actions'

 import {getHeading} from './../../utils/getHeading'

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
      state.ingredients = action.payload;
      state.groupTypes = [...new Set(action.payload.map(i => i.type))].map(type => ({
        type,
        name: getHeading(type)
      }));
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
      state.constructorIngredients.push(action.payload);
    })
    .addCase(REMOVE_INGREDIENT_FROM_CONSTRUCTOR, (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        item => item._id !== action.payload
      );
    })
    .addCase(PLACE_ORDER_SUCCESS, (state, action) => {
      state.order = action.payload;
    })
    .addCase(PLACE_ORDER_FAILED, (state, action) => {
      state.error = action.error;
    });
});