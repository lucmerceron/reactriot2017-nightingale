import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayer from 'react-youtube'

import AudioWavesTimeline from './AudioWavesTimeline'
import AudioSoundButton from './AudioSoundButton'

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

    this.seekToDone = false
  }

  onPlayerReady(event) {
    event.target.setVolume(100)
    console.log('Oyo', this.props)
    this.setState({ YTPlayer: event.target })
  }

  onPlayerStateChange(event) {
    const { YTPlayer } = this.state
    if (event.data === 1 && !this.seekToDone) {
      // if (this.props.seekTo) YTPlayer.seekTo(this.props.seekTo)
      // this.seekToDone = true
    }
    if (event.data === YT_PLAYER_EVENT_ENDED) {
      YTPlayer.loadVideoById(this.props.playlist[0] || '')
      if (this.props.playlist[0]) {
        this.props.onVideoChanged(this.props.playlist[0])
      }
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

  playVideo() {
    const { YTPlayer } = this.state
    if (YTPlayer) {
      this.state.YTPlayer.playVideo()
    }
  }

  pauseVideo() {
    const { YTPlayer } = this.state
    if (YTPlayer) {
      this.state.YTPlayer.pauseVideo()
    }
  }

  handleTogglePlay() {
    const { YTPlayer } = this.state
    if (YTPlayer) {
      this.props.onVideoTogglePlay(Math.floor(YTPlayer.getCurrentTime()))
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
    const { volume } = this.state

    if (this.props.isPlaying) {
      this.playVideo()
    } else {
      this.pauseVideo()
    }

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
        <AudioWavesTimeline player={this.state.YTPlayer} />
        <div className="audio-player-controls">
          <AudioSoundButton value={volume} onChange={this.onSetVolume} />
          <div className="audio-player-controls-btn-lg" onClick={() => this.handleTogglePlay()} >
            <i className="ion-ios-play-outline" style={{ marginLeft: '0.4444rem' }} />
          </div>
          <div
            className="audio-player-controls-btn-sm"
            onClick={() => this.props.onVideoChanged(this.props.playlist[0])}
            style={{ marginLeft: '-0.4444rem' }}
          >
            <i className="ion-ios-skipforward-outline" />
          </div>
          <div onClick={() => console.log} style={{ display: 'none' }}>full screen</div>
        </div>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  playingId: PropTypes.string.isRequired,
  playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.boolean,
  seekTo: PropTypes.number.isRequired,
  onVideoChanged: PropTypes.func.isRequired,
  onVideoTogglePlay: PropTypes.func.isRequired,
}

AudioPlayer.defaultProps = {
  isPlaying: false,
}

export default AudioPlayer
