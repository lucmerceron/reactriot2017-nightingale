import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import FeedListItem from './FeedListItem'
import FeedListLikeMusicContent from './FeedListLikeMusicContent'

import './LikesList.css'

const LikesList = ({ likesFeed }) => (
  <ul>
    {keys(likesFeed).map(likeFeed => (
      <FeedListItem>
        <FeedListLikeMusicContent
          username={likesFeed[likeFeed].username}
          thumbnail={likesFeed[likeFeed].thumbnail}
          title={likesFeed[likeFeed].title}
          action={likesFeed[likeFeed].action}
        />
      </FeedListItem>))}
  </ul>
)

LikesList.propTypes = {
  likesFeed: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default LikesList
