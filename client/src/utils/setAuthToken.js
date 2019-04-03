import axios from 'axios'

// Set auth token when user logs in or delete token when user logs out
const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
