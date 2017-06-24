import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayer from 'react-youtube'

import AudioPlayerButtons from './AudioPlayerButtons'
import AudioWavesTimeline from './AudioWavesTimeline'
import RoundedPlayerPreview from './RoundedPlayerPreview'

import './AudioPlayer.css'

class AudioPlayer extends Component {
  constructor() {
    super()

    this.state = {
    }
  }

  render() {
    const opts = {
      height: '200',
      width: '200',
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    }

    return (
      <div className="audio-player">
        <div className="audio-player-container">
          <YoutubePlayer
            videoId="iEEOHUMFfZE"
            className="audio-player-youtube-frame"
            opts={opts}
          />
        </div>
        <div className="audio-player-timeline">
        </div>
        <div className="audio-player-controls">
          <div className="audio-player-controls-btn-sm" onClick={() => console.log} >sound</div>
          <div className="audio-player-controls-btn-lg" onClick={() => console.log} >play</div>
          <div className="audio-player-controls-btn-sm" onClick={() => console.log} >next</div>
        </div>
        <div onClick={() => console.log}>full screen</div>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  
}

export default AudioPlayer
