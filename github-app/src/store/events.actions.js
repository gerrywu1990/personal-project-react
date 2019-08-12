import axios from 'axios'

import { EVENT_ACTION_TYPES } from './action-const'
import { setUser } from './user.action'
import { getForks, getPullRequest } from '../helper/process-data-utils'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

export const setForks = (forks = []) => ({
  type: EVENT_ACTION_TYPES.SET_FORKS,
  payload: forks,
})

export const setPullRequests = (pullRequests = []) => ({
  type: EVENT_ACTION_TYPES.SET_PULL_REQUESTS,
  payload: pullRequests,
})

export const eventsHasErrored = (hasErrored, errorMessage) => ({
  type: EVENT_ACTION_TYPES.EVENTS_HAS_ERRORED,
  payload: { hasErrored, errorMessage },
})

export const eventsIsLoading = (isLoading = false) => ({
  type: EVENT_ACTION_TYPES.EVENTS_IS_LOADING,
  payload: isLoading,
})

export const getUserEventsThunk = search => async dispatch => {
  try {
    dispatch(eventsIsLoading(true))
    const response = await axios.get(`https://api.github.com/users/${search}/events`, {
      cancelToken: source.token,
    })
    const data = await response.data

    dispatch(eventsIsLoading(false))
    // const data = mockEvent   // comment the above two lines and uncomment this line to use mock data
    const currentUser = search
    const forks = getForks(data)
    const pullRequest = await getPullRequest(data)

    dispatch(setUser(currentUser))
    dispatch(setForks(forks))
    dispatch(setPullRequests(pullRequest))
  } catch (error) {
    const errorMessage =
      error.response && error.response.status === 404
        ? "Can't fetch event. Please try another user"
        : error

    dispatch(eventsHasErrored(true, errorMessage))
  }
}
