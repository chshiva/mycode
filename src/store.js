import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const middleware = routerMiddleware(history);

// Import custom components
import rootReducer from './rootReducer';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

/**
 * Create redux store that holds the app state.
 */
const store = createStore(rootReducer, compose(
    composeEnhancers(applyMiddleware(thunkMiddleware, middleware, logger))
));

export default store;