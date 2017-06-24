import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { updatePublicPlaylists } from './actionCreators/playlists'
import Routes from './Routes'
import './App.css'

class App extends React.Component {
  componentWillMount() {
    const { firebase, setPublicPlaylists } = this.props

    // Listen for playlists change when authChanged
    firebase.auth().onAuthStateChanged(() => {
      firebase.database().ref('public_playlists').on('value', snap => {
        if (snap.val()) setPublicPlaylists(snap.val())
        else setPublicPlaylists({})
      })
    })
  }
  render() {
    const { store } = this.props

    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Routes />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  setPublicPlaylists: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  firebase: state.firebase,
})

const mapDispatchToProps = dispatch => ({
  setPublicPlaylists: playlists => dispatch(updatePublicPlaylists(playlists)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
