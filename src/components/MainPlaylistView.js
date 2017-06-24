import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
      playingId: '0F1_OEi7p_8',
    }
  }

  render() {
    const { musicsToDisplay, removeMusic, likeMusic, unlikeMusic, playlist } = this.props

    const musics = playlist && playlist.musics ? playlist.musics : []

    console.log(musics)

    return (
      <div className="main-playlist row" >
        <div className="col-sm-12 col-md-3 flex-center" >
          <SearchPanel />
        </div>
        <div className="col-sm-12 col-md-6 flex-center" >
          <AudioPlayer
            playingId={this.state.playingId}
            playlist={['386JJLzeV5Y', 'NG2IUO6bibE', 'Yfqj8_nDu6c']}
            isPlaying
            onVideoChanged={(value) => { this.setState({ playingId: value }) }}
            onVideoTogglePlay={() => { console.log('video play toggled') }}
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
  playlist: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  musicsToDisplay: state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].musics : {},
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPlaylistView))
