import { EVENT_ACTION_TYPES } from './action-const'

export const setUser = (username = '') => ({
  type: EVENT_ACTION_TYPES.SET_USER,
  payload: username,
})
