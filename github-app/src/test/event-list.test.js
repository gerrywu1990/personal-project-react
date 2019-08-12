import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import {
    toContainElement,
  toHaveTextContent,
} from '@testing-library/jest-dom'

import EventList from '../components/event-list.component.jsx'

expect.extend({ toContainElement, toHaveTextContent })

const propsForForks = {
  type: 'forks',
  heading: 'recent forks',
  data: [
    {
      forkFrom: 'bridge-school/new-repo',
      repo: 'gerry/new-repo',
      url: '#',
    },
    {
      forkFrom: 'bridge-school/another-repo',
      repo: 'gerry/another-repo',
      url: '#',
    },
  ],
}

const propsForPr = {
  type: 'pullRequest',
  heading: 'recent PRs',
  data: [
    {
      state: 'closed',
      title: 'new PR',
      url: '#',
    },
    {
      state: 'open',
      title: 'another PR',
      url: '#',
    },
  ],
}

const propsForNoData = {
  type: 'forks',
  heading: 'recent forks',
  data: [],
}

afterEach(cleanup)

test('it shows the heading and the no data message when data is empty', () => {
  const { getByText } = render(<EventList {...propsForNoData} />)

  expect(getByText(propsForNoData.heading)).toHaveTextContent(propsForNoData.heading)
  getByText('No related data')
})

test('it renders a list of event cards for fork events', () => {
  const { getByText } = render(<EventList {...propsForForks} />)

  const headingNode = getByText(propsForForks.heading)
  const firstForkFrom = getByText(propsForForks.data[0].forkFrom, { exact: false })
  const firstRepo = getByText(propsForForks.data[0].repo)
  const secondForkFrom = getByText(propsForForks.data[1].forkFrom, { exact: false })
  const secondRepo = getByText(propsForForks.data[1].repo)

  expect(headingNode).toHaveTextContent(propsForForks.heading)
  expect(firstForkFrom).toBeDefined()
  expect(firstRepo).toBeDefined()
  expect(secondForkFrom).toBeDefined()
  expect(secondRepo).toBeDefined()
})

test('it renders a list of event cards for pull requests', () => {
  const { getByText } = render(<EventList {...propsForPr} />)

  const headingNode = getByText(propsForPr.heading)
  const firstPrTitle = getByText(propsForPr.data[0].title)
  const firstPrState = getByText(propsForPr.data[0].state, { exact: false })
  const secondPrTitle = getByText(propsForPr.data[1].title)
  const secondPrState = getByText(propsForPr.data[1].state, { exact: false })

  expect(headingNode).toHaveTextContent(propsForPr.heading)
  expect(firstPrTitle).toBeDefined()
  expect(firstPrState).toBeDefined()
  expect(secondPrTitle).toBeDefined()
  expect(secondPrState).toBeDefined()
})
