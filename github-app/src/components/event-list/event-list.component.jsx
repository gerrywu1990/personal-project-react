import React from 'react'
import styled from 'styled-components'

import EventCard from '../event-card/event-card.component'

const EventList = ({ type, heading, data }) => {
  let content
  if (data.length === 0) {
    content = <p>No related data</p>
  } else {
    content = (
      <List>
        {type === 'forks'
          ? data.map(({ forkFrom, repo, url }, idx) => (
              <EventCard key={idx} title={repo} subtitle={`Fork from: ${forkFrom}`} url={url} />
            ))
          : data.map(({ state, title, url }, idx) => (
              <EventCard key={idx} title={title} subtitle={`Status: ${state}`} url={url} />
            ))}
      </List>
    )
  }

  return (
    <Section>
      <h2>{heading}</h2>
      {content}
    </Section>
  )
}

const List = styled.ul.attrs({
  className: `list f6 pl0`,
})``

const Section = styled.div.attrs({
  className: `mt4 mb4`,
})``

export default EventList
