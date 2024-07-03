import { baseAPI } from '../../utils/const';
import { GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from './actions'

export const fetchIngredients = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseAPI}/ingredients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' // Явно указываем тип контента
        }
      });
      if (!response.ok) {
        throw new Error('Произошла ошибка при запросе данных: ' + response.statusText);
      }
      const res = await response.json();
      const data = res.data.map((item) => ({ ...item, counter: 0}));
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: GET_ITEMS_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};


