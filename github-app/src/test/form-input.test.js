import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import FormInput from '../components/form-input.component.jsx'

afterEach(cleanup)

const props = {
  label: 'input label',
  id: 'search-input',
}

test('renders the correct label text', () => {
  const { getByText } = render(<FormInput {...props} />)

  getByText(props.label)
})

test('renders a text input', () => {
  const { getByLabelText } = render(<FormInput {...props} />)
  const formInput = getByLabelText(props.label)

  expect(formInput).toBeDefined()
})

test('will use the id prop to connect label to form input tag', () => {
  const { label, id } = props
  const { getByLabelText, getByText } = render(<FormInput {...props} />)

  const inputLabel = getByText(label)
 const formInput = getByLabelText(label)

  expect(inputLabel.htmlFor).toEqual(id)
  expect(formInput.id).toEqual(id)
})


