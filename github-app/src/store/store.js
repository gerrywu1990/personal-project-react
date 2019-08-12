import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, ReduxPromise))
)
