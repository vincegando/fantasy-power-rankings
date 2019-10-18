import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentLeague, updateLeague } from '../../actions/leagueActions'
import { getRankings } from '../../actions/rankingActions'
import ShowRankings from './ShowRankings'
import { Link, withRouter } from 'react-router-dom'
import { Grid, Header, Button, Loader, Icon } from 'semantic-ui-react'

// Display all rankings made for a given league
class League extends Component {
  // Get current league info, then get all rankings for this league
  componentDidMount() {
    this.props.getCurrentLeague(this.props.match.params.leagueId)
    this.props.getRankings(this.props.match.params.leagueId)
  }

  onUpdateClick = () => {
    this.props.updateLeague(this.props.match.params.leagueId)
  }

  render() {
    const { league } = this.props.league
    const leagueLoading = this.props.league.loading
    const { rankings, loading } = this.props.ranking

    let pageContent

    if (league === null || loading || leagueLoading) {
      pageContent = (
        <Loader style={{ marginTop: '100px' }} size="large" active>
          Loading
        </Loader>
      )
    } else {
      pageContent = (
        <div>
          <Button
            size="large"
            onClick={this.props.history.goBack}
            style={{ marginTop: '10px' }}
          >
            <Icon name="arrow left" />
            Back
          </Button>
          <Button
            size="large"
            onClick={this.onUpdateClick}
            color="green"
            floated="right"
            style={{ marginTop: '10px' }}
          >
            Refresh Standings
          </Button>
          <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
            {league.leagueName}
          </Header>
          <ShowRankings rankings={rankings} />
          <Button
            as={Link}
            to={`/create-ranking/${league.leagueId}`}
            size="large"
            style={{ marginTop: '10px' }}
            primary
          >
            Create a new Ranking
          </Button>
        </div>
      )
    }

    return (
      <div className="league">
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={12}>{pageContent}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

League.propTypes = {
  getCurrentLeague: PropTypes.func.isRequired,
  getRankings: PropTypes.func.isRequired,
  updateLeague: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  ranking: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  league: state.league,
  ranking: state.ranking
})

export default connect(
  mapStateToProps,
  { getCurrentLeague, getRankings, updateLeague }
)(withRouter(League))
