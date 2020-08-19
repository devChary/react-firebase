import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './root.reducer';

const middlewares = [logger, thunk];

export const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

export default { store, persistor };