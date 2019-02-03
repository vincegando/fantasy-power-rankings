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
    .then(res =>
      dispatch({
        type: GET_RANKINGS,
        payload: res.data
      })
    )
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
    .then(res =>
      dispatch({
        type: GET_RANKING,
        payload: res.data
      })
    )
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
    .then(res => history.push('/league/' + leagueId))
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
    .then(res => history.push('/league/' + leagueId))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// set loading in state
export const setRankingsLoading = () => dispatch => {
  dispatch({
    type: LOADING_RANKINGS
  })
}

export const stopRankingsLoading = () => dispatch => {
  dispatch({
    type: STOP_LOADING_RANKING
  })
}
