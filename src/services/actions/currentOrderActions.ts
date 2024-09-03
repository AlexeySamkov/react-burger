import { request } from '../../utils/request';
import type { AppDispatch } from '../actions/actions';
import {
  SET_CURRENT_ORDER,
  CLEAR_CURRENT_ORDER,
  FETCH_CURRENT_ORDER_SUCCESS,
  FETCH_CURRENT_ORDER_FAILED,
  FETCH_CURRENT_ORDER_REQUEST
} from '../actions/actions';

export const fetchOrder = (orderNumber: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CURRENT_ORDER_REQUEST }); // Устанавливаем loading в true при старте запроса
    try {
      const res = await request(`/orders/${orderNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: FETCH_CURRENT_ORDER_SUCCESS,
        payload: res.orders[0],
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_CURRENT_ORDER_FAILED,
        payload: `Произошла ошибка: ${error.message}`,
      });
    }
  };
};

export const setCurrentOrder = (orderNumber: number) => ({
  type: SET_CURRENT_ORDER,
  payload: orderNumber,
});

export const clearCurrentOrder = () => ({
  type: CLEAR_CURRENT_ORDER,
});  

