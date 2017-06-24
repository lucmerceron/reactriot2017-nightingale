import React from 'react'
import PropTypes from 'prop-types'

import './AudioWavesTimeline.css'

const AudioWavesTimeline = ({ currentPlayTime, musicDuration }) => {

  return (
    <div className="audio-timeline-container">
      <span className="audio-timeline-current-play">{currentPlayTime}</span>
      <div className="audio-waves-container">
        { Array(...{ length: 20 }).map(() => <span className="audio-wave" style={{ height: `${Math.floor(Math.random() * 38) + 1}px`, width: '3px' }} />) }
      </div>
      <span className="audio-timeline-duration">{musicDuration}</span>
    </div>
  )
}

AudioWavesTimeline.propTypes = {
  currentPlayTime: PropTypes.number.isRequired,
  musicDuration: PropTypes.number.isRequired,
  musicHasLoad: PropTypes.bool.isRequired,
}

export default AudioWavesTimeline
