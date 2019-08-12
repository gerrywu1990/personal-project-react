import React from 'react'
import axios from 'axios'
import { render, fireEvent, cleanup, wait } from '@testing-library/react'

import App from '../App'
import mockEvent from '../mock-data/event-data-mock'

afterEach(cleanup)

test('renders search form but not any event list on initial load', () => {
  const { getByTestId, queryByTestId } = render(<App />)

  getByTestId('search-form')
  expect(queryByTestId('event-list')).toBeNull()
})

test('remain on the search form when search is empty', async () => {
  const { getByText, getByTestId, queryByText, queryByTestId } = render(<App />)

  const getUserButton = getByText('GET USER')

  fireEvent.click(getUserButton)

  await wait(() => getByTestId('search-form'))

  expect(queryByText('back')).toBeNull()
  expect(queryByTestId('event-list')).toBeNull()
})

// test('renders event view if user is valid', async () => {
//   const { getByText, queryByTestId, getByLabelText, queryAllByTestId } = render(<App />)

//   const validUsername = 'gerrywu1990'
//   axios.get = jest.fn(() => Promise.resolve(mockEvent))
//   const searchInput = getByLabelText('Github Username')
//   const getUserButton = getByText('GET USER')

//   fireEvent.change(searchInput, { target: { value: validUsername } })
//   fireEvent.click(getUserButton)

//   // await wait(() => expect(queryByTestId('search-form')).toBeNull())
//   await wait(() => getByText(validUsername))
//   console.log(queryAllByTestId('event-section'))
//   // getByText(validUsername)
//   // getByText('Back')
//   // expect(queryAllByTestId('event-section').length).toBe(2)
// })
