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
      hasMorphed: false,
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
          <div className="landing-view-actions-background" />
          <div className={`landing-view-actions-background-position ${hasMorphed ? 'button-morphed' : ''}`}>
            <img />
            <ButtonMorphing label="join a playlist" onClick={() => this.setState({ hasMorphed: true })} content={<JoinPlaylistContent />} />
            <ButtonMorphing label="create a playlist" onClick={() => {}} content={<CreatePlaylistContent />} />
          </div>
        </div>
        <span>developed by the Wing dev team with love</span>
      </div>
    )
  }
}

export default LandingView
