import axios from 'axios'

import { GET_RANKINGS, LOADING_RANKINGS } from './types'

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

// set loading in state
export const setRankingsLoading = () => {
  return {
    type: LOADING_RANKINGS
  }
}
