import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

// Display a Not Found page when an unknown route is entered
class NotFound extends Component {
  render() {
    return (
      <div className="notfound">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header as="h1" textAlign="center" style={{ marginTop: '20px' }}>
                Page Not Found
              </Header>
              <p style={{ textAlign: 'center' }}>
                The page you're looking for could not be found.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default NotFound
