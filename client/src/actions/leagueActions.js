import axios from 'axios'

import {
  GET_LEAGUES,
  LOADING_LEAGUES,
  IMPORT_LEAGUE,
  GET_ERRORS
} from './types'

// Get all leagues belonging to a user
export const getLeagues = () => dispatch => {
  dispatch(setLoading)
  axios
    .get('/api/leagues')
    .then(res =>
      dispatch({
        type: GET_LEAGUES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LEAGUES,
        payload: {}
      })
    )
}

// Import a league
export const importLeague = (leagueId, history) => dispatch => {
  axios
    .post('/api/leagues', {
      leagueId: leagueId
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

// Leagues loading
export const setLoading = () => {
  return {
    type: LOADING_LEAGUES
  }
}
