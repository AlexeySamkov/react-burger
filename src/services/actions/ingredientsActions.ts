import { GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from './actions';
import { request } from '../../utils/request';
import { Dispatch } from 'redux';
import { TIngredientsActions } from '../actions/actions'
import { IIngredient } from '../../utils/types';

export const fetchIngredients = () => {
  return async (dispatch: Dispatch<TIngredientsActions>) => {
    try {
      const data = await request('/ingredients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ingredients = data.data.map((item: IIngredient) => ({ ...item, counter: 0 }));
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: ingredients,
      } as TIngredientsActions);
    } catch (error: any) {
      dispatch({
        type: GET_ITEMS_FAILED,
        payload: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
