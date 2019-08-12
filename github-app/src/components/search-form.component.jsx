import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { mockEvent } from '../mock-data/event-data-mock'
import { getForks, getPullRequest } from '../helper/process-data-utils'

import CustomButton from './custom-button.component'
import FormInput from './form-input.component'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await axios.get(`https://api.github.com/users/${this.state.search}/events`, {
        cancelToken: source.token,
      })
      const data = await response.data
      // const data = mockEvent   // comment the above two lines and uncomment this line to use mock data
      const currentUser = this.state.search
      const forks = getForks(data)
      const pullRequest = await getPullRequest(data)

      this.props.updateUserAndData(currentUser, forks, pullRequest)
    } catch (error) {
      this.setState({ search: '' })

      // const errorMessage =
      //   error.response && error.response.status === 404
      //     ? "Can't fetch event. Please try another user"
      //     : error
      // alert(errorMessage)
    }
  }

  handleChange = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  componentWillUnmount() {
    source.cancel('Operation canceled by the user.')
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} data-testid="search-form">
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
