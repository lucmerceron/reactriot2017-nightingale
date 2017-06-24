import React from 'react'
import PropTypes from 'prop-types'

import './AudioWavesTimeline.css'

const AudioWavesTimeline = ({ currentPlayTime, musicDuration }) => {
  const audioWaveStyle = {
    height: `${Math.floor(Math.random() * 6) + 1}px`,
    width: '3px',
  }

  return (
    <div className="audio-timeline-container">
      <span>{currentPlayTime}</span>
      <div className="audio-waves-container">
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
        <span className="audio-wave" style={audioWaveStyle} />
      </div>
      <span>{musicDuration}</span>
    </div>
  )
}

AudioWavesTimeline.propTypes = {
  currentPlayTime: PropTypes.number.isRequired,
  musicDuration: PropTypes.number.isRequired,
  musicHasLoad: PropTypes.bool.isRequired,
}

export default AudioWavesTimeline
