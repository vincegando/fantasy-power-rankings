import { combineReducers } from 'redux'
import authReducer from './authReducer'
import leagueReducer from './leagueReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  league: leagueReducer,
  errors: errorReducer
})
