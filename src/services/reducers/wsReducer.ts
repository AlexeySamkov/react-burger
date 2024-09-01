import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECT_SUCCESS,
  WS_CONNECT_ERROR,
  WS_GET_MESSAGE,
  TWSTypes
} from '../actions/actions';

import {
  TResponseData, IOrderHistory
} from '../../utils/types'

interface IWsState {
  isConnected: boolean;
  orders: TResponseData | null;
  error: string | null;
}

const initialState: IWsState = {
  isConnected: false,
  orders: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: null,
};

export const wsReducer = (state = initialState, action: TWSTypes): IWsState => {
  switch (action.type) {
    case WS_CONNECT:
      return {
        ...state,
        isConnected: false,
        error: null,
      };
    case WS_CONNECT_SUCCESS:
      return {
        ...state,
        isConnected: true,
        error: null,
      };
    case WS_DISCONNECT:
      return {
        ...state,
        isConnected: false,
        orders: {
          success: false,
          orders: [],
          total: 0,
          totalToday: 0,
        },
        error: null,
      };
    case WS_CONNECT_ERROR:
      return {
        ...state,
        isConnected: false,
        error: 'Ошибка подключения к WebSocket',
      };
    // case WS_GET_MESSAGE:
    //   return {
    //     ...state,
    //     orders: {
    //       ...state.orders,
    //       ...action.payload,
    //       orders: action.payload.orders.sort((a: IOrderHistory, b: IOrderHistory) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    //     },
    //   };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: {
          success: action.payload.success,
          orders: action.payload.orders.sort(
            (a: IOrderHistory, b: IOrderHistory) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };

    default:
      return state;
  }
};