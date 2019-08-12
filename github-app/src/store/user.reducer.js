import { EVENT_ACTION_TYPES } from './action-const'

export const setUser = (state = '', action) => {
  switch (action.type) {
    case EVENT_ACTION_TYPES.SET_USER:
      return action.payload

    default:
      return state
  }
}
