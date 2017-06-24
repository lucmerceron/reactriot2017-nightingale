import React from 'react'
import PropTypes from 'prop-types'

import FeedListItem from './FeedListItem'
import FeedListAddMusicContent from './FeedListAddMusicContent'

import './FeedList.css'

const FeedList = ({ musicsFeed }) =>
  <ul>{musicsFeed.map(musicFeed => <FeedListItem><FeedListAddMusicContent musicFeed={musicFeed} /></FeedListItem>)}</ul>

FeedList.propTypes = {
  musicsFeed: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default FeedList
