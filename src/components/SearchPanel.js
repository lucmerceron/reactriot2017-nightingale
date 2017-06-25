import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FormInputText from './generalPurpose/form/FormInputText'
import MusicListItem from './MusicListItem'
import { getYoutubeResults } from '../actionCreators/youtubeSearch'
import { updatePlaylist } from '../actionCreators/playlists'

import './SearchPanel.css'

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
      <div className="search-panel">
        <div className="search-panel-search-box">
          <div className="search-panel-search-icon">
            <i className="ion-ios-musical-notes" />
          </div>
          <FormInputText
            placeholder="Eminem, Kanye West, etc..."
            onChange={youtubeSearch}
          />
        </div>
        {Object.keys(musicsToDisplay).length ? <MusicListItem
          playlist={playlist}
          musicsToDisplay={musicsToDisplay}
          addMusic={addMusic}
          likeMusic={likeMusic}
          unlikeMusic={unlikeMusic}
          removeMusic={removeMusic}
        /> : <p style={{ padding: '0 10px 0 10px', textAlign: 'center' }}>Just use the search box above to add some good vibes to this place! :D</p>}

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
  addMusic: (id, music) =>
    dispatch(updatePlaylist(ownProps.match.params.playlistId, `musics/${id}`, {
      ...music,
      likes: {
        [localStorage.getItem('nightingaleUid')]: true,
      },
      creator: localStorage.getItem('nightingaleUid'),
    })),
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPanel))
