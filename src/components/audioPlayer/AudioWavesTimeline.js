import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeFormat from 'hh-mm-ss'

import './AudioWavesTimeline.css'

class AudioWavesTimeline extends Component {

  constructor(props) {
    super(props)
    this.interval = setInterval(() => this.forceUpdate(), 1000)
  }

  render() {
    const { player } = this.props
    const duration = (player && player !== undefined) ? Math.ceil(player.getDuration()) : 0
    const currentPlayTime = (player && player !== undefined) ? Math.ceil(player.getCurrentTime()) : 0

    return (
      <div className="audio-timeline-container">
        <span className="audio-timeline-current-play">{TimeFormat.fromS(currentPlayTime)}</span>
        <div className="audio-waves-container">
          { Array(...{ length: 40 }).map(() => <span className="audio-wave" style={{ height: `${Math.floor(Math.random() * 44) + 1}px`, width: '3px' }} />) }
        </div>
        <span className="audio-timeline-duration">{TimeFormat.fromS(duration)}</span>
      </div>
    )
  }
}

AudioWavesTimeline.propTypes = {
  player: PropTypes.object.isRequired,
}

export default AudioWavesTimeline
