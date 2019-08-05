import React from 'react'
import { mockEvent } from '../../helper/event-data-mock'
import { mockPullRequest } from '../../helper/pull-request-data-mock'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  getForks = data =>
    data
      .filter(event => event.type === 'ForkEvent')
      .map(event => ({
        repo: event.payload.forkee.full_name,
        forkFrom: event.repo.name,
        url: event.payload.forkee.html_url,
      }))

  getPullRequest = async data => {
    const anAsyncFunction = async pullRequest => {
      return await //   fetch(pullRequest.payload.pull_request.url)
      fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
          if (!response.ok) {
            throw Error("can't get pull request data")
          }
          //   return response.json()
          return mockPullRequest
        })
        .then(({ html_url, state, title }) => ({ url: html_url, state, title }))
        .catch(error => alert(error.message))
    }

    const pullRequestEvent = data.filter(event => event.type === 'PullRequestEvent')
    return await Promise.all(pullRequestEvent.map(pullRequest => anAsyncFunction(pullRequest)))
  }

  handleSubmit = event => {
    event.preventDefault()

    // fetch(`https://api.github.com/users/pkanal/events`)
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        if (!response.ok) {
          throw Error("Can't fetch event. Please try another user")
        }
        // return response.json()
        return mockEvent
      })
      .then(async data => {
        const forks = this.getForks(data)
        const pullRequest = await this.getPullRequest(data)
        this.props.updateUserAndData(this.state.search, forks, pullRequest)
        this.setState({ search: '' })
      })
      .catch(error => alert(error.message))
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
