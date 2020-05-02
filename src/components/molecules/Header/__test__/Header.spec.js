import React from 'react'

import { render } from '__test__/render'

import Header from '../Header'

describe('Header', () => {
  it('should display a button to add a new secret', () => {
    const { getByText } = render(<Header />)

    expect(getByText('New secret')).toBeInTheDocument()
  })
})
