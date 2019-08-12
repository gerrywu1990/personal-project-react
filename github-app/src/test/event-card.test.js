import React from 'react'
import { render, cleanup } from '@testing-library/react'
import {
  toBeInTheDocument,
  toContainElement,
  toHaveTextContent,
  toHaveAttribute,
} from '@testing-library/jest-dom'

import EventCard from '../components/event-card.component.jsx'

expect.extend({ toBeInTheDocument, toContainElement, toHaveTextContent, toHaveAttribute })

afterEach(cleanup)

const props = {
  title: 'my github repo',
  subtitle: 'repo forked from',
  url: '#',
}

test('it renders a list item with title and subtitle wrapped in a link, which linked to the expected url', () => {
  const { getByTestId } = render(<EventCard {...props} />)

  const listItemNode = getByTestId('list-item')
  const anchorNode = getByTestId('external-link')

  expect(listItemNode).toContainElement(anchorNode)

  expect(anchorNode).toHaveAttribute('href', props.url)
  expect(anchorNode).toHaveTextContent(props.title)
  expect(anchorNode).toHaveTextContent(props.subtitle)
})
