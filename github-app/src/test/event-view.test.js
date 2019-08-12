import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { toHaveTextContent } from '@testing-library/jest-dom'

import EventView from '../components/event-view.component'

expect.extend({ toHaveTextContent })

const props = {
  currentUser: 'gerry',
  forks: [],
  pullRequest: [],
  handleBackButton: jest.fn(),
}

afterEach(cleanup)

test('renders event view', async () => {
  const { getByTestId } = render(<EventView {...props} />)

  getByTestId('event-view')
  expect(getByTestId('username-header')).toHaveTextContent(props.currentUser)
  fireEvent.click(getByTestId('back-button'))
  expect(props.handleBackButton).toHaveBeenCalledTimes(1)
})
