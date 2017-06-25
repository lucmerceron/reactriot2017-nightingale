import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import faker from 'faker'

import { updatePublicPlaylists } from '../actionCreators/playlists'

import ButtonMorphing from './generalPurpose/ButtonMorphing'
import CreatePlaylistContent from './CreatePlaylistContent'
import JoinPlaylistContent from './JoinPlaylistContent'

import bgVideoUrl from '../assets/background-video.mp4'

import './LandingView.css'

class LandingView extends Component {
  constructor() {
    super()

    this.state = {
      hasMorphed: 0,
    }
  }
  componentWillMount() {
    const { firebase, setPublicPlaylists } = this.props

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

    return(
      <div className="landing-view">
        <video autoPlay loop poster="polina.jpg" className="landing-view-bg-video">
          <source src={bgVideoUrl} type="video/mp4" />
        </video>
        <div className="landing-view-actions-wrapper">
          <div className={`landing-view-actions-background ${hasMorphed !== 0 ? 'morphed' : ''}`} />
          <div className={`landing-view-actions-background-position ${hasMorphed !== 0 ? 'button-morphed' : ''}`}>
            <img />
            {hasMorphed !== 2 && <ButtonMorphing label="join a playlist" onClick={() => this.setState({ hasMorphed: 1 })} content={<JoinPlaylistContent />} />}
            {hasMorphed !== 1 && <ButtonMorphing label="create a playlist" onClick={() => this.setState({ hasMorphed: 2 })} content={<CreatePlaylistContent />} />}
          </div>
        </div>
        {hasMorphed === 0 && <span>developed by the Wing dev team with love</span>}
      </div>
    )
  }
}


LandingView.propTypes = {
  firebase: PropTypes.object.isRequired,
  setPublicPlaylists: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  firebase: state.firebase,
})

const mapDispatchToProps = dispatch => ({
  setPublicPlaylists: playlists => dispatch(updatePublicPlaylists(playlists)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingView)
