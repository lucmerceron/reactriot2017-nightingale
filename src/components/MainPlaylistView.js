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
      <div className="main-playlist row" >
        <div className="col-sm-12 col-md-3 flex-center" >
          <SearchPanel />
        </div>
        <div className="col-sm-12 col-md-6 flex-center" >
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
        <div className="col-sm-12 col-md-3" >
          <FeedPanel />
        </div>
      </div>
    )
  }
}

MainPlaylistView.propTypes = {

}

MainPlaylistView.defaultProps = {

}

export default MainPlaylistView
