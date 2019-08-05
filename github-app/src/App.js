import React from 'react'

import SearchForm from './components/search-form/search-form.component'
import EventList from './components/event-list/event-list.component'
import './App.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: '',
      forks: [],
      pullRequest: [],
    }
  }

  updateUserAndData = (currentUser, forks, pullRequest) => {
    this.setState({ currentUser, forks, pullRequest }, () =>
      console.log(
        'currentuser: ',
        this.state.currentUser,
        'forks: ',
        this.state.forks,
        'pullRequest: ',
        this.state.pullRequest
      )
    )
  }

  render() {
    console.log('app render')
    return this.state.currentUser ? (
      <>
        <EventList type="forks" heading="Recent Forks" data={this.state.forks} />
        <EventList type="pullRequest" heading="Recent Pull Request" data={this.state.pullRequest} />
      </>
    ) : (
      <SearchForm updateUserAndData={this.updateUserAndData} />
    )
  }
}

export default App
