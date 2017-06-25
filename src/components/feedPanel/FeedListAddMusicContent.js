import React from 'react'
import PropTypes from 'prop-types'

import './FeedListAddMusicContent.css'

const FeedListAddMusicContent = ({ username, thumbnail, title, action }) => (
  <div>
    <div className="feed-list-like-action">{action}</div>
    <div className="feed-list-add-username">{username}</div>
    <div className="feed-list-add-thumbnail">{thumbnail}</div>
    <div className="feed-list-add-title">{title}</div>
  </div>
)

FeedListAddMusicContent.propTypes = {
  username: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}

export default FeedListAddMusicContent
