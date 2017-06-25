import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { mapValues } from 'lodash'

import TabMenu from './feedPanel/TabMenu'

import { updatePlaylist } from '../actionCreators/playlists'
import { addToFeed } from '../actionCreators/feed'

class FeedPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const { users, musicsFeed, likesFeed, playlist, likeMusic, unlikeMusic } = this.props

    const usersExtended = mapValues(users, (user, key) => {
      if (playlist.admin && playlist.admin[key]) {
        return { name: user, isAdmin: true }
      }
      return { name: user, isAdmin: false }
    })

    return (
      <div>
        <TabMenu
          musicsFeed={musicsFeed}
          likesFeed={likesFeed}
          users={usersExtended}
        />
      </div>
    )
  }
}

FeedPanel.propTypes = {
  users: PropTypes.object.isRequired,
  musicsFeed: PropTypes.object.isRequired,
  likesFeed: PropTypes.object.isRequired,
  likeMusic: PropTypes.func.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  playlist: PropTypes.object.isRequired,
}


const mapDispatchToProps = (dispatch, ownProps) => ({
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
        thumbnail: music.thumbnail,
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
        thumbnail: music.thumbnail,
        title: music.title,
      }))
  },
})

const mapStateToProps = (state, ownProps) => ({
  users: state.playlists[ownProps.match.params.playlistId]
    ? state.playlists[ownProps.match.params.playlistId].users || {}
    : {},
  playlist: state.playlists[ownProps.match.params.playlistId],
  musicsFeed: state.feed.musicsFeed,
  likesFeed: state.feed.likesFeed,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedPanel))
