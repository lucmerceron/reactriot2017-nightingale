import React from 'react'
// import PropTypes from 'prop-types'

import AudioPlayer from './audioPlayer/AudioPlayer'

const MainPlaylistView = () => (
  <div>
    <div>search panel</div>
    <div>
      <AudioPlayer />
      <div>list playlist</div>
    </div>
    <div>feed panel</div>
  </div>
)

export default MainPlaylistView
