import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getUserEventsThunk } from '../store/events.actions'

import CustomButton from './custom-button.component'
import FormInput from './form-input.component'

class SearchForm extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    await this.props.getEventsThunk(this.state.search)
    if (this.props.hasErrored.hasErrored) {
      this.setState({ search: '' })
      alert(this.props.hasErrored.errorMessage)
    }
  }

  handleChange = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
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

const mapStateToProps = state => {
  console.log('state in form:', state)
  return {
    hasErrored: state.eventsReducer.eventsHasErrored,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEventsThunk: search => dispatch(getUserEventsThunk(search)),
  }
}

const Form = styled.form.attrs({
  className: 'measure center shadow-4 pa5 mv6 flex flex-column bg-white',
})``

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
