import React, { Component } from 'react'
// import PropTypes from 'prop-types'

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
        <span>developed by the Wing dev team with love</span>
      </div>
    )
  }
}

export default LandingView
