import React from 'react'
import styled from 'styled-components'

import SearchForm from './components/search-form/search-form.component'
import EventList from './components/event-list/event-list.component'

import CustomButton from './components/custom-button/custom-button.component'

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
    console.log('app render')
    return (
      <div>
        {this.state.currentUser ? (
          <Main>
            <CustomButton className="ml" onClick={this.handleBackButton}>
              Back
            </CustomButton>
            <Header>{this.state.currentUser}</Header>
            <EventList type="forks" heading="Recent Forks" data={this.state.forks} />
            <EventList
              type="pullRequest"
              heading="Recent Pull Request"
              data={this.state.pullRequest}
            />
          </Main>
        ) : (
          <SearchForm updateUserAndData={this.updateUserAndData} />
        )}
      </div>
    )
  }
}

const Main = styled.div.attrs({
  className: `bg-white pt2 pb2 pl4 pr4`,
})``

const Header = styled.h1.attrs({
  className: `tc f1 f-headline-l mb3 mt3 fw6 tracked-tight`,
})``

export default App
