import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FormInputText from './generalPurpose/form/FormInputText'
import MusicListItem from './MusicListItem'
import { getYoutubeResults } from '../actionCreators/youtubeSearch'
import { updatePlaylist } from '../actionCreators/playlists'

// import './SearchPanel.css'

class SearchPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const { youtubeSearch, musicsToDisplay, youtubeCompare, addMusic, likeMusic } = this.props

    return (
      <div>
        <FormInputText
          placeholder="Search a music you like"
          onChange={youtubeSearch}
        />
        <MusicListItem
          musicsToDisplay={musicsToDisplay}
          youtubeCompare={youtubeCompare}
          addMusic={addMusic}
          likeMusic={likeMusic}
        />
      </div>
    )
  }
}

SearchPanel.propTypes = {
  youtubeSearch: PropTypes.func.isRequired,
  musicsToDisplay: PropTypes.object.isRequired,
  youtubeCompare: PropTypes.object.isRequired,
  addMusic: PropTypes.func.isRequired,
  likeMusic: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  musicsToDisplay: state.youtubeSearch,
  youtubeCompare: state.playlists[ownProps.match.params.playlistId] ? state.playlists[ownProps.match.params.playlistId].musics : {},
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
  likeMusic: id =>
    dispatch(
      updatePlaylist(
        ownProps.match.params.playlistId,
        `musics/${id}/likes/${localStorage.getItem('nightingaleUid')}`,
        true)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPanel))

