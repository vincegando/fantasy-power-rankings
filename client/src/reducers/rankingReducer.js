import { GET_RANKINGS, LOADING_RANKINGS } from '../actions/types'

const initialState = {
  rankings: [],
  ranking: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_RANKINGS:
      return {
        ...state,
        loading: true
      }
    case GET_RANKINGS:
      return {
        ...state,
        rankings: action.payload,
        loading: false
      }
    default:
      return state
  }
}
