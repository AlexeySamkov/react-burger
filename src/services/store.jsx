import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { thunk } from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// расширение хранилища
const enhancer = composeEnhancers(applyMiddleware(thunk));
// создание хранилища
const store = createStore(rootReducer, enhancer);


export default store;


