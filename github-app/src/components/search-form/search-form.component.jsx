import React from 'react'

import { mockEvent } from '../../helper/event-data-mock'

import { getForks, getPullRequest } from '../../helper/process-data-utils'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // fetch(`https://api.github.com/users/${this.state.search}/events`)
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        if (!response.ok) {
          throw Error("Can't fetch event. Please try another user")
        }
        // return response.json()
        return mockEvent
      })
      .then(async data => {
        const currentUser = this.state.search
        this.setState({ search: '' })
        const forks = getForks(data)
        const pullRequest = await getPullRequest(data)
        this.props.updateUserAndData(currentUser, forks, pullRequest)
      })
      .catch(error => {
        alert(error.message)
        this.setState({ search: '' })
      })
  }

  handleChange = event => {
    console.log('handlechange call')
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  render() {
    console.log('form render')
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="search">Github Username</label>
        <input
          id="search"
          name="search"
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          required
        />
        <button type="submit">GET USER</button>
      </form>
    )
  }
}

export default SearchForm
