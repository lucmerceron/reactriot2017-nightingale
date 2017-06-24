import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import './MusicListItem.css'

const MusicListItem = ({ youtubeSearch, musics, addMusic, likeMusic }) => (
  <div className="search-panel-list">
    <ul>
      {keys(youtubeSearch).map(youtubeId => (
        <li key={youtubeId}>
          <div className="search-panel-result-thumbnail">{youtubeSearch[youtubeId].thumbnailUrl}</div>
          <div className="search-panel-result-title">{youtubeSearch[youtubeId].title}</div>
          <div className="search-panel-result-channel">{youtubeSearch[youtubeId].channelTitle}</div>
          <div className="search-panel-result-duration">{youtubeSearch[youtubeId].duration}</div>
          <div className="search-panel-result-action">
            {(musics[youtubeId])
              ? <div className="search-panel-result-like" onClick={addMusic} />
              : <div className="search-panel-result-add" onClick={likeMusic} />
            }
          </div>
        </li>
      ))}
    </ul>
  </div>
)

MusicListItem.propTypes = {
  youtubeSearch: PropTypes.object.isRequired,
  musics: PropTypes.object.isRequired,
  addMusic: PropTypes.func.isRequired,
  likeMusic: PropTypes.func.isRequired,
}

export default MusicListItem
