import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import CustomButton from '../components/custom-button.component'

afterEach(cleanup)

test('event should be fire when clicking the button', () => {
  const clickFn = jest.fn()
  const { getByText } = render(<CustomButton onClick={clickFn}>Test Button</CustomButton>)

  fireEvent.click(getByText('Test Button'))
  expect(clickFn).toHaveBeenCalledTimes(1)
})
