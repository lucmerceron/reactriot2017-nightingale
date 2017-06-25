import React from 'react'
import PropTypes from 'prop-types'

import './EmptyPlaylist.css'

const EmptyPlaylist = ({ playlistName }) => (
  <div className="empty-playlist">
    <div className="empty-playlist-title">{playlistName}</div>
    <div className="empty-playlist-icon-big">
      <i className="ion-sad-outline" />
    </div>
    <div className="empty-playlist-subtitle">
      This playlist is empty.<br /><br />
      Add some songs to the playlist with the help of the search box!<br />
    </div>
  </div>
)

EmptyPlaylist.propTypes = {
  playlistName: PropTypes.string.isRequired,
}

export default EmptyPlaylist
