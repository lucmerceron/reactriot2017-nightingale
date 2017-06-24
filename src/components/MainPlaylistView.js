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
      playingId: '0F1_OEi7p_8',
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
            playingId={this.state.playingId}
            playlist={['386JJLzeV5Y', 'NG2IUO6bibE', 'Yfqj8_nDu6c']}
            isPlaying
            onVideoChanged={(value) => { this.setState({ playingId: value }) }}
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
