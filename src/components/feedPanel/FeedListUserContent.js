import React from 'react'
import PropTypes from 'prop-types'

import Identicon from './Identicon'
import './FeedListUserContent.css'

const FeedListUserContent = ({ id, userName, isAdmin }) => (
  <div>
    <div className="identicon-big-wrapper">
      { isAdmin ?
        <img src="https://www.spreadshirt.co.uk/image-server/v1/designs/16160003,width=178,height=178/crown.png" alt="crown" /> : null}
      <div className="identicon-wrapper">
        <Identicon id={id} />
      </div>
    </div>
    <div className="feed-user-name" style={id === localStorage.getItem('nightingaleUid') ? { fontWeight: 400 } : {}}>
      {userName} {id === localStorage.getItem('nightingaleUid') ? <span>(me)</span> : null}
    </div>
  </div>
)

FeedListUserContent.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}

export default FeedListUserContent
