import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(persistConfig, reducers);

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
