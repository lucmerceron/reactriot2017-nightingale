import React from 'react'
import PropTypes from 'prop-types'

import './FeedListItem.css'

const FeedListItem = ({ children }) => (
  <div>
    {children}
  </div>
)

FeedListItem.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FeedListItem
