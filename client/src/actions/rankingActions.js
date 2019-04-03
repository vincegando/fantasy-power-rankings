import axios from 'axios'

import {
  GET_RANKINGS,
  GET_RANKING,
  LOADING_RANKINGS,
  GET_ERRORS,
  STOP_LOADING_RANKING
} from './types'

// Get all rankings belonging to a specified league
export const getRankings = leagueId => dispatch => {
  dispatch(setRankingsLoading())
  axios
    .get(`/api/rankings/league/${leagueId}`)
    // If success, update rankings object
    .then(res =>
      dispatch({
        type: GET_RANKINGS,
        payload: res.data
      })
    )
    // If error, set rankings object to empty
    .catch(err =>
      dispatch({
        type: GET_RANKINGS,
        payload: []
      })
    )
}

// Get ranking by id
export const getRanking = id => dispatch => {
  setRankingsLoading()
  axios
    .get(`/api/rankings/${id}`)
    // If success, update ranking object
    .then(res =>
      dispatch({
        type: GET_RANKING,
        payload: res.data
      })
    )
    // If error, set ranking object to null
    .catch(err =>
      dispatch({
        type: GET_RANKING,
        payload: null
      })
    )
}

// Create a new ranking
export const createRanking = (rankingData, history, leagueId) => dispatch => {
  axios
    .post('/api/rankings', rankingData)
    // If success, redirect to current league page
    .then(res => history.push('/league/' + leagueId))
    // If error, return the error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Edit a ranking
export const editRanking = (
  rankingData,
  history,
  leagueId,
  rankingId
) => dispatch => {
  axios
    .post(`/api/rankings/${rankingId}`, rankingData)
    // If success, redirect to league page
    .then(res => history.push('/league/' + leagueId))
    // If error, return the error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set ranking loading state to true
export const setRankingsLoading = () => dispatch => {
  dispatch({
    type: LOADING_RANKINGS
  })
}

// Set ranking loading state to false
export const stopRankingsLoading = () => dispatch => {
  dispatch({
    type: STOP_LOADING_RANKING
  })
}
