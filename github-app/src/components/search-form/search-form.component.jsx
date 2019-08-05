import React from 'react'
import styled from 'styled-components'

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
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="search">Github Username</Label>
        <Input
          id="search"
          name="search"
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          required
        />

        <Button type="submit">GET USER</Button>
      </Form>
    )
  }
}

const Form = styled.form.attrs({
  className: 'measure center shadow-4 pa5 mv6 flex flex-column bg-white',
})``

const Button = styled.button.attrs({
  className: 'b pv2 input-reset ba b--black bg-transparent grow pointer f5 mt3 w-50 br2',
  type: 'submit',
})``

const Label = styled.label.attrs({
  className: `db fw4 lh-copy f4`,
})``

const Input = styled.input.attrs({
  className: `b pa2 input-reset ba bg-transparent`,
})``

export default SearchForm
