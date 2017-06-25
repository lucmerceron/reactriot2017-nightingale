import React from 'react'
import PropTypes from 'prop-types'

import './FeedListAddMusicContent.css'

const FeedListAddMusicContent = ({ username, thumbnail, title, action }) => (
  <div className="feed-list-content">
    <div className="feed-list-add-action">{username} <b>{action}</b></div>
    <div className="feed-list-add-info">
      <span className="feed-list-add-info-thumbnail">
        <img src={thumbnail} alt="thumbnail" />
      </span>
      <span className="feed-list-add-info-title">{title}</span>
    </div>
  </div>
)

FeedListAddMusicContent.propTypes = {
  username: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}

export default FeedListAddMusicContent
