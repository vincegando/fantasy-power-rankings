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
  // Set state to loading
  setLeaguesLoading()
  axios
    .get('/api/leagues')
    // If success, update league object
    .then(res =>
      dispatch({
        type: GET_LEAGUES,
        payload: res.data
      })
    )
    // If error, set leagues object to empty
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
    // If success, redirect to dashboard
    .then(res => history.push('/dashboard'))
    // If error, return the error
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
    // If success, update the current league
    .then(res =>
      dispatch({
        type: GET_CURRENT_LEAGUE,
        payload: res.data
      })
    )
    // If error, set current league object to null
    .catch(err =>
      dispatch({
        type: GET_CURRENT_LEAGUE,
        payload: null
      })
    )
}

export const updateLeague = leagueId => dispatch => {
  // TODO: set some kind of loading spinner or message to indicate success
  console.log('here')
  axios.post(`/api/leagues/${leagueId}`).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

// Set leagues loading to true
export const setLeaguesLoading = () => dispatch => {
  dispatch({
    type: LOADING_LEAGUES
  })
}

// Set league loading state to false
export const stopLeaguesLoading = () => dispatch => {
  dispatch({
    type: STOP_LOADING_LEAGUE
  })
}

// Clear errors object
export const clearImportErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
