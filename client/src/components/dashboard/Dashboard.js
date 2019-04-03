import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getLeagues } from '../../actions/leagueActions'
import { Link } from 'react-router-dom'
import ShowLeagues from './ShowLeagues'
import { Grid, Header, Button, Container } from 'semantic-ui-react'

// Display user information such as the leagues they are members of
class Dashboard extends Component {
  // Load current user's leagues
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
            <Header as="h2" textAlign="center" style={{ marginTop: '10px' }}>
              Welcome, {user.username}
            </Header>
            <ShowLeagues leagues={leagues} />
            <div style={{ textAlign: 'center' }}>
              <Button
                as={Link}
                to="/import"
                size="large"
                style={{ marginTop: '10px' }}
                primary
              >
                Import
              </Button>
            </div>
          </div>
        )
      } else {
        dashboardContent = (
          <Container>
            <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
              Welcome, {user.username}
            </Header>
            <p style={{ textAlign: 'center' }}>
              You have not imported any leagues yet
            </p>
            <div style={{ textAlign: 'center' }}>
              <Button
                as={Link}
                to="/import"
                size="large"
                style={{ marginTop: '10px' }}
                primary
              >
                Import
              </Button>
            </div>
          </Container>
        )
      }
    }

    return (
      <div className="dashboard">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={12}>{dashboardContent}</Grid.Column>
          </Grid.Row>
        </Grid>
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
