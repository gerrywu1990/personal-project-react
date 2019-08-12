import React from 'react'
import { render, fireEvent, cleanup, wait } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import SearchForm from '../components/search-form.component'

expect.extend({ toBeInTheDocument })

const setup = updateUserAndDataProp => {
  const { getByLabelText, getByText, getByTestId } = render(
    <SearchForm updateUserAndData={updateUserAndDataProp} />
  )
  const searchInput = getByLabelText('Github Username')
  const getUserButton = getByText('GET USER')
  const form = getByTestId('search-form')

  return {
    searchInput,
    getUserButton,
    form,
  }
}

afterEach(cleanup)

describe('SearchForm component', () => {
  test('renders', () => {
    const { form } = setup()
    expect(form).toBeInTheDocument()
  })

  test('user input is echoed', () => {
    const { searchInput } = setup()
    const text = 'testingusername'
    expect(searchInput.value).toMatch('')
    fireEvent.change(searchInput, { target: { value: text } })
    expect(searchInput.value).toMatch(text)
  })

  // Questions: 1. how to mock the http request?  2. why the mock fn is called 0 time?
  test.skip('call back should be trigged if username is valid', async () => {
    const updateUserAndDataProp = jest.fn(() => console.log('call back is called'))
    const username = 'gerrywu1990'
    const { form, searchInput } = setup(updateUserAndDataProp)
    fireEvent.change(searchInput, { target: { value: username } })
    fireEvent.submit(form)

    await wait(() => expect(updateUserAndDataProp).toHaveBeenCalledTimes(1))
    // expect(updateUserAndDataProp).toBeCalledWith(username)
  })

  test('call back should not be trigged if username is inalid', async () => {
    const updateUserAndDataProp = jest.fn()
    const { form, searchInput } = setup(updateUserAndDataProp)
    fireEvent.change(searchInput, { target: { value: 'asgasgrsgruighrwofyuworfu' } })
    fireEvent.submit(form)

    await wait(() => expect(updateUserAndDataProp).toHaveBeenCalledTimes(0))
  })
})
