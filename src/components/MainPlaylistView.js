import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import AudioPlayer from './audioPlayer/AudioPlayer'
import SearchPanel from './SearchPanel'
import MusicListItem from './MusicListItem'
import FeedPanel from './FeedPanel'

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
          <AudioPlayer
            playlist={['NG2IUO6bibE', '0F1_OEi7p_8', '386JJLzeV5Y', 'Yfqj8_nDu6c']}
            isPlaying
            onVideoChanged={() => { console.log('video changed') }}
            onVideoTogglePlay={() => { console.log('video play toggled') }}
          />
          <ul>
            <MusicListItem youtubeSearch={[]} musics={[]} addMusic={() => {}} likeMusic={() => {}} />
          </ul>
        </div>
        <FeedPanel />
      </div>
    )
  }
}

MainPlaylistView.propTypes = {

}

MainPlaylistView.defaultProps = {

}

export default MainPlaylistView
