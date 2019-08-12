import React from 'react'
import styled from 'styled-components'

import EventList from './event-list.component'
import CustomButton from './custom-button.component'

const EventView = ({ currentUser, forks, pullRequest, handleBackButton }) => (
  <Main data-testid="event-view">
    <CustomButton data-testid="back-button" className="ml" onClick={handleBackButton}>
      Back
    </CustomButton>
    <Header data-testid="username-header">{currentUser}</Header>
    <EventList type="forks" heading="Recent Forks" data={forks} />
    <EventList type="pullRequest" heading="Recent Pull Request" data={pullRequest} />
  </Main>
)

const Main = styled.div.attrs({
  className: `bg-white pt2 pb2 pl4 pr4`,
})``

const Header = styled.h1.attrs({
  className: `tc f1 f-headline-l mb3 mt3 fw6 tracked-tight`,
})``

export default EventView
