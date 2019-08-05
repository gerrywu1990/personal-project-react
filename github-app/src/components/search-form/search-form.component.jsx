import React from 'react'
import styled from 'styled-components'

import { mockEvent } from '../../helper/event-data-mock'
import { getForks, getPullRequest } from '../../helper/process-data-utils'

import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'

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
        <FormInput
          id="search"
          label="Github Username"
          name="search"
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          required
        />
        <CustomButton type="submit">GET USER</CustomButton>
      </Form>
    )
  }
}

const Form = styled.form.attrs({
  className: 'measure center shadow-4 pa5 mv6 flex flex-column bg-white',
})``

export default SearchForm
