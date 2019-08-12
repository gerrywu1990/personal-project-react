import React from 'react'
import styled from 'styled-components'

const EventCard = ({ title, subtitle, url }) => (
  <ListItem data-testid="list-item">
    <Link href={url} data-testid="external-link">
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Link>
  </ListItem>
)

const ListItem = styled.li.attrs({
  className: `pv2`,
})``

const Link = styled.a.attrs({
  className: `link dt w-100 bb b--black-10 pb2 mt2 dim blue`,
})``

const Title = styled.span.attrs({
  className: `fw7`,
})``

const Subtitle = styled.span.attrs({
  className: `db black-60`,
})``

export default EventCard
