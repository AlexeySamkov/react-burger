import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { thunk } from 'redux-thunk';
import { socketMiddleware } from '../utils/socketMiddleWare';
import { wsFeedUrl } from '../utils/const';

import {
  WS_CONNECT 
, WS_DISCONNECT
, WS_CONNECT_SUCCESS 
, WS_CONNECT_ERROR 
//, WS_RECEIVE_ORDERS
, WS_GET_MESSAGE
, TWsActions 
  
} from '../services/actions/actions';


const wsActions: TWsActions = {
  wsInit: WS_CONNECT,
  onOpen: WS_CONNECT_SUCCESS,
  onError: WS_CONNECT_ERROR,
  onClose: WS_DISCONNECT,
  onMessage: WS_GET_MESSAGE,
};


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsFeedUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

export default store;