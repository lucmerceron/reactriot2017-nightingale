import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FormInputText from './generalPurpose/form/FormInputText'
import MusicListItem from './MusicListItem'

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

export default SearchPanel

