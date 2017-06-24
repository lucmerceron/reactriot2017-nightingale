import React from 'react'
import PropTypes from 'prop-types'

import './FeedListUserContent.css'

const FeedListUserContent = props => (
  <div>
    { props.user }
  </div>
)

FeedListUserContent.propTypes = {
  user: PropTypes.string.isRequired,
}

export default FeedListUserContent
