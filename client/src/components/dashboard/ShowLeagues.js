import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

// Display all leagues current user is a member of in a table
class ShowLeagues extends Component {
  // Redirect to league page when it is clicked
  onLeagueClick = leagueId => {
    this.props.history.push(`/league/${leagueId}`)
  }

  render() {
    const leagues = this.props.leagues.map(league => (
      <Table.Row
        key={league._id}
        onClick={() => this.onLeagueClick(league.leagueId)}
      >
        <Table.Cell>{league.leagueName}</Table.Cell>
        <Table.Cell>{league.leagueId}</Table.Cell>
      </Table.Row>
    ))

    return (
      <div>
        <Header as="h2" style={{ marginTop: '10px' }}>
          Leagues
        </Header>
        <Table celled selectable unstackable size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>League Name</Table.HeaderCell>
              <Table.HeaderCell>League ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{leagues}</Table.Body>
        </Table>
      </div>
    )
  }
}

ShowLeagues.propTypes = {
  leagues: PropTypes.array.isRequired
}

export default withRouter(ShowLeagues)
