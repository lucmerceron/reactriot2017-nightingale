import React from 'react'
import PropTypes from 'prop-types'

import './FeedListUserContent.css'

const FeedListUserContent = ({ userName }) => (
  <div>
    { userName }
  </div>
)

FeedListUserContent.propTypes = {
  userName: PropTypes.string.isRequired,
}

export default FeedListUserContent
