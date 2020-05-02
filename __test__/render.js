import { render as defaultRender } from '@testing-library/react'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import * as secrets from '~state/secrets/secrets.reducer'

const mockStore = configureMockStore([])

export const initState = {
  secrets: secrets.initState,
}

export const render = (child, defaultState = initState) => {
  const store = mockStore(defaultState)

  const rendered = defaultRender(<Provider store={store}>{child}</Provider>)

  return {
    ...rendered,
    store,
  }
}
