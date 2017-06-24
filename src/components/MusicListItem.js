import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import './MusicListItem.css'

const MusicListItem = ({ youtubeResults, musics, addMusic, likeMusic }) => (
  <div className="search-panel-list">
    <ul>
      {keys(youtubeResults).map(youtubeId => (
        <li key={youtubeId}>
          <div className="search-panel-result-thumbnail">{youtubeResults[youtubeId].thumbnailUrl}</div>
          <div className="search-panel-result-title">{youtubeResults[youtubeId].title}</div>
          <div className="search-panel-result-channel">{youtubeResults[youtubeId].channelTitle}</div>
          <div className="search-panel-result-duration">{youtubeResults[youtubeId].duration}</div>
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
  youtubeResults: PropTypes.object.isRequired,
  musics: PropTypes.object.isRequired,
  addMusic: PropTypes.func.isRequired,
  likeMusic: PropTypes.func.isRequired,
}

export default MusicListItem
