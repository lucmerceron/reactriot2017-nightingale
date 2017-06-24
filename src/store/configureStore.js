import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

const envProd = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')
const middlewares = envProd ? applyMiddleware(thunk) : applyMiddleware(thunk, createLogger())

export default function configureStore(preloadedState = {}) {
  return createStore(
    rootReducer,
    preloadedState,
    middlewares,
  )
}
