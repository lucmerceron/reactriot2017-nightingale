import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import AudioPlayer from './audioPlayer/AudioPlayer'
import SearchPanel from './SearchPanel'
import MusicListItem from './MusicListItem'

class MainPlaylistView extends Component {
  constructor() {
    super()

    this.state = {
      state: false,
    }
  }

  render() {
    return (
      <div>
        <SearchPanel />
        <div>
          <AudioPlayer />
          <ul>
            <MusicListItem youtubeSearch={[]} musics={[]} addMusic={() => {}} likeMusic={() => {}} />
          </ul>
        </div>
        <div>feed panel</div>
      </div>
    )
  }
}

MainPlaylistView.propTypes = {

}

MainPlaylistView.defaultProps = {

}

export default MainPlaylistView
