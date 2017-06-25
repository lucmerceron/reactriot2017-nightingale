import React from 'react'
import PropTypes from 'prop-types'

import './FeedListItem.css'

const FeedListItem = ({ children, isMusic }) => (
  <li className="feed-list-item">
    {children}
    {isMusic ? <div className="ion-android-list" /> : <div className="ion-android-favorite" />}
  </li>
)

FeedListItem.propTypes = {
  children: PropTypes.node.isRequired,
  isMusic: PropTypes.bool.isRequired,
}

export default FeedListItem
