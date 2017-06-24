import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { keys, orderBy } from 'lodash'

import AudioPlayer from './audioPlayer/AudioPlayer'
import SearchPanel from './SearchPanel'
import MusicListItem from './MusicListItem'
import FeedPanel from './FeedPanel'

import { updatePlaylist } from '../actionCreators/playlists'

class MainPlaylistView extends Component {
  constructor() {
    super()

    this.state = {
      state: false,
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

    const onVideoTogglePlay = () => {
      if (musicToPlay) {
        return pauseCurrentlyPlaying(musicToPlay.url, !musicToPlay.paused)
      }
      return musicOrdered[0] ? changeCurrentlyPlaying(musicOrdered[0], musicsToDisplay[musicOrdered[0]]) : {}
    }

    const onVideoNext = () => (musicOrdered[0] ? changeCurrentlyPlaying(musicOrdered[0], musicsToDisplay[musicOrdered[0]]) : {})

    return (
      <div className="main-playlist row" >
        <div className="col-sm-12 col-md-3 flex-center" >
          <SearchPanel />
        </div>
        <div className="col-sm-12 col-md-6 flex-center" >
          <AudioPlayer
            playingId={musicToPlay ? musicToPlay.url : ''}
            playlist={musicOrdered}
            isPlaying={musicToPlay ? !musicToPlay.paused : false}
            onVideoChanged={onVideoNext}
            onVideoTogglePlay={onVideoTogglePlay}
          />
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
  likeMusic: PropTypes.func.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  pauseCurrentlyPlaying: PropTypes.func.isRequired,
  changeCurrentlyPlaying: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  musicToPlay: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  musicsToDisplay: state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].musics : {},
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
  pauseCurrentlyPlaying: (musicId, paused) =>
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `currentlyPlaying/${musicId}/paused`, paused)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPlaylistView))
