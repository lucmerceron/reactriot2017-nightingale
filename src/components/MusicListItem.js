import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import './SearchListVideo.css'

const SearchListVideo = ({ youtubeSearch }) => (
  <div className="search-panel-list">
    <ul>
      {keys(youtubeSearch).map(youtubeId => (
        <li key={youtubeId}>
          <div className="search-panel-result-thumbnail">{youtubeSearch[youtubeId].thumbnailUrl}</div>
          <div className="search-panel-result-title">{youtubeSearch[youtubeId].title}</div>
          <div className="search-panel-result-channel">{youtubeSearch[youtubeId].channelTitle}</div>
          <div className="search-panel-result-duration">{youtubeSearch[youtubeId].duration}</div>
        </li>
      ))}
    </ul>
  </div>
)

SearchListVideo.propTypes = {
  youtubeSearch: PropTypes.object.isRequired,
}

export default SearchListVideo
