import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

class ShowRankings extends Component {
  render() {
    const rankings = this.props.rankings.map(ranking => (
      <tr key={ranking._id}>
        <td>
          <Moment format="MM/DD/YYYY">{ranking.created_at}</Moment>
        </td>
        <td>{ranking.author.username}</td>
        <td>
          <Link to="/dashboard" className="btn btn-danger">
            Edit
          </Link>
        </td>
        <td>
          <Link to="/dashboard" className="btn btn-info">
            Show
          </Link>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4>Rankings</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Created By</th>
              <th />
              <th />
            </tr>
          </thead>
          {rankings}
        </table>
      </div>
    )
  }
}

ShowRankings.propTypes = {
  rankings: PropTypes.array.isRequired
}

export default ShowRankings
