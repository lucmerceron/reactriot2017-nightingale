import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { mapValues } from 'lodash'

import TabMenu from './feedPanel/TabMenu'

import { updatePlaylist } from '../actionCreators/playlists'

class FeedPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const { users, musicsFeed, likesFeed, playlist } = this.props

    const usersExtended = mapValues(users, (user, key) => {
      if (playlist.admin && playlist.admin[key]) {
        return { id: key, name: user, isAdmin: true }
      }
      return { id: key, name: user, isAdmin: false }
    })

    return (
      <TabMenu
        musicsFeed={musicsFeed}
        likesFeed={likesFeed}
        users={usersExtended}
      />
    )
  }
}

FeedPanel.propTypes = {
  users: PropTypes.object.isRequired,
  musicsFeed: PropTypes.array.isRequired,
  likesFeed: PropTypes.array.isRequired,
  likeMusic: PropTypes.func.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  playlist: PropTypes.object,
}

FeedPanel.defaultProps = {
  playlist: {},
}


const mapDispatchToProps = (dispatch, ownProps) => ({
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

const mapStateToProps = (state, ownProps) => ({
  users: state.playlists[ownProps.match.params.playlistId]
    ? state.playlists[ownProps.match.params.playlistId].users || {}
    : {},
  playlist: state.playlists[ownProps.match.params.playlistId],
  musicsFeed: state.feed.musicsFeed,
  likesFeed: state.feed.likesFeed,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedPanel))
