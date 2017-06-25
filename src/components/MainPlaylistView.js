import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { keys, orderBy } from 'lodash'

import AudioPlayer from './audioPlayer/AudioPlayer'
import SearchPanel from './SearchPanel'
import MusicListItem from './MusicListItem'
import FeedPanel from './FeedPanel'
import EmptyPlaylist from './EmptyPlaylist'

import { updatePlaylist, removePlaylistOnDisconnect, getPrivatePlaylist, getPublicPlaylist } from '../actionCreators/playlists'

import './MainPlaylistView.css'

class MainPlaylistView extends Component {
  constructor() {
    super()

    this.state = {
      state: false,
    }

    this.playlistJoined = false

    this.joinOrRetrieve = this.joinOrRetrieve.bind(this)
  }
  componentDidMount() {
    this.joinOrRetrieve()
  }
  componentDidUpdate() {
    this.joinOrRetrieve()
  }

  joinOrRetrieve() {
    const { playlist, joinCurrentPlaylist, playlistId, gtPrivatePlaylist, gtPublicPlaylist, playlistTyp } = this.props
    if (playlist) {
      this.playlistJoined = true
      joinCurrentPlaylist()
    } else if (!playlist) {
      if (playlistTyp === 'private') {
        console.log('TRY', playlistTyp)
        gtPrivatePlaylist(playlistId)
      } else {
        console.log('TRY', playlistTyp)
        gtPublicPlaylist(playlistId)
      }
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
      removeCurrentlyPlaying,
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

    const onVideoNext = () => (musicOrdered[0]
      ? changeCurrentlyPlaying(musicOrdered[0], musicsToDisplay[musicOrdered[0]])
      : removeCurrentlyPlaying())

    const getSeekTo = () => {
      if (!musicToPlay) return 0
      const startedDate = new Date(musicToPlay.startedTime)
      const currentDate = new Date()

      const difference = (currentDate - startedDate) / 1000

      return Math.floor(difference)
    }

    return (
      <div className="main-playlist row" >
        <div className="col-sm-12 col-md-3" >
          <SearchPanel />
        </div>
        <div className="col-sm-12 col-md-6" >
          <div>
            {(musicToPlay || (musicsToDisplay && Object.keys(musicsToDisplay).length)) ? <AudioPlayer
              seekTo={getSeekTo()}
              playingId={musicToPlay ? musicToPlay.url : ''}
              playlist={musicOrdered}
              isPlaying={musicToPlay ? !musicToPlay.paused : false}
              onVideoChanged={onVideoNext}
              onVideoTogglePlay={onVideoTogglePlay}
            /> : <EmptyPlaylist />}
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
  playlists: PropTypes.object.isRequired,
  playlistId: PropTypes.string.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  removeCurrentlyPlaying: PropTypes.func.isRequired,
  pauseCurrentlyPlaying: PropTypes.func.isRequired,
  gtPrivatePlaylist: PropTypes.func.isRequired,
  gtPublicPlaylist: PropTypes.func.isRequired,
  changeCurrentlyPlaying: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  musicToPlay: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  musicsToDisplay: state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].musics || {} : {},
  musicToPlay:
    state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].currentlyPlaying || '' : {},
  playlist: state.playlists[ownProps.match.params.playlistId],
  playlists: state.playlists,
  playlistId: ownProps.match.params.playlistId,
  playlistTyp: ownProps.match.params.type,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  gtPrivatePlaylist: id => dispatch(getPrivatePlaylist(id)),
  gtPublicPlaylist: id => dispatch(getPublicPlaylist(id)),
  removeMusic: id =>
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
          channelTitle: music.channelTitle,
          paused: false,
          startedTime: (new Date()).getTime(),
        }))
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}`, null))
  },
  removeCurrentlyPlaying: () => {
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        'currentlyPlaying', null))
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
