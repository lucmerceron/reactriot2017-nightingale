import React from 'react'
// import PropTypes from 'prop-types'

import AudioPlayer from './audioPlayer/AudioPlayer'
import SearchPanel from './SearchPanel'

const MainPlaylistView = () => (
  <div>
    <div>
      <SearchPanel />
    </div>
    <div>
      <AudioPlayer />
      <div>list playlist</div>
    </div>
    <div>feed panel</div>
  </div>
)

export default MainPlaylistView
