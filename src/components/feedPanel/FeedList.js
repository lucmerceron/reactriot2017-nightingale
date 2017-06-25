import React from 'react'
import PropTypes from 'prop-types'
import { keys, isEmpty } from 'lodash'

import FeedListItem from './FeedListItem'
import FeedListAddMusicContent from './FeedListAddMusicContent'

import './FeedList.css'

const FeedList = ({ musicsFeed }) => (
  <ul className="feed-list-items">
    {keys(musicsFeed).map(likeFeed => (
      <FeedListItem isMusic>
        <FeedListAddMusicContent
          username={musicsFeed[likeFeed].username}
          thumbnail={musicsFeed[likeFeed].thumbnail}
          title={musicsFeed[likeFeed].title}
          action={musicsFeed[likeFeed].action}
        />
      </FeedListItem>))}
    {isEmpty(musicsFeed) ? <p style={{ marginTop: '16px' }}>Seems like you just arrived, add some musics ;)</p> : null}
  </ul>
)

FeedList.propTypes = {
  musicsFeed: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default FeedList
