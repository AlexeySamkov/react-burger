import {
    WS_CONNECT,
    WS_CONNECT_SUCCESS,
    WS_DISCONNECT,
    WS_CONNECT_ERROR,
    WS_GET_MESSAGE
  } from '../actions/actions';
  import { wsReducer, initialState } from './wsReducer';
  // import {
  //   TResponseData, IOrderHistory
  // } from '../../utils/types'

  
  describe('wsReducer', () => {
  
    it('should return the initial state when an unknown action is passed', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      const state = wsReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  
    it('should handle WS_CONNECT', () => {
      const action = { type: WS_CONNECT };
      const expectedState = {
        ...initialState,
        isConnected: false,
        error: null,
      };
      const state = wsReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle WS_CONNECT_SUCCESS', () => {
      const action = { type: WS_CONNECT_SUCCESS };
      const expectedState = {
        ...initialState,
        isConnected: true,
        error: null,
      };
      const state = wsReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle WS_DISCONNECT', () => {
      const action = { type: WS_DISCONNECT };
      const expectedState = {
        isConnected: false,
        orders: {
          success: false,
          orders: [],
          total: 0,
          totalToday: 0,
        },
        error: null,
      };
      const state = wsReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle WS_CONNECT_ERROR', () => {
      const action = { type: WS_CONNECT_ERROR };
      const expectedState = {
        ...initialState,
        isConnected: false,
        error: 'Ошибка подключения к WebSocket',
      };
      const state = wsReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle WS_GET_MESSAGE', () => {
      const mockOrders = [
        { _id: '1', createdAt: '2024-09-05T12:00:00.000Z', ingredients: [], status: 'done', name: 'Order 1', number: 1, updatedAt: '2024-09-05T12:01:00.000Z' },
        { _id: '2', createdAt: '2024-09-06T12:00:00.000Z', ingredients: [], status: 'done', name: 'Order 2', number: 2, updatedAt: '2024-09-06T12:01:00.000Z' },
      ];
  
      const action = {
        type: WS_GET_MESSAGE,
        payload: {
          success: true,
          orders: mockOrders,
          total: 100,
          totalToday: 50,
        },
      };
  
      const expectedState = {
        ...initialState,
        orders: {
          success: true,
          orders: mockOrders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
          total: 100,
          totalToday: 50,
        },
      };
  
      const state = wsReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
  