import { request } from '../../utils/request';
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILED, REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR } from './actions';

export const placeOrder = (ingredients) => {
  return async (dispatch) => {
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
    } catch (error) {
      dispatch({
        type: PLACE_ORDER_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
