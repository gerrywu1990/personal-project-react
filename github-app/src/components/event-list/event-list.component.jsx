import React from 'react'

import EventCard from '../event-card/event-card.component'

const EventList = ({ type, heading, data }) => {
  let content
  if (data.length === 0) {
    content = <p>No related data</p>
  } else {
    content = (
      <ul>
        {type === 'forks'
          ? data.map(({ forkFrom, repo, url }, idx) => (
              <EventCard key={idx} title={repo} subtitle={`Fork from: ${forkFrom}`} url={url} />
            ))
          : data.map(({ state, title, url }, idx) => (
              <EventCard key={idx} title={title} subtitle={`Status: ${state}`} url={url} />
            ))}
      </ul>
    )
  }

  return (
    <>
      <h1>{heading}</h1>
      {content}
    </>
  )
}

export default EventList
