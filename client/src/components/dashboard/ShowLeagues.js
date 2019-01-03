import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class ShowLeagues extends Component {
  onLeagueClick = e => {
    alert('clicked')
  }

  render() {
    const leagues = this.props.leagues.map(league => (
      <tr key={league._id} onClick={this.onLeagueClick}>
        <td>{league.leagueName}</td>
        <td>{league.leagueId}</td>
      </tr>
    ))

    return (
      <div>
        <h4>Leagues</h4>
        <table className="table">
          <thead>
            <tr>
              <th>League Name</th>
              <th>League ID</th>
            </tr>
          </thead>
          {leagues}
        </table>
      </div>
    )
  }
}

export default connect(null)(ShowLeagues)
