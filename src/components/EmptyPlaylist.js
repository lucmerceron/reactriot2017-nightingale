import React from 'react'

import './EmptyPlaylist.css'

const EmptyPlaylist = () => (
  <div className="empty-playlist">
    <div className="empty-playlist-title">This playlist is empty.</div>
    <div className="empty-playlist-icon-big">
      <i className="ion-sad-outline" />
    </div>
    <div className="empty-playlist-subtitle">
      Bring a little of life here.<br /><br />
    Add some songs to the playlist with the help of the search box!<br />
    </div>
  </div>
)

export default EmptyPlaylist
