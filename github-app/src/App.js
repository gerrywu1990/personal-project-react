import React from 'react'
import { connect } from 'react-redux'

import EventView from './components/event-view.component'
import SearchForm from './components/search-form.component'

class App extends React.Component {
  render() {
    const { currentUser } = this.props
    console.log('current user in app: ', currentUser)
    return <div>{currentUser ? <EventView /> : <SearchForm />}</div>
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.setUser,
    isLoading: state.eventsReducer.isLoading,
  }
}

export default connect(mapStateToProps)(App)
