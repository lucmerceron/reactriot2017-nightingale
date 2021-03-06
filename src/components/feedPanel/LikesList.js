import React from 'react'
import PropTypes from 'prop-types'
import { keys, isEmpty } from 'lodash'

import FeedListItem from './FeedListItem'
import FeedListLikeMusicContent from './FeedListLikeMusicContent'

import './LikesList.css'

const LikesList = ({ likesFeed }) => (
  <ul className="feed-list-items">
    {keys(likesFeed).map(likeFeed => (
      <FeedListItem isMusic={false}>
        <FeedListLikeMusicContent
          username={likesFeed[likeFeed].username}
          thumbnail={likesFeed[likeFeed].thumbnail}
          title={likesFeed[likeFeed].title}
          action={likesFeed[likeFeed].action}
        />
      </FeedListItem>
    ))}
    {isEmpty(likesFeed) ?
      (<p style={{ margin: '24px 16px', textAlign: 'center' }}>
        Seems like you just arrived, do not hesite to like some musics ;)
      </p>) : null}
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
