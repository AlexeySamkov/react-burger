import { SET_CURRENT_ORDER } from '../actions/currentOrderActions';

interface CurrentOrderState {
  currentOrder: number | null;
}

const initialState: CurrentOrderState = {
  currentOrder: null,
};

export const currentOrderReducer = (state = initialState, action: any): CurrentOrderState => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    default:
      return state;
  }
};
