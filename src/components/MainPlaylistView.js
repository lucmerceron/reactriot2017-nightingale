import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { keys, orderBy } from 'lodash'

import AudioPlayer from './audioPlayer/AudioPlayer'
import SearchPanel from './SearchPanel'
import MusicListItem from './MusicListItem'
import FeedPanel from './FeedPanel'

import { updatePlaylist, removePlaylistOnDisconnect } from '../actionCreators/playlists'

class MainPlaylistView extends Component {
  constructor() {
    super()

    this.state = {
      state: false,
    }

    this.playlistJoined = false
  }
  componentDidMount() {
    const { playlist, joinCurrentPlaylist } = this.props
    if (playlist) {
      this.playlistJoined = true
      joinCurrentPlaylist()
    }
  }
  componentDidUpdate() {
    const { playlist, joinCurrentPlaylist } = this.props
    if (playlist && !this.playlistJoined) {
      this.playlistJoined = true
      joinCurrentPlaylist()
    }
  }

  render() {
    const { musicsToDisplay,
      removeMusic,
      likeMusic,
      unlikeMusic,
      playlist,
      musicToPlay,
      changeCurrentlyPlaying,
      pauseCurrentlyPlaying } = this.props

    const musicOrdered = orderBy(keys(musicsToDisplay), a => -keys(musicsToDisplay[a].likes || []).length)

    const onVideoTogglePlay = (currentTime) => {
      if (musicToPlay) {
        const currentDate = new Date()
        currentDate.setSeconds(currentDate.getSeconds() - currentTime)

        return pauseCurrentlyPlaying(!musicToPlay.paused, currentDate.getTime())
      }
      return musicOrdered[0] ? changeCurrentlyPlaying(musicOrdered[0], musicsToDisplay[musicOrdered[0]]) : {}
    }

    const onVideoNext = () => (musicOrdered[0] ? changeCurrentlyPlaying(musicOrdered[0], musicsToDisplay[musicOrdered[0]]) : {})

    const getSeekTo = () => {
      console.log('GetSeekTo', musicToPlay)
      if (!musicToPlay) return 0
      const startedDate = new Date(musicToPlay.startedTime)
      const currentDate = new Date()

      const difference = (currentDate - startedDate) / 1000

      return Math.floor(difference)
    }

    return (
      <div className="main-playlist row" >
        <div className="col-sm-12 col-md-3 flex-center" >
          <SearchPanel />
        </div>
        <div className="col-sm-12 col-md-6 flex-center" >
          {musicToPlay ? <AudioPlayer
            seekTo={getSeekTo()}
            playingId={musicToPlay ? musicToPlay.url : ''}
            playlist={musicOrdered}
            isPlaying={musicToPlay ? !musicToPlay.paused : false}
            onVideoChanged={onVideoNext}
            onVideoTogglePlay={onVideoTogglePlay}
          /> : null}
          <ul>
            <MusicListItem
              playlist={playlist}
              musicsToDisplay={musicsToDisplay}
              removeMusic={removeMusic}
              likeMusic={likeMusic}
              unlikeMusic={unlikeMusic}
            />
          </ul>
        </div>
        <div className="col-sm-12 col-md-3" >
          <FeedPanel />
        </div>
      </div>
    )
  }
}

MainPlaylistView.propTypes = {
  musicsToDisplay: PropTypes.object.isRequired,
  removeMusic: PropTypes.func.isRequired,
  joinCurrentPlaylist: PropTypes.func.isRequired,
  likeMusic: PropTypes.func.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  pauseCurrentlyPlaying: PropTypes.func.isRequired,
  changeCurrentlyPlaying: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  musicToPlay: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  musicsToDisplay: state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].musics || {} : {},
  musicToPlay:
    state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].currentlyPlaying || null : {},
  playlist: state.playlists[ownProps.match.params.playlistId],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeMusic: (id) =>
    dispatch(updatePlaylist(ownProps.match.params.playlistId, `musics/${id}`, null)),
  likeMusic: id =>
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}/likes/${localStorage.getItem('nightingaleUid')}`,
        true)),
  unlikeMusic: id =>
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}/likes/${localStorage.getItem('nightingaleUid')}`, null)),
  changeCurrentlyPlaying: (id, music) => {
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        'currentlyPlaying', {
          url: id,
          name: music.title,
          duration: music.duration,
          imageUrl: music.thumbnailUrl,
          paused: false,
          startedTime: (new Date()).getTime(),
        }))
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}`, null))
  },
  joinCurrentPlaylist: () => {
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `users/${localStorage.getItem('nightingaleUid')}`,
        localStorage.getItem('nightingaleName')))
    dispatch(
      removePlaylistOnDisconnect(
        ownProps.match.params.playlistId,
        `users/${localStorage.getItem('nightingaleUid')}`))
  },
  pauseCurrentlyPlaying: (paused, timestamp) => {
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        'currentlyPlaying/paused', paused))
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        'currentlyPlaying/startedTime', timestamp))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPlaylistView))
