import axios from 'axios'

import {
  GET_RANKINGS,
  GET_RANKING,
  CREATE_RANKING,
  LOADING_RANKINGS,
  GET_ERRORS
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
  dispatch(setRankingsLoading())
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
export const createRanking = rankingData => dispatch => {
  axios
    .post('/api/rankings', rankingData)
    .then(res =>
      dispatch({
        type: CREATE_RANKING,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// set loading in state
export const setRankingsLoading = () => {
  return {
    type: LOADING_RANKINGS
  }
}
