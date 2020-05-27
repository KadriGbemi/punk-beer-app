import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../redux/_reducers';
import { saveToLocalStorage, loadFromLocalStorage } from './persist';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  storeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
