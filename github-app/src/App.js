import React from 'react'

import EventView from './components/event-view.component'
import SearchForm from './components/search-form.component'

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
    this.setState({ currentUser, forks, pullRequest })
  }

  handleBackButton = () => {
    this.setState({ currentUser: '' })
  }

  render() {
    return (
      <div>
        {this.state.currentUser ? (
          <EventView
            currentUser={this.state.currentUser}
            pullRequest={this.state.pullRequest}
            forks={this.state.forks}
            handleBackButton={this.handleBackButton}
          />
        ) : (
          <SearchForm updateUserAndData={this.updateUserAndData} />
        )}
      </div>
    )
  }
}

export default App
