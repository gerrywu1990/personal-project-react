import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import SearchForm from './search-form.component'

const onSubmitFn = jest.fn()

const setup = () => {
  const utils = render(<SearchForm onSubmit={onSubmitFn} />)
  const searchInput = utils.getByLabelText('Github Username')
  const getUserButton = utils.getByText('GET USER')
  const form = utils.container.querySelector('form')

  return {
    searchInput,
    getUserButton,
    form,
    ...utils,
  }
}

afterEach(cleanup)

test('Search Input value should be empty by default', () => {
  const { searchInput } = setup()
  expect(searchInput.value).toBe('')
})

test('Search Input value should be updated when value is inserted', () => {
  const { searchInput } = setup()
  const text = 'testingusername'
  fireEvent.change(searchInput, { target: { value: text } })
  expect(searchInput.value).toBe(text)
})

// test('It should not submit the form if search input is empty', () => {
//   const { getUserButton } = setup()
//   fireEvent.click(getUserButton)
//   expect(onSubmitFn).toHaveBeenCalledTimes(0)
// })

test('It should submit the form if search input has value', () => {
  const { form, searchInput } = setup()

  fireEvent.change(searchInput, { target: { value: 'testing' } })
  fireEvent.submit(form)
  expect(onSubmitFn).toHaveBeenCalledTimes(1)
})
