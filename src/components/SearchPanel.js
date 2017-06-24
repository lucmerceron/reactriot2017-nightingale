import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
    const { youtubeSearch, youtubeResults, musics, addMusic, likeMusic } = this.props

    return (
      <div>
        <FormInputText
          placeholder="Search a music you like"
          onChange={youtubeSearch}
        />
        <MusicListItem
          youtubeResults={youtubeResults}
          musics={musics}
          addMusic={addMusic}
          likeMusic={likeMusic}
        />
      </div>
    )
  }
}

SearchPanel.propTypes = {
  youtubeSearch: PropTypes.func.isRequired,
  youtubeResults: PropTypes.object.isRequired,
  musics: PropTypes.object.isRequired,
  addMusic: PropTypes.func.isRequired,
  likeMusic: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  youtubeResults: state.youtubeSearch,
  musics: state.playlists,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  youtubeSearch: search => dispatch(getYoutubeResults(search)),
  addMusic: (id, music) =>
    dispatch(updatePlaylist(ownProps.match.params.playlistId, `/musics/${id}`, {
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
        `/musics/${id}/likes/${localStorage.getItem('nightingaleUid')}`,
        true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)

