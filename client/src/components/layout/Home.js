import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="row">
            <h1>Power Rankings</h1>
            <p>Create power rankings</p>
            <Link to="/register" className="btn btn-lg btn-info">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home)
