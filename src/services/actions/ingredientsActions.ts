import { GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from './actions';
import { request } from '../../utils/request';

export const fetchIngredients = () => {
  return async (dispatch) => {
    try {
      const data = await request('/ingredients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ingredients = data.data.map((item) => ({ ...item, counter: 0 }));
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: ingredients
      });
    } catch (error) {
      dispatch({
        type: GET_ITEMS_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
