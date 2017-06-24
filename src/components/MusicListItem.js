import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import './MusicListItem.css'

const MusicListItem = ({ musicsToDisplay, youtubeCompare, addMusic, likeMusic }) => (
  <div className="search-panel-list">
    <ul>
      {keys(musicsToDisplay).map(youtubeId => (
        <li key={youtubeId}>
          <div className="search-panel-result-thumbnail">{musicsToDisplay[youtubeId].thumbnailUrl}</div>
          <div className="search-panel-result-title">{musicsToDisplay[youtubeId].title}</div>
          <div className="search-panel-result-channel">{musicsToDisplay[youtubeId].channelTitle}</div>
          <div className="search-panel-result-duration">{musicsToDisplay[youtubeId].duration}</div>
          <div className="search-panel-result-action">
            {youtubeCompare[youtubeId]
              ? <div className="search-panel-result-add" onClick={() => likeMusic(youtubeId)}>Like</div>
              : <div className="search-panel-result-like" onClick={() => addMusic(youtubeId)}>Add</div>
            }
          </div>
        </li>
      ))}
    </ul>
  </div>
)

MusicListItem.propTypes = {
  musicsToDisplay: PropTypes.object.isRequired,
  youtubeCompare: PropTypes.object,
  addMusic: PropTypes.func,
  likeMusic: PropTypes.func.isRequired,
}

MusicListItem.defaultProps = {
  youtubeCompare: {},
  addMusic: () => {},
}

export default MusicListItem
