import { mockPullRequest } from './pull-request-data-mock'

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
    return await //fetch(pullRequest.payload.pull_request.url)
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
