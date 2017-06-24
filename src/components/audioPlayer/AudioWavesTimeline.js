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
    const isPlaying = player && player.getPlayerState() === 1
    const duration = (player && isPlaying && player !== undefined) ? Math.ceil(player.getDuration()) : 0
    const currentPlayTime = (player && isPlaying && player !== undefined) ? Math.ceil(player.getCurrentTime()) : 0
    const progression = currentPlayTime ? Math.floor((currentPlayTime / duration) * 100) : 0

    return (
      <div className="audio-timeline-container row">
        <span className="audio-timeline-current-play">{TimeFormat.fromS(currentPlayTime)}</span>
        <div className="audio-waves-container">
          { Array(...{ length: 60 }).map((item, index) => (
            <span
              className="audio-wave"
              style={{
                height: `${(isPlaying) ? Math.floor(Math.random() * 44) + 1 : '1'}px`,
                width: `${((index / 60) * 100 < progression) ? '2' : '1'}px`,
                margin: `0 ${((index / 60) * 100 < progression) ? '0.5' : '1'}px`,
              }}
            />))
          }
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
