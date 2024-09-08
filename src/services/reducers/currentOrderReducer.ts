import { 
  SET_CURRENT_ORDER, 
  CLEAR_CURRENT_ORDER, 
  FETCH_CURRENT_ORDER_REQUEST, // Добавляем новый экшен
  FETCH_CURRENT_ORDER_SUCCESS, 
  FETCH_CURRENT_ORDER_FAILED 
} from '../actions/actions';
import { IOrderHistory } from '../../utils/types';

interface CurrentOrderState {
  currentOrder: number | null;
  orderDetails: IOrderHistory | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CurrentOrderState = {
  currentOrder: null,
  orderDetails: null,
  loading: false,
  error: null,
};

export const currentOrderReducer = (state = initialState, action: any): CurrentOrderState => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case CLEAR_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: null,
        orderDetails: null,
        loading: false,
        error: null,
      };
    case FETCH_CURRENT_ORDER_REQUEST: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CURRENT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      };
    case FETCH_CURRENT_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
