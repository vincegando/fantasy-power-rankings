import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Button,
  Header,
  Segment,
  Grid,
  Image,
  Icon
} from 'semantic-ui-react'
import field from '../../img/field.jpeg'

// Homepage for website. Displays general info about website and buttons to register or login
class Home extends Component {
  // If user is logged in, redirect to dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="home">
        <Container fluid className="image-container">
          <Image className="field" src={field} fluid />
          <div className="image-text">
            <Header
              as="h1"
              content="Fantasy Rank"
              style={{ fontSize: '4em' }}
            />
            <p>Create power rankings for your ESPN Fantasy League</p>
            <Button as={Link} to="/register" size="huge" primary>
              Sign Up
            </Button>
            <Button as={Link} to="/login" size="huge">
              Login
            </Button>
          </div>
        </Container>
        <Segment vertical>
          <Header
            as="h1"
            textAlign="center"
            style={{ fontSize: '3em', marginTop: '20px' }}
          >
            Import or Join a League
          </Header>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <Header
                    as="h3"
                    style={{ fontSize: '2em', marginTop: '50px' }}
                  >
                    Import a league from ESPN
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    Using your league's unique ID, you can import information
                    about your league's teams, standings, and owners.
                  </p>
                  <Header
                    as="h3"
                    style={{ fontSize: '2em', marginTop: '50px' }}
                  >
                    Join Already Imported League
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    If your league has already been imported, you will join the
                    league as a member. You can still see all the league's past
                    rankings and create new rankings.
                  </p>
                </Container>
              </Grid.Column>
              <Grid.Column width={8} style={{ textAlign: 'center' }}>
                <Icon name="football ball" size="massive" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment vertical>
          <Header
            as="h1"
            textAlign="center"
            style={{ fontSize: '3em', marginTop: '20px' }}
          >
            Create Power Rankings
          </Header>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <Header
                    as="h3"
                    style={{ fontSize: '2em', marginTop: '50px' }}
                  >
                    Drag and Drop to Order Teams
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    Simply drag and drop the order of teams in your league to
                    create your power ranking.
                  </p>
                  <Header
                    as="h3"
                    style={{ fontSize: '2em', marginTop: '50px' }}
                  >
                    Add Descriptions
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    Using the provided text fields, leave a description for
                    every team in your league.
                  </p>
                </Container>
              </Grid.Column>
              <Grid.Column width={8} style={{ textAlign: 'center' }}>
                <Icon name="ordered list" size="massive" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home)
