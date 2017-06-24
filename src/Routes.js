import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'

import LandingView from './components/LandingView'
import MainPlaylistView from './components/MainPlaylistView'

class Routes extends React.Component {
  constructor(props) {
    super(props)

    // Configure routes here as this solves a problem with hot loading where
    // the routes are recreated each time.
    this.routes = [{
      key: 'landing',
      path: '/',
      component: LandingView,
      exact: true,
    }, {
      key: 'playlist',
      path: '/playlists/:playlistId',
      component: MainPlaylistView,
    }]
  }

  render() {
    return (
      <Switch>
        {this.routes.map(({...props}) => <Route {...props} />)}
      </Switch>
    )
  }
}

export default Routes
