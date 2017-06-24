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
          <AudioPlayer />
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
