import createSagaMiddleware from '@redux-saga/core';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from 'redux-persist';
import RootReducer from './index.Reducers';
import watcherSaga from './Sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store: any = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(watcherSaga);
