export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

export const setCurrentOrder = (orderNumber: number) => ({
  type: SET_CURRENT_ORDER,
  payload: orderNumber,
});