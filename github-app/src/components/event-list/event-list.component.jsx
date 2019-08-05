import React from 'react'

import EventCard from '../event-card/event-card.component'

const EventList = ({ type, heading, data }) => (
  <>
    <h1>{heading}</h1>
    {
      <ul>
        {type === 'forks'
          ? data.map(({ forkFrom, repo, url }, idx) => (
              <EventCard key={idx} title={repo} subtitle={`Fork from: ${forkFrom}`} url={url} />
            ))
          : data.map(({ state, title, url }, idx) => (
              <EventCard key={idx} title={title} subtitle={`Status: ${state}`} url={url} />
            ))}
      </ul>
    }
  </>
)

export default EventList
