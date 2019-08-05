import React from 'react'

import SearchForm from './components/search-form/search-form.component'

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
    return <SearchForm updateUserAndData={this.updateUserAndData} />
  }
}

export default App
