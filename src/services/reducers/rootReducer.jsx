import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});
