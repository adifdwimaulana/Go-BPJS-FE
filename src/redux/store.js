import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducers from './reducers/index'

const middleware = applyMiddleware(promise, thunk, logger);
const store = createStore(rootReducers, middleware);

export default store;