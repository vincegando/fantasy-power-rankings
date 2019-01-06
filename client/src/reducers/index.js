import { combineReducers } from 'redux'
import authReducer from './authReducer'
import leagueReducer from './leagueReducer'
import rankingReducer from './rankingReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  league: leagueReducer,
  ranking: rankingReducer,
  errors: errorReducer
})
