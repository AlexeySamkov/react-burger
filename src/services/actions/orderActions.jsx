import { baseAPI } from '../../utils/const';
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILED } from './actions'

export const placeOrder = (order) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${baseAPI}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        });
        if (!response.ok) {
          throw new Error('Произошла ошибка при размещении заказа: ' + response.statusText);
        }
        const res = await response.json();
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          payload: res.order
        });
      } catch (error) {
        dispatch({
          type: PLACE_ORDER_FAILED,
          error: `Произошла ошибка: ${error.message}`
        });
      }
    };
  };