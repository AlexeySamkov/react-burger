import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { passwordReducer } from './passwordReducer';
import { wsReducer } from './wsReducer'
import { currentOrderReducer } from './currentOrderReducer'
import { locationReducer } from './locationReducer';



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer, 
  user: userReducer,
  password: passwordReducer, 
  ws: wsReducer,
  currentOrder: currentOrderReducer,
  location: locationReducer
});
