import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getLeagues } from '../../actions/leagueActions'
import { Link } from 'react-router-dom'
import ShowLeagues from './ShowLeagues'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getLeagues()
  }

  render() {
    const { leagues, loading } = this.props.league

    const { user } = this.props.auth

    let dashboardContent

    if (leagues === null || loading) {
      dashboardContent = <h3>loading...</h3>
    } else {
      if (Object.keys(leagues).length > 0) {
        dashboardContent = (
          <div>
            <p>Welcome, {user.username}</p>
            <ShowLeagues leagues={leagues} />
            <Link to="/import" className="btn btn-lg btn-info">
              Import
            </Link>
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <p>Welcome, {user.username}</p>
            <p>You are have not imported any leagues yet.</p>
            <Link to="/import" className="btn btn-lg btn-info">
              Import
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getLeagues: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  league: state.league,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getLeagues }
)(Dashboard)
