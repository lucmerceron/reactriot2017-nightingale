import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TabMenu from './feedPanel/TabMenu'

import { updatePlaylist } from '../actionCreators/playlists'

class FeedPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const { users, musicsFeed, likesFeed, playlist, likeMusic, unlikeMusic } = this.props

    return (
      <div>
        <TabMenu
          musicsFeed={musicsFeed}
          likesFeed={likesFeed}
          users={users}
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
  musicsFeed: [],
  likesFeed: [],
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedPanel))
