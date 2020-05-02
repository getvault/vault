import React from 'react'
import { fireEvent } from '@testing-library/react'

import { render } from '__test__/render'

import Secret from '../Secret'

const aSecret = {
  id: 'id',
  label: 'foo',
  value: 'bar',
}

describe('Secret', () => {
  it('should display a description and a secret', () => {
    const { getByPlaceholderText, getByText } = render(
      <Secret secret={aSecret} />
    )

    expect(getByText('foo')).toBeInTheDocument()
    expect(getByPlaceholderText('Secret').value).toEqual('bar')
  })

  it('should display a button to generate a password', () => {
    const { getByText } = render(<Secret secret={aSecret} />)

    expect(getByText('Generate password')).toBeInTheDocument()
  })

  it('should display a button to delete the secret', () => {
    const { getByLabelText } = render(<Secret secret={aSecret} />)

    expect(getByLabelText('Delete secret')).toBeInTheDocument()
  })

  it('should display an input for an expiration date', () => {
    const { getByPlaceholderText } = render(<Secret secret={aSecret} />)

    expect(getByPlaceholderText('Add expiration date')).toBeInTheDocument()
  })

  it('should generate a password', () => {
    const { getByPlaceholderText, getByText } = render(
      <Secret secret={aSecret} />
    )

    fireEvent.click(getByText('Generate password'))

    expect(getByPlaceholderText('Secret').value.length).toEqual(
      aSecret.value.length + 10
    )
  })
})
