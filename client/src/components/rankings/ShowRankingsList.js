import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShowRankingsList extends Component {
  render() {
    return this.props.rankings
      .sort((a, b) => a.rank - b.rank)
      .map(entry => (
        <div key={entry._id}>
          <h4>
            {entry.rank}. {entry.teamName}
          </h4>
          <p>{entry.description}</p>
        </div>
      ))
  }
}

ShowRankingsList.propTypes = {
  rankings: PropTypes.array.isRequired
}

export default ShowRankingsList
