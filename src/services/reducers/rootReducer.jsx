import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { passwordReducer } from './passwordReducer';



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer, 
  user: userReducer,
  password: passwordReducer
});
