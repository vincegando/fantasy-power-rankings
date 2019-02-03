import axios from 'axios'

import {
  GET_LEAGUES,
  LOADING_LEAGUES,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CURRENT_LEAGUE,
  STOP_LOADING_LEAGUE
} from './types'

// Get all leagues belonging to a user
export const getLeagues = () => dispatch => {
  setLeaguesLoading()
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
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get current league by league id
export const getCurrentLeague = leagueId => dispatch => {
  setLeaguesLoading()
  axios
    .get(`/api/leagues/${leagueId}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_LEAGUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_LEAGUE,
        payload: null
      })
    )
}

// set leagues loading in state
export const setLeaguesLoading = () => dispatch => {
  dispatch({
    type: LOADING_LEAGUES
  })
}
export const stopLeaguesLoading = () => dispatch => {
  dispatch({
    type: STOP_LOADING_LEAGUE
  })
}

export const clearImportErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
