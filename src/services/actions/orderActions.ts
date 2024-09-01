import { request } from '../../utils/request';
import type { AppDispatch } from '../actions/actions';
import {
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR, 
  RESET_ORDER_NUMBER
} from './actions';

export const placeOrder = (ingredients: string[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: RESET_ORDER_NUMBER });      
      const token = localStorage.getItem('accessToken');
      const res = await request('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
