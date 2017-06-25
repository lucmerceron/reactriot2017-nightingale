import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import faker from 'faker'

import { updatePublicPlaylists } from '../actionCreators/playlists'
import { emptyFeedPlease } from '../actionCreators/feed'

import ButtonMorphing from './generalPurpose/ButtonMorphing'
import CreatePlaylistContent from './CreatePlaylistContent'
import JoinPlaylistContent from './JoinPlaylistContent'

import './LandingView.css'

class LandingView extends Component {
  constructor() {
    super()

    this.state = {
      hasMorphed: 0,
    }
  }
  componentWillMount() {
    const { firebase, setPublicPlaylists, emptyFeedPls } = this.props

    // Empty the feed before moving on
    emptyFeedPls()

    // Listen for playlists change when authChanged
    firebase.auth().onAuthStateChanged(() => {
      firebase.database().ref('public_playlists').once('value', snap => {
        if (snap.val()) setPublicPlaylists(snap.val())
        else setPublicPlaylists({})
      })
      // If user not auth
      if (!firebase.auth().currentUser) return
      // Store the name and uid in localStorage
      if (!localStorage.getItem('nightingaleName') || !localStorage.getItem('nightingaleUid')) {
        const fakeName = faker.name.findName()

        localStorage.setItem('nightingaleName', fakeName)
        localStorage.setItem('nightingaleUid', firebase.auth().currentUser.uid)
      }
    })
  }

  render() {
    const { hasMorphed } = this.state

    return (
      <div className="landing-view">
        <div className="landing-view-actions-wrapper">
          <div className={`landing-view-actions-background-position ${hasMorphed !== 0 ? 'button-morphed' : ''}`}>
            <span className="ng-logo">Nightingale</span>
            <p className="ng-logo-subtitle">add . vote . listen</p>
            <div className="landing-view-actions-group">
              <ButtonMorphing isMorphed={hasMorphed === 1} label="join a playlist" onClick={() => this.setState({ hasMorphed: 1 })} content={<JoinPlaylistContent />} />
              <ButtonMorphing isMorphed={hasMorphed === 2} label="create a playlist" onClick={() => this.setState({ hasMorphed: 2 })} content={<CreatePlaylistContent />} />
            </div>
          </div>
        </div>
        {hasMorphed === 0 &&
          <span style={{ color: 'white' }}>
            developed by the Wing dev team with <span className="ion-heart" style={{ verticalAlign: 'middle' }} />
          </span>}
      </div>
    )
  }
}


LandingView.propTypes = {
  firebase: PropTypes.object.isRequired,
  setPublicPlaylists: PropTypes.func.isRequired,
  emptyFeedPls: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  firebase: state.firebase,
})

const mapDispatchToProps = dispatch => ({
  setPublicPlaylists: playlists => dispatch(updatePublicPlaylists(playlists)),
  emptyFeedPls: () => dispatch(emptyFeedPlease()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingView)
