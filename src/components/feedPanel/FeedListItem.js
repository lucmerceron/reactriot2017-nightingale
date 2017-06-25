import React from 'react'
import PropTypes from 'prop-types'

import './FeedListItem.css'

const FeedListItem = ({ children }) => (
  <li className="feed-list-item" key={children}>
    {children}
    <div className="ion-android-list" />
  </li>
)

FeedListItem.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FeedListItem
