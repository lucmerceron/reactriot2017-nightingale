import React from 'react'
import PropTypes from 'prop-types'

import './FeedListLikeMusicContent.css'

const FeedListLikeMusicContent = ({ username, thumbnail, title, action }) => (
  <div>
    <div className="feed-list-like-action">{action}</div>
    <div className="feed-list-like-username">{username}</div>
    <div className="feed-list-like-thumbnail">{thumbnail}</div>
    <div className="feed-list-like-title">{title}</div>
  </div>
)

FeedListLikeMusicContent.propTypes = {
  username: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}

export default FeedListLikeMusicContent
