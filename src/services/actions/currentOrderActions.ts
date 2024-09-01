import {
  SET_CURRENT_ORDER,
  CLEAR_CURRENT_ORDER
} from '../actions/actions'


export const setCurrentOrder = (orderNumber: number) => ({
  type: SET_CURRENT_ORDER,
  payload: orderNumber,
});

export const clearCurrentOrder = () => ({
  type: CLEAR_CURRENT_ORDER,
});  