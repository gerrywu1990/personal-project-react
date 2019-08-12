import { combineReducers } from 'redux'
import { setUser } from './user.reducer'
import { eventsReducer } from './events.reducer'

export default combineReducers({
  setUser,
  eventsReducer,
})
