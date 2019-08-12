import { EVENT_ACTION_TYPES } from './action-const'

export const INITIAL_EVENT_STATE = {
  isLoading: false,
  eventsHasErrored: { hasErrored: false, errorMessage: null },
  forks: [],
  pullRequests: [],
}

export const eventsReducer = (state = INITIAL_EVENT_STATE, action) => {
  switch (action.type) {
    case EVENT_ACTION_TYPES.EVENTS_HAS_ERRORED:
      return {
        ...state,
        eventsHasErrored: action.payload,
      }
    case EVENT_ACTION_TYPES.eventsIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      }
    case EVENT_ACTION_TYPES.SET_FORKS:
      return {
        ...state,
        forks: action.payload,
      }
    case EVENT_ACTION_TYPES.SET_PULL_REQUESTS:
      return {
        ...state,
        pullRequests: action.payload,
      }
    default:
      return state
  }
}
