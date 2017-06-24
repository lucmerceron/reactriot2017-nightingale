import React from 'react'
import PropTypes from 'prop-types'

import FeedListItem from './FeedListItem'
import FeedListAddMusicContent from './FeedListAddMusicContent'

import './FeedList.css'

const FeedList = props => {
  const { musicsFeed } = props

  return (
    <ul>
      {
        musicsFeed.map(musicFeed => <FeedListItem><FeedListAddMusicContent musicFeed={musicFeed} /></FeedListItem>)
      }
    </ul>
  )
}

FeedList.propTypes = {
  musicsFeed: PropTypes.array(PropTypes.shape({
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default FeedList
