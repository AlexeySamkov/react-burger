import { request } from '../../utils/request';
import {
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR,
  TOrderActions, 
  TConstructorActions, 
  
} from './actions';
import {IIngredient} from '../../utils/types';
import { Dispatch } from 'redux';

type AppDispatch = Dispatch<TOrderActions | TConstructorActions>;

export const placeOrder = (ingredients: IIngredient) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await request('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients })
      });
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: res.order
      });
      dispatch({
        type: REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR
      });
    } catch (error: any) {
      dispatch({
        type: PLACE_ORDER_FAILED,
        payload: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
