import { TWSTypes, TWsActions } from '../services/actions/actions';
import type { Middleware, MiddlewareAPI } from 'redux';
import type { RootState, AppDispatch } from '../services/actions/actions';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket;

    return next => (action: TWSTypes) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const token = payload;

      if (type === wsInit && token !== 'all') {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      
      if (type === wsInit && token === 'all') {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch({ type: onMessage, payload: data });
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};