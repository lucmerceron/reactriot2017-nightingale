import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FormInputText from './generalPurpose/form/FormInputText'
import MusicListItem from './MusicListItem'
import { getYoutubeResults } from '../actionCreators/youtubeSearch'
import { updatePlaylist } from '../actionCreators/playlists'
import { addToFeed } from '../actionCreators/feed'

// import './SearchPanel.css'

class SearchPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const {
      playlist,
      youtubeSearch,
      musicsToDisplay,
      addMusic,
      likeMusic,
      unlikeMusic,
      removeMusic } = this.props

    return (
      <div>
        <FormInputText
          placeholder="Search a music you like"
          onChange={youtubeSearch}
        />
        <MusicListItem
          playlist={playlist}
          musicsToDisplay={musicsToDisplay}
          addMusic={addMusic}
          likeMusic={likeMusic}
          unlikeMusic={unlikeMusic}
          removeMusic={removeMusic}
        />
      </div>
    )
  }
}

SearchPanel.propTypes = {
  youtubeSearch: PropTypes.func.isRequired,
  musicsToDisplay: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  addMusic: PropTypes.func.isRequired,
  likeMusic: PropTypes.func.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  removeMusic: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  musicsToDisplay: state.youtubeSearch,
  playlist: state.playlists[ownProps.match.params.playlistId],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  youtubeSearch: search => dispatch(getYoutubeResults(search)),
  addMusic: (id, music) => {
    dispatch(updatePlaylist(ownProps.match.params.playlistId, `musics/${id}`, {
      ...music,
      likes: {
        [localStorage.getItem('nightingaleUid')]: true,
      },
      creator: localStorage.getItem('nightingaleUid'),
    }))
    dispatch(addToFeed('music', 'add',
      {
        action: 'added',
        username: localStorage.getItem('nightingaleName'),
        thumbnail: music.thumbnailUrl,
        title: music.title,
      }))
  },
  removeMusic: (id, music) => {
    dispatch(updatePlaylist(ownProps.match.params.playlistId, `musics/${id}`, null))
    dispatch(addToFeed('music', 'remove',
      {
        action: 'removed',
        username: localStorage.getItem('nightingaleName'),
        thumbnail: music.thumbnailUrl,
        title: music.title,
      }))
  },
  likeMusic: (id, music) => {
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}/likes/${localStorage.getItem('nightingaleUid')}`,
        true))
    dispatch(addToFeed('like', 'add',
      {
        action: 'liked',
        username: localStorage.getItem('nightingaleName'),
        thumbnail: music.thumbnailUrl,
        title: music.title,
      }))
  },
  unlikeMusic: (id, music) => {
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}/likes/${localStorage.getItem('nightingaleUid')}`, null))
    dispatch(addToFeed('like', 'remove',
      {
        action: 'unliked',
        username: localStorage.getItem('nightingaleName'),
        thumbnail: music.thumbnailUrl,
        title: music.title,
      }))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPanel))

