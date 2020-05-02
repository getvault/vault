import React from 'react'

import { render } from '__test__/render'

import BasicButton from '../BasicButton'

describe('BasicButton', () => {
  it('should display a button', () => {
    const { container } = render(<BasicButton />)

    expect(container.querySelector('button')).toBeInTheDocument()
  })
})
