import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayer from 'react-youtube'

import AudioWavesTimeline from './AudioWavesTimeline'

import './AudioPlayer.css'

const YT_PLAYER_EVENT_ENDED = 0

class AudioPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      volume: 100,
      muted: false,
      YTPlayer: null,
    }

    this.onPlayerReady = this.onPlayerReady.bind(this)
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    this.onSetVolume = this.onSetVolume.bind(this)
  }

  onPlayerReady(event) {
    event.target.setVolume(100)
    this.setState({ YTPlayer: event.target })
  }

  onPlayerStateChange(event) {
    if (event.data === YT_PLAYER_EVENT_ENDED) {
      const { YTPlayer } = this.state
      YTPlayer.loadVideoById(this.props.playlist[0] || '')
      this.props.onVideoChanged(this.props.playlist[0])
    }
  }

  onMute() {
    const { muted, volume, YTPlayer } = this.state
    if (muted) {
      YTPlayer.unMute()
      this.setState(volume === 0 ? { muted: !muted, volume: 5 } : { muted: !muted })
    } else {
      YTPlayer.mute()
      this.setState({ muted: !muted })
    }
  }

  onSetVolume(event) {
    const { value } = event.target
    const newVolume = Number(value)
    const { muted, YTPlayer } = this.state
    if (muted && newVolume > 0) {
      YTPlayer.setVolume(newVolume)
      YTPlayer.unMute()
      this.setState({ muted: false, volume: newVolume })
    } else if (!muted && newVolume === 0) {
      YTPlayer.setVolume(newVolume)
      YTPlayer.mute()
      this.setState({ muted: true, volume: newVolume })
    } else {
      YTPlayer.setVolume(newVolume)
      this.setState({ volume: newVolume })
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
        enablejsapi: 1,
      },
    }
    const { muted, volume } = this.state

    return (
      <div className="audio-player">
        <div className="audio-player-container">
          <YoutubePlayer
            videoId={this.props.playingId}
            className="audio-player-youtube-frame"
            opts={opts}
            onReady={this.onPlayerReady}
            onStateChange={this.onPlayerStateChange}
          />
        </div>
        <div className="audio-player-timeline">
          <AudioWavesTimeline player={this.state.YTPlayer} />
        </div>
        <div className="audio-player-controls">
          <div className="audio-player-controls-btn-sm" onClick={() => this.onMute()} style={{ marginRight: '-0.4444rem' }} ><i className="ion-ios-volume-high" /></div>
          <div className="audio-player-controls-btn-lg" onClick={() => this.props.onVideoTogglePlay()} ><i className="ion-ios-play-outline" style={{ marginLeft: '0.4444rem' }} /></div>
          <div className="audio-player-controls-btn-sm" onClick={() => this.props.onVideoChanged(this.props.playlist[0])} style={{ marginLeft: '-0.4444rem' }} ><i className="ion-ios-skipforward-outline" /></div>
          <div onClick={() => console.log} style={{ display: 'none' }}>full screen</div>
        </div>
        Volume<br />
        {(muted) ? 'Muted' : volume}<br />
        <input type="range" min="0" max="100" value={this.state.volume} onChange={this.onSetVolume} />
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  playingId: PropTypes.string.isRequired,
  playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.boolean,
  onVideoChanged: PropTypes.func.isRequired,
  onVideoTogglePlay: PropTypes.func.isRequired,
}

AudioPlayer.defaultProps = {
  isPlaying: false,
}

export default AudioPlayer
