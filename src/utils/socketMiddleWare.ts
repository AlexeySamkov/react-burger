import { TWSTypes, TWsActions } from '../services/actions/actions';
import type { Middleware, MiddlewareAPI } from 'redux';
import type { RootState, AppDispatch } from '../services/actions/actions';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSTypes) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit && payload) {
        const { token, endpoint } = payload;
        let fullUrl = wsUrl;

        // Добавляю токен в URL, если он передан
        if (token) {
          fullUrl += `?token=${token}`;
        }

        // Добавляю endpoint в URL, если он передан
        if (endpoint) {
          fullUrl += `${endpoint}`;
        }
        socket = new WebSocket(fullUrl);
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
