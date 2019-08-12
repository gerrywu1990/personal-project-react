import axios from 'axios'
import { mockPullRequest } from '../mock-data/pull-request-data-mock'

export const getForks = data => {
  const forks = data.filter(event => event.type === 'ForkEvent')

  const formatedForks =
    forks.length === 0
      ? []
      : forks.map(event => ({
          repo: event.payload.forkee.full_name,
          forkFrom: event.repo.name,
          url: event.payload.forkee.html_url,
        }))

  return formatedForks
}

export const getPullRequest = async data => {
  const anAsyncFunction = async pullRequest => {
    try {
      const response = await axios.get(pullRequest.payload.pull_request.url)
      const pullRequestData = response.data
      // const pullRequestData = mockPullRequest // comment the above two lines and uncomment this line to use mock data
      const { html_url, state, title } = pullRequestData
      return { url: html_url, state, title }
    } catch (error) {
      const errorMessage =
        error.response && error.response.status === 404 ? "can't get pull request data" : error
      alert(errorMessage)
    }
  }

  const pullRequestEvent = data.filter(event => event.type === 'PullRequestEvent')
  return await Promise.all(pullRequestEvent.map(pullRequest => anAsyncFunction(pullRequest)))
}
