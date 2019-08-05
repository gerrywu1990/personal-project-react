import React from 'react'

const EventCard = ({ title, subtitle, url }) => (
  <li>
    <a href={url}>
      <p>{title}</p>
      <span>{subtitle}</span>
    </a>
  </li>
)

export default EventCard
