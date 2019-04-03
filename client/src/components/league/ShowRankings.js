import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Header, Button, Table } from 'semantic-ui-react'

// Display rankings for a league in a table
// Show edit ranking button if current user is the author of that ranking
// Always show view ranking button
class ShowRankings extends Component {
  render() {
    const { user } = this.props.auth

    const rankings = this.props.rankings.map(ranking => (
      <Table.Row key={ranking._id}>
        <Table.Cell>{ranking.title}</Table.Cell>
        <Table.Cell>{ranking.author.username}</Table.Cell>
        <Table.Cell>
          <Moment format="MM/DD/YYYY">{ranking.created_at}</Moment>
        </Table.Cell>
        <Table.Cell>
          {user.username === ranking.author.username ? (
            <Button
              as={Link}
              to={`/edit-ranking/${ranking._id}`}
              size="large"
              color="blue"
            >
              Edit
            </Button>
          ) : null}
        </Table.Cell>
        <Table.Cell>
          <Button
            as={Link}
            to={`/ranking/${ranking._id}`}
            size="large"
            color="red"
          >
            Show
          </Button>
        </Table.Cell>
      </Table.Row>
    ))

    return (
      <div>
        <Header as="h2" style={{ marginTop: '10px' }}>
          Rankings
        </Header>
        <Table celled unstackable size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Created By</Table.HeaderCell>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell collapsing />
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          <Table.Body>{rankings}</Table.Body>
        </Table>
      </div>
    )
  }
}

ShowRankings.propTypes = {
  rankings: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ShowRankings)
