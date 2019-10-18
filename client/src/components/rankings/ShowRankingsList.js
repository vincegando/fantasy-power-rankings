import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

// Display each team as a card for viewing rankings
class ShowRankingsList extends Component {
  ownersToString = entry => {
    let result = []
    entry.owners.forEach(owner => {
      result.push(owner.name)
    })

    return result.join(', ')
  }

  render() {
    return this.props.rankings
      .sort((a, b) => a.rank - b.rank)
      .map(entry => (
        <Card raised fluid key={entry._id}>
          <Card.Content>
            <Card.Header as="h3">
              {entry.rank}. {entry.teamName} ({entry.record}) -{' '}
              {this.ownersToString(entry)}
            </Card.Header>
          </Card.Content>
          <Card.Content description={entry.description} />
        </Card>
      ))
  }
}

ShowRankingsList.propTypes = {
  rankings: PropTypes.array.isRequired
}

export default ShowRankingsList
