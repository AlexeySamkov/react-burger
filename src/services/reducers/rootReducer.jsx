import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer'



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer, 
  user: userReducer
});
