import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import secrets, { saga } from './secrets'

const reducer = combineReducers({
  secrets,
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({
        trace: true,
      })
    : compose

export default preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  sagaMiddleware.run(saga)

  return store
}
