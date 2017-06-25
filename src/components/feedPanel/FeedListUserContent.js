import React from 'react'
import PropTypes from 'prop-types'

import './FeedListUserContent.css'

const FeedListUserContent = ({ userName, isAdmin }) => (
  <div>
    { userName }
    { isAdmin ? 'King' : 'Normal' }
  </div>
)

FeedListUserContent.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}

export default FeedListUserContent
