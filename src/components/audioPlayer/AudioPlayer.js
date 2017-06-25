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
      fullscreen: false,
      YTPlayer: null,
      isMobile: window.orientation !== 'undefined',
      mobileFirstPlay: false,
      videoHeight: 0,
    }

    this.onPlayerReady = this.onPlayerReady.bind(this)
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    this.onSetVolume = this.onSetVolume.bind(this)
    this.playVideo = this.playVideo.bind(this)

    this.seekToDone = false
  }

  onPlayerReady(event) {
    event.target.setVolume(100)
    if (this.props.isPlaying) {
      if (window.orientation === 'undefined') {
        event.target.loadVideoById(this.props.playing.url, this.props.seekTo)
      } else {
        event.target.cueVideoById(this.props.playing.url, this.props.seekTo)
      }
    } else {
      event.target.cueVideoById(this.props.playing.url, this.props.seekTo)
    }
    this.setState({ YTPlayer: event.target })
  }

  onPlayerStateChange(event) {
    const { YTPlayer } = this.state
    if (event.data === YT_PLAYER_EVENT_ENDED) {
      YTPlayer.loadVideoById(this.props.playlist[0] || '')
      this.props.onVideoChanged()
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
      YTPlayer.playVideo()
    }
  }

  pauseVideo() {
    const { YTPlayer } = this.state
    if (YTPlayer) {
      this.state.YTPlayer.pauseVideo()
    }
  }

  handleTogglePlay() {
    const { YTPlayer, isMobile, mobileFirstPlay } = this.state
    if (YTPlayer) {
      if (isMobile && !mobileFirstPlay && this.props.isPlaying) {
        YTPlayer.playVideo()
        this.setState({ mobileFirstPlay: true })
      } else {
        this.props.onVideoTogglePlay(Math.floor(YTPlayer.getCurrentTime()))
      }
    } else {
      this.props.onVideoTogglePlay(0)
    }
  }

  toggleFullScreen() {
    const newFullscreen = !this.state.fullscreen
    if (newFullscreen) {
      const [videoContainer] = document.getElementsByClassName('audio-player')
      const { offsetWidth } = videoContainer
      const newHeight = (offsetWidth / 16) * 9
      this.setState({ fullscreen: newFullscreen, videoHeight: newHeight })
    } else {
      this.setState({ fullscreen: newFullscreen })
    }
  }

  render() {
    const opts = {
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

    if (this.props.playing && this.props.playing.url) {
      return (
        <div className="audio-player">
          <div className="audio-player-playlist-title">{this.props.playlistName}</div>
          <div
            className="audio-player-container"
            style={{
              width: this.state.fullscreen ? '100%' : '200px',
              borderRadius: this.state.fullscreen ? '0' : '50%',
              height: this.state.fullscreen ? this.state.videoHeight : '200px',
            }}
          >
            <YoutubePlayer
              videoId={this.props.playing.url}
              className="audio-player-youtube-frame"
              opts={opts}
              onReady={this.onPlayerReady}
              onStateChange={this.onPlayerStateChange}
            />
          </div>
          <div className="audio-player-titles-container">
            <div className="audio-player-video-title">{this.props.playing.name}</div>
            <div className="audio-player-channel-title">{this.props.playing.channelTitle}</div>
          </div>
          <AudioWavesTimeline player={this.state.YTPlayer} />
          <div className="audio-player-controls">
            <AudioSoundButton value={volume} onChange={this.onSetVolume} />
            {(this.props.isAdmin) ? (
              <div
                className="audio-player-controls-btn-sm"
                onClick={() => this.handleTogglePlay()}
              >
                <i className={(this.props.isPlaying) ? 'ion-ios-pause' : 'ion-ios-play'} style={{ marginLeft: '0.4444rem' }} />
              </div>
            ) : ''}
            {(this.props.isAdmin) ? (
              <div
                className="audio-player-controls-btn-sm"
                onClick={() => this.props.onVideoChanged()}
                style={{ marginLeft: '-0.4444rem' }}
              >
                <i className="ion-ios-skipforward" />
              </div>
            ) : ''}
            <div
              className="audio-player-controls-btn-sm"
              onClick={() => this.toggleFullScreen()}
            >
              <i className={(this.state.fullscreen) ? 'ion-arrow-shrink' : 'ion-arrow-expand'} />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="audio-player">
        <h1><i className="ion-happy-outline" /></h1>
        <h3>We're ready!</h3>
        <div className="audio-player-controls">
          <div
            className="audio-player-controls-btn-lg"
            onClick={() => this.handleTogglePlay()}
          >
            <i className="ion-ios-play" style={{ marginLeft: '0.4444rem' }} />
          </div>
        </div>
        <p>Let's start this party ?</p>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  playing: PropTypes.object.isRequired,
  channelTitle: PropTypes.string,
  playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  playlistName: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  seekTo: PropTypes.number.isRequired,
  onVideoChanged: PropTypes.func.isRequired,
  onVideoTogglePlay: PropTypes.func.isRequired,
}

AudioPlayer.defaultProps = {
  playingTitle: 'Video title',
  channelTitle: 'Channel title',
}

export default AudioPlayer
