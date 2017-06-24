import React from 'react'
import PropTypes from 'prop-types'

import FeedListItem from './FeedListItem'
import FeedListLikeMusicContent from './FeedListLikeMusicContent'

import './LikesList.css'

const LikesList = props => {
  const { likesFeed } = props

  return (
    <ul>
      {
        likesFeed.map(likeFeed => <FeedListItem><FeedListLikeMusicContent likeFeed={likeFeed} /></FeedListItem>)
      }
    </ul>
  )
}

LikesList.propTypes = {
  likesFeed: PropTypes.array(PropTypes.shape({
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default LikesList
