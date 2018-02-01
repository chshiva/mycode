import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import localForage from 'localforage';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const middleware = routerMiddleware(history);

// Import custom components
import rootReducers from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers(rootReducers);
const store = createStore(reducers, compose(
    composeEnhancers(applyMiddleware(thunkMiddleware, middleware, logger))
));

window.store = store;
export default store;