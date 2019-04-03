import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getRanking } from '../../actions/rankingActions'
import ShowRankingsList from './ShowRankingsList'
import {
  Grid,
  Header,
  Loader,
  Container,
  Button,
  Icon
} from 'semantic-ui-react'

// Display ranking based on given id
class ViewRankings extends Component {
  // Get ranking info when component loads
  componentDidMount() {
    this.props.getRanking(this.props.match.params.id)
  }

  render() {
    const { ranking, loading } = this.props.ranking

    let rankingContent
    if (ranking === null || loading || Object.keys(ranking).length === 0) {
      rankingContent = (
        <Loader style={{ marginTop: '100px' }} size="large" active>
          Loading
        </Loader>
      )
    } else {
      rankingContent = (
        <Container>
          <Button
            size="large"
            onClick={this.props.history.goBack}
            style={{ marginTop: '10px' }}
          >
            <Icon name="arrow left" />
            Back
          </Button>
          <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
            {ranking.title}
          </Header>
          <ShowRankingsList rankings={ranking.rankings} />
        </Container>
      )
    }

    return (
      <div className="view-ranking">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={12}>{rankingContent}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

ViewRankings.propTypes = {
  getRanking: PropTypes.func.isRequired,
  ranking: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ranking: state.ranking
})

export default connect(
  mapStateToProps,
  { getRanking }
)(withRouter(ViewRankings))
