import axios from 'axios'
import { mockPullRequest } from '../mock-data/pull-request-data-mock'

export const getForks = data =>
  data
    .filter(event => event.type === 'ForkEvent')
    .map(event => ({
      repo: event.payload.forkee.full_name,
      forkFrom: event.repo.name,
      url: event.payload.forkee.html_url,
    }))

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
