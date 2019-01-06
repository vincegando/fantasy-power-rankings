import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ShowLeagues extends Component {
  onLeagueClick = leagueId => {
    this.props.history.push(`/league/${leagueId}`)
  }

  render() {
    const leagues = this.props.leagues.map(league => (
      <tr key={league._id} onClick={() => this.onLeagueClick(league.leagueId)}>
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

ShowLeagues.propTypes = {
  leagues: PropTypes.array.isRequired
}

export default withRouter(ShowLeagues)
