import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { setUser } from '../store/user.action'
import EventList from './event-list.component'
import CustomButton from './custom-button.component'

const EventView = ({ currentUser, forks, pullRequests, clearUser }) => {
  // const { currentUser, forks, pullRequests, clearUser } = props
  return (
    <Main data-testid="event-view">
      <CustomButton data-testid="back-button" className="ml" onClick={clearUser}>
        Back
      </CustomButton>
      <Header data-testid="username-header">{currentUser}</Header>
      <EventList type="forks" heading="Recent Forks" data={forks} />
      <EventList type="pullRequest" heading="Recent Pull Request" data={pullRequests} />
    </Main>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.setUser,
    forks: state.eventsReducer.forks,
    pullRequests: state.eventsReducer.pullRequests,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(setUser('')),
  }
}

const Main = styled.div.attrs({
  className: `bg-white pt2 pb2 pl4 pr4`,
})``

const Header = styled.h1.attrs({
  className: `tc f1 f-headline-l mb3 mt3 fw6 tracked-tight`,
})``

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
